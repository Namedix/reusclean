import AnimateOnAppear from './AnimateOnAppear';

const BigImages = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
        <div className="flex-row space-y-2">
          <AnimateOnAppear>
            <div className="font-semibold text-2xl">
              Twoje nowe produkty do mycia i sprzątania
            </div>
          </AnimateOnAppear>
          <AnimateOnAppear>
            <div className="font-medium text-lg  text-color-textLight">
              Piękne butelki wielokrotnego użytku i naturalne koncentraty.
            </div>
          </AnimateOnAppear>
        </div>
        <AnimateOnAppear>
          <div className="font-medium text-lg  text-color-textLight">
            Ty pomożesz dbać o środowisko naturalne a reus pomoże ci zadbać o
            domowy budżet. Bezpieczne i skuteczne koncentraty w dobrej cenie.
          </div>
        </AnimateOnAppear>
      </div>
      <div className="flex flex-col space-y-3">
        <AnimateOnAppear>
          <img
            className="w-full mt-4 rounded-md"
            src="./public/assets/reusHorizontal.jpg"
            alt="reusHorizontal"
          />
        </AnimateOnAppear>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          {[
            './public/assets/kitchen.jpeg',
            './public/assets/bathroom.jpeg',
            './public/assets/universal.jpeg',
          ].map((src, index) => (
            <AnimateOnAppear key={src}>
              <img className="rounded-md" src={src} alt={`Image${index}`} />
            </AnimateOnAppear>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BigImages;
