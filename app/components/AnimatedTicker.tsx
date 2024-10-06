const AnimatedTicker: React.FC = () => {
  const message = '• Oszczędź 10 zł • Na premiere oferujemy 10 zł zniżki';

  return (
    <div className="ticker-container grow rounded-md max-w-[400px]">
      <div className="ticker-content">
        <span className="text-color-blue text-sm">{message}</span>
        <span className="text-color-blue text-sm">{message}</span>
      </div>
    </div>
  );
};

export default AnimatedTicker;
