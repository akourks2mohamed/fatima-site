import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, Sparkles, Gem } from 'lucide-react';

interface Props {
  visibleSections: Set<string>;
}

const wishes = [
  { text: 'أن نجعل من كل يوم نعيشه معاً ذكرى لا تنسى', en: 'That we make every day we spend together an unforgettable memory' },
  { text: 'أن نبني بيتاً مليئاً بالحب والاحترام والطمأنينة', en: 'That we build a home filled with love, respect, and peace' },
  { text: 'أن نرزق بذرية صالحة تقرّ أعيننا وتكون امتداداً لحبنا', en: 'That we are blessed with righteous children who are the extension of our love' },
  { text: 'أن نسافر معاً ونكتشف العالم جنباً إلى جنب', en: 'That we travel together and discover the world side by side' },
  { text: 'أن نكبر معاً، نشيب معاً، ونبقى في حب بعضنا حتى آخر يوم', en: 'That we grow old together and stay in love until our last day' },
  { text: 'أن نكون لبعضنا السند في الدنيا والرفيق في الجنة', en: 'That we are each others support in this life and companions in paradise' },
];

export default function Wishes({ visibleSections }: Props) {
  const [currentWish, setCurrentWish] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWish((prev) => (prev + 1) % wishes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      id="wishes"
      data-section
      initial={{ opacity: 0, y: 40 }}
      animate={visibleSections.has('wishes') ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-lg border border-rose-pink/10 p-6 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#e91e63_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center space-x-2 rtl:space-x-reverse bg-rose-pink/10 rounded-full px-4 py-1.5 mb-3">
            <Gem className="w-4 h-4 text-rose-deep" />
            <span className="text-xs font-mono text-rose-dark tracking-wider">WISHES</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-rose-dark font-bold mb-2">أمنيات للحياة</h2>
          <p className="text-sm text-rose-pink/60 font-mono">Wishes for our life together</p>
        </div>

        <div className="relative h-40 flex items-center justify-center max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWish}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="absolute w-full px-4 text-center"
            >
              <div className="flex items-start justify-center space-x-2 rtl:space-x-reverse">
                <Sparkles className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="text-base md:text-lg text-charcoal leading-relaxed font-medium">
                    {wishes[currentWish].text}
                  </p>
                  <p className="text-sm text-rose-pink/60 mt-2 italic font-serif">
                    {wishes[currentWish].en}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mt-4">
          {wishes.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentWish(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentWish ? 'bg-rose-deep w-5' : 'bg-rose-pink/30 hover:bg-rose-pink/50'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
