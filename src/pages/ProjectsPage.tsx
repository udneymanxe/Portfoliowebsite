import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ExternalLink, Trophy, Globe, Zap, Brain, Target, Star, Code, Cpu, Rocket, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectsPage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "TargetScoreAI",
      description: "AI-powered IELTS preparation platform with personalized tutoring and adaptive practice tests.",
      longDescription: "An innovative educational technology platform that leverages artificial intelligence to provide personalized IELTS preparation. Features adaptive learning algorithms, real-time feedback systems, and comprehensive progress tracking to help students achieve their target scores efficiently.",
      website: "https://targetscoreai.xyz",
      showcase: "https://s1-showcase.lovable.app/",
      achievements: [
        { title: "2nd Overall in Asia", subtitle: "Lovable Shipped Competition", icon: Trophy },
        { title: "1st Global Position", subtitle: "Weekly Showcase Winner", icon: Star }
      ],
      technologies: ["AI/ML", "React", "TypeScript", "NLP", "Educational Tech"],
      features: ["Personalized AI Tutoring", "Adaptive Practice Tests", "Real-time Feedback System", "Progress Analytics", "Score Prediction"],
      category: "AI Education",
      status: "Live",
      year: "2025",
      icon: <Brain className="w-10 h-10 text-primary" />
    }
  ];

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
      gsap.from('.project-header > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Cards Animation
      gsap.from('.project-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.project-list',
          start: 'top 80%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">
        {/* Tech Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 transition-all duration-1000 ease-out"
            style={{
              background: `
                radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                  rgba(var(--primary-rgb), 0.1) 0%, 
                  rgba(var(--primary-rgb), 0.02) 40%, 
                  transparent 60%),
                linear-gradient(to bottom, hsl(var(--background)), hsl(var(--background) / 0.95))`
            }}
          />
          
          {/* Circuit Lines */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-primary/40"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: 0,
                  width: '100%',
                  height: '1px',
                  transform: `scaleX(${Math.random()})`,
                  transformOrigin: 'left',
                  animation: `pulse 3s infinite ${Math.random() * 2}s`
                }}
              />
            ))}
             {[...Array(5)].map((_, i) => (
              <div 
                key={`v-${i}`}
                className="absolute bg-primary/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: 0,
                  height: '100%',
                  width: '1px',
                  transform: `scaleY(${Math.random()})`,
                  transformOrigin: 'top',
                  animation: `pulse 4s infinite ${Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          {/* Floating Tech Icons */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-primary/5 animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 2 + 1}rem`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `translate(${mousePosition.x * 0.05 * (i % 2 === 0 ? 1 : -1)}px, ${mousePosition.y * 0.05 * (i % 2 === 0 ? 1 : -1)}px)`
              }}
            >
              {i % 4 === 0 ? <Code /> : i % 4 === 1 ? <Cpu /> : i % 4 === 2 ? <Layers /> : <Zap />}
            </div>
          ))}
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 z-10 project-header">
          <div className="container max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20 backdrop-blur-sm">
              <Rocket className="w-4 h-4 mr-2" />
              <span>Innovation & Development</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Future</span> with AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Showcasing award-winning projects that merge cutting-edge technology with real-world impact.
            </p>
          </div>
        </section>

        {/* Projects List */}
        <section className="relative pb-24 z-10 project-list">
          <div className="container max-w-5xl mx-auto px-6">
            {projects.map((project, index) => (
              <article 
                key={index} 
                className="project-card group relative bg-card/50 backdrop-blur-md border border-border/60 rounded-3xl p-8 mb-12 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-1"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Header */}
                <header className="relative z-10 mb-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                          {project.icon}
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{project.title}</h2>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="bg-primary/10 text-primary text-xs border border-primary/20">
                              {project.year}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-primary/20 text-muted-foreground">
                              <Globe className="w-3 h-3 mr-1" />
                              {project.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-primary/20 text-muted-foreground">
                              {project.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                        {project.longDescription}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors cursor-default text-xs font-normal border border-transparent hover:border-primary/20 px-3 py-1">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                          <a href={project.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Visit Live Project
                          </a>
                        </Button>
                        <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors">
                          <a href={project.showcase} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            View Showcase
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Achievements Column */}
                    <div className="w-full md:w-80 space-y-4">
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide flex items-center">
                        <Trophy className="w-4 h-4 mr-2 text-primary" />
                        Key Achievements
                      </h3>
                      <div className="grid gap-3">
                        {project.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-xl hover:bg-primary/10 transition-colors duration-300">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                              <achievement.icon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-foreground text-sm">{achievement.title}</p>
                              <p className="text-xs text-muted-foreground">{achievement.subtitle}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </header>

                {/* Features Grid */}
                <div className="relative z-10 bg-muted/30 rounded-2xl p-6 border border-border/50">
                  <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-primary" />
                    Core Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3 text-sm text-muted-foreground group/feature">
                        <div className="w-2 h-2 rounded-full bg-primary/40 group-hover/feature:bg-primary transition-colors" />
                        <span className="group-hover/feature:text-foreground transition-colors">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}

            {/* Coming Soon */}
            <div className="text-center py-16 relative z-10">
              <div className="inline-flex items-center justify-center p-1 rounded-full bg-muted/30 backdrop-blur-sm border border-border/50">
                <div className="px-6 py-2 rounded-full bg-background/50 flex items-center gap-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">More innovative projects in the pipeline</span>
                </div>
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
