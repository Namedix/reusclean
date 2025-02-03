import React from 'react';
import {CheckBadgeIcon} from '@heroicons/react/24/solid';
import AnimateOnAppear from './AnimateOnAppear';

const ReusDetails = () => {
  return (
    <AnimateOnAppear>
      <div className="md:container mt-8 md:mt-16">
        <div className="bg-color-lightBlue md:rounded-3xl flex flex-row items-center overflow-hidden h-[500px] md:h-[500px] relative">
          <div className="md:w-1/2 h-full w-full absolute">
            <img
              src="/assets/windowRender.png"
              alt="Vori Detox Product"
              className="absolute h-full w-full left-[-120px] md:left-[-40px] object-cover object-bottom"
            />
          </div>

          <div className="md:w-1/2 md:pr-12 ml-[50%] relative z-5 md:-mt-6 -mt-20 mr-4">
            <h2 className="text-xl font-bold md:text-3xl text-color-text mb-8">
              Czystość i Połysk w Małej Tabletce
            </h2>

            <ul className="space-y-4">
              {[
                'Mniej Plastiku',
                '100% Wegański Skład',
                'Bez Szkodliwych Substancji',
                'Kompaktowy Rozmiar',
                'Świetna Cena',
                'Polski Produkt',
              ].map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 md:gap-3">
                  <CheckBadgeIcon className="w-5 h-5 text-color-blue flex-shrink-0" />
                  <span className="text-color-text text-sm md:text-lg">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AnimateOnAppear>
  );
};

export default ReusDetails;
