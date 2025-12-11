import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ExternalLink, Trophy, Star, Globe, Target, BookOpen, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: number | string;
  title: string;
  description: string;
  longDescription: string;
  website: string;
  showcase?: string;
  achievements: Array<{
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
  }>;
  technologies: string[];
  category: string;
  status: string;
  year: string;
}

const ProjectsSummarySection: React.FC = () => {
  const featuredProjects: Project[] = [
    {
      id: 1,
      title: "TargetScoreAI",
      description: "AI-powered IELTS preparation platform with personalized tutoring and adaptive practice tests.",
      longDescription: "An innovative educational technology platform that leverages artificial intelligence to provide personalized IELTS preparation. Features adaptive learning algorithms, real-time feedback systems, and comprehensive progress tracking.",
      website: "https://targetscoreai.xyz",
      showcase: "https://s1-showcase.lovable.app/",
      achievements: [
        {
          title: "2nd Overall in Asia",
          subtitle: "Lovable Shipped Competition",
          icon: Trophy
        },
        {
          title: "1st Global Position", 
          subtitle: "Weekly Showcase Winner",
          icon: Star
        }
      ],
      technologies: ["AI/ML", "React", "TypeScript", "NLP"],
      category: "AI Education",
      status: "Live",
      year: "2025"
    }
  ];

  return (
    <section id="projects-summary" className="section py-20">
      <div className="container max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Target className="w-4 h-4 mr-2" />
            Featured Project
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Recent Projects
          </h2>
          <p className="text-lg text-muted-foreground">
            Award-winning AI applications in educational technology
          </p>
        </div>

        {/* Featured Project */}
        <div className="mb-12">
          {featuredProjects.map((project, index) => (
            <article key={project.id} className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              {/* Project Header */}
              <header className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    {project.year}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    <Globe className="w-3 h-3 mr-1" />
                    {project.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {project.longDescription}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                    <a href={project.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      {project.category === "Research" ? "Read Paper" : "Visit Project"}
                    </a>
                  </Button>
                  {project.showcase && (
                    <Button asChild variant="outline" size="sm">
                      <a href={project.showcase} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        View Showcase
                      </a>
                    </Button>
                  )}
                </div>
              </header>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                  Achievements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10 rounded-lg">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <achievement.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                  {project.category === "Research" ? "Methods & Tools" : "Technologies"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="bg-muted text-muted-foreground text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* View All Projects CTA */}
        <div className="text-center mb-16">
          <Button asChild variant="outline" className="group">
            <Link to="/projects" className="flex items-center gap-2">
              View All Projects 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSummarySection; 