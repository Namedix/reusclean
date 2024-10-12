import {Swiper, SwiperSlide} from 'swiper/react';
import type {Swiper as SwiperType} from 'swiper';
import 'swiper/css';
import '../styles/app.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import {EffectCards, Navigation, Pagination} from 'swiper/modules';
import {useRef, useState} from 'react';
import CheckmarkText from './CheckmarkText';
import {FaList, FaShieldAlt, FaShoppingCart, FaTruck} from 'react-icons/fa'; // Add this import
import AnimatedPaymentMethods from './AnimatedPaymentMethods';
import CommentSection from './CommentSection';
import ExpandableCard from './ExpandableCard';
import AnimatedTicker from './AnimatedTicker';
import type {
  Product,
  ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';
import {CartForm} from '@shopify/hydrogen';
import {AddToCartButton} from './AddToCartButton';

interface ProductViewPreps {
  product: Product;
}

const ProductView = ({product}: ProductViewPreps) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.nodes[0],
  );
  const swiperRef = useRef<SwiperType | null>(null);

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
    const slideIndex = product.variants.nodes.findIndex(
      (node) => node === variant,
    );
    if (swiperRef.current) {
      swiperRef.current.slideTo(slideIndex);
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    const newVariant = product.variants.nodes[swiper.activeIndex];
    setSelectedVariant(newVariant);
  };

  const addToCart = async (variant: ProductVariant) => {
    console.log('Adding to cart:', variant);
  };

  return (
    <div className="container mt-4 md:pt-8" id="starter-set">
      <div className="md:grid md:grid-cols-2 gap-12">
        <div className="md:sticky md:top-20 md:self-start animate-fade-in-up">
          <Swiper
            className="rounded-xl custom-swiper md:mt-12"
            modules={[Navigation, Pagination, EffectCards]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              enabled: true,
            }}
            color={'FFFFFF'}
            pagination={{clickable: true}}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={handleSlideChange}
          >
            {product?.images?.edges?.map((edge, index) => (
              <SwiperSlide key={edge.node.id}>
                <img src={edge.node.url} alt={`Slide ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex flex-col space-y-2 md:space-y-4 mt-2 md:mt-0">
          <div className="flex items-center space-x-2 animate-fade-in-up-delay-1">
            <div className="flex -space-x-2">
              {[
                './app/assets/Avatar.png',
                './app/assets/Avatar2.png',
                './app/assets/Avatar3.png',
                './app/assets/Avatar4.png',
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

          <div className="flex items-center space-x-2 animate-fade-in-up-delay-3">
            <span className="font-bold">{selectedVariant?.price.amount}zł</span>
            <span className="text-gray-500 line-through">
              {selectedVariant?.compareAtPrice?.amount} zł
            </span>
            <AnimatedTicker />
          </div>
          <div className="mt-2" />
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
              className="animate-fade-in-up-delay-3"
              title="Jak używać"
              icon={<FaShieldAlt />}
            >
              <p>
                Gotowe płyn uniwersalny Lessly jest równie skuteczne jak
                standardowe i popularne środki czystości. Siła natury bez
                kompromisów.
              </p>
              <p>skutecznie usuwa kurz, roztocza i drobne zabrudzenia</p>
              <p>
                bezpieczna dla domowych powierzchni jak szkło, kamień, drewno
              </p>
              <p>do codziennych, mniej wymagających porządków</p>
              <h3 className="font-semibold mt-4">Jak przygotować?</h3>
              <ol className="list-decimal list-inside mt-2">
                <li>
                  Wlej ciepłą wodę do butelki a następnie wsyp zawartość
                  saszetki.
                </li>
                <li>
                  Poczekaj, aż proszek się rozpuści - zazwyczaj trwa to około 1
                  minuty.
                </li>
                <li>Zakręć butelkę i gotowe.</li>
              </ol>
              <p className="mt-2">
                Zawsze postępuj zgodnie z instrukcją na odwrocie saszetki.
              </p>
            </ExpandableCard>

            <ExpandableCard
              className="animate-fade-in-up-delay-4"
              title="Składniki"
              icon={<FaList />}
            >
              {/* Add content for ingredients */}
              <p>Lista składników produktu...</p>
            </ExpandableCard>

            <ExpandableCard
              className="animate-fade-in-up-delay-5"
              title="Wysyłka i zwroty"
              icon={<FaTruck />}
            >
              {/* Add content for shipping and returns */}
              <p>Informacje o wysyłce i zwrotach...</p>
            </ExpandableCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
