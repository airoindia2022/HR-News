import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowUpRight, X, Calendar, User } from 'lucide-react';
import { useNews } from '../context/NewsContext';

const NewsCard = ({ id, image, video, category, title, excerpt, content, author, date, link, size = "default" }) => {
  const { language } = useNews();
  const [translatedContent, setTranslatedContent] = useState('');
  const [isTranslatingContent, setIsTranslatingContent] = useState(false);
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isExternal = link && (link.startsWith('http://') || link.startsWith('https://')) && !link.includes('/api/news/image') && !link.includes('/api/news/video');
  const hasContent = content && content.trim().length > 0;

  useEffect(() => {
    if (isModalOpen && language === 'hi' && content && !translatedContent) {
      setIsTranslatingContent(true);
      
      const translateArticle = async () => {
        try {
          const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(content)}`);
          const data = await response.json();
          const translatedText = data[0].map(item => item[0]).join('');
          setTranslatedContent(translatedText);
        } catch (error) {
          console.error("Error translating full story content:", error);
          setTranslatedContent(content);
        } finally {
          setIsTranslatingContent(false);
        }
      };
      
      translateArticle();
    }
  }, [isModalOpen, language, content, translatedContent]);

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
            href={isExternal ? link : '#'} 
            target={isExternal ? "_blank" : undefined} 
            rel={isExternal ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              if (!isExternal) {
                e.preventDefault();
                if (hasContent) {
                  setIsModalOpen(true);
                }
              }
            }}
            className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${
              size === "large" ? "text-white" : "text-midnight dark:text-white"
            } ${
              !isExternal && !hasContent 
                ? "opacity-30 cursor-default pointer-events-none" 
                : "group-hover:text-radiance-gold transition-all transform hover:translate-x-2 cursor-pointer"
            }`}
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

      {/* Full Article Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content Drawer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 z-10 flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full text-slate-500 dark:text-slate-400 transition-colors z-20"
              >
                <X size={20} />
              </button>

              {/* Content Container */}
              <div className="p-8 md:p-10 text-left">
                {/* Category */}
                <span className="px-3 py-1 bg-radiance-gold/10 text-radiance-gold text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                  {category || "Global"}
                </span>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-sans font-extrabold leading-tight text-midnight dark:text-white mt-4 mb-4">
                  {title}
                </h2>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-radiance-gold" /> {date || "TODAY"}</span>
                  <span className="flex items-center gap-1.5"><User size={14} className="text-radiance-gold" /> {author || "NEWS DESK"}</span>
                </div>

                {/* Media Container */}
                <div className="w-full rounded-2xl overflow-hidden mb-6 bg-slate-50 border border-slate-100 dark:border-slate-800 max-h-[350px] relative">
                  {embedUrl ? (
                    <div className="aspect-video w-full">
                      <iframe
                        src={embedUrl}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={title}
                      />
                    </div>
                  ) : isDirectVideo ? (
                    <video
                      className="w-full object-cover max-h-[350px]"
                      controls
                      preload="metadata"
                      playsInline
                      crossOrigin="anonymous"
                      poster={image}
                    >
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover max-h-[350px]"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800";
                        e.target.onerror = null;
                      }}
                    />
                  )}
                </div>

                {/* Main content body */}
                <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                  {language === 'hi' ? (
                    isTranslatingContent ? (
                      <div className="flex flex-col items-center gap-3 py-8">
                        <div className="w-8 h-8 rounded-full border-4 border-radiance-gold/20 border-t-radiance-gold animate-spin" />
                        <span className="text-xs font-bold text-slate-400 animate-pulse uppercase tracking-wider">
                          अनुवाद किया जा रहा है...
                        </span>
                      </div>
                    ) : (
                      translatedContent || content
                    )
                  ) : (
                    content
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


export default NewsCard;
