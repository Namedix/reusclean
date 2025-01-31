import type {IconType} from 'react-icons';
import {LiaShippingFastSolid} from 'react-icons/lia';
import {SlPresent} from 'react-icons/sl';
import {CiReceipt} from 'react-icons/ci';
import AnimateOnAppear from './AnimateOnAppear';
import {FreeShippingPromo} from './FreeShippingPromo';

interface GrantiesProps {
  className?: string;
}

const Granties = ({className}: GrantiesProps) => {
  return (
    <AnimateOnAppear>
      <div className={`container mt-4 md:mt-8 ${className}`}>
        <div className="bg-color-gray grid grid-cols-1 md:grid-cols-3 justify-start rounded-md p-4 gap-4 md:px-8 relative">
          <AnimateOnAppear>
            <Grantie
              title="Ekspresowa wysyłka"
              description="Wysyłka w ten sam dzień."
              image={LiaShippingFastSolid}
            />
          </AnimateOnAppear>
          <AnimateOnAppear animation="animate-fade-in-up md:animate-fade-in-up-delay-2">
            <Grantie
              title="Prezent na start"
              description="Gratis do pierwszych zamówień!"
              image={SlPresent}
            />
          </AnimateOnAppear>
          <AnimateOnAppear animation="animate-fade-in-up md:animate-fade-in-up-delay-3">
            <Grantie
              title="Darmowa dostawa"
              description="Od zamówień powyżej 79 zł."
              image={CiReceipt}
            />
          </AnimateOnAppear>
        </div>
      </div>
    </AnimateOnAppear>
  );
};

interface GrantieProps {
  className?: string;
  title: string;
  description: string;
  image: IconType;
}

const Grantie = ({title, description, image, className}: GrantieProps) => {
  return (
    <div
      className={`flex grid-cols-2 justify-start md:justify-center items-center gap-4 w-full ${className}`}
    >
      <div className="flex bg-color-white p-3 rounded-md">
        {image({size: 20})}
      </div>
      <div className="flex-col">
        <div className="text-sm font-bold">{title}</div>
        <div className="text-xs font-medium text-color-textLight">
          {description}
        </div>
      </div>
    </div>
  );
};

export default Granties;
