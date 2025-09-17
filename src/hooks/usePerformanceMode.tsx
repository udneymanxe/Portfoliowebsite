import { useState, useEffect } from 'react';

interface PerformanceSettings {
  reduceAnimations: boolean;
  reduceParticles: boolean;
  simplifyEffects: boolean;
  isMobile: boolean;
  isLowEnd: boolean;
}

export const usePerformanceMode = (): PerformanceSettings => {
  const [settings, setSettings] = useState<PerformanceSettings>({
    reduceAnimations: false,
    reduceParticles: false,
    simplifyEffects: false,
    isMobile: false,
    isLowEnd: false,
  });

  useEffect(() => {
    const detectPerformanceCapabilities = () => {
      // Detect mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                       window.innerWidth < 768 || 
                       'ontouchstart' in window;

      // Detect low-end device capabilities
      const hardwareConcurrency = navigator.hardwareConcurrency || 2;
      const deviceMemory = (navigator as any).deviceMemory || 2;
      const connection = (navigator as any).connection;
      
      const isLowEnd = hardwareConcurrency <= 2 || 
                       deviceMemory <= 2 || 
                       (connection && connection.effectiveType && 
                        ['slow-2g', '2g', '3g'].includes(connection.effectiveType));

      // Check for user preference for reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const newSettings: PerformanceSettings = {
        isMobile,
        isLowEnd,
        reduceAnimations: prefersReducedMotion || isLowEnd || isMobile,
        reduceParticles: isLowEnd || isMobile,
        simplifyEffects: isLowEnd || (isMobile && isLowEnd),
      };

      setSettings(newSettings);
    };

    detectPerformanceCapabilities();
    
    // Listen for changes in network conditions or window size
    const handleResize = () => detectPerformanceCapabilities();
    const handleConnectionChange = () => detectPerformanceCapabilities();
    
    window.addEventListener('resize', handleResize);
    
    if ((navigator as any).connection) {
      (navigator as any).connection.addEventListener('change', handleConnectionChange);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if ((navigator as any).connection) {
        (navigator as any).connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return settings;
};

export default usePerformanceMode;


