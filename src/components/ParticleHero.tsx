
import React, { useRef, useEffect } from 'react';

interface ParticleHeroProps {
  className?: string;
}

const ParticleHero: React.FC<ParticleHeroProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let particlesArray: Particle[] = [];
    const particleCount = 3000; // Number of particles
    
    // Mouse interaction settings
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 100 // Interaction radius around the mouse
    };
    
    const interactionSettings = {
      forceStrength: 1,      // How strongly mouse repels/attracts
      friction: 0.98,      // Slows particles down (0 to 1)
      minDistance: 30,       // Minimum distance before force maxes out
      interactionMode: 'repel' as 'repel' | 'attract' // Can be 'repel' or 'attract'
    };
    
    // Particle Class
    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
      vx: number;
      vy: number;
      
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1; // Particle size range
        this.baseX = this.x; // Store original position
        this.baseY = this.y; // Store original position
        this.density = (Math.random() * 30) + 1; // Affects how much force moves it
        
        // Gold theme colors to match the website theme
        const hue = Math.random() > 0.8 ? 47 : Math.random() * 20 + 30; // 80% dark particles, 20% gold
        const saturation = Math.random() > 0.8 ? '80%' : '30%';
        const lightness = Math.random() > 0.8 ? '50%' : '30%';
        this.color = `hsl(${hue}, ${saturation}, ${lightness})`;
        
        // Initial random velocity
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }
      
      // Calculate distance and apply mouse force
      update() {
        // --- Mouse Interaction Physics ---
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            // Ensure distance is not zero or too small
            const effectiveDistance = Math.max(distance, interactionSettings.minDistance);
            
            // Force direction (unit vector)
            let forceDirectionX = dx / effectiveDistance;
            let forceDirectionY = dy / effectiveDistance;
            
            // Force magnitude (stronger when closer)
            let forceMagnitude = (mouse.radius - effectiveDistance) / mouse.radius * interactionSettings.forceStrength * this.density;
            
            let forceX = forceDirectionX * forceMagnitude;
            let forceY = forceDirectionY * forceMagnitude;
            
            if (interactionSettings.interactionMode === 'repel') {
              this.vx -= forceX;
              this.vy -= forceY;
            } else if (interactionSettings.interactionMode === 'attract') {
              this.vx += forceX;
              this.vy += forceY;
            }
          }
        }
        
        // --- Apply Friction ---
        this.vx *= interactionSettings.friction;
        this.vy *= interactionSettings.friction;
        
        // --- Update Position ---
        this.x += this.vx;
        this.y += this.vy;
        
        // --- Boundary Handling (Wrap around edges) ---
        if (canvas) {
          if (this.x > canvas.width + this.size) this.x = -this.size;
          else if (this.x < -this.size) this.x = canvas.width + this.size;
          if (this.y > canvas.height + this.size) this.y = -this.size;
          else if (this.y < -this.size) this.y = canvas.height + this.size;
        }
      }
      
      // Draw particle
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }
    
    // Initialize particles
    function init() {
      resizeCanvas(); // Set initial size
      particlesArray = [];
      if (!canvas) return;
      
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
    }
    
    // Animation loop
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas each frame
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      requestAnimationFrame(animate); // Loop
    }
    
    // Update mouse coordinates
    function handleMouseMove(event: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    }
    
    function handleMouseOut() {
      // Optional: Stop interaction when mouse leaves canvas
      // mouse.x = null;
      // mouse.y = null;
    }
    
    // Handle window resize
    function resizeCanvas() {
      if (!canvas || !container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('resize', resizeCanvas);
    
    // Start the particle system
    init();
    animate();
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
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
