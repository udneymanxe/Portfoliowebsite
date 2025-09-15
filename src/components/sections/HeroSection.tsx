import React, { useRef, useEffect, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import useParallax from '@/hooks/useParallax';
import ParticleHero from '@/components/ParticleHero';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { style } = useParallax(heroRef, { speed: 0.3 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const firstName = "Mahesh Kumar ";
  const lastName = "Neupane";

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
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

      {/* Billion Dollar Transition Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dynamic Gradient Mesh */}
        <div 
          className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(var(--primary-rgb), 0.15) 0%, 
              rgba(var(--primary-rgb), 0.08) 25%, 
              transparent 50%),
              linear-gradient(135deg, 
                rgba(var(--primary-rgb), 0.05) 0%, 
                transparent 25%, 
                rgba(var(--primary-rgb), 0.03) 50%, 
                transparent 75%)`
          }}
        />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-primary/15 rounded-full blur-2xl animate-pulse-slow delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-primary/8 rounded-full blur-xl animate-pulse-slow delay-2000"></div>
        
        {/* Interactive Light Beams */}
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            background: `conic-gradient(from ${mousePosition.x * 3.6}deg at ${mousePosition.x}% ${mousePosition.y}%, 
              transparent 0deg, 
              rgba(var(--primary-rgb), 0.1) 45deg, 
              transparent 90deg, 
              rgba(var(--primary-rgb), 0.05) 135deg, 
              transparent 180deg)`
          }}
        />
      </div>

      {/* Bottom Transition Wave */}
      <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          className="absolute bottom-0 w-full h-full"
          style={{
            filter: 'drop-shadow(0 -10px 30px rgba(var(--primary-rgb), 0.2))'
          }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(var(--primary-rgb), 0.8)" />
              <stop offset="50%" stopColor="rgba(var(--primary-rgb), 0.4)" />
              <stop offset="100%" stopColor="rgba(var(--primary-rgb), 0.8)" />
            </linearGradient>
          </defs>
          <path
            d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            className="animate-pulse-slow"
          />
          <path
            d="M0,80 C200,140 400,20 600,80 C800,140 1000,20 1200,80 L1200,120 L0,120 Z"
            fill="rgba(var(--primary-rgb), 0.3)"
            className="animate-pulse-slow delay-500"
          />
        </svg>
        
        {/* Particle Trail */}
        <div className="absolute bottom-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/60 rounded-full animate-pulse-slow"
              style={{
                left: `${i * 5}%`,
                bottom: `${Math.sin(i * 0.5) * 20 + 30}px`,
                animationDelay: `${i * 100}ms`,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
