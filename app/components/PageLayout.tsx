import {Footer} from './Footer';
import Header from './Header';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

interface PageLayoutProps {
  children?: React.ReactNode;
  cart: Promise<CartApiQueryFragment | null>;
}

export function PageLayout({children = null, cart}: PageLayoutProps) {
  return (
    <div>
      <Header cart={cart} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
