const AnimatedPaymentMethods: React.FC = () => {
  const paymentMethods = [
    {name: 'Visa', src: './app/assets/visa.png'},
    {name: 'Mastercard', src: './app/assets/mastercard.png'},
    {name: 'Apple Pay', src: './app/assets/applepay.png'},
    {name: 'Maestro', src: './app/assets/maestro.png'},
    {name: 'Google Pay', src: './app/assets/googlepay.png'},
    {name: 'Stripe', src: './app/assets/stripe.png'},
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10"></div>
      <div className="payment-methods-container">
        <div className="payment-methods-content">
          {paymentMethods.map((method, index) => (
            <img
              key={`${method.name}-${index}`}
              src={method.src}
              alt={method.name}
              className="h-8 object-contain inline-block mx-4"
            />
          ))}
        </div>
        <div className="payment-methods-content" aria-hidden="true">
          {paymentMethods.map((method, index) => (
            <img
              key={`${method.name}-${index}-duplicate`}
              src={method.src}
              alt={method.name}
              className="h-8 object-contain inline-block mx-4"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedPaymentMethods;
