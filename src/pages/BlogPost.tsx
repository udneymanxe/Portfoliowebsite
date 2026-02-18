import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, ArrowLeft, Tag, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/data/blogPosts';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  
  const post = blogPosts.find(post => post.id === id);

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
    if (!post) return;

    const ctx = gsap.context(() => {
      gsap.from('.post-header > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      });

      gsap.from('.post-content', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow pt-32 relative z-10 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Post Not Found</h1>
            <p className="text-muted-foreground">The article you're looking for doesn't exist.</p>
            <Button asChild variant="secondary">
               <Link to="/blog">
                 <ArrowLeft className="mr-2 h-4 w-4" />
                 Back to Blog
               </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
        <div className="container max-w-4xl mx-auto px-6">
          <div className="mb-8">
             <Button asChild variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary transition-colors">
               <Link to="/blog">
                 <ArrowLeft className="mr-2 h-4 w-4" />
                 Back to Articles
               </Link>
            </Button>
          </div>

          <article className="space-y-8">
            {/* Header */}
            <header className="post-header space-y-6 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                  <Tag className="w-3 h-3 mr-1" />
                  {post.category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full border border-border/50">
                  <Calendar className="w-3.5 h-3.5 mr-2 text-primary" />
                  {post.date}
                </div>
                {post.author && (
                  <div className="flex items-center text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full border border-border/50">
                    <User className="w-3.5 h-3.5 mr-2 text-primary" />
                    {post.author}
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                {post.title}
              </h1>
            </header>

            {/* Hero Image */}
            {post.image && (
              <div className="post-header relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border/50 group">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
              </div>
            )}

            {/* Content */}
            <div className="post-content prose prose-lg prose-invert max-w-none">
               <div className="bg-card/30 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-border/50">
                 <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
               </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="post-content pt-8 border-t border-border/50">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium text-muted-foreground mr-2">Tags:</span>
                  {post.tags.map((tag, index) => (
                    <Badge 
                      key={index}
                      variant="outline"
                      className="text-xs font-normal text-muted-foreground border-border/60 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
