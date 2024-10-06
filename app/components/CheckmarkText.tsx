interface CheckmarkTextProps {
  className?: string;
  text: string;
}

const CheckmarkText = ({text, className}: CheckmarkTextProps) => {
  return (
    <div className={`flex items-start space-x-2 ${className}`}>
      <svg
        className="w-5 h-5 text-color-blue flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        ></path>
      </svg>
      <span className="text-color-textLight text-sm">{text}</span>
    </div>
  );
};

export default CheckmarkText;
