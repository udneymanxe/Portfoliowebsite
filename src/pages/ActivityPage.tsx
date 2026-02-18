import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, Calendar, Tag, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { activities } from '@/data/activities';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ActivityPage = () => {
  const { id } = useParams<{ id: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  
  const activityId = id ? parseInt(id, 10) : undefined;
  const activity = activityId !== undefined 
    ? activities.find(act => act.id === activityId) 
    : undefined;

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
    if (!activity) return;

    const ctx = gsap.context(() => {
      gsap.from('.activity-content > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      });

      gsap.from('.gallery-item', {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.gallery-grid',
          start: 'top 80%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activity]);

  if (!activity) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow pt-32 relative z-10 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Activity Not Found</h1>
            <p className="text-muted-foreground">The activity you're looking for doesn't exist.</p>
            <Button asChild variant="secondary">
               <Link to="/extracurricular">
                 <ArrowLeft className="mr-2 h-4 w-4" />
                 Back to Activities
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
            className="absolute rounded-full border border-primary/10 bg-primary/5 blur-xl animate-float"
            style={{
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `translate(${mousePosition.x * 0.04 * (i % 2 === 0 ? 1 : -1)}px, ${mousePosition.y * 0.04 * (i % 2 === 0 ? 1 : -1)}px)`
            }}
          />
        ))}
      </div>

      <main ref={containerRef} className="flex-grow pt-32 pb-20 relative z-10">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="mb-8">
             <Button asChild variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary transition-colors">
               <Link to="/extracurricular">
                 <ArrowLeft className="mr-2 h-4 w-4" />
                 Back to Activities
               </Link>
            </Button>
          </div>

          <article className="activity-content space-y-8">
            {/* Header */}
            <header className="space-y-6 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                  <Tag className="w-3 h-3 mr-1" />
                  {activity.category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full border border-border/50">
                  <Calendar className="w-3.5 h-3.5 mr-2 text-primary" />
                  {activity.date}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {activity.title}
              </h1>
            </header>

            {/* Hero Image */}
            {activity.imageUrl && (
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border/50 group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: activity.imageUrl.startsWith('http') 
                      ? `url(${activity.imageUrl})`
                      : `url(${activity.imageUrl})`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
              </div>
            )}

            {/* Description */}
            <div className="prose prose-lg prose-invert max-w-none">
               <div className="bg-card/30 backdrop-blur-sm p-8 rounded-3xl border border-border/50">
                 {activity.detailedDescription ? (
                    <p className="leading-relaxed text-muted-foreground">{activity.detailedDescription}</p>
                 ) : (
                    <p className="leading-relaxed text-muted-foreground">{activity.description}</p>
                 )}
               </div>
            </div>

            {/* Gallery */}
            {activity.images && activity.images.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <span className="w-8 h-1 bg-primary rounded-full mr-3" />
                  Gallery
                </h2>
                <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {activity.images.map((imgUrl, index) => (
                    <div key={index} className="gallery-item group relative aspect-square overflow-hidden rounded-2xl shadow-lg border border-border/50 cursor-pointer">
                      <img 
                         src={imgUrl.startsWith('http') ? imgUrl : `${imgUrl}`} 
                         alt={`${activity.title} - Image ${index + 1}`} 
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video */}
            {activity.videoUrl && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <span className="w-8 h-1 bg-primary rounded-full mr-3" />
                  Video Highlight
                </h2>
                <div className="relative aspect-video overflow-hidden rounded-3xl shadow-2xl bg-black border border-border/50 group">
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none group-hover:scale-110 transition-transform duration-300">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                      <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
                    </div>
                  </div>
                  <video 
                     controls 
                     className="w-full h-full relative z-20"
                     src={activity.videoUrl} 
                     aria-label={`${activity.title} - Video`}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}

            {/* Link */}
            {activity.link && (
               <div className="pt-8 flex justify-center">
                 <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 px-8 py-6 text-lg rounded-full">
                    <a href={activity.link} target="_blank" rel="noopener noreferrer">
                       Visit Project Link <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                 </Button>
               </div>
            )}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ActivityPage;
