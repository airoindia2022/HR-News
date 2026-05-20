import React from 'react';
import NewsCard from './NewsCard';
import { TrendingUp, Award } from 'lucide-react';
import { useNews } from '../context/NewsContext';

const HeroSection = () => {
  const { mainStory, trendingNews, language } = useNews();

  if (!mainStory) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-12">
        
        {/* Main Story - Full Width Top */}
        <div className="w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-radiance-gold/10 rounded-lg">
              <Award className="text-radiance-gold" size={20} />
            </div>
            <h2 className="uppercase tracking-[0.3em] text-[10px] font-black text-slate-400">
              {language === 'hi' ? 'मुख्य समाचार' : 'Top Headline'}
            </h2>
          </div>
          <NewsCard {...mainStory} size="large" />
        </div>

        {/* Bottom Section - Trending */}
        <div className="w-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-radiance-gold/10 rounded-lg">
              <TrendingUp className="text-radiance-gold" size={20} />
            </div>
            <h2 className="uppercase tracking-[0.3em] text-[10px] font-black text-slate-400">
              {language === 'hi' ? 'अभी चर्चा में' : 'Trending Now'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-10">
            {trendingNews.map((news, index) => (
              <div key={news.id} className="group relative flex gap-4">
                <span className="text-4xl font-serif font-bold text-slate-200 dark:text-slate-800 transition-colors">
                  0{index + 1}
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-radiance-gold mb-1">
                    {news.category}
                  </span>
                  <h3 className="font-bold leading-tight text-black">
                    {news.title}
                  </h3>
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
