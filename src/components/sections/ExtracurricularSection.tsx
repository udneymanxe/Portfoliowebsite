import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useParallax } from '@/hooks/useParallax';
// Import activities from the new data file
import { activities } from '@/data/activities';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Define props interface
interface ExtracurricularSectionProps {
  isSummary?: boolean;
}

const ExtracurricularSection: React.FC<ExtracurricularSectionProps> = ({ isSummary = false }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { style: parallaxStyle } = useParallax(sectionRef, { speed: 0.05 });
  
  useEffect(() => {
    if (isSummary) return; // Disable animations in summary mode

    const initializeAnimations = () => {
      if (!gridRef.current) return;
      
      const gridItems = gridRef.current.querySelectorAll('.activity-card');
      
      gsap.fromTo(
        gridItems,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8,
          stagger: 0.1, ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%", end: "bottom 20%",
            toggleActions: "play none none none",
          }
        }
      );
    };
    
    const timeoutId = setTimeout(initializeAnimations, 200);
    return () => clearTimeout(timeoutId);
  }, [activeFilter, isSummary]); // Re-run if filter or summary status changes
  
  const filterActivities = (category: string) => {
    setActiveFilter(category);
  };
  
  // Show fewer items in summary mode
  const activitiesToDisplay = isSummary 
    ? activities.slice(0, 3) 
    : (activeFilter === "all" 
        ? activities 
        : activities.filter(activity => activity.category === activeFilter));
  
  return (
    <section 
      id="extracurricular" 
      ref={sectionRef}
      className={`section ${isSummary ? 'py-16' : 'bg-background'}`}
      style={isSummary ? {} : parallaxStyle} // Disable parallax in summary
    >
      <SectionTitle 
        title="Extracurricular Activities" 
        subtitle={isSummary ? "Highlights of leadership, volunteering, and academic pursuits." : "Leadership, volunteerism, and academic pursuits beyond the classroom"}
        alignment='center'
      />
      
      {/* Only show filters on the full page */}
      {!isSummary && (
        <div className="filter-controls mb-10 flex flex-wrap justify-center gap-3">
          <button 
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeFilter === "all" ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-foreground/80 hover:bg-secondary/80"}`}
            onClick={() => filterActivities("all")}
          >All</button>
          <button 
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeFilter === "leadership" ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-foreground/80 hover:bg-secondary/80"}`}
            onClick={() => filterActivities("leadership")}
          >Leadership</button>
          <button 
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeFilter === "volunteer" ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-foreground/80 hover:bg-secondary/80"}`}
            onClick={() => filterActivities("volunteer")}
          >Volunteering</button>
          <button 
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeFilter === "academic" ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-foreground/80 hover:bg-secondary/80"}`}
            onClick={() => filterActivities("academic")}
          >Academic</button>
        </div>
      )}
      
      <div ref={gridRef} className="activity-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {activitiesToDisplay.map(activity => (
          <Link 
             key={activity.id} 
             to={isSummary ? '/extracurricular' : `/extracurricular/${activity.id}`}
             className={`activity-card block ${isSummary ? '' : 'opacity-0 -translate-y-4'}`}
             aria-label={`View details for ${activity.title}`}
             data-category={activity.category}
           > 
            <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
              {activity.imageUrl && (
                <div className="relative overflow-hidden h-48">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 hover:scale-105"
                    style={{
                      backgroundImage: activity.imageUrl.startsWith('http') 
                        ? `url(${activity.imageUrl}?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600)`
                        : `url(${activity.imageUrl})`
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <span className="text-sm font-medium bg-primary/80 py-1 px-3 rounded-full">
                      {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                    </span>
                  </div>
                </div>
              )}
              <CardContent className="p-5">
                <div className="space-y-3">
                  <span className="text-sm text-muted-foreground font-medium">{activity.date}</span>
                  <h3 className="text-xl font-semibold text-foreground">{activity.title}</h3>
                  <p className="text-muted-foreground">{activity.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {isSummary && (
         <div className="mt-12 text-center">
           <Button asChild>
             <Link to="/extracurricular">
               See All Activities <ArrowRight className="ml-2 h-4 w-4" />
             </Link>
           </Button>
         </div>
       )}
    </section>
  );
};

export default ExtracurricularSection;
