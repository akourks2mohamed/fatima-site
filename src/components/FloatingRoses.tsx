import { useEffect, useState } from 'react';

interface Rose {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: 'red' | 'white';
}

export default function FloatingRoses() {
  const [roses] = useState<Rose[]>(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 16,
      duration: Math.random() * 15 + 12,
      delay: Math.random() * -20,
      color: Math.random() > 0.5 ? 'red' : 'white',
    }))
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {roses.map((rose) => (
        <div
          key={rose.id}
          className="absolute"
          style={{
            left: `${rose.left}%`,
            animation: `rose-fall ${rose.duration}s linear ${rose.delay}s infinite`,
          }}
        >
          <svg
            width={rose.size}
            height={rose.size}
            viewBox="0 0 24 24"
            fill="none"
            className={rose.color === 'red' ? 'text-rose-deep' : 'text-white'}
            style={{ opacity: rose.color === 'white' ? 0.7 : 0.5 }}
          >
            <path
              d="M12 2C9.5 2 7 4 7 7c0 3 2 5 5 8 3-3 5-5 5-8 0-3-2.5-5-5-5z"
              fill="currentColor"
            />
            <path
              d="M12 10c-2 0-4 1.5-4 4 0 2.5 2 4.5 4 6 2-1.5 4-3.5 4-6 0-2.5-2-4-4-4z"
              fill="currentColor"
              opacity="0.7"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
