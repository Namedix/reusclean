import {PRODUCT_CARD_FRAGMENT} from './CollectionQuery';

export const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
    }
    id
    image {
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
    metafields(
      identifiers: [
        {key: "composition", namespace: "custom"},
        {key: "package_description", namespace: "custom"},
        {key: "allegro", namespace: "custom"}
      ]
    ) {
      key
      value
    }
  }
` as const;

export const PRODUCT_FRAGMENT = `#graphql
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
    images(sortKey: POSITION, first: 20) {
      edges {
        node {
          id
          url
          altText
        }
      }
    }
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
    metafields(
      identifiers: [
        {key: "composition", namespace: "custom"},
        {key: "package_description", namespace: "custom"},
        {key: "allegro", namespace: "custom"}
      ]
    ) {
      key
      value
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

export const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 8) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

export const VARIANTS_QUERY = `#graphql
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

export const COLLECTION_FRAGMENT = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
  }
` as const;

export const PRODUCT_WITH_COLLECTION_QUERY = `#graphql
  ${PRODUCT_FRAGMENT}
  ${COLLECTION_FRAGMENT}
  query ProductWithCollection($handle: String!) {
    product(handle: $handle) {
      ...Product
      collections(first: 1) {
        nodes {
          ...Collection
          products(first: 10) {
            edges {
                node {
                id
                title
                handle
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
    }
  }
` as const;
