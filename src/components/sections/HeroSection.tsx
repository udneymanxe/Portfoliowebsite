import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import useParallax from '@/hooks/useParallax';
import ParticleHero from '@/components/ParticleHero';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const PHYSICS_EQUATIONS = [
  'E = mc²', 'ψ(x,t)', '∇²φ = ρ/ε₀', 'ℏω', 'F = dp/dt',
  'λ = h/p', '∂ψ/∂t', 'ΔxΔp ≥ ℏ/2', 'S = k ln Ω', '∮ E·dl'
];

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnPrimaryRef = useRef<HTMLDivElement>(null);
  const btnSecondaryRef = useRef<HTMLDivElement>(null);
  const { style } = useParallax(heroRef, { speed: 0.3 });
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const firstName = "Mahesh Kumar ";
  const lastName = "Neupane";
  const subtitleText = "Exploring the Frontiers of Physics, Medicine & Innovation";

  // Smooth mouse tracking with lerp
  useEffect(() => {
    let tX = 50, tY = 50, cX = 50, cY = 50;
    let rafId: number;
    const onMove = (e: MouseEvent) => {
      tX = (e.clientX / window.innerWidth) * 100;
      tY = (e.clientY / window.innerHeight) * 100;
    };
    const tick = () => {
      cX += (tX - cX) * 0.06;
      cY += (tY - cY) * 0.06;
      setMouse({ x: cX, y: cY });
      rafId = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Physics-themed text scramble
  const scrambleText = useCallback((el: HTMLElement, text: string, dur: number) => {
    const chars = 'αβγδεζηθλμνπρστφψω∑∫∂∇ℏΩΔΣΦΨ0123456789';
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (dur * 1000), 1);
      const revealed = Math.floor(progress * text.length);
      el.textContent = text.split('').map((c, i) => {
        if (i < revealed) return c;
        if (c === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  // Magnetic button effect
  useEffect(() => {
    const setupMagnetic = (el: HTMLElement | null) => {
      if (!el) return () => {};
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const s = (1 - dist / 120) * 0.3;
          gsap.to(el, { x: dx * s, y: dy * s, duration: 0.3, ease: "power2.out" });
        }
      };
      const leave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
      };
      window.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      return () => {
        window.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      };
    };
    const c1 = setupMagnetic(btnPrimaryRef.current);
    const c2 = setupMagnetic(btnSecondaryRef.current);
    return () => { c1(); c2(); };
  }, []);

  // Master cinematic timeline
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });

    // Phase 1: Mandala entrance — scale + rotation with expo ease
    tl.fromTo('.mandala-container',
      { opacity: 0, scale: 0.2, rotation: -60 },
      { opacity: 1, scale: 1, rotation: 0, duration: 2.4, ease: "expo.out" },
      0
    );

    // Phase 2: Golden laser line flash across viewport
    tl.fromTo('.hero-line-flash',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: "power3.in" },
      0.3
    ).to('.hero-line-flash',
      { opacity: 0, duration: 0.35, ease: "power2.out" },
      0.65
    );

    // Phase 3: Name characters cascade with spring physics from center outward
    tl.from(".name-char-3d", {
      opacity: 0,
      rotateX: -90,
      rotateY: 10,
      y: 70,
      z: -300,
      scale: 0.3,
      filter: 'blur(8px)',
      duration: 1.3,
      ease: "back.out(1.4)",
      stagger: { each: 0.035, from: "center" },
    }, 0.5);

    // Phase 4: Subtitle scramble decode
    tl.fromTo('.hero-subtitle',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      1.5
    );
    tl.call(() => {
      if (subtitleRef.current) scrambleText(subtitleRef.current, subtitleText, 2.2);
    }, [], 1.5);

    // Phase 5: Buttons — spring entrance
    tl.fromTo('.hero-btn',
      { opacity: 0, y: 35, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(2.5)", stagger: 0.13 },
      2.3
    );

    // Phase 6: Floating physics equations drift in
    tl.fromTo('.physics-eq',
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power1.out", stagger: { each: 0.12, from: "random" } },
      2.6
    );

    // Phase 7: Scroll indicator bounces in
    tl.fromTo('.scroll-indicator',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "back.out(3)" },
      3.2
    );

    // Continuous gentle float for physics equations
    gsap.utils.toArray<HTMLElement>('.physics-eq').forEach((el, i) => {
      gsap.to(el, {
        y: `+=${8 + Math.random() * 14}`,
        x: `+=${(Math.random() - 0.5) * 8}`,
        rotation: `+=${(Math.random() - 0.5) * 5}`,
        duration: 5 + Math.random() * 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.5
      });
    });

    return () => { tl.kill(); };
  }, [scrambleText, subtitleText]);

  const tiltX = (mouse.y - 50) * 0.03;
  const tiltY = (mouse.x - 50) * -0.03;

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      style={style}
    >
      <ParticleHero />

      {/* Golden Laser Line Flash */}
      <div
        className="hero-line-flash absolute top-1/2 left-0 w-full h-px z-20 pointer-events-none origin-left"
        style={{ background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.8) 15%, hsl(var(--primary)) 50%, hsl(var(--primary) / 0.8) 85%, transparent 100%)' }}
      />

      {/* Cinematic Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }}
      />

      {/* Floating Physics Equations */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden hidden sm:block">
        {PHYSICS_EQUATIONS.map((eq, i) => (
          <span
            key={`eq-${i}`}
            className="physics-eq absolute font-mono select-none opacity-0"
            style={{
              color: 'hsl(var(--primary) / 0.06)',
              fontSize: `${11 + (i % 5) * 3}px`,
              top: `${6 + (i / PHYSICS_EQUATIONS.length) * 84}%`,
              left: `${3 + ((i * 41 + 7) % 90)}%`,
              transform: `rotate(${((i * 17) % 30) - 15}deg)`,
            }}
          >
            {eq}
          </span>
        ))}
      </div>

      {/* ===== MAGICAL MANDALA ===== */}
      <div className="mandala-container absolute inset-0 flex items-center justify-center pointer-events-none z-[2] opacity-0">
        <div
          className="relative w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] opacity-50 sm:opacity-55 md:opacity-60"
          style={{
            transform: `translate(${(mouse.x - 50) * 0.03}px, ${(mouse.y - 50) * 0.03}px)`,
          }}
        >
          {/* Energy Wave Pulses */}
          {[0, 1, 2].map(i => (
            <div
              key={`wave-${i}`}
              className="absolute -inset-8 rounded-full border-2 border-primary/15 animate-mandala-wave"
              style={{ animationDelay: `${i * 2}s` }}
            />
          ))}

          {/* Ambient Halo Glow */}
          <div className="absolute -inset-20 rounded-full bg-gradient-radial from-primary/8 via-primary/3 to-transparent animate-mandala-breathe" />

          {/* RING 1 — Outermost Sacred Dots (20) — Slow CW */}
          <div
            className="absolute inset-0 hidden sm:block"
            style={{ animation: 'mandala-rotate 100s linear infinite' }}
          >
            {[...Array(20)].map((_, i) => (
              <div
                key={`r1-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  top: `${50 + Math.sin(i * 2 * Math.PI / 20) * 49}%`,
                  left: `${50 + Math.cos(i * 2 * Math.PI / 20) * 49}%`,
                  transform: 'translate(-50%, -50%)',
                  background: 'hsl(var(--primary))',
                  opacity: 0.45,
                  boxShadow: '0 0 8px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.2)'
                }}
              />
            ))}
          </div>

          {/* Outer connecting circle */}
          <div
            className="absolute inset-1 rounded-full border border-primary/10 hidden sm:block"
            style={{ animation: 'mandala-rotate 100s linear infinite' }}
          />

          {/* RING 2 — Diamond Shapes (12) — CCW */}
          <div
            className="absolute inset-[8%] hidden sm:block"
            style={{ animation: 'mandala-rotate-reverse 80s linear infinite' }}
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={`r2-${i}`}
                className="absolute w-3 h-3 border border-primary/25"
                style={{
                  top: `${50 + Math.sin(i * 2 * Math.PI / 12) * 47}%`,
                  left: `${50 + Math.cos(i * 2 * Math.PI / 12) * 47}%`,
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  boxShadow: '0 0 6px hsl(var(--primary) / 0.25)'
                }}
              />
            ))}
          </div>

          {/* Circle border between ring 2 and 3 */}
          <div
            className="absolute inset-[12%] rounded-full border border-primary/15 hidden md:block animate-mandala-shimmer"
            style={{ animation: 'mandala-rotate-reverse 80s linear infinite, mandala-shimmer 5s ease-in-out infinite' }}
          />

          {/* RING 3 — Sacred Circle with Radial Spokes (24) — CW */}
          <div
            className="absolute inset-[18%]"
            style={{ animation: 'mandala-rotate 60s linear infinite' }}
          >
            <div
              className="absolute inset-0 rounded-full border-2 border-primary/20"
              style={{ boxShadow: '0 0 25px hsl(var(--primary) / 0.1), inset 0 0 25px hsl(var(--primary) / 0.05)' }}
            />
            {[...Array(24)].map((_, i) => (
              <div
                key={`spoke-${i}`}
                className="absolute"
                style={{
                  width: '1px',
                  height: '50%',
                  bottom: '50%',
                  left: 'calc(50% - 0.5px)',
                  transformOrigin: 'bottom center',
                  transform: `rotate(${i * 15}deg)`,
                  background: 'linear-gradient(to top, transparent 82%, hsl(var(--primary) / 0.3) 100%)',
                }}
              />
            ))}
          </div>

          {/* RING 4 — Inner Glowing Dots (8) — CCW */}
          <div
            className="absolute inset-[26%]"
            style={{ animation: 'mandala-rotate-reverse 45s linear infinite' }}
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={`r4-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  top: `${50 + Math.sin(i * 2 * Math.PI / 8) * 46}%`,
                  left: `${50 + Math.cos(i * 2 * Math.PI / 8) * 46}%`,
                  transform: 'translate(-50%, -50%)',
                  background: 'hsl(var(--primary))',
                  opacity: 0.55,
                  boxShadow: '0 0 12px hsl(var(--primary) / 0.6), 0 0 30px hsl(var(--primary) / 0.25)'
                }}
              />
            ))}
          </div>

          {/* Inner circle border with shimmer */}
          <div className="absolute inset-[30%] rounded-full border border-primary/20 animate-mandala-shimmer" />

          {/* RING 5 — Flower of Life — Breathe */}
          <div className="absolute inset-[32%] animate-mandala-breathe hidden sm:block">
            <div
              className="absolute rounded-full border border-primary/15"
              style={{ width: '50%', height: '50%', top: '25%', left: '25%' }}
            />
            {[...Array(6)].map((_, i) => {
              const angle = i * Math.PI / 3;
              return (
                <div
                  key={`flower-${i}`}
                  className="absolute rounded-full border border-primary/12"
                  style={{
                    width: '50%',
                    height: '50%',
                    top: `${50 + Math.sin(angle) * 25 - 25}%`,
                    left: `${50 + Math.cos(angle) * 25 - 25}%`,
                    boxShadow: '0 0 8px hsl(var(--primary) / 0.08)'
                  }}
                />
              );
            })}
          </div>

          {/* RING 6 — Lotus Petals (8) — CW */}
          <div
            className="absolute inset-[36%]"
            style={{ animation: 'mandala-rotate 30s linear infinite' }}
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={`petal-${i}`}
                className="absolute"
                style={{
                  width: '18%',
                  height: '42%',
                  bottom: '50%',
                  left: '41%',
                  borderRadius: '50%',
                  border: '1px solid hsl(var(--primary) / 0.2)',
                  transformOrigin: 'center bottom',
                  transform: `rotate(${i * 45}deg)`,
                  background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.06), transparent)',
                }}
              />
            ))}
          </div>

          {/* RING 7 — Inner Core Circles — CCW */}
          <div
            className="absolute inset-[40%]"
            style={{ animation: 'mandala-rotate-reverse 20s linear infinite' }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-primary/30"
              style={{ boxShadow: '0 0 15px hsl(var(--primary) / 0.15)' }}
            />
            <div className="absolute inset-[15%] rounded-full border border-primary/25" />
            <div className="absolute inset-[30%] rounded-full border border-primary/20" />
          </div>

          {/* Sacred Triangles */}
          <div
            className="absolute inset-[22%] hidden md:block"
            style={{ animation: 'mandala-rotate 50s linear infinite' }}
          >
            {[0, 1].map(t => (
              <div
                key={`tri-${t}`}
                className="absolute inset-[10%]"
                style={{ transform: `rotate(${t * 60}deg)` }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                  <polygon
                    points="50,5 95,82 5,82"
                    stroke="hsl(var(--primary) / 0.12)"
                    strokeWidth="0.5"
                    fill="none"
                  />
                </svg>
              </div>
            ))}
          </div>

          {/* Central Glowing Orb */}
          <div className="absolute inset-[44%] flex items-center justify-center">
            <div
              className="w-full h-full rounded-full animate-energy-pulse"
              style={{
                background: 'radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, hsl(var(--primary) / 0.15) 50%, transparent 100%)',
                boxShadow: '0 0 30px hsl(var(--primary) / 0.3), 0 0 60px hsl(var(--primary) / 0.15)'
              }}
            />
            <div
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: 'hsl(var(--primary) / 0.8)',
                boxShadow: '0 0 10px hsl(var(--primary) / 0.6), 0 0 20px hsl(var(--primary) / 0.3)'
              }}
            />
          </div>

          {/* Sparkle Overlay */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-primary/60 animate-mandala-sparkle"
                style={{
                  top: `${15 + Math.sin(i * 1.3) * 35 + 35}%`,
                  left: `${15 + Math.cos(i * 0.9) * 35 + 35}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${2.5 + (i % 3) * 0.8}s`,
                  boxShadow: '0 0 4px hsl(var(--primary) / 0.5)'
                }}
              />
            ))}
          </div>

          {/* Orbiting Particles */}
          <div className="absolute inset-0 hidden lg:block">
            {[...Array(4)].map((_, i) => (
              <div
                key={`orbit-${i}`}
                className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
                style={{
                  '--orbit-radius': `${120 + i * 40}px`,
                  animation: `mandala-orbit ${15 + i * 8}s linear infinite`,
                  animationDelay: `${i * 3}s`,
                  background: 'hsl(var(--primary))',
                  opacity: 0.6 - i * 0.1,
                  boxShadow: `0 0 8px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.2)`,
                  transform: 'translate(-50%, -50%)'
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ===== HERO CONTENT with 3D Perspective Tilt ===== */}
      <div
        className="relative z-10 max-w-4xl mx-auto"
        style={{
          transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
      >
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight"
          style={{ perspective: '800px' }}
        >
          {firstName.split("").map((char, index) => (
            <span
              key={`first-${index}`}
              className="name-char-3d inline-block will-change-transform"
              style={{ whiteSpace: 'pre', transformStyle: 'preserve-3d' }}
            >
              {char}
            </span>
          ))}
          <span className="whitespace-nowrap">
            {lastName.split("").map((char, index) => (
              <span
                key={`last-${index}`}
                className="name-char-3d inline-block will-change-transform"
                style={{ whiteSpace: 'pre', transformStyle: 'preserve-3d' }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="hero-subtitle text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 px-4 sm:px-0 opacity-0"
          style={{ letterSpacing: '0.01em' }}
        >
          {subtitleText}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-4 sm:px-0">
          <div ref={btnPrimaryRef} className="will-change-transform">
            <a href="#about" className="hero-btn btn-primary opacity-0">
              Discover More
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          <div ref={btnSecondaryRef} className="will-change-transform">
            <Link to="/contact" className="hero-btn btn-secondary opacity-0">
              Contact Me
            </Link>
          </div>
        </div>
      </div>

      {/* Minimalist Scroll Indicator */}
      <a
        href="#about"
        className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground/50 hover:text-primary transition-colors duration-500 opacity-0"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase mb-3 font-light">Scroll</span>
        <div className="w-px h-8 relative overflow-hidden">
          <div className="absolute inset-0 w-full bg-gradient-to-b from-primary to-transparent scroll-line-anim" />
        </div>
      </a>

      {/* Interactive Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-25 transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, 
              rgba(var(--primary-rgb), 0.15) 0%, 
              rgba(var(--primary-rgb), 0.06) 25%, 
              transparent 50%)`
          }}
        />

        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-primary/15 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-primary/8 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

        <div
          className="absolute top-0 left-0 w-full h-full opacity-15"
          style={{
            background: `conic-gradient(from ${mouse.x * 3.6}deg at ${mouse.x}% ${mouse.y}%, 
              transparent 0deg, 
              rgba(var(--primary-rgb), 0.08) 45deg, 
              transparent 90deg, 
              rgba(var(--primary-rgb), 0.04) 135deg, 
              transparent 180deg)`
          }}
        />
      </div>

      {/* Bottom Transition Wave */}
      <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          className="absolute bottom-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 -10px 30px rgba(var(--primary-rgb), 0.2))' }}
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
            className="animate-pulse-slow"
            style={{ animationDelay: '500ms' }}
          />
        </svg>

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
