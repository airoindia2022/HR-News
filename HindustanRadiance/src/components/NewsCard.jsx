import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';

const NewsCard = ({ image, video, category, title, excerpt, author, date, link, size = "default" }) => {
  const getVideoEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.split('v=')[1] || url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId.split('&')[0]}`;
    }
    return null;
  };

  const embedUrl = getVideoEmbedUrl(video);
  const isDirectVideo = video && !embedUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`group relative rounded-2xl overflow-hidden shadow-sm border transition-all duration-500 ${
        size === "large" 
          ? "md:flex p-3 bg-midnight border-slate-800 shadow-2xl" 
          : "flex flex-col bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:shadow-2xl"
      }`}
    >
      {/* Media Container */}
      <div className={`overflow-hidden relative ${size === "large" ? "md:w-3/5 h-[300px] md:h-[400px] rounded-xl" : "h-64"}`}>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        ) : isDirectVideo ? (
          <video
            className="w-full h-full object-cover"
            controls
            preload="metadata"
            playsInline
            crossOrigin="anonymous"
            poster={image}
            controlsList="nodownload nopictureinpicture"
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800";
              e.target.onerror = null;
            }}
          />
        )}

        {/* Overlay - Only for non-video or when hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10" />

        {/* Category Tag */}
        <div className="absolute top-6 left-6 pointer-events-none">
          <span className="px-4 py-1.5 bg-radiance-gold text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full radiance-glow shadow-lg">
            {category || "Global"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 ${size === "large" ? "p-8 md:p-12 justify-center" : "p-6"}`}>
        <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] mb-4 gap-4">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock size={12} className="text-radiance-gold" /> 
            <span>{size === "large" ? "LIVE" : date || "TODAY"}</span>
          </div>
          <span className="text-radiance-gold">{author || "NEWS DESK"}</span>
        </div>

        <h3 className={`${size === "large" ? "text-2xl md:text-4xl text-radiance-gold mb-6" : "text-xl text-midnight dark:text-white mb-4"} font-sans font-bold leading-[1.1] group-hover:text-radiance-gold/90 transition-colors`}>
          {title}
        </h3>

        <p className={`${size === "large" ? "text-slate-300 text-base" : "text-slate-500 dark:text-slate-400 text-sm"} font-medium leading-relaxed mb-8 line-clamp-4`}>
          {excerpt}
        </p>

        <div className={`mt-auto pt-6 border-t ${size === "large" ? "border-slate-800" : "border-slate-100 dark:border-slate-800"} flex justify-between items-center`}>
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${size === "large" ? "text-white" : "text-midnight dark:text-white"} group-hover:text-radiance-gold transition-all transform hover:translate-x-2`}
          >
            Read Full Story <ArrowUpRight size={16} />
          </a>

          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`w-7 h-7 rounded-full border-2 ${size === "large" ? "border-midnight shadow-lg" : "border-white dark:border-midnight"} bg-slate-200 overflow-hidden`} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};


export default NewsCard;
