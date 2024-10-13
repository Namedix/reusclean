import React, {useEffect, useState} from 'react';
import AnimateOnAppear from './AnimateOnAppear';

interface Opinion {
  image?: string;
  title?: string;
  description: string;
  profile: {
    imageUrl: string;
    name: string;
    city: string;
  };
  rate: number;
}

const Opinions: React.FC<{opinions: Opinion[]}> = ({opinions}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const displayedOpinions = isSmallScreen ? opinions.slice(0, 4) : opinions;

  return (
    <div className="container columns-1 md:columns-3 gap-6 space-y-6 pt-6 md:pt-10">
      {displayedOpinions.map((opinion, index) => (
        <AnimateOnAppear key={index}>
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-4 flex flex-col break-inside-avoid"
          >
            {opinion.image && (
              <img
                src={opinion.image}
                alt="Opinion"
                className="w-full rounded-lg mb-3"
              />
            )}
            {opinion.title && (
              <h3 className="text-lg font-semibold mb-2">{opinion.title}</h3>
            )}
            <p className="text-gray-700 mb-4">{opinion.description}</p>
            <div className="mt-auto flex items-center">
              <img
                src={opinion.profile.imageUrl}
                alt={opinion.profile.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex flex-col">
                <span className="font-semibold">{opinion.profile.name}</span>
                <span className="text-sm text-gray-600">
                  {opinion.profile.city}
                </span>
              </div>
              <span className="ml-auto font-bold text-color-blue">
                {opinion.rate}/5
              </span>
            </div>
          </div>
        </AnimateOnAppear>
      ))}
    </div>
  );
};

export default Opinions;
