
import React, { useEffect, useRef } from 'react';

const GlowingBalls: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let particles: any[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(70, Math.floor(window.innerWidth / 20));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: 0.3 + Math.random() * 0.3
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Connect to mouse with stronger line if close enough
        const dx = mouseX - p1.x;
        const dy = mouseY - p1.y;
        const mouseDist = Math.sqrt(dx * dx + dy * dy);
        
        if (mouseDist < 150) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseX, mouseY);
          const opacity = 0.7 - (mouseDist / 150);
          ctx.strokeStyle = `rgba(245, 209, 69, ${opacity})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
        
        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + 
            Math.pow(p1.y - p2.y, 2)
          );
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = 0.2 - (dist / 120) * 0.2;
            ctx.strokeStyle = `rgba(245, 209, 69, ${opacity})`;
            ctx.lineWidth = 0.2;
            ctx.stroke();
          }
        }
        
        // Draw the particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 209, 69, ${p1.opacity})`;
        ctx.fill();
        
        // Update position
        p1.x += p1.speedX;
        p1.y += p1.speedY;
        
        // Bounce off edges
        if (p1.x < 0 || p1.x > canvas.width) p1.speedX *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.speedY *= -1;
      }
    };
    
    const animate = () => {
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    // Initialize
    resize();
    animate();
    
    // Add event listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-70"
    />
  );
};

export default GlowingBalls;
