const AnimatedPaymentMethods: React.FC = () => {
  const paymentMethods = [
    {name: 'Visa', src: '../assets/visa.png'},
    {name: 'Mastercard', src: '../assets/mastercard.png'},
    {name: 'Apple Pay', src: '../assets/applepay.png'},
    {name: 'Maestro', src: '../assets/maestro.png'},
    {name: 'Blik', src: '../assets/blik.png'},
    {name: 'Przelewy24', src: '../assets/przelewy24.svg'},
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
      <div className="flex animate-scroll">
        {/* First set of logos */}
        <div className="flex shrink-0">
          {paymentMethods.map((method, index) => (
            <img
              key={`${method.name}-${index}`}
              src={method.src}
              alt={method.name}
              className="h-8 object-contain mx-4"
            />
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex shrink-0">
          {paymentMethods.map((method, index) => (
            <img
              key={`${method.name}-${index}-duplicate`}
              src={method.src}
              alt={method.name}
              className="h-8 object-contain mx-4"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedPaymentMethods;
