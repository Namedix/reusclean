import {useFetcher} from '@remix-run/react';
import type {action} from '~/routes/klaviyo.submit';
import {klaviyoListIds} from '~/utilities/constants';
import {useEffect} from 'react';

export const EmailSubscribeForm = () => {
  const fetcher = useFetcher<typeof action>();
  const isSuccess = fetcher.data?.success;

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('hasSubscribedNewsletter', 'true');
      window.dispatchEvent(new Event('newsletterSubscribed'));
    }
  }, [isSuccess]);

  return (
    <div className="mx-auto max-w-7xl lg:px-8">
      <div className="max-w-xl lg:max-w-lg">
        <h2 className="text-color-text text-lg font-semibold">Newsletter</h2>
        {isSuccess ? (
          <>
            <h2 className="text-color-text text-md mt-2">
              Dziękujemy za zapisanie się!
            </h2>
            <p className="mt-2 text-sm text-color-textLight">
              Sprawdź swoją skrzynkę email. Kod rabatowy -20% został wysłany na
              podany adres.
            </p>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm text-color-textLight">
              Za chwilę otrzymasz kod rabatowy -20% na podany adres email.
            </p>
            <fetcher.Form
              method="post"
              action="/klaviyo/submit"
              className="mt-6 flex max-w-md gap-x-4"
            >
              <input
                type="hidden"
                id="list_id"
                name="list_id"
                value={klaviyoListIds.EMAILS}
              />
              <label htmlFor="email" className="sr-only">
                Adres email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                placeholder="jan.kowalski@gmail.com"
                className="min-w-0 flex-auto rounded-md bg-white/5 py-2 px-3.5 text-base text-color-text border border-gray-200 outline-none focus:border-color-blue focus:ring-1 focus:ring-color-blue sm:text-sm/6"
              />
              <button
                type="submit"
                disabled={fetcher.state === 'loading'}
                className="flex-none rounded-md bg-color-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-color-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {fetcher.state === 'idle' ? 'Zapisz się' : 'Zapisywanie...'}
              </button>
            </fetcher.Form>
          </>
        )}
      </div>
    </div>
  );
};
