import {
  useNonce,
  getShopAnalytics,
  Analytics,
  useAnalytics,
  Script,
} from '@shopify/hydrogen';
import {defer} from '@shopify/remix-oxygen';
import type {SerializeFrom, LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useRouteError,
  useRouteLoaderData,
  ScrollRestoration,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
  useMatches,
  Link,
} from '@remix-run/react';
import appStyles from '~/styles/app.css?url';
import {PageLayout} from '~/components/PageLayout';
import {useState, useEffect} from 'react';
import {CookieBanner} from '~/components/CookieBanner';
import {GoogleTagManager} from './components/GoogleTagManager';
import SnowAnimation from '~/components/SnowAnimation';

// Add this type declaration at the top of the file
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export type RootLoader = typeof loader;

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  return defaultShouldRevalidate;
};

export function links() {
  return [
    {rel: 'stylesheet', href: appStyles},
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
    },
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: './assets/reus.svg'},
  ];
}

export const useRootLoaderData = () => {
  const [root] = useMatches();
  return root?.data as SerializeFrom<typeof loader>;
};

export async function loader(args: LoaderFunctionArgs) {
  const deferredData = loadDeferredData(args);

  const {storefront, env} = args.context;

  return defer({
    ...deferredData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
    },
  });
}

function loadDeferredData({context}: LoaderFunctionArgs) {
  const {customerAccount, cart} = context;
  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
  };
}

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();
  const data = useRouteLoaderData<RootLoader>('root');
  const {register, customerPrivacy} = useAnalytics();
  const {ready} = register('ThirdPartyConsent');

  const [consent, setConsent] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedConsent = localStorage.getItem('cookieConsent');
      return savedConsent === 'true';
    }
    return false;
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) setConsent(savedConsent === 'true');
    updateAnalytics(savedConsent === 'true');
  }, []);

  const handleConsentChange = (userConsent: boolean) => {
    setConsent(userConsent);
    localStorage.setItem('cookieConsent', String(userConsent));
    updateAnalytics(userConsent);
  };

  const updateAnalytics = (userConsent: boolean) => {
    const trackingConsent = {
      marketing: userConsent,
      analytics: userConsent,
      preferences: userConsent,
      sale_of_data: userConsent,
    };

    // Update Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        ad_user_data: userConsent ? 'granted' : 'denied',
        ad_personalization: userConsent ? 'granted' : 'denied',
        ad_storage: userConsent ? 'granted' : 'denied',
        analytics_storage: userConsent ? 'granted' : 'denied',
      });
    }

    customerPrivacy?.setTrackingConsent(
      trackingConsent,
      (result: {error: string} | undefined) => {
        if (result?.error) {
          console.error(
            'Error syncing ThirdParty with Shopify customer privacy',
            result,
          );
          return;
        }

        ready();
      },
    );
  };
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-R10D2X8MV1"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PJ4Z2CLX');`,
          }}
        ></Script>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
            var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
            ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};


              ttq.load('CT1G33BC77UB52N3E4UG');
              ttq.page();
            }(window, document, 'ttq');
            `,
          }}
        />
      </head>
      <body>
        <SnowAnimation />
        <noscript>
          <iframe
            title="Google Tag Manager"
            src="https://www.googletagmanager.com/ns.html?id=GTM-PJ4Z2CLX"
            height="0"
            width="0"
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
          ></iframe>
        </noscript>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-R10D2X8MV1"
        />
        <script
          async
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'GTM-R10D2X8MV1', {
                  page_path: window.location.pathname,
                });
              `,
          }}
        />
        {data ? (
          <Analytics.Provider
            cart={data.cart}
            shop={data.shop}
            consent={data.consent}
          >
            <PageLayout cart={data.cart}>{children}</PageLayout>
            <GoogleTagManager />
            {!consent && (
              <CookieBanner
                currentConsent={consent}
                onConsentChange={handleConsentChange}
              />
            )}
          </Analytics.Provider>
        ) : (
          children
        )}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-color-blue">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-color-text sm:text-5xl">
          Nie znaleziono strony
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Przepraszamy, nie mogliśmy znaleźć strony, której szukasz.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-color-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Wróć do strony głównej
          </Link>
          <Link to="/" className="text-sm font-semibold text-color-text">
            Skontaktuj się z pomocą techniczną{' '}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
