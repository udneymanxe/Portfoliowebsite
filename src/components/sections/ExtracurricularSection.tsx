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
  videoUrl?: string; // Optional video URL
  link?: string;
}

// Export the activities array so ActivityPage can use it (temporary solution)
export const activities: Activity[] = [
  {
    id: 2,
    title: "Volunteer, Be the Change Project",
    date: "2021-22",
    category: "volunteer",
    description: "Contributed to establishing a library for underprivileged students in Sindhupalchowk, Nepal.",
    detailedDescription: "Contributed to the \"Be the Change Project,\" a literacy initiative by the Leo Club under Lions Club International, aimed at establishing a library for underprivileged students in Sindhupalchowk, Nepal, a rural area with limited access to educational resources. Facilitated book collection by promoting and managing a donation drive, utilizing St. Xavier's College, Kathmandu, as a designated drop-off point to gather a diverse range of books for the library. Worked closely with local volunteers in Sindhupalchowk to set up the library, organizing bookshelves, arranging reading materials, and creating an accessible and welcoming space to encourage a reading culture among children and young people. Supported the project's mission to promote literacy and education in underserved communities, aligning with the Leo Club's motto of \"Learn, Lead, Serve\" and contributing to the United Nations Sustainable Development Goals (SDGs) for quality education. Observed the direct impact of the initiative, as children in Sindhupalchowk engaged with books for the first time, fostering their enthusiasm for learning and personal growth. Developed skills in project coordination, community outreach, and teamwork while addressing educational disparities in rural Nepal.",
    imageUrl: "library1.jpg",
    images: [
      "library1.jpg",
      "library2.jpg",
      "library3.jpg",
      "library4.jpg",
      "library5.jpg",
      "library6.jpg"
    ]
  },
  // Re-added Leo Club activity (id: 3)
  {
    id: 3,
    title: "Founder & Charter President, Leo Club of Kathmandu Temple Siddhi Binayak",
    date: "2020-2023", 
    category: "leadership",
    description: "Founded the club, built a team of 30 members, and organized 12 community service programs.", 
    detailedDescription: "I founded the Leo Club of Kathmandu Temple Siddhi Binayak and served as its Charter President. During my leadership, we focused on serving the needs of our local community through various impactful initiatives. I successfully built a strong team of 30 dedicated members, united by a shared commitment to help and serve others. Together, we organized 12 community service programs, including environmental campaigns and skill development initiatives aimed at empowering and uplifting the community.", 
    imageUrl: "Leo_event1.jpg",
    images: [
      "Leo_event1.jpg",
      "Leo_event2.jpg",
      "Leo_event3.jpg", 
      "Leo_event4.jpg",
      "Leo_event5.jpg"
    ]
  },
  // Updated Community Outreach activity (id: 4)
  {
    id: 4,
    title: "Volunteer, IAPS School Day and Outreach Programme – SXPC-Nepal",
    date: "December 10-12, 2022",
    category: "volunteer",
    description: "Contributed to the IAPS School Day and Outreach Programme, focusing on \"Physics for Sustainable Development\" at Surke Secondary School.",
    detailedDescription: "Contributed to the \"IAPS School Day and Outreach Programme: Physics for Sustainable Development,\" organized by the St. Xavier's Physics Council (SXPC-Nepal) in collaboration with the International Association of Physics Students (IAPS) and St. Xavier's College, Kathmandu, at Surke Secondary School in Kharidhunga, Nepal. Designed and conducted hands-on physics experiments for students, focusing on the theme \"Physics for Sustainable Development,\" to demonstrate the role of physics in addressing global sustainability challenges, such as renewable energy and environmental conservation. Engaged with young students to foster curiosity and scientific thinking, observing their inquisitive minds as they explored physics concepts through interactive demonstrations, enhancing their understanding of sustainable development principles. Collaborated with a team of volunteers to plan and execute the outreach program, ensuring an organized and impactful learning experience for students in a rural educational setting. Supported the program's mission to promote STEM education in underserved communities, aligning with the United Nations Sustainable Development Goals (SDGs) for quality education and sustainable development. Developed skills in science communication, event coordination, and teamwork while contributing to educational outreach in rural Nepal.",
    imageUrl: "sxpc1.jpg",
    images: [
      "sxpc1.jpg",
      "sxpc2.jpg",
      "sxpc3.jpg",
      "sxpc4.jpg",
      "sxpc5.jpg",
      "sxpc6.jpg"
    ]
  },
  // Re-added Physics Demonstration activity (id: 7)
  {
    id: 7, 
    title: "Live Physics Demonstration Lead (SXPC Nepal)",
    date: "2/2/24", 
    category: "academic",
    description: "Led a live physics demonstration at St. Xavier's College, featuring interactive stalls like the Chladni Plate experiment.",
    detailedDescription: "To help make science more fun and understandable, I led a live physics demonstration at St. Xavier's College, Kathmandu, as part of SXPC Nepal. We set up interactive stalls where students could see and experience physics in action. One of the most popular setups was the Chladni Plate experiment, where sound waves created beautiful sand patterns on a metal plate. It was a great way to show how sound and vibration work, and it really caught people's attention. We also talked about solid-state physics, including how crystals are structured and how materials conduct electricity. Alongside that, we demonstrated concepts from mechanics, optics, and electromagnetism—turning textbook theories into hands-on experiences. The booth was filled with posters of famous physicists, charts, and live experiments. Lots of students stopped by, asked questions, and got involved with the activities. Our goal was simple: to spark curiosity and show that physics isn't just theory—it's all around us and can be exciting to explore.",
    imageUrl: "cladiniplate1.jpg",
    images: [
      "cladiniplate1.jpg",
      "cladiniplate2.jpg",
      "cladiniplate3.jpg",
      "cladiniplate4.jpg"
    ],
    videoUrl: "cladiniplate5.mp4"
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
                    style={{
                      backgroundImage: activity.imageUrl.startsWith('http') 
                        ? `url(${activity.imageUrl}?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600)`
                        : `url(${import.meta.env.BASE_URL}${activity.imageUrl})`
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
