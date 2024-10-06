import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {reus} from '../assets';
import MenuSvg from '~/assets/MenuSvg';

const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };
  return (
    <header className="w-full bg-white ">
      <div className="md:container animate-fade-in-up">
        <div
          className={`flex-row md:flex transition-all w-full items-center px-5 border-b-[1px] border-neutral-200 gap-4 p-4`}
        >
          <div className="grow">
            <Link to="/" className="block items-center">
              <img src={reus} width={50} height={50} alt="reus" />
            </Link>
          </div>
          <nav
            className={`${
              openNavigation ? `pb-4 mt-6` : `hidden max-h-0`
            } md:flex left-0 right-0 bottom-0 items-center justify-center md:static md:opacity-100 md:max-h-max md:mx-auto transition-all duration-200 overflow-hidden`}
          >
            <div className="relative z-2 flex flex-col justify-center gap-6 md:flex-row">
              <Link to="/#starter-set">Zestaw startowy</Link>
              <Link to="/products">Produkty</Link>
              <Link to="/#how-it-work">Jak działa?</Link>
              <Link to="/#opinions">Opinie</Link>
              <Link to="/#faq">FAQ</Link>
            </div>
          </nav>
          <button
            className="absolute p-4 right-4 md:hidden top-5"
            onClick={toggleNavigation}
          >
            <MenuSvg openNavigation={openNavigation} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
