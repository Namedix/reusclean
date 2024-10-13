import React, {useState, useEffect} from 'react';
import {Footer} from './Footer';
import Header from './Header';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

interface PageLayoutProps {
  children?: React.ReactNode;
  cart: Promise<CartApiQueryFragment | null>;
}

export function PageLayout({children = null, cart}: PageLayoutProps) {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeaderHeight((entry.target as HTMLElement).offsetHeight);
      }
    });

    if (header) {
      resizeObserver.observe(header);
    }

    return () => {
      if (header) {
        resizeObserver.unobserve(header);
      }
    };
  }, []);

  return (
    <div>
      <Header cart={cart} />
      <main style={{paddingTop: `${headerHeight}px`}}>{children}</main>
      <Footer />
    </div>
  );
}
