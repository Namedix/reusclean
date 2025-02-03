import {CheckBadgeIcon, ShieldCheckIcon} from '@heroicons/react/24/solid';
import AnimateOnAppear from './AnimateOnAppear';

const CompareProduct = () => {
  return (
    <AnimateOnAppear>
      <div className="md:container mt-8 md:mt-24">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-8 grow md:pr-16 md:px-0 px-4">
            <h1 className="text-xl md:text-3xl font-bold text-center md:text-start max-w-md">
              Dlaczego ludzie wybierają Reus jako{' '}
              <span className="text-color-blue">#1</span> markę ekologicznych
              środków czystości
            </h1>
            <div>
              <button
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className="w-full py-4 px-4 h-14 bg-color-blue text-white text-sm rounded-lg shadow-lg shadow-color-blue/20 hidden items-center justify-center space-x-4 relative overflow-hidden md:flex"
              >
                <img
                  src="/assets/foamLeft.png"
                  alt=""
                  className="absolute left-0 bottom-0 z-0 pointer-events-none -translate-x-20 w-40 opacity-50"
                />
                <img
                  src="/assets/foamRight.png"
                  alt=""
                  className="absolute right-0 top-0 z-0 pointer-events-none w-40 opacity-50 translate-x-15"
                />
                <div className="relative z-10">Wybróbuj Reus bez ryzyka</div>
              </button>
              <div className="flex items-center justify-center gap-1 mt-2">
                <ShieldCheckIcon className="w-4 h-4 text-color-textLight" />
                <p className="text-xs text-color-textLight mt-1">
                  Bezpieczne płatności gwarantują Przelewy24
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row mt-12 md:mt-0 md:gap-4">
            <div className="bg-color-lightBlue md:rounded-3xl p-4 md:p-8 w-1/2 relative pt-12 md:pt-12">
              <img
                src="/assets/bathroomAndtowel.png"
                alt="Bathroom and towel"
                className="absolute -top-[60px] md:-top-[90px] -right-10 md:right-0 w-48 h-auto z-10 [clip-path:inset(0_40px_0_0)] md:[clip-path:none]"
              />
              <h2 className="text-2xl font-bold mb-6 text-color-text pr-14">
                Reus Clean
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-start pb-4 md:pb-0 border-b md:border-b-0 border-blue-300 h-[60px] md:h-auto">
                  <CheckBadgeIcon className="w-5 h-5 text-color-blue flex-shrink-0" />
                  <p className="text-color-text text-xs md:text-sm">
                    Ekologiczny skład - 100% wegański
                  </p>
                </div>
                <div className="flex gap-2 items-start pb-4 md:pb-0 border-b md:border-b-0 border-blue-300 h-[60px] md:h-auto">
                  <CheckBadgeIcon className="w-5 h-5 text-color-blue flex-shrink-0" />
                  <p className="text-color-text text-xs md:text-sm">
                    Delikatny, naturalny zapach zielonej herbaty
                  </p>
                </div>
                <div className="flex gap-2 items-start pb-4 md:pb-0 border-b md:border-b-0 border-blue-300 h-[60px] md:h-auto">
                  <CheckBadgeIcon className="w-5 h-5 text-color-blue flex-shrink-0" />
                  <p className="text-color-text text-xs md:text-sm">
                    Butelka na całe życie - dokupujesz tylko tabletki
                  </p>
                </div>
                <div className="flex gap-2 items-start pb-4 md:pb-0 border-b md:border-b-0 border-blue-300 h-[60px] md:h-auto">
                  <CheckBadgeIcon className="w-5 h-5 text-color-blue flex-shrink-0" />
                  <p className="text-color-text text-xs md:text-sm">
                    Bezpieczne dla środowiska wodnego
                  </p>
                </div>
                <div className="flex gap-2 items-start h-[60px] md:h-auto">
                  <CheckBadgeIcon className="w-5 h-5 text-color-blue flex-shrink-0" />
                  <p className="text-color-text text-xs md:text-sm">
                    1 tabletka = 500ml płynu już za 5.99zł
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 md:rounded-3xl p-4 md:p-8 w-1/2 relative pt-12 md:pt-12">
              <img
                src="/assets/genericCleaning.png"
                alt="Generic cleaning products"
                className="absolute -top-[45px] md:-top-[75px] -right-6 md:-right-2 w-36 h-36 md:w-40 md:h-40 z-10"
              />
              <h2 className="text-2xl font-bold mb-6 text-color-text pr-14 md:pr-0">
                Inne marki
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-start pb-4 md:pb-0 border-b md:border-b-0 border-gray-200 h-[60px] md:h-auto">
                  <span className="text-red-500">✗</span>
                  <p className="text-red-500 text-xs md:text-sm mt-1">
                    Toksyczne składniki
                  </p>
                </div>
                <div className="flex gap-2 items-start pb-4 md:pb-0 border-b md:border-b-0 border-gray-200 h-[60px] md:h-auto">
                  <span className="text-red-500">✗</span>
                  <p className="text-red-500 text-xs md:text-sm mt-1">
                    Drażniący, chemiczny zapach
                  </p>
                </div>
                <div className="flex gap-2 items-start pb-4 md:pb-0 border-b md:border-b-0 border-gray-200 h-[60px] md:h-auto">
                  <span className="text-red-500">✗</span>
                  <p className="text-red-500 text-xs md:text-sm mt-1">
                    Jednorazowe, plastikowe opakowania
                  </p>
                </div>
                <div className="flex gap-2 items-start pb-4 md:pb-0 border-b md:border-b-0 border-gray-200 h-[60px] md:h-auto">
                  <span className="text-red-500">✗</span>
                  <p className="text-red-500 text-xs md:text-sm mt-1">
                    Bioakumulacyjne i trwale szkodliwe dla organizmów wodnych
                  </p>
                </div>
                <div className="flex gap-2 items-start h-[60px] md:h-auto">
                  <span className="text-red-500">✗</span>
                  <p className="text-red-500 text-xs md:text-sm mt-1">
                    Kosztowne i zajmuje dużo miejsca
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-4 mt-4 block md:hidden">
            <button
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="w-full py-4 px-4 h-14 bg-color-blue text-white text-sm rounded-lg shadow-lg shadow-color-blue/20 flex items-center justify-center space-x-4 relative overflow-hidden"
            >
              <img
                src="/assets/foamLeft.png"
                alt=""
                className="absolute left-0 bottom-0 z-0 pointer-events-none -translate-x-10 w-40 opacity-50"
              />
              <img
                src="/assets/foamRight.png"
                alt=""
                className="absolute right-0 top-0 z-0 pointer-events-none w-40 opacity-50 translate-x-10"
              />
              <div className="relative z-10">Wybróbuj Reus bez ryzyka</div>
            </button>
            <div className="flex items-center justify-center gap-1 mt-2">
              <ShieldCheckIcon className="w-4 h-4 text-color-textLight" />
              <p className="text-xs text-color-textLight mt-1">
                Bezpieczne płatności gwarantują Przelewy24
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimateOnAppear>
  );
};

export default CompareProduct;
