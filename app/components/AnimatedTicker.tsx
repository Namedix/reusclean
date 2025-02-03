const AnimatedTicker: React.FC = () => {
  const message =
    '• Darmowa dostawa od 79 zł! • Zamówienia złożone do 12:00 wysyłamy w ten sam dzień!';

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
