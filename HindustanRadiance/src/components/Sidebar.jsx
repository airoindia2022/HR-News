import React from 'react';
import { Mail, Send, Star } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import OwnerDetailsCard from './OwnerDetailsCard';

const Sidebar = () => {
  const { editorsChoice } = useNews();

  return (
    <aside className="sticky top-28 space-y-12">

      {/* Editor's Choice */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Star className="text-radiance-gold fill-radiance-gold" size={20} />
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#0F172A] dark:text-white">Editor's Choice</h3>
        </div>

        <div className="space-y-6">
          {editorsChoice.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <span className="text-[10px] text-radiance-gold font-bold uppercase tracking-widest mb-1 block">
                Feature
              </span>
              <h4 className="font-sans font-bold text-lg leading-tight text-[#0F172A] dark:text-white group-hover:text-radiance-gold transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{item.date} • 8 min read</p>
            </div>
          ))}
        </div>
      </div>

      {/* Company Editor Details */}
      <OwnerDetailsCard />

      <div className="p-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {['AI', 'Future', 'Politics', 'Design', 'Environment', 'Economy', 'Health'].map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-black dark:text-slate-200 rounded-full text-[10px] font-bold cursor-pointer hover:bg-radiance-gold hover:text-white transition-all transform hover:scale-105"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
