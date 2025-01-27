import {CheckBadgeIcon} from '@heroicons/react/24/solid';
import AnimateOnAppear from './AnimateOnAppear';

const CompareProduct = () => {
  return (
    <AnimateOnAppear>
      <div className="container mt-8 md:mt-24">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-8 grow md:pr-16">
            <h1 className="text-xl md:text-3xl font-bold text-center md:text-start max-w-md">
              Dlaczego ludzie wybierają Reus jako{' '}
              <span className="text-color-blue">#1</span> markę ekologicznych
              środków czystości
            </h1>

            <button
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="bg-color-blue text-white py-3 px-6 rounded-md w-fit hidden md:block"
            >
              Wybróbuj Reus bez ryzyka
            </button>
          </div>
          <div className="flex flex-row mt-12 md:mt-0 md:gap-4">
            <div className="bg-color-lightBlue rounded-l-3xl md:rounded-3xl p-4 md:p-8 w-1/2 relative">
              <img
                src="/assets/bathroomAndtowel.png"
                alt="Bathroom and towel"
                className="absolute -top-[60px] md:-top-[90px] -right-10 md:right-0 w-48 h-auto z-10 [clip-path:inset(0_40px_0_0)] md:[clip-path:none]"
              />
              <h2 className="text-2xl font-bold mb-6 text-color-text pr-12">
                Reus Clean
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-start">
                  <CheckBadgeIcon className="w-5 h-5 text-color-blue flex-shrink-0" />
                  <p className="text-color-text text-xs md:text-sm">
                    Carefully and adequately dosed to ensure potency
                  </p>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckBadgeIcon className="w-5 h-5 text-color-blue flex-shrink-0" />
                  <p className="text-color-text text-xs md:text-sm">
                    Ingredients backed by{' '}
                    <span className="font-medium">extensive research</span>
                  </p>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckBadgeIcon className="w-5 h-5 text-color-blue flex-shrink-0" />
                  <p className="text-color-text text-xs md:text-sm">
                    Enhanced absorption via tincture delivery
                  </p>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckBadgeIcon className="w-5 h-5 text-color-blue flex-shrink-0" />
                  <p className="text-color-text text-xs md:text-sm">
                    Powerful ingredients produced in small batches to ensure
                    quality
                  </p>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckBadgeIcon className="w-5 h-5 text-color-blue flex-shrink-0" />
                  <p className="text-color-text text-xs md:text-sm">
                    Delicious flavor improving the ease of daily palatability
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-r-3xl md:rounded-3xl p-4 md:p-8 w-1/2 relative">
              <img
                src="/assets/genericCleaning.png"
                alt="Generic cleaning products"
                className="absolute -top-[45px] md:-top-[75px] -right-8 md:-right-2 w-36 h-36 md:w-40 md:h-40 z-10"
              />
              <h2 className="text-2xl font-bold mb-6 text-color-text pr-12 md:pr-0">
                Inne marki
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-start">
                  <span className="text-red-500">✗</span>
                  <p className="text-red-500 text-xs md:text-sm">
                    Inconsistent concentration of cleaning agents
                  </p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-red-500">✗</span>
                  <p className="text-red-500 text-xs md:text-sm">
                    Generic ingredients without proven effectiveness
                  </p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-red-500">✗</span>
                  <p className="text-red-500 text-xs md:text-sm">
                    Poor surface coverage and penetration
                  </p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-red-500">✗</span>
                  <p className="text-red-500 text-xs md:text-sm">
                    Mass-produced with less quality control
                  </p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-red-500">✗</span>
                  <p className="text-red-500 text-xs md:text-sm">
                    Strong chemical smell that lingers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimateOnAppear>
  );
};

export default CompareProduct;
