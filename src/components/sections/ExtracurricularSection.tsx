import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Tag, Users, Award, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { activities } from '@/data/activities';

gsap.registerPlugin(ScrollTrigger);

interface ExtracurricularSectionProps {
  isSummary?: boolean;
}

const ExtracurricularSection: React.FC<ExtracurricularSectionProps> = ({ isSummary = false }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
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
      if (!isSummary) {
        gsap.from('.extra-header > *', {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.extra-header',
            start: 'top 80%',
          }
        });
      }

      // Filter Animation
      if (!isSummary) {
        gsap.from('.filter-btn', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.filter-controls',
            start: 'top 85%',
          }
        });
      }

      // Grid Animation
      const cards = gsap.utils.toArray('.activity-card');
      gsap.fromTo(cards,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter, isSummary]);

  const filterActivities = (category: string) => {
    setActiveFilter(category);
  };

  const activitiesToDisplay = isSummary 
    ? activities.slice(0, 3) 
    : (activeFilter === "all" 
        ? activities 
        : activities.filter(activity => activity.category === activeFilter));

  return (
    <section 
      id="extracurricular" 
      ref={sectionRef}
      className={`section relative overflow-hidden ${isSummary ? 'py-20' : 'min-h-screen py-24'}`}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
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
        
        {/* Floating Shapes */}
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

      <div className="container relative z-10 max-w-6xl mx-auto px-6">
        <div className="extra-header text-center mb-12">
          {!isSummary && (
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20 backdrop-blur-sm">
              <Users className="w-4 h-4 mr-2" />
              <span>Community & Leadership</span>
            </div>
          )}
          <SectionTitle 
            title="Beyond the Lab" 
            subtitle={isSummary ? "Leadership, volunteering, and impact." : "A journey of leadership, community service, and holistic growth."}
            alignment='center'
          />
        </div>
        
        {!isSummary && (
          <div className="filter-controls mb-12 flex flex-wrap justify-center gap-3">
            {[
              { id: 'all', label: 'All Activities', icon: Users },
              { id: 'leadership', label: 'Leadership', icon: Award },
              { id: 'volunteer', label: 'Volunteering', icon: Heart },
              { id: 'academic', label: 'Academic', icon: Tag }
            ].map((filter) => (
              <button 
                key={filter.id}
                className={`filter-btn group relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                  activeFilter === filter.id 
                    ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                    : "bg-card border border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
                onClick={() => filterActivities(filter.id)}
              >
                <div className="relative z-10 flex items-center gap-2">
                  <filter.icon className={`w-4 h-4 ${activeFilter === filter.id ? 'text-primary-foreground' : 'text-primary'}`} />
                  <span>{filter.label}</span>
                </div>
                {activeFilter === filter.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-100" />
                )}
              </button>
            ))}
          </div>
        )}
        
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activitiesToDisplay.map((activity) => (
            <Link 
              key={activity.id} 
              to={isSummary ? '/extracurricular' : `/extracurricular/${activity.id}`}
              className="activity-card group block h-full"
            > 
              <article className="h-full bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  {activity.imageUrl ? (
                    <>
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{
                          backgroundImage: activity.imageUrl.startsWith('http') 
                            ? `url(${activity.imageUrl})`
                            : `url(${activity.imageUrl})`
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-700" />
                  )}
                  
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-background/80 backdrop-blur-sm text-foreground border-primary/20 shadow-sm">
                      {activity.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col relative">
                  {/* Decorative Line */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{activity.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {activity.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center text-primary text-sm font-medium mt-auto group/link">
                    <span className="group-hover/link:underline">Read More</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {isSummary && (
          <div className="mt-16 text-center">
            <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105">
              <Link to="/extracurricular" className="flex items-center gap-2">
                Explore All Activities <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExtracurricularSection;
