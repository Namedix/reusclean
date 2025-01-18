import {useEffect, useState} from 'react';

const PROMO_END_DATE = new Date('2025-01-31T23:59:59'); // End of January 2025

export const FreeShippingPromo = ({className = ''}: {className?: string}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = PROMO_END_DATE.getTime() - now.getTime();

    if (difference <= 0) {
      return {days: 0, hours: 0, minutes: 0, seconds: 0};
    }

    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`absolute -top-4 -right-4 transform -rotate-[8deg] z-10 md:pr-4 mt-2 ${className}`}
    >
      <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg border border-red-600 relative">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="text-xs font-bold mb-1">STYCZEŃ DARMOWEJ DOSTAWY!</div>
        <div className="text-[10px] flex gap-2 justify-center">
          <span>{timeLeft.days}d</span>
          <span>{timeLeft.hours}h</span>
          <span>{timeLeft.minutes}m</span>
          <span>{timeLeft.seconds}s</span>
        </div>
        {/* Decorative tape effect */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-300/30 rotate-12"></div>
      </div>
    </div>
  );
};
