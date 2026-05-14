import React, { useState } from 'react';
import Header from './Header';
import BreakingNewsTicker from './BreakingNewsTicker';
import HeroSection from './HeroSection';
import MainContent from './MainContent';
import SkeletonLoader from './SkeletonLoader';
import QuickReadModal from './QuickReadModal';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNews } from '../context/NewsContext';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Home = () => {
  const { isLoading, language, isTranslating } = useNews();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>{language === 'hi' ? 'हिंदुस्तान रेडिएंस | आज की मुख्य खबरें और एआई समाचार विश्लेषण' : 'Hindustan Radiance | Today\'s Top Stories & AI News Analysis'}</title>
        <meta name="description" content={language === 'hi' ? 'हिंदुस्तान रेडिएंस के साथ आगे रहें। आज की मुख्य खबरें, ब्रेकिंग न्यूज और वैश्विक घटनाओं में एआई-संचालित अंतर्दृष्टि का पता लगाएं।' : 'Stay ahead with Hindustan Radiance. Explore today\'s top stories, breaking news, and deep AI-powered insights into global events.'} />
        <link rel="canonical" href="https://hindustanradiance.co.in/" />
      </Helmet>

      <Header />
      <BreakingNewsTicker />
      
      <main className="pb-20">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            <HeroSection />
            
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10" aria-labelledby="ai-feature-heading">
              <div 
                onClick={() => setIsModalOpen(true)}
                className="group relative overflow-hidden p-1 rounded-2xl bg-gradient-to-r from-radiance-gold via-yellow-200 to-radiance-gold cursor-pointer shadow-xl shadow-radiance-gold/10"
              >
                <div className="bg-white rounded-[14px] px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors group-hover:bg-transparent">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-radiance-gold/10 flex items-center justify-center text-radiance-gold shadow-inner">
                      <Sparkles size={40} />
                    </div>
                    <div>
                      <h3 id="ai-feature-heading" className="text-2xl font-sans font-black text-midnight group-hover:text-slate-900 transition-colors">
                        {language === 'hi' ? 'एआई विश्लेषण का अनुभव करें' : 'Experience AI Analysis'}
                      </h3>
                      <p className="text-slate-500 font-medium group-hover:text-slate-800 transition-colors mt-1">
                        {language === 'hi' ? 'हमारे कस्टम एलएलएम एकीकरण के साथ आज की सबसे जटिल कहानियों का त्वरित सारांश प्राप्त करें।' : 'Get instant summaries of today\'s most complex stories with our custom LLM integration.'}
                      </p>
                    </div>
                  </div>
                  <button className="px-10 py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-all hover:scale-105 active:scale-95 group-hover:bg-white group-hover:text-midnight">
                    {language === 'hi' ? 'क्विकरीड™ आज़माएं' : 'Try QuickRead™'}
                  </button>
                </div>
              </div>
            </section>

            <MainContent />
          </>
        )}
      </main>

      <Footer />


      <QuickReadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Translation Overlay */}
      <AnimatePresence>
        {isTranslating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-md dark:bg-slate-900/60"
          >
            <div className="flex flex-col items-center gap-6 p-12 rounded-3xl bg-white dark:bg-slate-800 shadow-2xl border border-radiance-gold/20">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-radiance-gold/20 border-t-radiance-gold animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-radiance-gold">
                  <Sparkles size={32} className="animate-pulse" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-black text-midnight dark:text-white mb-2 uppercase tracking-tighter">
                  {language === 'hi' ? 'हिंदी में परिवर्तित कर रहे हैं' : 'Translating to English'}
                </h3>
                <p className="text-slate-500 font-medium animate-pulse">
                  {language === 'hi' ? 'कृपया प्रतीक्षा करें, हम समाचार का अनुवाद कर रहे हैं...' : 'Please wait, we are translating the news...'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
