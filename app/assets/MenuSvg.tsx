import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';

interface MenuSvgProps {
  openNavigation: boolean;
}

const MenuSvg: React.FC<MenuSvgProps> = ({openNavigation}) => {
  return (
    <div className="h-7 w-7">
      {openNavigation ? (
        <XMarkIcon className="h-7 w-7 transition-all text-color-textLight" />
      ) : (
        <Bars3Icon className="h-7 w-7 transition-all text-color-textLight" />
      )}
    </div>
  );
};

export default MenuSvg;
