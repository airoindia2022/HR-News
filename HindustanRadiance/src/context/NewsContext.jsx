import React, { createContext, useContext, useState, useEffect } from 'react';
import { getBaseUrl } from '../utils/api';

const NewsContext = createContext();

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState({
    mainStory: null,
    latestStories: [],
    trendingNews: [],
    editorsChoice: [],
    epaperUrl: null,
    isLoading: true,
    error: null
  });

  const fetchNews = async () => {
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

      // 3. Map RSS Items with robust slicing
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

      // 4. Combine with Deduplication and ID Standardisation
      const adminHeadline = backendData.find(n => n.category === 'Headline');
      const mainStory = adminHeadline || rssMapped.main || backendData[0];

      const mapItem = (item) => ({
        ...item,
        id: item._id || item.id
      });

      // Filter out main story only if we have plenty of other stories
      const latestFromBackend = backendData.filter(n => n.category === 'Latest stories');
      const trendingFromBackend = backendData.filter(n => n.category === 'Trending now');

      const combinedNews = {
        mainStory: mainStory ? mapItem(mainStory) : null,
        latestStories: [
          ...latestFromBackend.filter(n => latestFromBackend.length < 2 || n._id !== mainStory?._id),
          ...rssMapped.latest
        ].slice(0, 12).map(mapItem),
        trendingNews: [
          ...trendingFromBackend.filter(n => trendingFromBackend.length < 2 || n._id !== mainStory?._id),
          ...rssMapped.trending
        ].slice(1, 7).map(mapItem),
        editorsChoice: (backendData.length > 0 ? backendData.slice(3, 6) : rssMapped.latest.slice(3, 6)).map(mapItem),
        epaperUrl,
        isLoading: false,
        error: null
      };

      setNews(combinedNews);
    } catch (err) {
      console.error("News Fetch Error:", err);
      setNews(prev => ({ ...prev, isLoading: false, error: err.message }));
    }
  };
  useEffect(() => {
    fetchNews();
    // Har 30 minutes mein auto-refresh
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <NewsContext.Provider value={{ ...news, refreshNews: fetchNews }}>
      {children}
    </NewsContext.Provider>
  );
};
