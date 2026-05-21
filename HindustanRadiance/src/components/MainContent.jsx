import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import Sidebar from './Sidebar';
import { ArrowUpRight } from 'lucide-react';
import { useNews } from '../context/NewsContext';

const MainContent = () => {
  const { latestStories: newsItems, language, selectedCategory, setSelectedCategory } = useNews();
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory]);

  const filters = language === 'hi' 
    ? ['सभी', 'राजनीति', 'तकनीक', 'खेल']
    : ['All', 'Politics', 'Tech', 'Sports'];

  const getEnglishCategoryFromFilter = (filterName) => {
    const f = filterName.toLowerCase();
    if (f === 'all' || f === 'सभी') return 'All';
    if (f === 'politics' || f === 'राजनीति') return 'Politics';
    if (f === 'tech' || f === 'technology' || f === 'तकनीक') return 'Technology';
    if (f === 'sports' || f === 'खेल') return 'Sports';
    if (f === 'world' || f === 'विश्व') return 'World';
    if (f === 'business' || f === 'व्यापार') return 'Business';
    // if (f === 'culture' || f === 'संस्कृति') return 'Culture';
    return filterName;
  };

  const isActive = (filter) => {
    const englishFilter = getEnglishCategoryFromFilter(filter);
    return selectedCategory.toLowerCase() === englishFilter.toLowerCase();
  };

  const filteredStories = selectedCategory === 'All'
    ? newsItems
    : newsItems.filter(item => {
        const itemCat = item.category || 'General';
        return itemCat.toLowerCase() === selectedCategory.toLowerCase();
      });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="w-full">
        
        {/* Main Feed */}
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <h2 className="text-4xl font-sans font-black text-midnight tracking-tight">
              {language === 'hi' ? 'ताज़ा खबरें' : 'Latest Stories'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {filters.map(f => (
                <button 
                  key={f} 
                  onClick={() => setSelectedCategory(getEnglishCategoryFromFilter(f))}
                  className={`text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2.5 rounded-full border transition-all ${
                    isActive(f) 
                      ? 'bg-midnight text-white border-midnight' 
                      : 'border-slate-200 text-slate-500 hover:border-radiance-gold hover:text-radiance-gold'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          
          {filteredStories.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <p className="text-slate-400 font-medium font-sans uppercase tracking-[0.1em] text-xs">
                {language === 'hi' ? 'इस श्रेणी में कोई खबर उपलब्ध नहीं है।' : 'No stories found in this category.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredStories.slice(0, visibleCount).map((item) => (
                <NewsCard key={item.id} {...item} />
              ))}
            </div>
          )}
 
          {filteredStories.length > visibleCount && (
            <div className="mt-16 flex justify-center">
              <button 
                onClick={() => setVisibleCount(filteredStories.length)}
                className="group relative px-10 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full font-black uppercase tracking-[0.2em] text-[10px] text-midnight dark:text-white hover:border-radiance-gold hover:text-radiance-gold transition-all overflow-hidden shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {language === 'hi' ? 'और अधिक खबरें लोड करें' : 'Load More Stories'}
                  <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Sidebar - commented out as popular tags are commented out and 3 columns are desired
        <div className="lg:w-96 flex-shrink-0">
          <Sidebar />
        </div>
        */}

      </div>
    </div>
  );
};

export default MainContent;
