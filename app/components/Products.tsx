import {Link} from '@remix-run/react';
import AnimateOnAppear from './AnimateOnAppear';
import type {ProductCardFragment} from 'storefrontapi.generated';

interface PorductsProps {
  products: ProductCardFragment[];
  colCount: number;
}

const Products = ({products, colCount}: PorductsProps) => {
  return (
    <AnimateOnAppear>
      <div className={`${colCount > 4 ? `` : `container`} mt-8`}>
        <div
          className={`grid grid-cols-2 ${
            colCount > 4 ? 'md:grid-cols-6' : 'md:grid-cols-4'
          } gap-4`}
        >
          {products.map((product) => (
            <Link to={`/product/${product.handle}`} key={product.id}>
              <div
                className="from-yellow-50 items-center justify-center"
                key={product.id}
              >
                <img
                  src={product.media.edges[0].node.image?.url}
                  alt={`${product.title}`}
                  className="rounded-xl"
                />
                <div
                  className={`text-center text-color-text mt-4 ${
                    colCount > 4 ? `md:text-sm` : ``
                  }`}
                >
                  {product.title}
                </div>
                <div className="text-center text-color-textLight font-semibold  mt-2">
                  {product.priceRange.minVariantPrice.amount}zł
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
