const AnimatedTicker: React.FC = () => {
  const message =
    '• Black Week - darmowa wysyłka z kodem DOSTAWA • Black Week - darmowa wysyłka z kodem DOSTAWA';

  return (
    <div className="ticker-container grow rounded-md flex items-center justify-center">
      <div className="ticker-content">
        <span className="text-color-white text-sm px-4">{message}</span>
        <span className="text-color-white text-sm px-4">{message}</span>
        <span className="text-color-white text-sm px-4">{message}</span>
        <span className="text-color-white text-sm px-4">{message}</span>
      </div>
    </div>
  );
};

export default AnimatedTicker;
