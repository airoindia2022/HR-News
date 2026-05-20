import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, FileText, ExternalLink } from 'lucide-react';

const EPaperModal = ({ isOpen, onClose, epapers, language }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-3xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl border border-slate-100 z-10"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <FileText className="text-radiance-gold" size={20} />
                  {language === 'hi' ? 'ई-पेपर आर्काइव' : 'E-Paper Archive'}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                  {language === 'hi' ? 'तारीख के अनुसार पिछले संस्करण' : 'Browse past editions by date'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Scrollable List */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-3 min-h-[300px]">
              {epapers.length === 0 ? (
                <div className="text-center py-12 text-slate-400 font-medium text-sm">
                  {language === 'hi' ? 'कोई ई-पेपर उपलब्ध नहीं है' : 'No E-papers available'}
                </div>
              ) : (
                epapers.map((paper) => {
                  const paperDate = new Date(paper.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });

                  return (
                    <a
                      key={paper._id}
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-radiance-gold transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-radiance-gold/10 text-radiance-gold rounded-xl group-hover:bg-radiance-gold group-hover:text-white transition-colors duration-300">
                          <Calendar size={20} />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-sm text-slate-800 group-hover:text-radiance-gold transition-colors duration-300 line-clamp-1">
                            {paper.title}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                            {paperDate}
                          </p>
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-slate-300 group-hover:text-radiance-gold transition-colors duration-300" />
                    </a>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EPaperModal;
