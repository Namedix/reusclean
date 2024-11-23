import {useAnalytics} from '@shopify/hydrogen';
import {useEffect} from 'react';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function GoogleTagManager() {
  const {subscribe, register} = useAnalytics();
  const {ready} = register('Google Tag Manager');

  useEffect(() => {
    subscribe('page_viewed', (data) => {
      window.dataLayer.push({event: 'viewed-page'});
    });
    subscribe('product_viewed', (data) => {
      window.dataLayer.push({event: 'viewed-product'});
    });
    subscribe('collection_viewed', (data) => {
      window.dataLayer.push({event: 'viewed-collection'});
    });
    subscribe('cart_viewed', (data) => {
      window.dataLayer.push({event: 'viewed-cart'});
    });
    subscribe('cart_updated', (data) => {
      window.dataLayer.push({event: 'updated-cart'});
    });

    ready();
  }, []);

  return null;
}
