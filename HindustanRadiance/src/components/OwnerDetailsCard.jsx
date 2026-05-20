import React from 'react';
import { User, Printer, MapPin, Phone, ShieldCheck, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNews } from '../context/NewsContext';

/**
 * OwnerDetailsCard Component
 * Displays official publishing credentials, registration numbers, 
 * contact details, and office addresses for the newspaper (Hindustan Radiance)
 * in accordance with Indian press registry standards.
 */
const OwnerDetailsCard = () => {
  // Hook to consume language state (English/Hindi) from NewsContext
  const { language } = useNews();

  // Bilingual translation text map for all labels in the legal info card
  const content = language === 'hi' ? {
    subTitle: 'हिन्दी-अंग्रेजी द्विभाषी साप्ताहिक', // Hindi-English Bilingual Weekly
    ownerLabel: 'स्वामी, प्रकाशक और मुद्रक',        // Owner, Publisher & Printer
    locationLabel: 'प्रकाशन कार्यालय',            // Publication Office
    editorLabel: 'संपादक',                       // Editor
    contactLabel: 'संपर्क',                       // Contact
    rniLabel: 'आर.एन.आई. संख्या',                  // R.N.I. Number (Registrar of Newspapers for India)
    jurisdiction: '* सभी कानूनी विवाद लखनऊ क्षेत्राधिकार के अधीन हैं।' // Court jurisdiction
  } : {
    subTitle: 'Hindi-English Bilingual Weekly',
    ownerLabel: 'Owner, Publisher & Printer',
    locationLabel: 'Publication Office',
    editorLabel: 'Editor',
    contactLabel: 'Contact',
    rniLabel: 'R.N.I. Number',
    jurisdiction: '* All legal disputes are subject to Lucknow Jurisdiction.'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-23 relative overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none font-sans"
    >
      {/* Header decorative color bar with blue-to-purple gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

      <div className="p-6 space-y-6">
        {/* Title Section: Publication Name and Bilingual Subtitle */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            HINDUSTAN RADIANCE
          </h2>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            {content.subTitle}
          </p>
        </div>

        {/* Info Grid: Key contact & registry information */}
        <div className="space-y-4">
          
          {/* Owner/Publisher/Printer Details */}
          <div className="flex gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Printer size={20} />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {content.ownerLabel}
              </p>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
               Dr. YAZDANI HASAN
              </p>
            </div>
          </div>

          {/* Physical Address details for Publication Office */}
          <div className="flex gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <MapPin size={20} />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {content.locationLabel}
              </p>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Excel on Printing Press, 102/52/1 Baisi ki Masjid, Nawab Kazjan ka Hata, Napendra Sanyal Road, 23 B New Friends Colony Sector-6, Near DPS School, Janakipuram Extension, Lucknow, U.P. India - 206031
              </p>
            </div>
          </div>

          {/* Editor and Phone Contact Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Editor Detail */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <User size={14} className="text-emerald-600" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {content.editorLabel}
                </p>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
               Dr. YAZDANI HASAN
              </p>
            </div>
            
            {/* Contact Phone Detail */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={14} className="text-orange-600" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {content.contactLabel}
                </p>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                +91 9956326510
              </p>
            </div>
          </div>
        </div>

        {/* Official Registration - Registrar of Newspapers for India (R.N.I.) Number */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{content.rniLabel}</span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400">UPBIL/2016/68873</span>
        </div>

        {/* Legal jurisdiction footnote */}
        <div className="pt-2 text-center">
          <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">
            {content.jurisdiction}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OwnerDetailsCard;
