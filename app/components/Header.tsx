import React, {Suspense, useState} from 'react';
import {Link} from 'react-router-dom';
import MenuSvg from '~/assets/MenuSvg';
import {ShoppingBagIcon, UsersIcon} from '@heroicons/react/24/outline';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {Await} from '@remix-run/react';
import Cart from '~/routes/cart';
import Headroom from 'react-headroom';

interface HeaderProps {
  cart: Promise<CartApiQueryFragment | null>;
}

const Header = ({cart}: HeaderProps) => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  const handleAccountClick = () => {
    window.open('https://reusclean.com/account', '_blank');
  };

  return (
    <header className="w-full bg-white ">
      <div className="md:container animate-fade-in-up">
        <div
          className={`flex-row md:flex transition-all w-full items-center px-5 border-b-[1px] border-neutral-200 gap-4 p-4`}
        >
          <button
            className="absolute top-7 left-5 md:hidden"
            onClick={toggleNavigation}
          >
            <MenuSvg openNavigation={openNavigation} />
          </button>
          <div className="flex items-center justify-center md:justify-start md:grow">
            <Link to="/" className="flex items-center">
              <img src="./assets/reus.svg" width={50} height={50} alt="reus" />
            </Link>
          </div>
          <nav
            className={`${
              openNavigation ? `pb-4 mt-6` : `hidden max-h-0`
            } md:flex left-0 right-0 bottom-0 items-center justify-center md:static md:opacity-100 md:max-h-max md:mx-auto transition-all duration-200 overflow-hidden`}
          >
            <div className="relative z-2 flex flex-col justify-center gap-6 md:flex-row pt-1">
              <Link onClick={toggleNavigation} to="/#starter-set">
                Zestaw startowy
              </Link>
              <Link onClick={toggleNavigation} to="/products">
                Produkty
              </Link>
              <Link onClick={toggleNavigation} to="/#how-it-work">
                Jak działa?
              </Link>
              <Link onClick={toggleNavigation} to="/#opinions">
                Opinie
              </Link>
              <Link onClick={toggleNavigation} to="/#faq">
                FAQ
              </Link>
            </div>
          </nav>
          <div className="absolute top-7 right-4 md:relative md:top-0 md:right-0 md:pl-4">
            <div className="flex gap-6 items-center">
              <button
                onClick={handleAccountClick}
                className="text-color-textLight text-sm md:text-md whitespace-nowrap"
              >
                <UsersIcon className="h-7 w-7 text-color-textLight" />
              </button>
              <button
                onClick={() => setOpenCart(!openCart)}
                className="flex items-center text-color-textLight"
              >
                <ShoppingBagIcon className="h-7 w-7 text-color-textLight" />
                <Suspense fallback={<p>0</p>}>
                  <Await resolve={cart}>
                    {(cart) => (
                      <span className="ml-1 pt-1 font-semibold text-color-textLight flex items-center">
                        {cart?.totalQuantity ?? 0}
                      </span>
                    )}
                  </Await>
                </Suspense>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Cart open={openCart} setOpen={setOpenCart} />
    </header>
  );
};

export default Header;
