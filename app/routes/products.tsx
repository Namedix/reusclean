import type {LoaderFunctionArgs} from '@remix-run/server-runtime';
import {defer} from '@remix-run/server-runtime';
import type {MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import Products from '~/components/Products';
import type {ProductCardFragment} from 'storefrontapi.generated';
import {GET_ALL_PRODUCTS_QUERY} from '~/models/networking/CollectionQuery';

export const meta: MetaFunction = () => {
  return [{title: 'Reus | Nasze Produkty'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {products} = await storefront.query(GET_ALL_PRODUCTS_QUERY, {
    variables: {
      first: 20,
    },
  });

  return defer({products});
}

const ProductsView = () => {
  const {products} = useLoaderData<typeof loader>();
  const productCards: ProductCardFragment[] = products.edges
    .filter((edge: any) => edge.node.handle !== 'zestaw-startowy-1')
    .map((edge: any) => edge.node);

  return (
    <div className="container">
      <div className="text-xl pt-8 animate-fade-in-up">Nasze Produkty</div>
      {products && <Products colCount={6} products={productCards} />}
    </div>
  );
};

export default ProductsView;
