import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Infinity, Gem, Star, Music, Image } from 'lucide-react';
import TimeCounter from './components/TimeCounter';
import Promises from './components/Promises';
import Wishes from './components/Wishes';
import LoveQuotes from './components/LoveQuotes';
import MusicPlayer from './components/MusicPlayer';
import FloatingRoses from './components/FloatingRoses';
import coupleImg from './assets/couple.png';
export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [musicAutoPlay, setMusicAutoPlay] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
    setMusicAutoPlay(true);
    setTimeout(() => setShowContent(true), 800);
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans select-none">
      <FloatingRoses />

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-light via-cream to-rose-soft"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center px-6"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 mx-auto mb-8"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-deep to-rose-dark shadow-2xl flex items-center justify-center">
                  <Heart className="w-12 h-12 text-white fill-white" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-6xl font-serif text-rose-dark font-bold mb-4"
              >
                إلى فاطمة الزهراء
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg md:text-xl text-rose-pink font-light mb-2"
              >
                وعد عمر يبدأ من هنا
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-sm text-rose-pink/60 font-mono mb-10"
              >
                A promise of a lifetime starts here
              </motion.p>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleEnter}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-rose-deep to-rose-dark text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer font-medium tracking-wider"
              >
                <span className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Heart className="w-5 h-5" />
                  <span>افتح قلباً واعداً</span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {showContent && <MainContent />}
            <MusicPlayer isAutoPlay={musicAutoPlay} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MainContent() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16 space-y-12 md:space-y-20">
      {/* Hero Section */}
      <motion.div
        id="hero"
        data-section
        initial={{ opacity: 0, y: 40 }}
        animate={visibleSections.has('hero') ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center pt-16 md:pt-24"
      >
        <div className="inline-flex items-center justify-center space-x-2 rtl:space-x-reverse bg-white/60 backdrop-blur-md rounded-full px-5 py-2 shadow-sm mb-6">
          <Star className="w-4 h-4 text-gold" />
          <span className="text-xs font-mono text-rose-dark tracking-wider">03.03.2026</span>
          <Star className="w-4 h-4 text-gold" />
        </div>

        <h1 className="text-4xl md:text-7xl font-serif text-rose-dark font-bold mb-3">
          فاطمة الزهراء
        </h1>

        <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
          <Heart className="w-5 h-5 text-rose-deep animate-heartbeat" />
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        </div>

        <p className="text-lg md:text-2xl font-cursive text-rose-pink mb-2">
          My Beloved, My Promise, My Future
        </p>

        <p className="text-sm md:text-base text-rose-pink/70 max-w-lg mx-auto leading-relaxed">
          حبيبتي، منذ أن التقينا في الثالث من مارس، وكل يوم يمر يثبت أن القدر كان يرسم أجمل قصتنا
        </p>
      </motion.div>

      {/* Photo & Rose Frame */}
      <motion.div
        id="photo"
        data-section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={visibleSections.has('photo') ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="flex justify-center"
      >
        <div className="relative group">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-rose-deep via-rose-pink to-gold p-1 shadow-2xl">
            <div className="w-full h-full rounded-full bg-cream flex items-center justify-center overflow-hidden border-4 border-white">
              <div className="text-center p-6">
                <Image className="w-14 h-14 text-rose-pink mx-auto mb-3" />
                <p className="text-base text-rose-dark font-bold font-serif tracking-wide">فاطمة الزهراء</p>
                <p className="text-[11px] text-rose-pink/70 font-mono mt-1">My Beloved</p>
                <div className="mt-3 w-12 h-[2px] bg-gradient-to-r from-rose-deep to-rose-pink mx-auto rounded-full"></div>
                <p className="text-[9px] text-rose-pink/40 font-mono mt-3">ضع صورتكما في src/assets/couple.png</p>
              </div>
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 opacity-80 animate-float">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#e91e63" opacity="0.3"/>
              <path d="M12 6c-1.5 0-3 1.2-3 3 0 1.5 1.2 3 3 3 1.5 0 3-1.5 3-3 0-1.8-1.5-3-3-3z" fill="#e91e63"/>
            </svg>
          </div>
          <div className="absolute -bottom-1 -left-2 w-8 h-8 opacity-80 animate-float-delayed">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#f8bbd0" opacity="0.5"/>
              <path d="M12 6c-1.5 0-3 1.2-3 3 0 1.5 1.2 3 3 3 1.5 0 3-1.5 3-3 0-1.8-1.5-3-3-3z" fill="#f8bbd0"/>
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Time Counter */}
      <TimeCounter visibleSections={visibleSections} />

      {/* Promises */}
      <Promises visibleSections={visibleSections} />

      {/* Wishes */}
      <Wishes visibleSections={visibleSections} />

      {/* Love Quotes */}
      <LoveQuotes visibleSections={visibleSections} />

      {/* Footer */}
      <motion.div
        id="footer"
        data-section
        initial={{ opacity: 0 }}
        animate={visibleSections.has('footer') ? { opacity: 1 } : {}}
        className="text-center pb-16"
      >
        <div className="w-full max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-rose-pink to-transparent mb-8"></div>

        <div className="inline-flex items-center space-x-3 rtl:space-x-reverse bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm">
          <Infinity className="w-5 h-5 text-rose-deep" />
          <span className="text-sm font-mono text-rose-dark tracking-wider">
            To infinity and beyond
          </span>
          <Infinity className="w-5 h-5 text-rose-deep" />
        </div>

        <p className="text-xs text-rose-pink/50 font-mono mt-6 tracking-widest">
          MADE WITH LOVE &bull; 2026
        </p>
      </motion.div>
    </div>
  );
}
