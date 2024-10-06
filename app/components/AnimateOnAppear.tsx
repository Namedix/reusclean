import {useState, useEffect, useRef} from 'react';

interface AnimateOnAppearProps {
  animation?: string;
  children: React.ReactNode;
}

const AnimateOnAppear: React.FC<AnimateOnAppearProps> = ({
  animation = 'animate-fade-in-up',
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {threshold: 0.1},
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={ref} className="group">
      <div
        className={`animate-on-appear ${
          isVisible ? ` ${animation} opacity-100` : 'opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default AnimateOnAppear;
