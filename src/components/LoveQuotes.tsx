import { motion } from 'motion/react';
import { Quote, Heart } from 'lucide-react';

interface Props {
  visibleSections: Set<string>;
}

const quotes = [
  { ar: 'الحب الحقيقي لا ينتهي بكلمة، بل يستمر بصمت، في عينين لا تنسى، وقلب لا يتعب', en: 'True love never ends with a word, it continues in silence, in eyes that never forget, and a heart that never tires' },
  { ar: 'أنتِ النبض الذي يوقظ قلبي كل صباح، والسلام الذي يسكن روحي كل مساء', en: 'You are the pulse that wakes my heart every morning, and the peace that fills my soul every evening' },
  { ar: 'قبل أن أعرفك، كنت أظن أنني أعرف معنى الحياة. الآن أعرف أن الحياة تبدأ بك', en: 'Before I knew you, I thought I knew the meaning of life. Now I know that life begins with you' },
  { ar: 'كل يوم بجانبك هو هدية، وكل لحظة معك هي ثروة لا تقدر بثمن', en: 'Every day by your side is a gift, and every moment with you is a priceless treasure' },
  { ar: 'في عالم مليء بالملايين، اختار قلبي أنتِ. كل مرة. كل يوم. إلى الأبد', en: 'In a world of millions, my heart chose you. Every time. Every day. Forever' },
  { ar: 'ليس لأنكِ جميلة فحسب، بل لأن روحكِ تضيء كل غرفة تدخلينها', en: 'Not only because you are beautiful, but because your soul lights up every room you enter' },
  { ar: 'معكِ، تعلمت أن الحب ليس مجرد شعور، بل اختيار يومي أن أكون أفضل لأجلك', en: 'With you, I learned that love is not just a feeling, but a daily choice to be better for you' },
  { ar: 'أنتِ قدري، وأنتي حلمي، وأنتي مستقبلي الذي أرسمه كل يوم بحب', en: 'You are my destiny, my dream, and my future that I paint every day with love' },
];

export default function LoveQuotes({ visibleSections }: Props) {
  return (
    <motion.div
      id="quotes"
      data-section
      initial={{ opacity: 0, y: 40 }}
      animate={visibleSections.has('quotes') ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-rose-pink/10 p-6 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center space-x-2 rtl:space-x-reverse bg-rose-pink/10 rounded-full px-4 py-1.5 mb-3">
            <Quote className="w-4 h-4 text-rose-deep" />
            <span className="text-xs font-mono text-rose-dark tracking-wider">LOVE WORDS</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-rose-dark font-bold mb-2">كلمات من القلب</h2>
          <p className="text-sm text-rose-pink/60 font-mono">Words from the heart</p>
        </div>

        <div className="space-y-4">
          {quotes.map((quote, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-gradient-to-r from-cream via-white to-cream rounded-2xl p-4 md:p-5 border border-rose-pink/10 hover:border-rose-pink/20 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-rose-pink/10 flex items-center justify-center group-hover:bg-rose-pink/20 transition-colors">
                    <Heart className="w-4 h-4 text-rose-deep" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm md:text-base text-charcoal leading-relaxed font-medium mb-1">
                    {quote.ar}
                  </p>
                  <p className="text-xs md:text-sm text-rose-pink/60 italic font-serif">
                    {quote.en}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
