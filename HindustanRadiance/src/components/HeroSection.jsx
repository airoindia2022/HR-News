import React from 'react';
import NewsCard from './NewsCard';
import { TrendingUp, Award } from 'lucide-react';
import { useNews } from '../context/NewsContext';

const HeroSection = () => {
  const { mainStory, trendingNews } = useNews();

  if (!mainStory) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col gap-8">
        
        {/* Main Story - Full Width Top */}
        <div className="w-full">
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-radiance-gold" size={18} />
            <h2 className="uppercase tracking-[0.2em] text-[10px] font-bold">Top Headline</h2>
          </div>
          <NewsCard {...mainStory} size="large" />
        </div>

        {/* Bottom Section - Trending */}
        <div className="w-full">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-radiance-gold" />
            <h2 className="uppercase tracking-[0.2em] text-xs font-bold">Trending Now</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            {trendingNews.map((news, index) => (
              <div key={news.id} className="group relative flex gap-4 cursor-pointer">
                <span className="text-4xl font-serif font-bold text-slate-200 dark:text-slate-800 transition-colors group-hover:text-radiance-gold/40">
                  0{index + 1}
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-radiance-gold mb-1">
                    {news.category}
                  </span>
                  <a 
                    href={news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold leading-tight text-black group-hover:text-radiance-gold transition-colors"
                  >
                    {news.title}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
