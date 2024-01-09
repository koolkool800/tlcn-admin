import { useState, useEffect } from 'react';

const useScrollTop = (): number => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      setScrollTop(currentPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollTop;
};

export default useScrollTop;
