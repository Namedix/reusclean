import {Swiper, SwiperSlide} from 'swiper/react';
import type {Swiper as SwiperType} from 'swiper';
import {EffectCards, Navigation} from 'swiper/modules';
import {useRef, useState} from 'react';
import CheckmarkText from './CheckmarkText';
import {
  FaList,
  FaShieldAlt,
  FaTruck,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import AnimatedPaymentMethods from './AnimatedPaymentMethods';
import CommentSection from './CommentSection';
import ExpandableCard from './ExpandableCard';
import AnimatedTicker from './AnimatedTicker';
import type {
  Maybe,
  Metafield,
  Product,
  ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';
import {AddToCartButton} from './AddToCartButton';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {RichText} from '@shopify/hydrogen';
interface ProductViewPreps {
  product: Product;
}

const ProductView = ({product}: ProductViewPreps) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.nodes[0],
  );
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const getButtonStyle = (variant: ProductVariant) => {
    const baseStyle =
      'w-full py-2 rounded text-center transition-opacity duration-200 text-white text-sm';
    const selectedStyle = 'opacity-100';
    const unselectedStyle = 'opacity-30';
    const buttonType = variant.title;

    switch (buttonType) {
      case 'Kuchnia':
        return `${baseStyle} bg-gradient-kitchen  ${
          selectedVariant === variant ? selectedStyle : unselectedStyle
        }`;
      case 'Łazienka':
        return `${baseStyle} bg-gradient-bathroom ${
          selectedVariant === variant ? selectedStyle : unselectedStyle
        }`;
      case 'Uniwersalny':
        return `${baseStyle} bg-gradient-universal ${
          selectedVariant === variant ? selectedStyle : unselectedStyle
        }`;
      case 'Szyby':
        return `${baseStyle} bg-gradient-windows ${
          selectedVariant === variant ? selectedStyle : unselectedStyle
        }`;
    }
  };

  const handleButtonClick = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    const slideIndex = product?.images?.edges?.findIndex(
      (edge) => edge.node.url === variant.image?.url,
    );
    if (swiperRef.current && slideIndex !== -1) {
      swiperRef.current.slideTo(slideIndex);
    }
  };

  console.log('Selected Variant:', selectedVariant);
  console.log(`Product:`, product);
  return (
    <div className="container mt-4" id="starter-set">
      <div className="md:grid md:grid-cols-2 gap-12">
        <div className="md:sticky md:top-20 md:self-start animate-fade-in-up">
          <Swiper
            className="rounded-xl custom-swiper md:mt-12"
            modules={[Navigation, EffectCards]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: '.custom-swiper-button-next',
              prevEl: '.custom-swiper-button-prev',
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);

              // Find the variant that matches the current slide's image
              const currentSlideImage =
                product?.images?.edges[swiper.activeIndex]?.node.url;
              const matchingVariant = product?.variants?.nodes.find(
                (variant) => variant.image?.url === currentSlideImage,
              );

              // Update the selected variant if a match is found
              if (matchingVariant) {
                setSelectedVariant(matchingVariant);
              }
            }}
          >
            {product?.images?.edges?.map((edge, index) => (
              <SwiperSlide key={edge.node.id}>
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={edge.node.url}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
            <div
              className={`custom-swiper-button-prev ${
                isBeginning ? 'opacity-30' : 'opacity-100'
              }`}
            >
              <FaChevronLeft />
            </div>
            <div
              className={`custom-swiper-button-next ${
                isEnd ? 'opacity-30' : 'opacity-100'
              }`}
            >
              <FaChevronRight />
            </div>
          </Swiper>
        </div>
        <div className="flex flex-col space-y-2 md:space-y-4 mt-2 md:mt-0">
          <div className="flex items-center space-x-2 animate-fade-in-up-delay-1">
            <div className="flex -space-x-2">
              {[
                './assets/Avatar.png',
                './assets/Avatar2.png',
                './assets/Avatar3.png',
                './assets/Avatar4.png',
              ].map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`User ${index + 1}`}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <span className="text-color-blue text-xs">
              +50 pozytywnych opinii
            </span>
          </div>

          <div className="pb-2 border-b-[1px] border-gray-200 animate-fade-in-up-delay-2">
            <h1 className="text-2xl font-semibold">{product?.title}</h1>
          </div>

          <div className="flex items-center space-x-2 animate-fade-in-up-delay-3 text-lg">
            <span className="font-bold">
              {selectedVariant?.price?.amount}zł
            </span>
            {selectedVariant?.compareAtPrice && (
              <span className="text-gray-500 line-through">
                {selectedVariant.compareAtPrice.amount} zł
              </span>
            )}
            <AnimatedTicker />
          </div>
          <div className="grid grid-cols-4 gap-2 animate-fade-in-up-delay-2">
            {product?.variants?.nodes?.map((variant) => (
              <button
                key={variant.id}
                className={getButtonStyle(variant)}
                onClick={() => handleButtonClick(variant)}
              >
                {variant.title}
              </button>
            ))}
          </div>
          <div className="mt-4" />

          <div className="mt-8 space-y-4">
            <CheckmarkText
              className="animate-fade-in-up-delay-4"
              text={`Brak jednorazowego plastiku gdy re-używasz!`}
            />
            <CheckmarkText
              className="animate-fade-in-up-delay-4.5"
              text={`Działa! Sprawdziliśmy to z największymi konkurentami.`}
            />
            <CheckmarkText
              className="animate-fade-in-up-delay-5"
              text={`Nasze produkty powstają ze składników roślinnych.`}
            />
          </div>
          <div className="pt-4 animate-fade-in-up-delay-5">
            <AddToCartButton
              lines={
                selectedVariant
                  ? [
                      {
                        merchandiseId: selectedVariant.id,
                        quantity: 1,
                      },
                    ]
                  : []
              }
            />
          </div>
          <div className="pt-2 animate-fade-in-up-delay-5">
            <AnimatedPaymentMethods />
          </div>
          <div className="overflow-hidden animate-fade-in-up-delay-6">
            <CommentSection />
          </div>
          <div className="mt-8 space-y-2 text-sm text-color-textLight group">
            <ExpandableCard
              className="animate-fade-in-up-delay-5"
              title="Opis"
              icon={<FaList />}
            >
              <div className="px-2">
                {selectedVariant?.metafields?.find(
                  (metafield: Maybe<Metafield>) =>
                    metafield?.key === 'trade_item_description',
                )?.value ?? ''}
              </div>
            </ExpandableCard>
            <ExpandableCard
              className="animate-fade-in-up-delay-3"
              title="Sposób użycia"
              icon={<FaShieldAlt />}
            >
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Nalej 500ml zimnej wody do butelki wielokrotnego użytku Reus.
                </li>

                <li>
                  Do butelki wrzuć tabletkę z wybranym środkiem czystości i
                  poczekaj aż całkowicie się rozpuści. Nie zakręcaj butelki!
                </li>

                <li>
                  Gdy tabletka całkowicie się rozpuści, zakręć butelkę. Twój
                  produkt jest gotowy do użytku.
                </li>
              </ol>
              <p>Wstrząśnij przed użyciem.</p>
            </ExpandableCard>

            <ExpandableCard
              className="animate-fade-in-up-delay-4"
              title="Składniki"
              icon={<FaList />}
            >
              <RichText
                className="px-2"
                data={
                  selectedVariant?.metafields?.find(
                    (metafield: Maybe<Metafield>) =>
                      metafield?.key === 'composition',
                  )?.value ?? ''
                }
              />
            </ExpandableCard>

            <ExpandableCard
              className="animate-fade-in-up-delay-6"
              title="Dostawa i płatność"
              icon={<FaTruck />}
            >
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Ekspresowa wysyłka – Zamówienia złożone do 12:00 wysyłamy w
                  ten sam dzień
                </li>

                <li>
                  Do pakowania używamy 100% eko rozwiązań. Karton z recyklingu
                  wypełniamy skropakiem, który jest biodegradowalny i
                  kompostowalny
                </li>

                <li>
                  Elastyczna dostawa – zamawiaj do automatu paczkowego, punktu
                  odbioru lub z dostawą do domu
                </li>

                <li>Darmowa dostawa - do zamówień powyżej 79 zł</li>

                <li>
                  Płać wygodnie. Akceptujemy płatności kartką kredytową, BLIK,
                  Apple Pay, Przelewy24
                </li>
              </ul>
            </ExpandableCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
