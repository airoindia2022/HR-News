import React, { createContext, useContext, useState, useEffect } from 'react';
import { getBaseUrl } from '../utils/api';

const NewsContext = createContext();

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState({
    mainStory: null,
    latestStories: [],
    trendingNews: [],
    // editorsChoice: [],
    epaperUrl: null,
    isLoading: true,
    error: null
  });

  const [language, setLanguage] = useState('en');

  const translateText = async (text, target) => {
    if (!text || target === 'en') return text;
    try {
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(text)}`);
      const data = await response.json();
      return data[0].map(item => item[0]).join('');
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  };

  const translateNewsItem = async (item, target) => {
    if (!item || target === 'en') return item;
    return {
      ...item,
      title: await translateText(item.title, target),
      excerpt: await translateText(item.excerpt, target),
      category: await translateText(item.category, target),
      translated: true
    };
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    fetchNews(newLang);
  };

  const fetchNews = async (targetLang = language) => {
    try {
      setNews(prev => ({ ...prev, isLoading: true }));
      const baseUrl = await getBaseUrl();

      // 1. Fetch from Backend
      let backendData = [];
      try {
        const backendRes = await fetch(`${baseUrl}/api/news`);
        if (backendRes.ok) {
          backendData = await backendRes.json();
        }
      } catch (err) {
        console.error("Backend fetch error:", err);
      }

      // 2. Fetch from RSS
      let rssItems = [];
      try {
        const RSS_URL = "https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en";
        const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.status === 'ok') {
          rssItems = data.items;
        }
      } catch (err) {
        console.error("RSS fetch error:", err);
      }

      // 2.5 Fetch Latest E-paper
      let epaperUrl = null;
      try {
        const epaperRes = await fetch(`${baseUrl}/api/epaper/latest`);
        if (epaperRes.ok) {
          const epaperData = await epaperRes.json();
          if (epaperData?._id) {
            epaperUrl = `${baseUrl}/api/epaper/view/${epaperData._id}`;
          }
        }
      } catch (err) {
        console.error("E-paper fetch error:", err);
      }

      // 3. Map RSS Items
      const rssMapped = {
        main: rssItems[0] ? {
          id: 'rss-main',
          image: rssItems[0].thumbnail || rssItems[0].enclosure?.link || (rssItems[0].description.match(/<img[^>]+src="([^">]+)"/) || [])[1] || "https://images.unsplash.com/photo-1585829365234-781fefc2444b?auto=format&fit=crop&q=80&w=1000",
          category: "Global",
          title: rssItems[0].title,
          excerpt: rssItems[0].description.replace(/<[^>]*>?/gm, '').trim(),
          author: rssItems[0].author || "Google News",
          date: "Live",
          link: rssItems[0].link
        } : null,
        latest: (rssItems.length > 0 ? rssItems.slice(0, 15) : []).map((item, index) => ({
          id: `rss-l-${index}`,
          image: item.thumbnail || item.enclosure?.link || (item.description.match(/<img[^>]+src="([^">]+)"/) || [])[1] || `https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800`,
          category: "Latest",
          title: item.title,
          excerpt: item.description.replace(/<[^>]*>?/gm, '').trim(),
          author: item.author || "News Desk",
          date: "Today",
          link: item.link
        })),
        trending: (rssItems.length > 0 ? (rssItems.length > 10 ? rssItems.slice(5, 15) : rssItems.slice(0, 10)) : []).map((item, index) => ({
          id: `rss-t-${index}`,
          title: item.title,
          category: "Trending",
          link: item.link
        }))
      };

      // 4. Combine
      const adminHeadline = backendData.find(n => n.category === 'Headline');
      const mainStory = adminHeadline || rssMapped.main || backendData[0];

      const mapItem = (item) => {
        const cleanContent = item.content ? item.content.replace(/<[^>]*>?/gm, '').trim() : '';
        const autoExcerpt = cleanContent.length > 160 ? cleanContent.substring(0, 160) + '...' : cleanContent;

        const formatUrl = (url) => {
          if (!url) return url;
          if (url.startsWith('/uploads/') || url.startsWith('/api/')) return `${baseUrl}${url}`;
          // Fix old hardcoded URLs from previous versions
          if (url.includes('localhost:5000/uploads/')) {
            return url.replace('http://localhost:5000', baseUrl);
          }
          return url;
        };

        return {
          ...item,
          id: item._id || item.id,
          image: formatUrl(item.image || item.imageUrl) || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800",
          video: formatUrl(item.video || item.videoUrl) || null,
          category: item.newsCategory || item.category || "General",
          excerpt: item.excerpt || autoExcerpt,
          author: item.author || (item.source?.name) || "News Desk",
          date: item.date ? new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : "Today",
          link: item.link || (item._id ? `/news/${item._id}` : '#')
        };
      };

      const latestFromBackend = backendData.filter(n => n.category === 'Latest stories' && n._id !== mainStory?._id);
      const trendingFromBackend = backendData.filter(n => n.category === 'Trending now' && n._id !== mainStory?._id);
      const editorsFromBackend = backendData.filter(n => n.category === "Editor's Choice" || (!['Headline', 'Latest stories', 'Trending now'].includes(n.category) && n._id !== mainStory?._id));

      let combinedNews = {
        mainStory: mainStory ? mapItem(mainStory) : null,
        latestStories: [
          ...latestFromBackend,
          ...rssMapped.latest.filter(rss => !latestFromBackend.some(b => b.title === rss.title))
        ].slice(0, 15).map(mapItem),
        trendingNews: [
          ...trendingFromBackend,
          ...rssMapped.trending.filter(rss => !trendingFromBackend.some(b => b.title === rss.title))
        ].slice(0, 6).map(mapItem),
        editorsChoice: (editorsFromBackend.length > 0 ? editorsFromBackend : backendData.slice(3, 10)).slice(0, 5).map(mapItem),
        epaperUrl,
        isLoading: false,
        error: null
      };

      // 5. Automatic Translation if targetLang is Hindi
      if (targetLang === 'hi') {
        combinedNews.mainStory = await translateNewsItem(combinedNews.mainStory, 'hi');
        combinedNews.latestStories = await Promise.all(combinedNews.latestStories.map(item => translateNewsItem(item, 'hi')));
        combinedNews.trendingNews = await Promise.all(combinedNews.trendingNews.map(item => translateNewsItem(item, 'hi')));
        combinedNews.editorsChoice = await Promise.all(combinedNews.editorsChoice.map(item => translateNewsItem(item, 'hi')));
      }

      setNews(combinedNews);
    } catch (err) {
      console.error("News Fetch Error:", err);
      setNews(prev => ({ ...prev, isLoading: false, error: err.message }));
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(() => fetchNews(language), 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [language]);

  return (
    <NewsContext.Provider value={{ ...news, language, toggleLanguage, refreshNews: fetchNews }}>
      {children}
    </NewsContext.Provider>
  );
};

