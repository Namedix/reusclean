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

interface CallToAction {
  product: Product;
}

const CallToAction = ({product}: CallToAction) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.nodes[0],
  );

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
      <div className="flex flex-col items-center p-6 max-w-md mx-auto">
        <img
          src="./app/assets/bottle.jpg"
          alt="Zestaw startowy"
          className="w-full max-w-[200px] h-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <div className="flex items-center gap-2 mb-2 w-full">
          <span className="text-lg text-color-text">
            {selectedVariant.price.amount}zł
          </span>
          <span className="text-lg line-through text-gray-500">
            {selectedVariant?.compareAtPrice?.amount}zł
          </span>
          <AnimatedTicker />
        </div>
        <div className="grid grid-cols-4 gap-4 animate-fade-in-up-delay-2">
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
          />
        </div>

        <AnimatedPaymentMethods />
      </div>
    </AnimateOnAppear>
  );
};

export default CallToAction;
