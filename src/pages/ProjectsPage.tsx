import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import { ExternalLink, Award, Trophy, Globe, Zap, Brain, Target, Star, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ProjectsPage: React.FC = () => {
  const projects = [
    {
      title: "TargetScoreAI",
      description: "AI-powered IELTS preparation platform with personalized tutoring and adaptive practice tests.",
      longDescription: "An innovative educational technology platform that leverages artificial intelligence to provide personalized IELTS preparation. Features adaptive learning algorithms, real-time feedback systems, and comprehensive progress tracking to help students achieve their target scores efficiently.",
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
      technologies: ["AI/ML", "React", "TypeScript", "NLP", "Educational Tech"],
      features: [
        "Personalized AI Tutoring",
        "Adaptive Practice Tests",
        "Real-time Feedback System", 
        "Progress Analytics",
        "Score Prediction"
      ],
      category: "AI Education",
      status: "Live",
      year: "2025"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                Award-Winning Projects
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Recent Work
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Innovative AI applications and educational technology solutions
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="pb-20">
          <div className="container max-w-4xl mx-auto px-6">
            {projects.map((project, index) => (
              <article key={index} className="group bg-card border border-border rounded-2xl p-8 mb-8 hover:shadow-lg transition-all duration-300">
                {/* Project Header */}
                <header className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-foreground">{project.title}</h2>
                        <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                          {project.year}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          <Globe className="w-3 h-3 mr-1" />
                          {project.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {project.longDescription}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                      <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                        <a href={project.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          {project.category === "Medical Physics" ? "Read Paper" : "Visit Project"}
                        </a>
                      </Button>
                    <Button asChild variant="outline" size="sm">
                      <a href={project.showcase} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        View Showcase
                      </a>
                    </Button>
                  </div>
                </header>

                {/* Achievements */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Achievements
                  </h3>
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
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="bg-muted text-muted-foreground text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}

            {/* More Projects Coming Soon */}
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
                <span className="text-sm">More projects coming soon</span>
                <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProjectsPage; 