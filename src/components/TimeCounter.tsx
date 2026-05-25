import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, Clock, Gift, Heart, Hourglass } from 'lucide-react';

interface Props {
  visibleSections: Set<string>;
}

function calcAge(birth: Date) {
  const now = new Date();
  const diff = now.getTime() - birth.getTime();
  if (diff <= 0) return { years: 0, months: 0, days: 0 };
  const d = new Date(diff);
  return {
    years: Math.abs(d.getUTCFullYear() - 1970),
    months: d.getUTCMonth(),
    days: d.getUTCDate() - 1,
  };
}

function nextBirthday(birth: Date) {
  const now = new Date();
  const currentYear = now.getFullYear();
  let next = new Date(currentYear, birth.getMonth(), birth.getDate());
  if (next.getTime() <= now.getTime()) {
    next = new Date(currentYear + 1, birth.getMonth(), birth.getDate());
  }
  const diff = next.getTime() - now.getTime();
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function TimeCounter({ visibleSections }: Props) {
  const [timeSinceMeeting, setTimeSinceMeeting] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [countdownFatima, setCountdownFatima] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [countdownMohamed, setCountdownMohamed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [ageFatima, setAgeFatima] = useState({ years: 0, months: 0, days: 0 });
  const [ageMohamed, setAgeMohamed] = useState({ years: 0, months: 0, days: 0 });
  const [isFatimaBirthday, setIsFatimaBirthday] = useState(false);
  const [isMohamedBirthday, setIsMohamedBirthday] = useState(false);

  const meetingDate = new Date('2026-03-03T00:00:00');
  const fatimaBirth = new Date(2008, 9, 18);
  const mohamedBirth = new Date(2005, 8, 7);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const meetingDiff = now.getTime() - meetingDate.getTime();
      if (meetingDiff > 0) {
        setTimeSinceMeeting({
          days: Math.floor(meetingDiff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((meetingDiff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((meetingDiff / (1000 * 60)) % 60),
          seconds: Math.floor((meetingDiff / 1000) % 60),
        });
      }

      setAgeFatima(calcAge(fatimaBirth));
      setAgeMohamed(calcAge(mohamedBirth));

      const fatCD = nextBirthday(fatimaBirth);
      setCountdownFatima(fatCD);
      setIsFatimaBirthday(fatCD.days === 0 && fatCD.hours === 0 && fatCD.minutes === 0 && fatCD.seconds < 2);

      const mohCD = nextBirthday(mohamedBirth);
      setCountdownMohamed(mohCD);
      setIsMohamedBirthday(mohCD.days === 0 && mohCD.hours === 0 && mohCD.minutes === 0 && mohCD.seconds < 2);
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
      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-rose-pink/10 p-6 md:p-8 space-y-6">
        {/* Meeting Counter */}
        <div>
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-4">
            <Clock className="w-5 h-5 text-rose-deep" />
            <h2 className="text-lg md:text-xl font-serif text-rose-dark font-semibold">رحلتنا معاً</h2>
            <Clock className="w-5 h-5 text-rose-deep" />
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto mb-4">
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

          <div className="text-center text-xs font-mono text-rose-pink/50">
            منذ 03.03.2026
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-rose-pink/20 to-transparent"></div>

        {/* Hourglass - Fatima Birthday Countdown */}
        <div>
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-3">
            <Hourglass className="w-4 h-4 text-rose-deep" />
            <h3 className="text-sm md:text-base font-serif text-rose-dark font-semibold">فاطمة الزهراء</h3>
            <Gift className="w-4 h-4 text-rose-pink" />
          </div>

          {isFatimaBirthday ? (
            <div className="text-center py-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-lg font-bold text-rose-deep"
              >
                كل سنة وأنتِ بألف خير يا فاطمة!
              </motion.div>
              <p className="text-xs text-rose-pink/60 mt-1 font-mono">Happy Birthday! &#10084;</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-2">
                {[
                  { value: countdownFatima.days, label: 'يوم' },
                  { value: String(countdownFatima.hours).padStart(2, '0'), label: 'ساعة' },
                  { value: String(countdownFatima.minutes).padStart(2, '0'), label: 'دقيقة' },
                  { value: String(countdownFatima.seconds).padStart(2, '0'), label: 'ثانية' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/80 rounded-xl p-2 border border-rose-pink/10 text-center">
                    <div className="text-lg md:text-2xl font-bold font-mono text-rose-dark">{item.value}</div>
                    <div className="text-[9px] text-rose-pink/60 font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-[10px] font-mono text-rose-pink/50">
                <span>المتبقي لعيد ميلاد فاطمة (18 أكتوبر)</span>
                <Hourglass className="w-3 h-3 inline-block text-rose-pink/60 animate-pulse" />
              </div>
            </>
          )}

          <div className="text-center text-[11px] text-rose-pink/60 font-mono mt-1">
            {ageFatima.years} سنة - {ageFatima.months} شهر - {ageFatima.days} يوم
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-rose-pink/20 to-transparent"></div>

        {/* Hourglass - Mohamed Birthday Countdown */}
        <div>
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-3">
            <Hourglass className="w-4 h-4 text-rose-deep" />
            <h3 className="text-sm md:text-base font-serif text-rose-dark font-semibold">محمد</h3>
            <Gift className="w-4 h-4 text-rose-pink" />
          </div>

          {isMohamedBirthday ? (
            <div className="text-center py-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-lg font-bold text-rose-deep"
              >
                كل سنة وأنت بألف خير!
              </motion.div>
              <p className="text-xs text-rose-pink/60 mt-1 font-mono">Happy Birthday! &#10084;</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-2">
                {[
                  { value: countdownMohamed.days, label: 'يوم' },
                  { value: String(countdownMohamed.hours).padStart(2, '0'), label: 'ساعة' },
                  { value: String(countdownMohamed.minutes).padStart(2, '0'), label: 'دقيقة' },
                  { value: String(countdownMohamed.seconds).padStart(2, '0'), label: 'ثانية' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/80 rounded-xl p-2 border border-rose-pink/10 text-center">
                    <div className="text-lg md:text-2xl font-bold font-mono text-rose-dark">{item.value}</div>
                    <div className="text-[9px] text-rose-pink/60 font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-[10px] font-mono text-rose-pink/50">
                <span>المتبقي لعيد ميلاد محمد (7 سبتمبر)</span>
                <Hourglass className="w-3 h-3 inline-block text-rose-pink/60 animate-pulse" />
              </div>
            </>
          )}

          <div className="text-center text-[11px] text-rose-pink/60 font-mono mt-1">
            {ageMohamed.years} سنة - {ageMohamed.months} شهر - {ageMohamed.days} يوم
          </div>
        </div>
      </div>
    </motion.div>
  );
}
