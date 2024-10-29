import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {getSelectedProductOptions} from '@shopify/hydrogen';
import type {
  Product,
  ProductVariant,
  SelectedOption,
} from '@shopify/hydrogen/storefront-api-types';
import Granties from '~/components/Granties';
import BigImages from '~/components/BigImages';
import SectionStarter from '~/components/SectionStarter';
import HowToUse from '~/components/HowToUse';
import Faq from '~/components/Faq';
import Opinions from '~/components/Opinions';
import CallToAction from '~/components/CallToAction';
import {opinions} from '~/models/opinion';
import Products from '~/components/Products';
import ProductView from '~/components/Product';
import {PRODUCT_QUERY} from '~/models/networking/ProductQuery';
import {COLLECTION_QUERY} from '~/models/networking/CollectionQuery';
import {useState, useEffect} from 'react';

export const meta: MetaFunction = () => {
  return [{title: 'Reus | Zestaw startowy'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const [{product}, {collection}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {
        handle: 'zestaw-startowy-1',
      },
    }),
    storefront.query(COLLECTION_QUERY, {
      variables: {
        id: 'gid://shopify/Collection/618393239878',
      },
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  return {
    product,
    collection,
  };
}

export default function Homepage() {
  const {product, collection} = useLoaderData<typeof loader>();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    // Add fallback to first variant if no variant is selected
    product?.variants?.nodes[0] || null,
  );

  // Add useEffect to set first variant when product changes or selectedVariant is null
  useEffect(() => {
    if (product?.variants?.nodes[0] && !selectedVariant) {
      setSelectedVariant(product.variants.nodes[0]);
    }
  }, [product, selectedVariant]);

  return (
    <div className="home">
      <Granties className="hidden md:block" />
      {product && (
        <ProductView
          product={product as Product}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
      )}
      <Granties className="block md:hidden" />
      <BigImages />
      <SectionStarter
        id="how-it-work"
        tag="Jak to zrobić?"
        title="Przygotowanie płynu jest dziecinnie proste!"
        description="Jedna butelka starczy Ci na całe życie, a dzięki wygodnym tabletkom zaoszczędzisz miejsce w szafie!"
      />
      <HowToUse />
      <SectionStarter
        id="products"
        tag="Tabletki czyszczące"
        title="Refille w super cenie"
        description="Wybieraj z całego naszego asortymentu dostosowanego pod Ciebie!"
      />
      {collection && (
        <Products
          colCount={4}
          products={collection.products.edges.map((edge: any) => edge.node)}
        />
      )}
      <SectionStarter
        id="opinions"
        tag="Opinie"
        title="Przeczytaj prawdziwe recenzje klientów"
        description="Uczciwe opinie zadowolonych użytkowników"
      />
      <Opinions opinions={opinions} />
      <SectionStarter
        id="faq"
        tag="Dla ciekawych"
        title="Pytania i odpowiedzi"
        description="Poniżej te które często słyszymy!"
      />
      <Faq />
      {product && (
        <CallToAction
          product={product as Product}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
      )}
      <Granties />
    </div>
  );
}
