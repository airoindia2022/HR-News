import React, { useState, useEffect } from 'react';
import { Cloud, Zap, Search, ShieldCheck, FileText } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EPaperModal from './EPaperModal';

const Header = () => {
  const [date, setDate] = useState(new Date());
  const [weather, setWeather] = useState({ temp: '24', city: 'New Delhi', icon: 'Cloud' });
  const { epapers, language, toggleLanguage, selectedCategory, setSelectedCategory } = useNews();
  const [isEpaperModalOpen, setIsEpaperModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const categoryMap = {
    'world': 'World',
    'politics': 'Politics',
    'business': 'Business',
    'technology': 'Technology',
    'sports': 'Sports',
    // 'culture': 'Culture',
    'विश्व': 'World',
    'राजनीति': 'Politics',
    'व्यापार': 'Business',
    'तकनीक': 'Technology',
    'खेल': 'Sports',
    // 'संस्कृति': 'Culture',
  };

  const getEnglishCategoryName = (item) => {
    return categoryMap[item.toLowerCase()] || item;
  };

  const handleCategoryClick = (item) => {
    const englishCategory = getEnglishCategoryName(item);
    setSelectedCategory(englishCategory);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    
    // Fetch Real Weather
    const fetchWeather = async (lat, lon) => {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await res.json();
        setWeather(prev => ({ ...prev, temp: Math.round(data.current_weather.temperature) }));
      } catch (e) {
        console.error("Weather fetch failed");
      }
    };

    // Get User Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => console.log("Location access denied")
      );
    }

    return () => clearInterval(timer);
  }, []);

  const formattedDate = date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const navItems = language === 'hi' 
    ? ['विश्व', 'राजनीति', 'व्यापार', 'तकनीक', 'खेल','करियर']
    : ['World', 'Politics', 'Business', 'Technology', 'Sports','Careers'];

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center h-auto lg:h-20 py-4 lg:py-0 gap-4 lg:gap-0">

          {/* Left: Date & Weather */}
          <div className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <div className="flex flex-col">
              <span className="opacity-70 font-bold tracking-tight">{formattedDate}</span>
              <div className="flex items-center space-x-2 text-radiance-gold">
                <Cloud size={16} />
                <span className="font-bold">{weather.temp}°C, {language === 'hi' ? 'नई दिल्ली' : 'New Delhi'}</span>
              </div>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center w-full">
            <Link to="/" className="text-center group cursor-pointer" onClick={() => setSelectedCategory('All')}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-black tracking-tighter transition-all group-hover:tracking-normal whitespace-nowrap">
                HINDUSTAN <span className="text-radiance-gold">RADIANCE</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 font-black mt-1">
                {language === 'hi' ? 'सत्य का प्रकाश' : 'Illuminating the Truth'}
              </p>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col items-center lg:items-end space-y-3 lg:space-y-2 w-full lg:w-auto">
            <div className="flex items-center justify-center lg:justify-end space-x-3 sm:space-x-4 w-full">
              
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-lg hover:bg-radiance-gold transition-all shadow-md uppercase tracking-widest border border-slate-800"
              >
                {language === 'en' ? 'हिन्दी' : 'ENG'}
              </button>

              {epapers && epapers.length > 0 && (
                <button
                  onClick={() => setIsEpaperModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-radiance-gold text-white text-[10px] font-black rounded-full hover:bg-slate-900 transition-all shadow-md transform hover:-translate-y-0.5"
                >
                  <FileText size={14} />
                  {language === 'hi' ? 'ई-पेपर' : 'E-PAPER'}
                </button>
              )}

              <div className="flex items-center px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 text-[10px] font-black animate-pulse border border-red-500/20">
                <Zap size={14} className="mr-1 fill-current" />
                {language === 'hi' ? 'लाइव' : 'LIVE'}
              </div>

              <button
                className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Search"
              >
                <Search size={20} className="text-slate-700" />
              </button>
            </div>

            {/* RNI Pill */}
            <div className="hidden sm:flex items-center gap-3 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 shadow-lg">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase">R.N.I. No.</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-500 tracking-tight">UPBIL/2016/68873</span>
            </div>
            
          </div>
        </div>
      </div>

      {/* Search/Nav placeholder */}
      <nav className="border-t border-slate-100 py-3 overflow-x-auto scrollbar-hide">
        <ul className="max-w-7xl mx-auto px-4 flex justify-start md:justify-center space-x-6 md:space-x-12 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
          {navItems.map((item) => {
            const isCareers = item === 'Careers' || item === 'करियर';
            const englishName = getEnglishCategoryName(item);
            const isActive = !isCareers && selectedCategory.toLowerCase() === englishName.toLowerCase() && location.pathname === '/';
            
            return (
              <li 
                key={item} 
                onClick={() => !isCareers && handleCategoryClick(item)}
                className={`transition-all duration-300 cursor-pointer text-[10px] font-black uppercase tracking-[0.2em] ${
                  isActive 
                    ? 'text-radiance-gold border-b-2 border-radiance-gold pb-1 scale-105' 
                    : 'text-slate-500 hover:text-radiance-gold'
                }`}
              >
                {isCareers ? (
                  <Link to="/careers">{item}</Link>
                ) : (
                  item
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      </header>
      <EPaperModal
        isOpen={isEpaperModalOpen}
        onClose={() => setIsEpaperModalOpen(false)}
        epapers={epapers || []}
        language={language}
      />
    </>
  );
};

export default Header;
