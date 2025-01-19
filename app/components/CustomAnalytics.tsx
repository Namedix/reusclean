import {Script, useAnalytics, useNonce} from '@shopify/hydrogen';
import {useEffect} from 'react';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function CustomAnalytics() {
  const {subscribe, canTrack} = useAnalytics();
  const nonce = useNonce();

  useEffect(() => {
    setTimeout(() => {
      const isTrackingAllowed = canTrack();
      console.log('CustomAnalytics - isTrackingAllowed', isTrackingAllowed);
    }, 1000);
    // Standard events
    subscribe('page_viewed', (data) => {
      window.dataLayer?.push({
        event: 'page_viewed',
        page_data: data,
      });
    });
    subscribe('product_viewed', (data) => {
      window.dataLayer?.push({
        event: 'product_viewed',
        product_data: data,
      });
    });
    subscribe('collection_viewed', (data) => {
      window.dataLayer?.push({
        event: 'collection_viewed',
        collection_data: data,
      });
    });
    subscribe('cart_viewed', (data) => {
      window.dataLayer?.push({
        event: 'cart_viewed',
        cart_data: data,
      });
    });
    subscribe('cart_updated', (data) => {
      window.dataLayer?.push({
        event: 'cart_updated',
        cart_data: data,
      });
    });

    // Custom events
    subscribe('custom_sidecart_viewed', (data) => {
      window.dataLayer?.push({
        event: 'sidecart_viewed',
        cart_data: data,
      });
    });
  }, []);

  const id = 'GTM-PJ4Z2CLX';
  if (!id) {
    return null;
  }

  return (
    <>
      <script
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `
              dataLayer = window.dataLayer || [];

              function gtag(){
                dataLayer.push(arguments)
              };

              gtag('js', new Date());
              gtag({'gtm.start': new Date().getTime(),event:'gtm.js'})
              gtag('config', "${id}");
          `,
        }}
      />

      <Script async src={`https://www.googletagmanager.com/gtm.js?id=${id}`} />
    </>
  );
}
