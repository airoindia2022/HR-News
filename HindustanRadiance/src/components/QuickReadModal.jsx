import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, BookOpen, Clock, FileText } from 'lucide-react';

const QuickReadModal = ({ isOpen, onClose, content }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-slate-900 z-[70] shadow-2xl overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2 px-3 py-1 bg-radiance-gold/20 text-radiance-gold rounded-full text-xs font-bold uppercase tracking-widest">
                  <Sparkles size={14} /> AI Quick Summary
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl font-sans font-bold leading-tight mb-4">
                  {content?.title || "Quantum Computing Milestones"}
                </h2>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Clock size={14} /> 2 MIN READ</span>
                  <span className="flex items-center gap-1"><BookOpen size={14} /> 450 WORDS</span>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-l-4 border-radiance-gold">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <FileText size={18} className="text-radiance-gold" /> Key Takeaways
                  </h3>
                  <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                    <li className="flex gap-2">
                      <span className="text-radiance-gold font-bold">•</span>
                      <span>Breakthrough in quantum link stability across 2000+ kilometers.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-radiance-gold font-bold">•</span>
                      <span>New error-correction protocols reduce data loss by 40%.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-radiance-gold font-bold">•</span>
                      <span>Commercial applications expected within the next 3 to 5 years.</span>
                    </li>
                  </ul>
                </div>

                <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p>
                    The research, led by Dr. Elena Vance, utilized a revolutionary "entanglement swapping" technique that preserves quantum states through standard fiber-optic cables. This solves the primary bottleneck in quantum networks: distance limitation.
                  </p>
                  <p>
                    Industry experts suggest this could fundamentally change how sensitive financial and military data is transmitted globally, providing "unbreakable" security layers.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:scale-[1.02] transition-transform">
                  Read Full Article
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickReadModal;
