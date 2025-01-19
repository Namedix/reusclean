import type {EntryContext, AppLoadContext} from '@shopify/remix-oxygen';
import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  context: AppLoadContext,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    defaultSrc: [
      "'self'",
      '*.google.com',
      '*.google-analytics.com',
      '*.googletagmanager.com',
      '*.facebook.net',
      '*.facebook.com',
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      'https://cdn.shopify.com',
      'https://cdn.jsdelivr.net',
      'https://fonts.googleapis.com',
      'https://www.googletagmanager.com',
      'http://localhost:*',
    ],
    fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
    imgSrc: [
      "'self'",
      'data:',
      'https://fonts.gstatic.com',
      '*.google-analytics.com',
      '*.googletagmanager.com',
      'https://cdn.shopify.com',
      '*.facebook.com',
      '*.facebook.net',
    ],
    connectSrc: ['*.google-analytics.com', '*.facebook.com', '*.facebook.net'],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
