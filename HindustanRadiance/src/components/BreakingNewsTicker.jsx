import React from 'react';
import { useNews } from '../context/NewsContext';

const BreakingNewsTicker = () => {
  const { trendingNews } = useNews();
  const news = trendingNews.length > 0 
    ? trendingNews.map(n => n.title) 
    : ["Loading latest updates..."];

  return (
    <div className="w-full bg-white dark:bg-slate-950 border-y border-radiance-gold/30 overflow-hidden h-10 flex items-center shadow-inner">
      <div className="flex-shrink-0 bg-radiance-gold text-white px-6 h-full flex items-center font-bold text-xs uppercase tracking-widest z-10 shadow-[5px_0_15px_rgba(0,0,0,0.1)]">
        Breaking
      </div>
      <div className="flex-1 relative overflow-hidden">
        <div className="animate-ticker flex items-center whitespace-nowrap gap-12 py-1">
          {news.concat(news).map((item, index) => (
            <span key={index} className="text-sm font-medium flex items-center gap-4 text-slate-800 dark:text-white">
              <span className="w-1.5 h-1.5 bg-radiance-gold rounded-full rotate-45 flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
