import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

interface Advantage {
  icon: string;
  text: string;
}

const advantages: Advantage[] = [
  {
    icon: '/assets/veganIcon.png',
    text: '100% wegański skład',
  },
  {
    icon: '/assets/animalsIcon.png',
    text: 'Nietestowane na zwierzętach',
  },
  {
    icon: '/assets/environmentIcon.png',
    text: 'Bezpieczne dla środowiska wodnego',
  },
  {
    icon: '/assets/polandIcon.png',
    text: 'Polska firma, krajowa produkcja',
  },
  {
    icon: '/assets/priceIcon.png',
    text: 'Najlepsza cena na rynku',
  },
  {
    icon: '/assets/effectiveIcon.png',
    text: 'Efektywny i wydajny',
  },
  {
    icon: '/assets/plasticIcon.png',
    text: 'Bez Mikroplastiku',
  },
];

const AdvantagesSection = () => {
  return (
    <div className="md:container mx-auto pt-8 px-4">
      <div className="relative w-full overflow-hidden">
        <div className="md:hidden absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="md:hidden absolute right-[-1px] top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>

        {/* Mobile scrolling version */}
        <div className="relative flex overflow-x-hidden md:hidden">
          <div className="flex animate-marquee">
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex shrink-0">
                {advantages.map((advantage, index) => (
                  <div
                    key={`${setIndex}-${index}`}
                    className="w-[180px] flex flex-col items-center px-2"
                  >
                    <div className="w-24 h-24 relative mb-3">
                      <img
                        src={advantage.icon}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-sm text-center whitespace-normal">
                      {advantage.text}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop static version - unchanged */}
        <div className="hidden md:flex flex-row gap-2">
          {advantages.map((advantage, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-28 h-28 relative mb-3">
                <img
                  src={advantage.icon}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-base text-center">{advantage.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvantagesSection;
