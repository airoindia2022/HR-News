import React, { useState, useEffect } from 'react';
import { Cloud, Zap, Search, ShieldCheck, FileText } from 'lucide-react';
import { useNews } from '../context/NewsContext';

const Header = () => {
  const [date, setDate] = useState(new Date());
  const [weather, setWeather] = useState({ temp: '24', city: 'New Delhi', icon: 'Cloud' });
  const { epaperUrl } = useNews();

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
          // Note: Getting City Name usually requires a Reverse Geocoding API like OpenStreetMap
          // For now we keep the temperature dynamic
        },
        () => console.log("Location access denied")
      );
    }

    return () => clearInterval(timer);
  }, []);

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-50 w-full glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Left: Date & Weather */}
          <div className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <div className="flex flex-col">
              <span className="opacity-70">{formattedDate}</span>
              <div className="flex items-center space-x-2 text-radiance-gold">
                <Cloud size={16} />
                <span>{weather.temp}°C, {weather.city}</span>
              </div>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <div className="text-center group cursor-pointer">
              <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-tighter transition-all group-hover:tracking-normal">
                HINDUSTAN <span className="text-radiance-gold">RADIANCE</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 font-sans mt-1">
                Illuminating the Truth
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-6">
              {epaperUrl && (
                <a
                  href={epaperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-radiance-gold text-white text-xs font-bold rounded-full hover:bg-slate-900 transition-all shadow-md transform hover:-translate-y-0.5"
                >
                  <FileText size={14} />
                  E-PAPER
                </a>
              )}

              <div className="flex items-center px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold animate-pulse">
                <Zap size={14} className="mr-1 fill-current" />
                LIVE
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
      <nav className="border-t border-white/10 py-3 overflow-x-auto">
        <ul className="max-w-7xl mx-auto px-4 flex justify-between md:justify-center md:space-x-12 text-sm font-semibold uppercase tracking-widest whitespace-nowrap">
          {['World', 'Politics', 'Business', 'Technology', 'Sports', 'Culture', 'Features'].map((item) => (
            <li key={item} className="hover:text-radiance-gold transition-colors cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
