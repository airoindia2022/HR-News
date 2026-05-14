import React from 'react';
import NewsCard from './NewsCard';
import Sidebar from './Sidebar';
import { ArrowUpRight } from 'lucide-react';
import { useNews } from '../context/NewsContext';

const MainContent = () => {
  const { latestStories: newsItems, language } = useNews();

  const filters = language === 'hi' 
    ? ['सभी', 'राजनीति', 'तकनीक', 'खेल']
    : ['All', 'Politics', 'Tech', 'Sports'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Main Feed */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <h2 className="text-4xl font-sans font-black text-midnight tracking-tight">
              {language === 'hi' ? 'ताज़ा खबरें' : 'Latest Stories'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {filters.map(f => (
                <button key={f} className={`text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2.5 rounded-full border transition-all ${f === filters[0] ? 'bg-midnight text-white border-midnight' : 'border-slate-200 text-slate-500 hover:border-radiance-gold hover:text-radiance-gold'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {newsItems.map((item) => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>
 
          <div className="mt-16 flex justify-center">
            <button className="group relative px-10 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full font-black uppercase tracking-[0.2em] text-[10px] text-midnight dark:text-white hover:border-radiance-gold hover:text-radiance-gold transition-all overflow-hidden shadow-xl">
              <span className="relative z-10 flex items-center gap-2">
                {language === 'hi' ? 'और अधिक खबरें लोड करें' : 'Load More Stories'}
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-96 flex-shrink-0">
          <Sidebar />
        </div>

      </div>
    </div>
  );
};

export default MainContent;
