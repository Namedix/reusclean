import {SparklesIcon, BeakerIcon, StarIcon} from '@heroicons/react/24/solid';

const Promises = () => {
  const promises = [
    {
      title: 'Feels (and tastes like) magic',
      description:
        'Our products are crafted with the highest quality ingredients and are designed to provide a unique and transformative experience.',
      image: '/assets/orangeBackground.png',
      colorHex: '#E8A95D',
      icon: <SparklesIcon className="w-6 h-6 text-[#E8A95D]" />,
    },
    {
      title: 'Crafted carefully with premium ingredients',
      description:
        'Our products are crafted with the highest quality ingredients and are designed to provide a unique and transformative experience.',
      image: '/assets/universalBackground.png',
      colorHex: '#94C59E',
      icon: <BeakerIcon className="w-6 h-6 text-[#94C59E]" />,
    },
    {
      title: 'Rigorously lab tested',
      description:
        'Our products are rigorously lab tested to ensure they are safe and effective.',
      image: '/assets/redBackground.png',
      colorHex: '#C35A65',
      icon: <StarIcon className="w-6 h-6 text-[#C35A65]" />,
    },
  ];

  return (
    <section className="py-16 px-4 container">
      <h2 className="text-center text-3xl font-bold text-color-text mb-12">
        Our Promise
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {promises.map((promise, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden group items-center shadow"
          >
            <div className="flex">
              <div
                className="absolute inset-0 z-0"
                style={{backgroundColor: `${promise.colorHex}20`}}
              />
              <img
                src={promise.image}
                alt={promise.title}
                className={`object-cover object-left w-full h-full z-10 ${
                  index === 1
                    ? 'object-right translate-x-[10px]'
                    : 'object-left'
                }`}
              />
              <div
                className={`absolute inset-0 flex flex-col bg-color-white items-start z-20 p-4 ${
                  index === 1 ? 'mr-[40%]' : 'ml-[40%]'
                } gap-3`}
              >
                {promise.icon}
                <h2 className="text-color-text text-xl font-bold">
                  {promise.title}
                </h2>
                <h3 className="text-color-text text-xs font-bold">
                  {promise.description}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Promises;
