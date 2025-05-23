import React, { useRef, useEffect } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import useParallax from '@/hooks/useParallax';
import ParticleHero from '@/components/ParticleHero';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { style } = useParallax(heroRef, { speed: 0.3 });
  const firstName = "Mahesh Kumar ";
  const lastName = "Neupane";
  
  useEffect(() => {
    gsap.fromTo('.hero-content', 
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out"
      }
    );

    // 3D Character Stagger Animation
    gsap.from(".name-char-3d", {
      opacity: 0,
      rotateX: -90,       // Start flipped down
      y: -50,             // Start slightly offset
      z: -100,            // Start further back (requires perspective)
      duration: 1.5,       // Duration for each character
      ease: "power3.out",
      stagger: {
        each: 0.05,       // Delay between characters
        from: "center"     // Animate from the center outwards
      },
      delay: 0.6          // Overall delay
    });

    // Add stagger effect to text elements
    gsap.fromTo('.hero-content h1',
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
      }
    );

    gsap.fromTo('.hero-content p',
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
        ease: "power3.out"
      }
    );
  }, []);
  
  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={style}
    >
      <ParticleHero />
      
      <div className="relative z-10 max-w-4xl mx-auto hero-content opacity-0 translate-y-8">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8"
          style={{ perspective: '800px' }} // Add perspective for 3D effect
        >
          {firstName.split("").map((char, index) => (
            <span 
              key={`first-${index}`} 
              className="name-char-3d inline-block" 
              style={{ whiteSpace: 'pre', transformStyle: 'preserve-3d' }}
            >
              {char}
            </span>
          ))}
          <span className="whitespace-nowrap">
            {lastName.split("").map((char, index) => (
              <span 
                key={`last-${index}`} 
                className="name-char-3d inline-block" 
                style={{ whiteSpace: 'pre', transformStyle: 'preserve-3d' }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Physics AI and Tech Enthusiast
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a href="#about" className="btn-primary">
            Discover More
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <Link to="/contact" className="btn-secondary">
            Contact Me
          </Link>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-primary transition-colors animate-pulse-slow"
      >
        <span className="text-sm mb-2">Discover More</span>
        <ArrowDown size={20} />
      </a>
    </section>
  );
};

export default HeroSection;
