import React from 'react';
import { useNews } from '../context/NewsContext';

const BreakingNewsTicker = () => {
  const { trendingNews, language } = useNews();
  const news = trendingNews.length > 0 
    ? trendingNews.map(n => n.title) 
    : [language === 'hi' ? "नवीनतम अपडेट लोड हो रहे हैं..." : "Loading latest updates..."];

  return (
    <div className="w-full bg-white dark:bg-slate-950 border-y border-radiance-gold/30 overflow-hidden h-10 flex items-center shadow-inner">
      <div className="flex-shrink-0 bg-radiance-gold text-white px-6 h-full flex items-center font-black text-[10px] uppercase tracking-[0.2em] z-10 shadow-[5px_0_15px_rgba(0,0,0,0.1)]">
        {language === 'hi' ? 'ब्रेकिंग' : 'Breaking'}
      </div>
      <div className="flex-1 relative overflow-hidden">
        <div className="animate-ticker flex items-center whitespace-nowrap gap-12 py-1">
          {news.concat(news).map((item, index) => (
            <span key={index} className="text-[11px] font-black flex items-center gap-4 text-midnight dark:text-white uppercase tracking-wider">
              <span className="w-2 h-2 bg-radiance-gold rotate-45 flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};


export default BreakingNewsTicker;
