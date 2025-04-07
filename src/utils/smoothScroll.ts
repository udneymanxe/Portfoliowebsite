
/**
 * Configures smooth scrolling for the application
 * Uses native smooth scrolling with a fallback for older browsers
 */
export const setupSmoothScrolling = () => {
  // Check if the browser supports scroll behavior in CSS
  if ('scrollBehavior' in document.documentElement.style) {
    document.documentElement.style.scrollBehavior = 'smooth';
  } else {
    // Fallback for browsers that don't support scroll-behavior
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      // Only apply to anchor links that start with #
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const href = target.getAttribute('href');
        if (href) {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    });
  }

  // Setup View Transitions API support if available
  if ('startViewTransition' in document) {
    // Mark all pages for view transitions
    document.querySelectorAll('a[href^="/"]').forEach(link => {
      link.addEventListener('click', (e) => {
        // Cast the event to MouseEvent to access ctrlKey and metaKey properties
        const mouseEvent = e as MouseEvent;
        const target = e.currentTarget as HTMLAnchorElement;
        const href = target.getAttribute('href');
        
        if (href && !mouseEvent.ctrlKey && !mouseEvent.metaKey) {
          e.preventDefault();
          
          // Apply the appropriate page class based on the target URL
          const targetClass = href.includes('/blog') ? 'page-2' : 'page-1';
          
          // @ts-ignore - startViewTransition may not be recognized by TypeScript
          document.startViewTransition(() => {
            // Remove any existing page classes
            document.body.classList.remove('page-1', 'page-2');
            
            // Add the target page class
            document.body.classList.add(targetClass);
            
            // Navigate to the new URL
            window.location.href = href;
            
            // Allow time for the transition
            return new Promise(resolve => {
              setTimeout(resolve, 300);
            });
          });
        }
      });
    });
  }
};
