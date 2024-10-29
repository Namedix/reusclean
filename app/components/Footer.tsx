import {Link} from '@remix-run/react';
import {div} from 'framer-motion/client';

const policyMap = {
  'privacy-policy': 'Polityka prywatności',
  'terms-of-service': 'Regulamin',
  'refund-policy': 'Polityka zwrotów',
};

export const Footer = () => {
  return (
    <footer className="text-center text-neutral-600 lg:text-left container mt-8">
      {/* <!-- Main container div: holds the entire content of the footer, including four sections (TW Elements, Products, Useful links, and Contact), with responsive styling and appropriate padding/margins. --> */}
      <div className="w-full py-6 md:py-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-0 justify-between pb-12 text-start">
          <div className="grow hidden md:block">
            <img src="/assets/reus.svg" alt="reus" height={60} width={60} />
            <p className="mt-4 mb-2 text-color-text">Znajdziesz nas</p>
            <SocialIcons className="hidden md:flex" />
            <p className="mt-4 mb-2 text-color-text">Bądźmy w kontakcie</p>
            <a
              href="mailto:info@reusclean.com"
              className="text-color-blue hover:underline"
            >
              info@reusclean.com
            </a>
          </div>
          <div className="flex flex-col gap-8 md:w-[250px]">
            <div className="text-color-text text-lg font-semibold">Reus</div>
            <div className="flex flex-col text-color-blue gap-2">
              <Link to="/about">O Nas</Link>
              <Link to="/products">Produkty</Link>
              <Link to="/blogs">Blog</Link>
            </div>
          </div>
          <div className="flex flex-col gap-8 md:w-[250px]">
            <div className="text-color-text text-lg font-bold">Zasoby</div>
            <div className="flex flex-col text-color-blue gap-2">
              <Link to="/#faq">FAQ</Link>
              <Link to="/policies/terms-of-service">Regulamin</Link>
              <Link to="/policies/privacy-policy">Polityka prywatności</Link>
              <Link to="/policies/refund-policy">Polityka zwrotów</Link>
              <Link to="/policies/shipping-policy">Polityka wysyłki</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center border-t-2 border-neutral-200 py-8 gap-4">
          <span className="text-color-textLight">
            © 2024 – Reus • 🇵🇱 Stworzone w Polsce
          </span>
          <div className="md:hidden flex justify-center">
            <SocialIcons className="grid grid-cols-3" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-color-textLight">
              Projekt współfinansowany ze środków Unii Europejskiej w ramach
              Funduszu Europejskiego.
            </p>
            <div className="flex gap-6 items-center">
              <img
                src="/assets/coofinanceWithEU.png"
                alt="Współfinansowane przez Unię Europejską"
                className="h-12 object-contain"
              />
              <img
                src="/assets/europeanFundsLogo.jpg"
                alt="Fundusze Europejskie"
                className="h-12 object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-color-textLight">
              Bezpieczne płatności obsługuje Przelewy24
            </p>
            <div className="flex gap-4 items-center flex-wrap justify-center">
              <img
                src="/assets/googlepay.png"
                alt="Visa"
                className="h-8 object-contain"
              />
              <img
                src="/assets/paypal.png"
                alt="Mastercard"
                className="h-8 object-contain"
              />
              <img
                src="/assets/maestro.png"
                alt="BLIK"
                className="h-8 object-contain"
              />
              <img
                src="/assets/mastercard.png"
                alt="BLIK"
                className="h-8 object-contain"
              />
              <img
                src="/assets/visa.png"
                alt="Przelewy24"
                className="h-8 object-contain"
              />
              <img
                src="/assets/applepay.png"
                alt="Przelewy24"
                className="h-8 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcons = ({className}: {className?: string}) => {
  return (
    <div className={className}>
      <a
        href="https://www.facebook.com/reusapp"
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4"
      >
        <svg
          className="w-6 h-6 text-color-blue"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      </a>
      <a
        href="https://www.tiktok.com/@reusapp"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 mr-2"
      >
        <svg
          className="w-6 h-6 text-color-blue"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"
            clipRule="evenodd"
          />
        </svg>
      </a>
      <a
        href="https://www.instagram.com/reusapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          className="w-6 h-6 text-color-blue"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
  );
};
