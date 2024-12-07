import React, {useEffect, useState} from 'react';
import AnimateOnAppear from './AnimateOnAppear';

interface Opinion {
  image?: string;
  title?: string;
  description: string;
  profile: {
    name: string;
  };
  rate: number;
}

const Opinions: React.FC<{opinions: Opinion[]}> = ({opinions}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [helpfulRatings, setHelpfulRatings] = useState<{
    [key: number]: boolean | undefined;
  }>({});

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const savedRatings: {[key: number]: boolean} = {};
    opinions.forEach((_, index) => {
      const saved = localStorage.getItem(`opinion-${index}-helpful`);
      if (saved) {
        savedRatings[index] = saved === 'true';
      }
    });
    setHelpfulRatings(savedRatings);
  }, [opinions]);

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
              <div className="flex flex-col">
                <span className="font-semibold">{opinion.profile.name}</span>
              </div>
              <span className="ml-auto font-bold text-color-blue">
                {opinion.rate}/5
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2 border-t pt-2 text-sm">
              <span className="text-gray-600 text-xs">
                Czy to było pomocne?
              </span>
              <div className="flex gap-1 ml-auto">
                {[true, false].map((isHelpful) => (
                  <button
                    key={isHelpful ? 'helpful' : 'not-helpful'}
                    onClick={() => {
                      const currentValue = helpfulRatings[index] === isHelpful;
                      if (currentValue) {
                        // Remove from localStorage and state if already selected
                        localStorage.removeItem(`opinion-${index}-helpful`);
                        setHelpfulRatings({
                          ...helpfulRatings,
                          [index]: undefined,
                        });
                      } else {
                        // Set new value
                        localStorage.setItem(
                          `opinion-${index}-helpful`,
                          String(isHelpful),
                        );
                        setHelpfulRatings({
                          ...helpfulRatings,
                          [index]: isHelpful,
                        });
                      }
                    }}
                    className={`p-1 ${
                      isHelpful ? 'hover:text-color-blue' : 'hover:text-red-500'
                    } ${
                      helpfulRatings[index] === isHelpful
                        ? isHelpful
                          ? 'text-color-blue'
                          : 'text-red-500'
                        : 'text-gray-400'
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 ${!isHelpful ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AnimateOnAppear>
      ))}
    </div>
  );
};

export default Opinions;
