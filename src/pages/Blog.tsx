import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import BlogPostCard from '@/components/BlogPostCard';
import { blogPosts } from '@/data/blogPosts';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Blog: React.FC = () => {
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
      gsap.from('.blog-header > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // We'll let BlogPostCard handle its own animation or stagger them here if we can select them
      // Since BlogPostCard is a component, we might need to target a class inside it or wrap it
      gsap.from('.blog-grid > *', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.blog-grid',
          start: 'top 85%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(var(--primary-rgb), 0.08) 0%, 
                rgba(var(--primary-rgb), 0.02) 40%, 
                transparent 70%),
              linear-gradient(to bottom, hsl(var(--background)), hsl(var(--background) / 0.98))`
          }}
        />
        {/* Abstract Shapes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/5 blur-3xl animate-pulse-slow"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 8 + 8}s`,
              animationDelay: `${Math.random() * 4}s`,
              transform: `translate(${mousePosition.x * 0.03 * (i % 2 === 0 ? 1 : -1)}px, ${mousePosition.y * 0.03 * (i % 2 === 0 ? 1 : -1)}px)`
            }}
          />
        ))}
      </div>

      <main ref={containerRef} className="flex-grow pt-32 pb-20 relative z-10">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="blog-header text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Insights & Ideas</span>
            </div>
            <SectionTitle 
              title="Blog & Articles" 
              subtitle="Exploring the intersection of physics, philosophy, and technology."
              alignment='center'
            />
          </div>
          
          <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div key={post.id} className="transform transition-all duration-300 hover:-translate-y-2">
                <BlogPostCard 
                  post={post} 
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
