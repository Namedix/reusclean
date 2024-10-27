import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {getSelectedProductOptions} from '@shopify/hydrogen';
import type {
  Product,
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
  return (
    <div className="home">
      <Granties className="hidden md:block" />
      {product && <ProductView product={product as Product} />}
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
        tag="Opinie"
        title="Wyślij nam swoje pytania"
        description="Poniżej te które często są zadawane!"
      />
      <Faq />
      {product && <CallToAction product={product as Product} />}
      <Granties />
    </div>
  );
}
