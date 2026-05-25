import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, Clock, Gift, Heart } from 'lucide-react';

interface Props {
  visibleSections: Set<string>;
}

export default function TimeCounter({ visibleSections }: Props) {
  const [timeSinceMeeting, setTimeSinceMeeting] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });

  const meetingDate = new Date('2026-03-03T00:00:00');
  const birthDate = new Date('2008-10-18T00:00:00');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - meetingDate.getTime();
      if (diff > 0) {
        setTimeSinceMeeting({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }

      const ageDiff = now.getTime() - birthDate.getTime();
      if (ageDiff > 0) {
        const ageDate = new Date(ageDiff);
        setAge({
          years: Math.abs(ageDate.getUTCFullYear() - 1970),
          months: ageDate.getUTCMonth(),
          days: ageDate.getUTCDate() - 1,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      id="time"
      data-section
      initial={{ opacity: 0, y: 40 }}
      animate={visibleSections.has('time') ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-rose-pink/10 p-6 md:p-8">
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-6">
          <Clock className="w-5 h-5 text-rose-deep" />
          <h2 className="text-lg md:text-xl font-serif text-rose-dark font-semibold">رحلتنا معاً</h2>
          <Clock className="w-5 h-5 text-rose-deep" />
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto mb-8">
          {[
            { value: timeSinceMeeting.days, label: 'يوم' },
            { value: String(timeSinceMeeting.hours).padStart(2, '0'), label: 'ساعة' },
            { value: String(timeSinceMeeting.minutes).padStart(2, '0'), label: 'دقيقة' },
            { value: String(timeSinceMeeting.seconds).padStart(2, '0'), label: 'ثانية' },
          ].map((item, i) => (
            <div key={i} className="bg-gradient-to-b from-cream to-white rounded-2xl p-3 md:p-4 border border-rose-pink/10 text-center">
              <div className="text-2xl md:text-4xl font-bold font-mono text-rose-dark">{item.value}</div>
              <div className="text-[10px] md:text-xs text-rose-pink/70 font-medium mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse text-xs font-mono text-rose-pink/60">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>منذ 03.03.2026</span>
          </div>
          <div className="w-px h-4 bg-rose-pink/20"></div>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Gift className="w-3.5 h-3.5" />
            <span>فاطمة: {age.years} سنة</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-rose-pink/10 text-center">
          <p className="text-xs text-rose-pink/50 font-mono">
            منذ أن التقت أقدارنا في الثالث من مارس 2026
          </p>
        </div>
      </div>
    </motion.div>
  );
}
