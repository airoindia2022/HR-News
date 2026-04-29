import React, { useState } from 'react';
import Header from './Header';
import BreakingNewsTicker from './BreakingNewsTicker';
import HeroSection from './HeroSection';
import MainContent from './MainContent';
import SkeletonLoader from './SkeletonLoader';
import QuickReadModal from './QuickReadModal';
import { Sparkles } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const { isLoading } = useNews();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Hindustan Radiance | Today's Top Stories & AI News Analysis</title>
        <meta name="description" content="Stay ahead with Hindustan Radiance. Explore today's top stories, breaking news, and deep AI-powered insights into global events." />
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
                className="group relative overflow-hidden p-1 rounded-2xl bg-gradient-to-r from-radiance-gold via-yellow-200 to-radiance-gold cursor-pointer"
              >
                <div className="bg-white rounded-[14px] px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors group-hover:bg-transparent">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-radiance-gold/10 flex items-center justify-center text-radiance-gold shadow-inner">
                      <Sparkles size={32} />
                    </div>
                    <div>
                      <h3 id="ai-feature-heading" className="text-2xl font-sans font-bold text-midnight group-hover:text-slate-900 transition-colors">Experience AI Analysis</h3>
                      <p className="text-slate-500 group-hover:text-slate-800 transition-colors">Get instant summaries of today's most complex stories with our custom LLM integration.</p>
                    </div>
                  </div>
                  <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl transition-all hover:scale-105 active:scale-95">
                    Try QuickRead™
                  </button>
                </div>
              </div>
            </section>

            <MainContent />
          </>
        )}
      </main>

      <footer className="footer-section bg-parchment border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-3xl font-sans font-bold mb-6 text-midnight">
                HINDUSTAN <span className="text-radiance-gold">RADIANCE</span>
              </h2>
              <p className="max-w-sm text-slate-600 leading-relaxed text-sm">
                Leading the digital frontier of journalism. We provide deep insights, unbiased reports, and global perspectives to over 5 million readers monthly.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-radiance-gold">Navigation</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-600">
                <li className="hover:text-radiance-gold cursor-pointer transition-colors">Our Story</li>
                <li className="hover:text-radiance-gold cursor-pointer transition-colors">Editorial Board</li>
                <li className="hover:text-radiance-gold cursor-pointer transition-colors">Archive</li>
                <li className="hover:text-radiance-gold cursor-pointer transition-colors">Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-radiance-gold">Contact</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-600">
                <li>Press: <span className="text-slate-500">press@hradiance.com</span></li>
                <li>Support: <span className="text-slate-500">help@hradiance.com</span></li>
                <li>Twitter: <span className="text-slate-500">@HR_Radiance</span></li>
                <li>LinkedIn: <span className="text-slate-500">Hindustan Radiance</span></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <p>© 2026 Hindustan Radiance Media Group. All Rights Reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-radiance-gold cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-radiance-gold cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-radiance-gold cursor-pointer transition-colors">Cookie Policy</span>
            </div>
          </div>
        </div>
      </footer>

      <QuickReadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Home;
