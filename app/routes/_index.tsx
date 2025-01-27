import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import type {
  Product,
  ProductVariant,
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
import {Analytics} from '@shopify/hydrogen';
import AdvantagesSection from '~/components/AdvantagesSection';
import CompareProduct from '~/components/CompareProduct';
import TabletDetails from '~/components/TabletDetails';
import Consequences from '~/components/Consequences';
import ReusDetails from '~/components/ReusDetails';
import Promises from '~/components/Promises';
import AnimatedCompanies from '~/components/AnimatedCompanies';

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
    product?.variants?.nodes[0] || null,
  );

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
      <TabletDetails />
      <ReusDetails />
      <Promises />
      <SectionStarter
        id="consequences"
        tag="Co się stanie, jeśli nie zaczniesz?"
        title="Konsekwencje zdrowotne ekspozycji na toksyny"
        description=""
      />
      <Consequences />
      <SectionStarter
        id="how-it-work"
        tag="Jak to zrobić?"
        title="Przygotowanie płynu jest dziecinnie proste!"
        description="Jedna butelka starczy Ci na całe życie, a dzięki wygodnym tabletkom zaoszczędzisz miejsce w szafie!"
      />
      <HowToUse />
      <CompareProduct />
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
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price?.amount || '0',
              vendor: product.vendor || '',
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}
