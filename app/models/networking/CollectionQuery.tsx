export const COLLECTION_QUERY = `#graphql
  query CollectionDetails($id: ID!) {
    collection(id: $id) {
    id
    title
    products(first: 4) {
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
            metafields(
              identifiers: [
                {key: "mintabprice", namespace: "custom"},
              ]
            ) {
              key
              value
            }
          }
        }
      }
    }
  }
` as const;

export const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment ProductCard on Product {
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
    metafields(
      identifiers: [
        {key: "mintabprice", namespace: "custom"},
      ]
    ) {
      key
      value
    }
  }
` as const;

export const GET_ALL_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query getAllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          ...ProductCard
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
` as const;
