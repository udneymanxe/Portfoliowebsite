import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// TODO: Define Project type and fetch/import actual project data
interface Project {
  id: number | string;
  title: string;
  description: string;
  imageUrl?: string; // Optional image
}

const ProjectsSummarySection: React.FC = () => {
  // Placeholder projects
  const projects: Project[] = [
    { id: 1, title: "Project Alpha", description: "An innovative project exploring...".substring(0, 100) + "...", imageUrl: "/placeholder-project1.jpg" },
    { id: 2, title: "Project Beta", description: "Developing a novel approach to...".substring(0, 100) + "...", imageUrl: "/placeholder-project2.jpg" },
    { id: 3, title: "Project Gamma", description: "Research and implementation of...".substring(0, 100) + "...", imageUrl: "/placeholder-project3.jpg" },
  ];

  return (
    <section id="projects-summary" className="section">
      <SectionTitle title="Recent Projects" subtitle="Highlights from my latest work" alignment='center' />
      
      <div className="container max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <div key={project.id} className="glass rounded-lg overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:scale-[1.03]">
              {project.imageUrl && (
                <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                {/* Optional: Add a link to the specific project page if you have individual project pages */}
                {/* <Link to={`/projects/${project.id}`} className="text-primary text-sm hover:underline">Learn More</Link> */}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild>
            <Link to="/projects">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSummarySection; 