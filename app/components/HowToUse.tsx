import {useEffect, useRef, useState} from 'react';
import AnimateOnAppear from './AnimateOnAppear';

const HowToUse = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sections = [
    {
      title: '1. Woda',
      tag: 'Chlup',
      description:
        'Nalej 500ml zimnej wody do butelki wielokrotnego użytku Reus',
      icon: './app/assets/step1.png',
      slide: './app/assets/howToUse1.gif',
    },
    {
      title: '2. Tabletka',
      tag: 'Plum...',
      description:
        'Do butelki wrzuć tabletkę z wybranym środkiem czystości i poczekaj aż całkowicie sięrozpuści. Nie zakręcaj butelki!',
      icon: './app/assets/step2.png',
      slide: './app/assets/howToUse2.gif',
    },
    {
      title: '3. Produkt gotowy!',
      tag: 'Wstrząśnij przed użyciem',
      description:
        'Gdy tabletka całkowicie się rozpuszczą zakręć butelkę. Twój produkt jest gotowy doużytku.',
      icon: './app/assets/step3.png',
      slide: './app/assets/howToUse3.gif',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      for (let i = 0; i < sectionRefs.current.length; i++) {
        const section = sectionRefs.current[i];
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (
            scrollPosition >= sectionTop - windowHeight / 2 &&
            scrollPosition < sectionBottom - windowHeight / 2
          ) {
            setCurrentSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex container gap-12 mt-[2rem] md:mt-[0rem]">
      <div className="hidden md:block md:sticky md:top-0 md:self-start w-2/5">
        <VerticalImageDisplay
          slides={sections.map((section) => section.slide)}
          currentIndex={currentSection}
        />
      </div>
      <div>
        {sections.map((section, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="md:h-[60vh] flex items-center"
          >
            <AnimateOnAppear>
              <ContentSection {...section} />
            </AnimateOnAppear>
          </div>
        ))}
      </div>
    </div>
  );
};

interface VerticalImageDisplayProps {
  slides: string[];
  currentIndex: number;
}

const VerticalImageDisplay: React.FC<VerticalImageDisplayProps> = ({
  slides,
  currentIndex,
}) => {
  const [displayedIndex, setDisplayedIndex] = useState(currentIndex);

  useEffect(() => {
    if (currentIndex !== displayedIndex) {
      setDisplayedIndex(currentIndex);
    }
  }, [currentIndex, displayedIndex]);

  return (
    <div className="relative ml-4 aspect-square overflow-hidden mt-[8rem]">
      {slides.map((slide, index) => (
        <div
          key={slide}
          className={`pl-6 absolute w-full h-full transition-transform duration-300 ease-in-out rounded-md  ${
            index === displayedIndex
              ? 'translate-y-0'
              : index === displayedIndex - 1 ||
                (displayedIndex === 0 && index === slides.length - 1)
              ? '-translate-y-full'
              : 'translate-y-full'
          }`}
          style={{
            zIndex: index === displayedIndex ? 10 : 5,
            transitionDelay: index === displayedIndex ? '0ms' : '300ms',
          }}
        >
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cove rounded-md"
          />
        </div>
      ))}
      <div className="absolute left-0 top-0 font-bold text-lg text-color-blue">
        1
      </div>
      <div className="absolute ml-[2px] top-8 h-[80%] w-[6px] bg-color-gray rounded-full">
        <div
          className="bg-color-blue w-full transition-all duration-300 rounded-full"
          style={{height: `${((currentIndex + 1) / slides.length) * 100}%`}}
        ></div>
      </div>
      <div className="absolute bottom-0 font-bold text-lg text-color-blue">
        3
      </div>
    </div>
  );
};

interface ContentSectionProps {
  title: string;
  description: string;
  icon: string;
  tag: string;
  slide: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  description,
  icon,
  tag,
  slide,
}) => {
  return (
    <div className="max-w-md">
      <img
        src={slide}
        alt={slide}
        className="w-full h-full object-cove rounded-md my-[2rem] md:hidden"
      />
      <div className="mb-4">
        <img
          src={icon}
          alt={title}
          className="w-14 h-14 p-4 bg-white rounded-lg shadow-lg shadow-neutral-300"
        />
      </div>
      <h2 className="text-2xl font-bold text-color-text">{title}</h2>
      <p className="text-color-textLight text-lg">{tag}</p>
      <p className="text-color-textLight mt-2">{description}</p>
    </div>
  );
};

export default HowToUse;
