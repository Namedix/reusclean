import React from 'react';
import AnimateOnAppear from './AnimateOnAppear';
import {div, section} from 'framer-motion/client';

const PackagesShipping = () => {
  const packagingFeatures = [
    {
      icon: '/assets/2opakowania.png', // We should replace these with proper SVG icons
      description: 'Pudełko wysyłkowe z tektury nadającej się do recyklingu',
    },
    {
      icon: '/assets/3opakowania.png',
      description: 'Taśma papierowa bez plastiku',
    },
    {
      icon: '/assets/4opakowania.png',
      description: 'Papierowe opakowania nadające się do recyklingu',
    },
    {
      icon: '/assets/5opakowania.png',
      description: '100% biodegradowalny wypełniacz',
    },
  ];

  return (
    <section className="md:container mt-12">
      <AnimateOnAppear>
        <div className="flex flex-col md:flex-row gap-4 items-center bg-[#DAD0BC]/40 md:rounded-3xl px-4 py-12 md:py-8 md:px-16 overflow-hidden">
          <div className="w-full md:w-2/3">
            <div className="text-center mb-12">
              <div className="font-bold text-color-blue">
                Jak wysyłamy produkty?
              </div>
              <div className="text-3xl font-semibold text-color-text my-4">
                Analiza Naszych Opakowań
              </div>
              <p className="max-w-3xl mx-auto text-color-text text-center md:text-start">
                W Reus wierzymy, że mniej znaczy więcej. Prawie 90% kartonowych
                opakowań produktowych trafia prosto do śmieci. Chcemy zredukować
                niepotrzebne odpady. Nasze butelki i saszetki pakujemy
                bezpośrednio w kartony wysyłkowe zabezpieczając je skropakiem,
                czyli kompostowalnym wypełniaczem wykonanym na bazie składników
                roślinnego pochodzenia. Mniej opakowań to mniejszy wpływ na
                środowisko.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {packagingFeatures.map((feature, index) => (
                <AnimateOnAppear
                  animation={`animate-fade-in-up-delay-${index + 1}`}
                  key={index}
                >
                  <div key={index} className="text-center">
                    <img
                      src={feature.icon}
                      alt={feature.description}
                      className="h-12 object-cover mx-auto"
                    />
                    <p className="text-xs text-color-textLight mt-4">
                      {feature.description}
                    </p>
                  </div>
                </AnimateOnAppear>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 md:p-16 mt-8 md:mt-0">
            <AnimateOnAppear animation="animate-fade-in-up-delay-5">
              <img
                src="/assets/1opakowania.png"
                alt="Packages Shipping"
                className="w-full h-auto object-contain"
              />
            </AnimateOnAppear>
          </div>
        </div>
      </AnimateOnAppear>
    </section>
  );
};

export default PackagesShipping;
