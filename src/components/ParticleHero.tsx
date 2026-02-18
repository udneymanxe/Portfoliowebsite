import React, { useRef, useEffect } from 'react';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';

interface ParticleHeroProps {
  className?: string;
}

const ParticleHero: React.FC<ParticleHeroProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reduceParticles, reduceAnimations, isMobile } = usePerformanceMode();
  
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let particlesArray: Particle[] = [];
    let animationId: number;

    const getParticleCount = () => {
      if (reduceParticles) return isMobile ? 120 : 350;
      if (isMobile) return 250;
      return 600;
    };
    const particleCount = getParticleCount();
    
    const connectionDistance = isMobile ? 70 : 110;
    const connectionDistanceSq = connectionDistance * connectionDistance;
    const mouseConnectionBoost = isMobile ? 100 : 180;
    
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: isMobile ? 80 : 130
    };
    
    const interactionSettings = {
      forceStrength: reduceAnimations ? 0.6 : 1.2,
      friction: 0.97,
      minDistance: 25,
      returnForce: 0.002,
    };
    
    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
      alpha: number;
      vx: number;
      vy: number;
      depth: number;
      
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.depth = Math.random();
        this.size = 0.5 + this.depth * 2.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        
        const isGold = Math.random() > 0.75;
        const hue = isGold ? 47 : Math.random() * 20 + 30;
        const saturation = isGold ? '80%' : '30%';
        const lightness = isGold ? '50%' : '25%';
        this.alpha = isGold ? (0.5 + this.depth * 0.5) : (0.15 + this.depth * 0.35);
        this.color = `hsl(${hue}, ${saturation}, ${lightness})`;
        
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
      }
      
      update() {
        const jitter = 0.012;
        this.vx += (Math.random() - 0.5) * jitter;
        this.vy += (Math.random() - 0.5) * jitter;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const effectiveDistance = Math.max(distance, interactionSettings.minDistance);
            const forceDirectionX = dx / effectiveDistance;
            const forceDirectionY = dy / effectiveDistance;
            const forceMagnitude = (mouse.radius - effectiveDistance) / mouse.radius * interactionSettings.forceStrength * this.density;
            
            this.vx -= forceDirectionX * forceMagnitude;
            this.vy -= forceDirectionY * forceMagnitude;
          }
        }
        
        this.vx *= interactionSettings.friction;
        this.vy *= interactionSettings.friction;
        
        this.x += this.vx;
        this.y += this.vy;
        
        if (canvas) {
          if (this.x > canvas.width + this.size) this.x = -this.size;
          else if (this.x < -this.size) this.x = canvas.width + this.size;
          if (this.y > canvas.height + this.size) this.y = -this.size;
          else if (this.y < -this.size) this.y = canvas.height + this.size;
        }
      }
      
      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    
    function drawConnections() {
      if (!ctx) return;
      const len = particlesArray.length;
      const cd = connectionDistance;
      
      for (let i = 0; i < len; i++) {
        const pi = particlesArray[i];
        for (let j = i + 1; j < len; j++) {
          const pj = particlesArray[j];
          const dx = pi.x - pj.x;
          if (dx > cd || dx < -cd) continue;
          const dy = pi.y - pj.y;
          if (dy > cd || dy < -cd) continue;
          
          const distSq = dx * dx + dy * dy;
          if (distSq > connectionDistanceSq) continue;
          
          const distance = Math.sqrt(distSq);
          let opacity = (1 - distance / cd) * 0.10;
          let lineWidth = 0.3;
          
          if (mouse.x !== null && mouse.y !== null) {
            const midX = (pi.x + pj.x) * 0.5;
            const midY = (pi.y + pj.y) * 0.5;
            const mdx = midX - mouse.x;
            const mdy = midY - mouse.y;
            const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
            
            if (mouseDist < mouseConnectionBoost) {
              const boost = 1 - mouseDist / mouseConnectionBoost;
              opacity += boost * 0.25;
              lineWidth = 0.3 + boost * 0.8;
            }
          }
          
          ctx.strokeStyle = `hsla(47, 80%, 50%, ${opacity})`;
          ctx.lineWidth = lineWidth;
          ctx.beginPath();
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(pj.x, pj.y);
          ctx.stroke();
        }
      }
    }
    
    function init() {
      resizeCanvas();
      particlesArray = [];
      if (!canvas) return;
      
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
    }
    
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawConnections();
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      animationId = requestAnimationFrame(animate);
    }
    
    function handleMouseMove(event: MouseEvent) {
      if (!canvas || isMobile) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    }
    
    function handleTouchMove(event: TouchEvent) {
      if (!canvas || !isMobile) return;
      event.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = event.touches[0];
      if (touch) {
        mouse.x = touch.clientX - rect.left;
        mouse.y = touch.clientY - rect.top;
      }
    }
    
    function handleTouchEnd() {
      if (isMobile) { mouse.x = null; mouse.y = null; }
    }
    
    function handleMouseOut() {
      if (!isMobile) { mouse.x = null; mouse.y = null; }
    }
    
    function resizeCanvas() {
      if (!canvas || !container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
    
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseout', handleMouseOut);
    } else {
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvas.addEventListener('touchend', handleTouchEnd);
      canvas.addEventListener('touchcancel', handleTouchEnd);
    }
    window.addEventListener('resize', resizeCanvas);
    
    init();
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseout', handleMouseOut);
      } else {
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
        canvas.removeEventListener('touchcancel', handleTouchEnd);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [reduceParticles, reduceAnimations, isMobile]);
  
  return (
    <div 
      ref={containerRef} 
      className={`absolute top-0 left-0 w-full h-full -z-10 ${className || ''}`}
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full bg-background"
      />
    </div>
  );
};

export default ParticleHero;
