import AnimatedPaymentMethods from './AnimatedPaymentMethods';
import AnimatedTicker from './AnimatedTicker';
import {FaShoppingCart} from 'react-icons/fa';
import AnimateOnAppear from './AnimateOnAppear';
import {useState} from 'react';
import type {
  Product,
  ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';
import {AddToCartButton} from './AddToCartButton';

interface CallToActionProps {
  product: Product;
  selectedVariant: ProductVariant;
  setSelectedVariant: (variant: ProductVariant) => void;
}

const CallToAction = ({
  product,
  selectedVariant,
  setSelectedVariant,
}: CallToActionProps) => {
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
  };

  return (
    <AnimateOnAppear>
      <div className="flex flex-col items-center max-w-md mx-auto px-4">
        <img
          src={`/assets/${
            selectedVariant?.title === 'Kuchnia'
              ? 'zestawStartowyKuchnia.png'
              : selectedVariant?.title === 'Łazienka'
              ? 'zestawStartowyŁazienka.png'
              : selectedVariant?.title === 'Szyby'
              ? 'zestawStartowySzyby.png'
              : 'zestawStartowyUniversalny.png'
          }`}
          alt={`Zestaw startowy ${selectedVariant?.title}`}
          className="w-full max-w-[400px] h-auto mb-4 rounded-md"
        />
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <div className="flex items-center gap-2 mb-2 w-full">
          <span className="text-lg text-color-text">
            {selectedVariant.price.amount}zł
          </span>
          {selectedVariant?.compareAtPrice?.amount && (
            <span className="text-lg line-through text-gray-500">
              {selectedVariant.compareAtPrice.amount}zł
            </span>
          )}
          <AnimatedTicker />
        </div>
        <div className="grid grid-cols-4 gap-2 animate-fade-in-up-delay-2 w-full">
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
        <div className="w-full mt-2 mb-4">
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
            onAddToCartComplete={() => {
              if (product?.variants?.nodes?.[0]) {
                setSelectedVariant(product.variants.nodes[0]);
              }
            }}
          />
        </div>

        <AnimatedPaymentMethods />
      </div>
    </AnimateOnAppear>
  );
};

export default CallToAction;
