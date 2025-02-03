import React from 'react';
import {FaChevronUp, FaChevronDown} from 'react-icons/fa';
import AnimateOnAppear from './AnimateOnAppear';

const Ingredience = () => {
  const benefits = [
    {
      title: 'Kwas Cytrynowy',
      content:
        'Skutecznie usuwa osady z kamienia i inne trudne zabrudzenia. Działa także jako delikatny środek dezynfekujący, zapewniając higieniczną czystość. Jest to naturalny składnik występujący w cytrusach, bezpieczny dla środowiska.',
    },
    {
      title: 'Węglan Sodu',
      content:
        'Rozpuszcza tłuszcz i brud, jednocześnie zmiękczając wodę. Jest to skuteczny, ale łagodny składnik czyszczący, który pomaga w usuwaniu plam i zabrudzeń bez uszkadzania czyszczonych powierzchni. Dodatkowo neutralizuje nieprzyjemne zapachy.',
    },
    {
      title: 'Benzoesan Sodu',
      content:
        'Zapobiega rozwojowi bakterii i pleśni w gotowym roztworze. Ten bezpieczny konserwant jest powszechnie stosowany w produktach gospodarstwa domowego i kosmetykach. Przedłuża trwałość produktu, zachowując jego właściwości czyszczące przez długi czas.',
    },
    {
      title: 'Środki Powierzchniowo Czynne',
      content:
        'Ułatwiają rozpuszczanie zanieczyszczeń w wodzie. Usuwają tłuszcz i brud z powierzchni poprzez zmniejszenie napięcia powierzchniowego wody. Dzięki temu środek czyszczący może dotrzeć do trudno dostępnych miejsc i skutecznie usunąć zabrudzenia. Są biodegradowalne i przyjazne dla środowiska.',
    },
    {
      title: 'Delikatne Kompozycje Zapachowe',
      content:
        'Naturalne olejki zapachowe z zielonej herbaty nadają przyjemny, świeży zapach. Starannie dobrana kompozycja zapachowa nie tylko maskuje nieprzyjemne zapachy, ale także tworzy przyjemną atmosferę w pomieszczeniu. Aromaty są delikatne i długotrwałe, nie powodując podrażnień.',
    },
  ];

  // Add state to track which item is expanded
  const [expandedIndex, setExpandedIndex] = React.useState(0);

  return (
    <AnimateOnAppear>
      <div className="md:container md:mt-16">
        <div
          className="p-4 md:p-16 bg-[#95C69E] text-white md:rounded-3xl flex flex-col md:flex-row gap-6 md:gap-12 relative overflow-hidden"
          style={{
            backgroundImage: 'url(/assets/greenBackground.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-2xl md:w-1/2">
            <div className="flex flex-row gap-10">
              <h1 className="text-left md:text-left text-xl font-bold md:text-4xl mb-2 mt-4 md:mt-0 pr-16 md:pr-0 ml-4">
                Poznaj Główne Składniki Aktywne Tabletek Reus
              </h1>
              <img
                src="/assets/tab.png"
                alt="tab"
                className="object-cover h-48 absolute top-2 -right-4"
                style={{transform: 'rotate(180deg) translateX(-50px)'}}
              />
            </div>
            <button
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="hidden md:flex py-4 px-24 h-14 bg-[#137B43] mt-8 text-white text-sm rounded-lg shadow-lg shadow-[#137B43]/20 items-center justify-center space-x-4 relative overflow-hidden"
            >
              <img
                src="/assets/foamLeft.png"
                alt=""
                className="absolute left-0 bottom-0 z-0 pointer-events-none -translate-x-12 w-40 opacity-50"
              />
              <img
                src="/assets/foamRight.png"
                alt=""
                className="absolute right-0 top-0 z-0 pointer-events-none w-40 opacity-50 translate-x-20"
              />
              <div className="relative z-10">Wybróbuj Reus</div>
            </button>
          </div>

          <div className="space-y-4 md:w-1/2 z-20">
            {benefits.map((benefit, index) => (
              <AnimateOnAppear key={index}>
                <div className={`rounded-lg overflow-hidden`}>
                  <button
                    className="w-full flex items-center justify-between p-4 bg-color-gray"
                    onClick={() => setExpandedIndex(index)}
                  >
                    <div className="flex items-center text-color-text">
                      <span className="font-semibold">{benefit.title}</span>
                    </div>
                    {index === expandedIndex ? (
                      <FaChevronUp className="text-color-textLight" />
                    ) : (
                      <FaChevronDown className="text-color-textLight" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      index === expandedIndex
                        ? 'max-h-[1000px] opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 py-2 bg-color-gray text-color-textLight text-sm">
                      {benefit.content}
                    </div>
                  </div>
                </div>
              </AnimateOnAppear>
            ))}
          </div>

          <button
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="flex md:hidden py-3 md:py-4 md:px-16 h-14 bg-[#137B43] my-4 text-white text-sm rounded-lg shadow-lg shadow-[#137B43]/20 items-center justify-center space-x-4 relative overflow-hidden"
          >
            <img
              src="/assets/foamLeft.png"
              alt=""
              className="absolute left-0 bottom-0 z-0 pointer-events-none -translate-x-10 md:translate-x-0 w-40 opacity-50"
            />
            <img
              src="/assets/foamRight.png"
              alt=""
              className="absolute right-0 top-0 z-0 pointer-events-none w-40 opacity-50 translate-x-10 md:translate-x-0"
            />
            <div className="relative z-10">Wybróbuj Reus</div>
          </button>

          <div className="hidden md:block absolute left-0 bottom-0 w-[600px] h-[500px] overflow-hidden pointer-events-none">
            <img
              src="/assets/saschetUniversal.png"
              alt="greenBackground"
              className="absolute w-[1000px] h-[800px] object-cover"
              style={{
                left: '-15%',
                top: '15%',
              }}
            />
          </div>
        </div>
      </div>
    </AnimateOnAppear>
  );
};

export default Ingredience;
