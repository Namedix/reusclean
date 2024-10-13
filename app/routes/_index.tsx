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
import PRODUCT_CARD_FRAGMENT from './products';
import Products from '~/components/Products';
import ProductView from '~/components/Product';

export const meta: MetaFunction = () => {
  return [{title: 'Reus | Zestaw startowy'}];
};

export async function loader({context, request}: LoaderFunctionArgs) {
  const {storefront} = context;
  const [{product}, {collection}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {
        handle: 'zestaw-startowy',
        selectedOptions: getSelectedProductOptions(request),
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

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option: SelectedOption) =>
        option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
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
        tag="Jak to działa?"
        title="Dlaczego Reus jest taki super?"
        description="Butelki na całe życie i dokupujesz tylko koncentraty"
      />
      <HowToUse />
      <SectionStarter
        id="products"
        tag="Koncentraty"
        title="Koncentraty w super cenie"
        description="Wybieraj z całego naszego asortymentu dostosowanego pod ciebie!"
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

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
  images(first: 10) {
    edges {
      node {
        url
      }
    }
  }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 4) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
` as const;

const COLLECTION_QUERY = `#graphql
  query CollectionDetails($id: ID!) {
    collection(id: $id) {
    id
    title
    products(first: 4) {
      edges {
        node {
            id
            title
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            media(first: 10) {
              edges {
                node {
                  ... on MediaImage {
                    image {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
` as const;
