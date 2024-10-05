import {Footer} from '~/components/Footer';
import {Header} from '~/components/Header';

interface PageLayoutProps {
  children?: React.ReactNode;
}

export function PageLayout({children = null}: PageLayoutProps) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
