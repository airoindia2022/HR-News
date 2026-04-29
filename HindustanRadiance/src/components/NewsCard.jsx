import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';

const NewsCard = ({ image, category, title, excerpt, author, date, link, size = "default" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`group relative rounded-xl overflow-hidden shadow-sm border transition-all duration-300 ${
        size === "large" 
          ? "md:flex p-2 bg-[#0F172A] border-slate-800 shadow-xl" 
          : "flex flex-col bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-xl"
      }`}
    >
      {/* Image Container */}
      <div className={`overflow-hidden relative ${size === "large" ? "md:w-3/5 h-64 md:h-72" : "h-48"}`}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800";
            e.target.onerror = null; // Prevent infinite loop
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Category Tag */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-radiance-gold text-white text-[10px] font-bold uppercase tracking-widest rounded-full radiance-glow">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 ${size === "large" ? "p-6 md:p-8" : "p-4"}`}>
        <div className="flex items-center text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-2 gap-4">
          <span className="flex items-center gap-1"><Clock size={12} /> {date}</span>
          <span className="text-radiance-gold">{author}</span>
        </div>

        <h3 className={`${size === "large" ? "text-xl md:text-2xl text-radiance-gold" : "text-lg text-[#0F172A] dark:text-white"} font-sans font-bold leading-tight mb-3 group-hover:text-radiance-gold/80 transition-colors`}>
          {title}
        </h3>

        <p className={`${size === "large" ? "text-slate-300" : "text-slate-600 dark:text-slate-300"} text-sm mb-6`}>
          {excerpt}
        </p>

        <div className={`mt-auto pt-4 border-t ${size === "large" ? "border-slate-800" : "border-slate-100 dark:border-slate-700"} flex justify-between items-center`}>
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${size === "large" ? "text-white" : "text-[#0F172A] dark:text-white"} group-hover:text-radiance-gold transition-all transform hover:translate-x-1`}
          >
            Read Full Story <ArrowUpRight size={16} />
          </a>

          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`w-6 h-6 rounded-full border-2 ${size === "large" ? "border-slate-900" : "border-white dark:border-slate-800"} bg-slate-200`} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
