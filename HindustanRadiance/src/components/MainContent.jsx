import React from 'react';
import NewsCard from './NewsCard';
import Sidebar from './Sidebar';
import { useNews } from '../context/NewsContext';

const MainContent = () => {
  const { latestStories: newsItems } = useNews();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Main Feed */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-serif font-bold text-black ">Latest Stories</h2>
            <div className="flex gap-4">
              {['All', 'Politics', 'Tech', 'Sports'].map(f => (
                <button key={f} className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-radiance-gold hover:text-white transition-all">
                  {f}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsItems.map((item) => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button className="px-8 py-3 bg-white dark:bg-slate-800 border border-radiance-gold/30 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-radiance-gold hover:text-white transition-all transform hover:-translate-y-1 text-white">
              Load More Stories
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <Sidebar />
        </div>

      </div>
    </div>
  );
};

export default MainContent;
