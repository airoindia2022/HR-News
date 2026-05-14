import React from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';

const Footer = () => {
  const { language } = useNews();

  return (
    <footer className="footer-section bg-parchment border-t border-slate-200 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-sans font-bold mb-6 text-midnight">
              HINDUSTAN <span className="text-radiance-gold">RADIANCE</span>
            </h2>
            <p className="max-w-sm text-slate-600 leading-relaxed text-sm">
              {language === 'hi' 
                ? 'पत्रकारिता के डिजिटल क्षेत्र में अग्रणी। हम हर महीने 5 मिलियन से अधिक पाठकों को गहरी अंतर्दृष्टि, निष्पक्ष रिपोर्ट और वैश्विक दृष्टिकोण प्रदान करते हैं।'
                : 'Leading the digital frontier of journalism. We provide deep insights, unbiased reports, and global perspectives to over 5 million readers monthly.'}
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-radiance-gold">
              {language === 'hi' ? 'नेविगेशन' : 'Navigation'}
            </h4>
            <ul className="space-y-4 text-sm font-medium text-slate-600">
              <li className="hover:text-radiance-gold cursor-pointer transition-colors">
                {language === 'hi' ? 'हमारी कहानी' : 'Our Story'}
              </li>
              <li className="hover:text-radiance-gold cursor-pointer transition-colors">
                {language === 'hi' ? 'संपादकीय बोर्ड' : 'Editorial Board'}
              </li>
              <li className="hover:text-radiance-gold cursor-pointer transition-colors">
                {language === 'hi' ? 'संग्रह' : 'Archive'}
              </li>
              <li className="hover:text-radiance-gold cursor-pointer transition-colors">
                <Link to="/careers">{language === 'hi' ? 'करियर' : 'Careers'}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-radiance-gold">
              {language === 'hi' ? 'संपर्क' : 'Contact'}
            </h4>
            <ul className="space-y-4 text-sm font-medium text-slate-600">
              <li>Editor: <span className="text-slate-500">editor@hindustanradiance.co.in</span></li>
              <li>Twitter: <span className="text-slate-500">@HR_Radiance</span></li>
              <li>LinkedIn: <span className="text-slate-500">Hindustan Radiance</span></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <p>© 2026 Hindustan Radiance Media Group. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="hover:text-radiance-gold cursor-pointer transition-colors">
              {language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
            </Link>
            <Link to="/terms-of-service" className="hover:text-radiance-gold cursor-pointer transition-colors">
              {language === 'hi' ? 'सेवा की शर्तें' : 'Terms of Service'}
            </Link>
            <Link to="/cookie-policy" className="hover:text-radiance-gold cursor-pointer transition-colors">
              {language === 'hi' ? 'कुकी नीति' : 'Cookie Policy'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
