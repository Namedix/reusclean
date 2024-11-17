import AnimateOnAppear from './AnimateOnAppear';

const BigImages = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 md:mt-24">
        <div className="flex-row space-y-2">
          <AnimateOnAppear>
            <div className="font-semibold text-2xl">
              Rewolucyjne podejście do sprzątania
            </div>
          </AnimateOnAppear>
          <AnimateOnAppear>
            <div className="font-medium text-lg  text-color-textLight">
              Uniwersalne butelki wielokrotnego użytku i naturalne koncentraty
              czyszczące w formie wygodnej tabletki.
            </div>
          </AnimateOnAppear>
        </div>
        <AnimateOnAppear>
          <div className="font-medium text-lg  text-color-textLight">
            Ekonomia i ekologia w jednym. Jeden zestaw tabletek starcza na wiele
            tygodni, co oznacza mniej zakupów i więcej oszczędności.
            <br />
            Łatwe przechowywanie. Małe i poręczne tabletki zajmują mniej miejsca
            niż tradycyjne środki czystości.
          </div>
        </AnimateOnAppear>
      </div>
      <div className="flex flex-col space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-12">
          {[
            './assets/windowComposition.jpeg',
            './assets/allProducts.jpeg',
            './assets/kitchenComposition.jpeg',
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
