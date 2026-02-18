import React, { useEffect, useRef, useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import ContactForm from '@/components/ContactForm';
import { Mail, MapPin, Phone, Send, Globe, MessageSquare } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth) * 100,
        y: (clientY / innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from('.contact-header > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-header',
          start: 'top 80%',
        }
      });

      // Cards Animation
      gsap.from('.contact-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.contact-cards',
          start: 'top 80%',
        }
      });

      // Form Animation
      gsap.from('.contact-form-container', {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-form-container',
          start: 'top 80%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={containerRef} className="section relative min-h-screen overflow-hidden py-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(var(--primary-rgb), 0.15) 0%, 
                rgba(var(--primary-rgb), 0.05) 30%, 
                transparent 60%),
              linear-gradient(to bottom, hsl(var(--background)), hsl(var(--background) / 0.95))`
          }}
        />
        
        {/* Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" className="fill-primary/50" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Connecting lines could be added here dynamically if needed, but static grid is cleaner for now */}
        </svg>

        {/* Floating Orbs */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10 blur-2xl animate-pulse-slow"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `translate(${mousePosition.x * 0.03 * (i % 2 === 0 ? 1 : -1)}px, ${mousePosition.y * 0.03 * (i % 2 === 0 ? 1 : -1)}px)`
            }}
          />
        ))}
      </div>
      
      <div className="container relative z-10 max-w-6xl mx-auto px-6">
        <div className="contact-header text-center mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20 backdrop-blur-sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            <span>Let's Connect</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Conversation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Interested in collaboration, research, or just want to say hi? I'm always open to discussing new ideas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 contact-cards">
          {[
            { icon: Mail, title: "Email", value: "maheshkneupane90@gmail.com", href: "mailto:maheshkneupane90@gmail.com", color: "text-blue-500" },
            { icon: Phone, title: "Phone", value: "+977 9863354076", href: "tel:+9779863354076", color: "text-green-500" },
            { icon: MapPin, title: "Location", value: "Kathmandu, Nepal", href: null, color: "text-red-500" }
          ].map((item, index) => (
            <div key={index} className="contact-card group relative bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-8 text-center hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${item.color.replace('text-', 'bg-').replace('500', '500/10')}`}>
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              {item.href ? (
                <a 
                  href={item.href} 
                  className="text-muted-foreground hover:text-primary transition-colors text-lg"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-muted-foreground text-lg">{item.value}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="contact-form-container relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-3xl blur-xl opacity-50 animate-pulse-slow" />
          <div className="relative bg-card/80 backdrop-blur-xl border border-primary/20 rounded-3xl p-1 shadow-2xl">
             <div className="bg-background/50 rounded-[22px] overflow-hidden">
                <ContactForm />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
