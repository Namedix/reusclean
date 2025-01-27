import React from 'react';
import {
  BoltIcon,
  ScaleIcon,
  CloudIcon,
  UserIcon,
  MoonIcon,
  NoSymbolIcon,
  SparklesIcon,
  NoSymbolIcon,
} from '@heroicons/react/24/outline';

const Consequences = () => {
  const consequences = [
    {icon: BoltIcon, text: 'Bóle głowy'},
    {icon: ScaleIcon, text: 'Przyrost wagi'},
    {icon: CloudIcon, text: 'Zamglony umysł'},
    {icon: UserIcon, text: 'Wypadanie włosów'},
    {icon: MoonIcon, text: 'Zmęczenie'},
    {icon: NoSymbolIcon, text: 'Brak energii'},
    {icon: NoSymbolIcon, text: 'Problemy z płodnością'},
    {icon: SparklesIcon, text: 'Zła kondycja skóry'},
  ];

  return (
    <div className="container mt-16 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {consequences.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="flex items-center gap-4">
              <div className=" bg-red-500 text-white rounded flex items-center justify-center p-2.5">
                <IconComponent className="w-6 h-6" />
              </div>
              <span className="md:text-lg text-color-text">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Consequences;
