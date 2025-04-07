
import { useRef, useEffect } from 'react';

interface MagneticOptions {
  strength?: number;
  radius?: number;
  ease?: number;
}

const useMagnetic = <T extends HTMLElement>(options: MagneticOptions = {}) => {
  const { 
    strength = 0.3, 
    radius = 300,
    ease = 0.15
  } = options;
  
  const ref = useRef<T>(null);
  const boundingRef = useRef<DOMRect | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    
    const activate = () => {
      if (!element) return;
      boundingRef.current = element.getBoundingClientRect();
    };
    
    const deactivate = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      element.style.transform = '';
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!boundingRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = boundingRef.current;
      
      // Center point of the element
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Distance between mouse and center
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      // Distance between mouse and center (Pythagorean theorem)
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      
      // If the mouse is within our defined radius
      if (distance < radius) {
        // Calculate movement amount based on distance and strength
        const intensity = (radius - distance) / radius;
        targetX = distanceX * intensity * strength;
        targetY = distanceY * intensity * strength;
        
        if (!animationRef.current) {
          animateElement();
        }
      } else {
        // Reset if the mouse is outside the radius
        targetX = 0;
        targetY = 0;
      }
    };
    
    const animateElement = () => {
      // Apply easing
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      
      // Apply transformation
      element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      
      // Continue animation only if there's significant movement
      if (
        Math.abs(targetX - currentX) > 0.1 || 
        Math.abs(targetY - currentY) > 0.1
      ) {
        animationRef.current = requestAnimationFrame(animateElement);
      } else {
        element.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
        animationRef.current = null;
      }
    };
    
    // Add event listeners
    element.addEventListener('mouseenter', activate);
    element.addEventListener('mouseleave', deactivate);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      element.removeEventListener('mouseenter', activate);
      element.removeEventListener('mouseleave', deactivate);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [strength, radius, ease]);
  
  return ref;
};

export default useMagnetic;
