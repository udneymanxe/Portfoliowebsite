import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useParallax } from '@/hooks/useParallax';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Define the data structure for activities
interface Activity {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string; // Short summary
  detailedDescription?: string; // Longer description for detail page
  imageUrl?: string; // Main card image
  images?: string[]; // Array of image URLs for detail page
  link?: string;
}

// Export the activities array so ActivityPage can use it (temporary solution)
export const activities: Activity[] = [
  {
    id: 1,
    title: "Science Olympiad",
    date: "2023-2025",
    category: "academic",
    description: "Led the Physics team to state finals...", // Keep summary brief
    detailedDescription: "Led the Physics team to state finals. Developed innovative experimental designs that earned top marks in regional competitions. Mentored junior members and coordinated practice sessions.",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
    images: [
      "https://images.unsplash.com/photo-1543269865-cbf427effbad",
      "/images/olympiad_photo_1.jpg", // Example local image path
      "/images/olympiad_photo_2.png"  // Example local image path
    ]
  },
  {
    id: 2,
    title: "Environmental Club",
    date: "2022-Present",
    category: "volunteer",
    description: "Organized campus-wide sustainability initiatives...",
    detailedDescription: "Organized campus-wide sustainability initiatives including a successful recycling program that reduced waste by 30%. Led tree-planting events and educational workshops on environmental conservation.",
    imageUrl: "https://images.unsplash.com/photo-1618472609775-b4d5f4b09467",
    images: ["https://images.unsplash.com/photo-1618472609775-b4d5f4b09467"]
  },
  {
    id: 3,
    title: "Debate Team Captain",
    date: "2024-2025",
    category: "leadership",
    description: "Led the team to nationals by implementing structured practice methods...",
    detailedDescription: "Led the team to nationals by implementing structured practice methods and mentoring new members. Secured funding for travel and competitions through successful grant applications.",
    imageUrl: "https://images.unsplash.com/photo-1578357078586-491adf1aa5ba",
    images: ["https://images.unsplash.com/photo-1578357078586-491adf1aa5ba"]
  },
  // Add detailedDescription and images arrays to other activities as well...
  {
    id: 4,
    title: "Community Outreach",
    date: "2023-Present",
    category: "volunteer",
    description: "Volunteered 200+ hours at local hospitals...",
    detailedDescription: "Volunteered 200+ hours at local hospitals, providing support to patients and medical staff. Assisted with administrative tasks and organized patient entertainment activities.",
    imageUrl: "https://images.unsplash.com/photo-1519671482749-b09be79564a6",
     images: ["https://images.unsplash.com/photo-1519671482749-b09be79564a6"]
  },
  {
    id: 5,
    title: "Student Government",
    date: "2022-2025",
    category: "leadership",
    description: "Served as Class Representative, facilitating communication...",
    detailedDescription: "Served as Class Representative, facilitating communication between students and administration and organizing events with 500+ attendees. Successfully advocated for improved campus facilities.",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
     images: ["https://images.unsplash.com/photo-1543269865-cbf427effbad"]
  },
  {
    id: 6,
    title: "Chess Club",
    date: "2021-2025",
    category: "academic",
    description: "Achieved district championship and mentored beginners...",
    detailedDescription: "Achieved district championship and mentored beginners through weekly training sessions. Organized inter-school chess tournaments.",
    imageUrl: "https://images.unsplash.com/photo-1578357078586-491adf1aa5ba",
     images: ["https://images.unsplash.com/photo-1578357078586-491adf1aa5ba"]
  }
];

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
                    style={{ backgroundImage: `url(${activity.imageUrl}?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600)` }}
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
