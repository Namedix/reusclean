import {useState, useEffect} from 'react';

interface CookieBannerProps {
  currentConsent: boolean;
  onConsentChange: (consent: boolean) => void;
}

export function CookieBanner({
  currentConsent,
  onConsentChange,
}: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner only if consent hasn't been set yet
    const hasStoredConsent = localStorage.getItem('cookieConsent');
    if (hasStoredConsent === null) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    onConsentChange(true);
    setIsVisible(false);
  };

  const declineCookies = () => {
    onConsentChange(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50 border-t-[1px] border-neutral-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          <p>
            W celu personalizowania Twoich doświadczeń, prowadzenia działań
            marketingowych i zbierania danych analitycznych używamy plików
            cookie i innych technologii. Więcej informacji na ten temat zawiera
            nasza Polityka prywatności.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Odrzuć
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 text-sm bg-color-blue text-white rounded-md hover:bg-blue-600"
          >
            Akceptuj
          </button>
        </div>
      </div>
    </div>
  );
}
