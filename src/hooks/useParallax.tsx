
import { useState, useEffect, RefObject } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
}

export const useParallax = <T extends HTMLElement>(
  ref: RefObject<T>,
  options: ParallaxOptions = {}
) => {
  const { 
    speed = 0.1, 
    direction = 'vertical',
    reverse = false 
  } = options;
  
  const [position, setPosition] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if element is in view
      if (rect.top < windowHeight && rect.bottom > 0) {
        setIsInView(true);
        
        // Calculate position
        let newPosition;
        if (direction === 'vertical') {
          // The offset depends on how far the element is from the center of the viewport
          newPosition = (rect.top - windowHeight / 2) * speed;
        } else {
          // Horizontal parallax based on scroll position
          newPosition = window.scrollY * speed;
        }
        
        setPosition(reverse ? -newPosition : newPosition);
      } else {
        setIsInView(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial position calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, speed, direction, reverse]);

  const style = isInView ? {
    transform: direction === 'vertical' 
      ? `translateY(${position}px)` 
      : `translateX(${position}px)`,
    transition: 'transform 0.1s cubic-bezier(0.2, 0.49, 0.32, 0.99)'
  } : {};

  return { style, isInView };
};

export default useParallax;
