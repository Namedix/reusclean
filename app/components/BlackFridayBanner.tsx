import {useState, useEffect} from 'react';

export function BlackFridayBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const endDate = new Date('2024-12-01T23:59:59');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-color-text text-white p-4 text-center z-50">
      <button
        onClick={handleClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200"
        aria-label="Zamknij banner"
      >
        ✕
      </button>
      <p className="text-sm md:text-base pr-8">
        Black Week - zostało{' '}
        <span className="font-bold">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{' '}
          {timeLeft.seconds}s
        </span>{' '}
        <br className="block md:hidden" />
        darmowej wysyłki z kodem <span className="font-bold">DOSTAWA</span>
      </p>
    </div>
  );
}
