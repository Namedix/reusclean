const AnimatedTicker: React.FC = () => {
  const message =
    '• -10% na całe zamówienie do końca miesiąca • Rabat naliczany w koszyku z hasłem START10';

  return (
    <div className="ticker-container grow rounded-md flex items-center justify-center">
      <div className="ticker-content">
        <span className="text-color-blue text-sm px-4">{message}</span>
        <span className="text-color-blue text-sm px-4">{message}</span>
        <span className="text-color-blue text-sm px-4">{message}</span>
        <span className="text-color-blue text-sm px-4">{message}</span>
      </div>
    </div>
  );
};

export default AnimatedTicker;
