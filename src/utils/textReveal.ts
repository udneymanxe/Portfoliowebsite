
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Interface for animation options
interface RevealOptions {
  splitType?: 'chars' | 'words' | 'lines';
  start?: string;
  once?: boolean;
  duration?: number;
  staggerAmount?: number;
  yOffset?: number;
  ease?: string;
  scale?: number;
  rotation?: number;
}

/**
 * Applies a split text reveal animation to elements based on scroll position
 */
export const initTextReveal = (
  selector: string, 
  options: RevealOptions = {}
) => {
  const {
    splitType = 'chars',
    start = 'top 85%',
    once = true,
    duration = 0.8,
    staggerAmount = 0.4,
    yOffset = 60,
    ease = 'back.out(1.7)',
    scale = 0.8,
    rotation = -40
  } = options;

  // Select all target elements
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  // Process each element
  elements.forEach(element => {
    // Create the SplitType instance (modern alternative to SplitText)
    const split = new SplitType(element as HTMLElement, {
      types: splitType,
      tagName: 'span'
    });

    // Get the split targets based on splitType
    const targets = split[splitType];
    if (!targets || targets.length === 0) return;

    // Set initial state and animate
    gsap.fromTo(
      targets,
      {
        opacity: 0,
        y: yOffset,
        rotationX: rotation, 
        scale: scale,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: duration,
        ease: ease,
        stagger: {
          amount: staggerAmount,
          from: 'start'
        },
        scrollTrigger: {
          trigger: element,
          start: start,
          once: once,
        }
      }
    );
  });
};

/**
 * Initialize all text reveal animations
 */
export const initAllTextReveals = () => {
  // Titles with character splitting
  initTextReveal('.reveal-title', {
    splitType: 'chars',
    staggerAmount: 0.5
  });
  
  // Subtitles with word splitting
  initTextReveal('.reveal-subtitle', {
    splitType: 'words',
    staggerAmount: 0.3,
    yOffset: 40
  });
  
  // Paragraphs with line splitting
  initTextReveal('.reveal-text', {
    splitType: 'lines',
    staggerAmount: 0.25,
    yOffset: 30,
    rotation: -30
  });
};
