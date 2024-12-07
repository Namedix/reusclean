import React, {useEffect} from 'react';

const SnowAnimation = () => {
  useEffect(() => {
    const snowflakes = document.querySelectorAll('.snow');
    snowflakes.forEach((snow, index) => {
      (snow as HTMLElement).style.setProperty('--n', Math.random() * 100 + '');
    });
  }, []);

  return (
    <div className="snow-container">
      {[...Array(50)].map((_, index) => (
        <div key={index} className="snow" />
      ))}
    </div>
  );
};

export default SnowAnimation;
