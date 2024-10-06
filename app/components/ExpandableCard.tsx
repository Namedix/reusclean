import React, {useState} from 'react';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';
import AnimateOnAppear from './AnimateOnAppear';

interface ExpandableCardProps {
  className?: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  icon,
  children,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <AnimateOnAppear>
      <div className={`rounded-lg overflow-hidden ${className}`}>
        <button
          className="w-full flex items-center justify-between p-4 bg-color-gray"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-2 text-color-textLight">
            {icon}
            <span className="font-semibold text-sm">{title}</span>
          </div>
          {isExpanded ? (
            <FaChevronUp className="text-color-textLight" />
          ) : (
            <FaChevronDown className="text-color-textLight" />
          )}
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-2 bg-color-gray">{children}</div>
        </div>
      </div>
    </AnimateOnAppear>
  );
};

export default ExpandableCard;
