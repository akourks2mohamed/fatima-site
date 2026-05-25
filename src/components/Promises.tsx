import { motion } from 'motion/react';
import { Heart, Diamond, Shield, Sun, Moon, Star, Feather, Infinity } from 'lucide-react';

interface Props {
  visibleSections: Set<string>;
}

const promises = [
  { icon: Heart, text: 'أعدك أن أكون سنداً لك في كل خطوة، رفيقاً في الفرح والحزن، ونصفاً مكملاً لحياتك', en: 'I promise to be your support in every step, your companion in joy and sorrow' },
  { icon: Diamond, text: 'أعدك أن أطلب يدكِ أمام الله وأهلكِ وأكون لكِ زوجاً صالحاً وفياً', en: 'I promise to ask for your hand before God and your family, to be a faithful husband' },
  { icon: Shield, text: 'أعدك أن أحميكِ وأحتضن أحلامكِ وأسعى لتحقيق كل ما تتمني', en: 'I promise to protect you, embrace your dreams, and fulfill your wishes' },
  { icon: Sun, text: 'أعدك أن أضيء أيامكِ بالحب والاحترام والاهتمام', en: 'I promise to brighten your days with love, respect, and care' },
  { icon: Moon, text: 'أعدك أن أكون معكِ في كل ليلة، نحكي ونضحك ونخطط لمستقبلنا', en: 'I promise to be with you every night, talking, laughing, and planning our future' },
  { icon: Star, text: 'أعدك أن نجعل من حياتنا قصة حب خالدة يرويها الأجيال', en: 'I promise to make our life an eternal love story' },
  { icon: Feather, text: 'أعدك أن أكون لطيفاً معكِ، صبوراً على أخطائكِ كما ستغفرين لي', en: 'I promise to be gentle with you, patient, as you will forgive me' },
  { icon: Infinity, text: 'أعدك أن حبي لكِ سيبقى للأبد، لا ينتهي ولا يتغير', en: 'I promise my love for you will last forever, never ending, never changing' },
];

export default function Promises({ visibleSections }: Props) {
  return (
    <motion.div
      id="promises"
      data-section
      initial={{ opacity: 0, y: 40 }}
      animate={visibleSections.has('promises') ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-lg border border-rose-pink/10 p-6 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center space-x-2 rtl:space-x-reverse bg-rose-pink/10 rounded-full px-4 py-1.5 mb-3">
            <Diamond className="w-4 h-4 text-rose-deep" />
            <span className="text-xs font-mono text-rose-dark tracking-wider">PROMISES</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-rose-dark font-bold mb-2">وعود للعمر</h2>
          <p className="text-sm text-rose-pink/60 font-mono">A lifetime of promises to you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {promises.map((promise, i) => {
            const Icon = promise.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-rose-pink/10 hover:border-rose-pink/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-deep to-rose-pink flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm md:text-base text-charcoal leading-relaxed font-medium">
                      {promise.text}
                    </p>
                    <p className="text-xs text-rose-pink/50 mt-1 italic font-serif">
                      {promise.en}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
