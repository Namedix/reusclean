import {useFetcher} from '@remix-run/react';
import {useState, useEffect} from 'react';
import type {action} from '~/routes/klaviyo.submit';
import {klaviyoListIds} from '~/utilities/constants';
import {XMarkIcon, TagIcon} from '@heroicons/react/24/outline';

export function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hasSubscribedNewsletter') === 'true';
    }
    return false;
  });
  const [isMinimizedHidden, setIsMinimizedHidden] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const fetcher = useFetcher<typeof action>();
  const isSuccess = fetcher.data?.success;

  useEffect(() => {
    if (isSuccess) {
      setIsBannerVisible(false);
      localStorage.setItem('hasSubscribedNewsletter', 'true');
    }
  }, [isSuccess]);

  const handleModalClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);

      if (!isSuccess) {
        // First make banner visible but off-screen
        setIsBannerVisible(true);
        setIsSliding(true);
        // Then slide it in after a brief delay
        setTimeout(() => {
          setIsSliding(false);
        }, 100);
      }
    }, 100);
  };

  const handleBannerClick = () => {
    setIsSliding(true);
    setIsBannerVisible(false);
    // Show modal with a slight delay
    setIsOpen(true);
    setIsSliding(false);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasSeenModal = localStorage.getItem('hasSeenNewsletterModal');
    const hasSubscribed = localStorage.getItem('hasSubscribedNewsletter');

    if (hasSubscribed) {
      setIsHidden(true);
      return;
    }

    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setIsHidden(false);
        localStorage.setItem('hasSeenNewsletterModal', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIsBannerVisible(true);
      setIsHidden(false);
    }
  }, []);

  // Add event listener for newsletter subscription
  useEffect(() => {
    const handleSubscription = () => {
      setIsHidden(true);
    };

    window.addEventListener('newsletterSubscribed', handleSubscription);
    return () =>
      window.removeEventListener('newsletterSubscribed', handleSubscription);
  }, []);

  // Add event listener for cart toggle
  useEffect(() => {
    const handleCartToggle = (event: CustomEvent) => {
      const {isOpen} = event.detail;
      if (isOpen) {
        setIsCartOpen(true);
      } else {
        setTimeout(() => {
          setIsCartOpen(false);
        }, 500);
      }
    };

    window.addEventListener('cartToggled', handleCartToggle as EventListener);

    return () => {
      window.removeEventListener(
        'cartToggled',
        handleCartToggle as EventListener,
      );
    };
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSliding(true);
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setIsMinimizedHidden(true);
    }, 300); // Match this with the transition duration
  };

  if (isHidden || isMinimizedHidden || isCartOpen) return null;

  return (
    <>
      {isOpen ? (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out
            ${isClosing ? 'bg-black/0' : 'bg-black/50'}`}
        >
          <div
            className={`relative flex flex-col md:flex-row w-full max-w-[800px] mx-4 sm:mx-auto bg-white rounded-lg overflow-hidden
              transition-all duration-300 ease-in-out
              ${
                isClosing
                  ? 'translate-y-full opacity-0'
                  : 'translate-y-0 opacity-100'
              }
              ${isOpen ? 'animate-slideUp' : ''}`}
          >
            {/* Image - top on mobile, left on desktop */}
            <div className="w-full md:w-1/2">
              <img
                src="/assets/subscriptionImage.jpg"
                alt="Product collection"
                className="w-full h-48 md:h-full object-cover"
              />
            </div>

            {/* Form - bottom on mobile, right on desktop */}
            <div className="w-full md:w-1/2 px-6 md:pt-4 pt-4 pb-4">
              {/* Close button */}
              <button
                onClick={handleModalClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              {isSuccess ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">
                      Dziękujemy za zapisanie się!
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Sprawdź swoją skrzynkę email. Kod rabatowy -20% został
                      wysłany na podany adres.
                    </p>
                    <button
                      onClick={handleModalClose}
                      className="w-full bg-color-blue text-white py-3 mb-2 rounded-lg font-semibold text-lg  transition-colors"
                    >
                      Przejdź do sklepu
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl text-color-text font-bold mt-4 md:mt-10 mb-2">
                    ODBLOKUJ 20% OFF
                  </h2>
                  <p className="text-color-textLight mb-6">
                    Zapisz się, aby otrzymać 20% rabatu na pierwsze zamówienie i
                    ekskluzywny dostęp do naszych najlepszych ofert.
                  </p>

                  <fetcher.Form
                    method="post"
                    action="/klaviyo/submit"
                    className="space-y-4"
                  >
                    <input
                      type="hidden"
                      id="list_id"
                      name="list_id"
                      value={klaviyoListIds.EMAILS}
                    />

                    <div>
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        required
                        placeholder="jan.kowalski@gmail.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-color-blue"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={fetcher.state === 'loading'}
                      className="w-full bg-color-blue text-white py-3 rounded-lg font-semibold text-lg transition-colors"
                    >
                      {fetcher.state === 'idle'
                        ? 'ZAPISZ MNIE!'
                        : 'Zapisywanie...'}
                    </button>

                    <button
                      type="button"
                      onClick={handleModalClose}
                      className="w-full text-color-textLight py-2 text-sm"
                    >
                      NIE, DZIĘKUJE
                    </button>
                  </fetcher.Form>
                </>
              )}
            </div>
          </div>
        </div>
      ) : isBannerVisible ? (
        <button
          onClick={handleBannerClick}
          className={`fixed bottom-4 right-4 z-50 bg-white shadow-md rounded-lg p-4 flex items-center gap-3 hover:shadow-lg border
            transition-all duration-300 ease-in-out
            ${isSliding ? 'translate-x-[200%]' : 'translate-x-0'}`}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-500/10 p-2">
              <TagIcon className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-left pr-2">
              <p className="text-sm text-gray-900">Odbierz -20%</p>
              <p className="text-xs text-gray-500">Kliknij, aby odebrać kod</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="ml-auto text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </button>
      ) : null}
    </>
  );
}
