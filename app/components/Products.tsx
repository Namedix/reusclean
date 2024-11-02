import {Link} from '@remix-run/react';
import AnimateOnAppear from './AnimateOnAppear';
import type {ProductCardFragment} from 'storefrontapi.generated';
import {useState} from 'react';

interface PorductsProps {
  products: ProductCardFragment[];
  colCount: number;
}

const Products = ({products, colCount}: PorductsProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <AnimateOnAppear>
      <div className={`${colCount > 4 ? `` : `container`} mt-8`}>
        <div
          className={`grid grid-cols-2 ${
            colCount > 4 ? 'md:grid-cols-6' : 'md:grid-cols-4'
          } gap-4`}
        >
          {products.map((product) => (
            <Link
              to={`/product/${product.handle}`}
              key={product.id}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex flex-col">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <img
                    src={product.media.edges[0].node.image?.url}
                    alt={`${product.title}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                      hoveredId === product.id &&
                      product.media.edges[1]?.node.image?.url
                        ? 'opacity-0'
                        : 'opacity-100'
                    }`}
                  />
                  {product.media.edges[1]?.node.image?.url && (
                    <img
                      src={product.media.edges[1].node.image.url}
                      alt={`${product.title} alternate view`}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                        hoveredId === product.id
                          ? 'opacity-100 scale-110'
                          : 'opacity-0 scale-100'
                      }`}
                    />
                  )}
                </div>
                <div
                  className={`text-center text-color-text mt-4 ${
                    colCount > 4 ? `md:text-sm` : ``
                  }`}
                >
                  {product.title}
                </div>
                <div className="text-center text-color-textLight font-semibold mt-2">
                  {Number(product.priceRange.minVariantPrice.amount).toFixed(2)}
                  zł
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AnimateOnAppear>
  );
};

export default Products;
