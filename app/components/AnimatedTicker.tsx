const AnimatedTicker: React.FC = () => {
  const message =
    '• Prezent na start - Gratis do pierwszych zamówień! • Prezent na start - Gratis do pierwszych zamówień!';

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
