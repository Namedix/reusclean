import {Link} from '@remix-run/react';

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
          </div>
          <div className="flex flex-col gap-8 md:w-[250px]">
            <div className="text-color-text text-lg font-semibold">Reus</div>
            <div className="flex flex-col text-color-blue gap-2">
              <Link to="/blogs">Blog</Link>
              <div>Benefits</div>
              <div>Investing Strategies</div>
              <div>Pricing</div>
              <div>Security</div>
            </div>
          </div>
          <div className="flex flex-col gap-8 md:w-[250px]">
            <div className="text-color-text text-lg font-bold">Zasoby</div>
            <div className="flex flex-col text-color-blue gap-2">
              <div>FAQ</div>
              <div>Learn Center</div>
              <div>More product</div>
              <div>Help Center</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 justify-center border-t-2 border-neutral-200 py-8 gap-4">
          <span className="text-color-textLight">
            © 2024 – Reus • 🇵🇱 Stworzone w Polsce
          </span>
          <div className="grid grid-cols-3 md:flex justify-center md:justify-end gap-2 md:gap-6">
            {Object.entries(policyMap).map(([handle, title]) => (
              <p key={handle} className="mb-4">
                <Link to={`/policies/${handle}`} className="text-color-blue">
                  {title}
                </Link>
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
