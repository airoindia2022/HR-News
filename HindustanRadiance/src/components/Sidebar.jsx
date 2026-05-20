import React from 'react';
import { Mail, Send, Star } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import OwnerDetailsCard from './OwnerDetailsCard';

const Sidebar = () => {
  const { editorsChoice, language } = useNews();

  const tags = language === 'hi'
    ? ['एआई', 'भविष्य', 'राजनीति', 'डिजाइन', 'पर्यावरण', 'अर्थव्यवस्था', 'स्वास्थ्य']
    : ['AI', 'Future', 'Politics', 'Design', 'Environment', 'Economy', 'Health'];

  return (
    <aside className="sticky top-28 space-y-12">
      {/* ... (commented out Editor's Choice) */}

      {/* Company Editor Details */}
      {/* <OwnerDetailsCard /> */}

      {/* Commented out Popular Tags section
      <div className="p-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-midnight mb-6">
          {language === 'hi' ? 'लोकप्रिय टैग' : 'Popular Tags'}
        </h3>
        <div className="flex flex-wrap gap-3">
          {tags.map(tag => (
            <span 
              key={tag} 
              className="px-4 py-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-full text-[10px] font-black cursor-pointer hover:bg-radiance-gold hover:text-white hover:border-radiance-gold transition-all transform hover:scale-105 shadow-sm uppercase tracking-widest"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      */}
    </aside>
  );
};

export default Sidebar;
