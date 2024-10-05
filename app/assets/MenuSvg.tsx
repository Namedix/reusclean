interface MenuSvg {
  openNavigation: boolean;
}

const MenuSvg = ({openNavigation}: MenuSvg) => {
  return (
    <svg
      className="overflow-visible"
      width="20"
      height="12"
      viewBox="0 0 20 12"
    >
      <rect
        className="transition-all origin-center"
        y={openNavigation ? '5' : '0'}
        width="20"
        height="2"
        rx="1"
        fill="#2A2A2A"
        transform={`rotate(${openNavigation ? '45' : '0'})`}
      />
      <rect
        className="transition-all origin-center"
        y={openNavigation ? '5' : '10'}
        width="20"
        height="2"
        rx="1"
        fill="#2A2A2A"
        transform={`rotate(${openNavigation ? '-45' : '0'})`}
      />
    </svg>
  );
};

export default MenuSvg;
