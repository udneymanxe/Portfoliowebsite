import React, { useState, useEffect } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Shield, Brain, Microscope, Code, Database, LineChart, FileText, Link as LinkIcon, Upload, Users, Download, Award, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const SkillsSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('skills')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.addEventListener('mousemove', handleMouseMove);
      return () => skillsSection.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const skillCategories = [
    {
      title: "Research Methods",
      icon: Microscope,
      description: "Proficiency in designing and conducting physics experiments",
      color: "from-blue-500/10 to-primary/10",
      accent: "border-blue-500/30"
    },
    {
      title: "Computational Skills",
      icon: Code,
      description: "Programming languages and tools/frameworks proficiency",
      color: "from-green-500/10 to-primary/10",
      accent: "border-green-500/30",
      languages: "C, Matlab, Python (NumPy, Pandas, Matplotlib)",
      tools: "Jupyter Notebook, git, LaTex, PyTorch"
    },
    {
      title: "Soft Skills",
      icon: Users,
      description: "Essential interpersonal and professional abilities",
      color: "from-purple-500/10 to-primary/10",
      accent: "border-purple-500/30",
      skills: ["Communication", "Presentation", "Problem-solving"]
    },
    {
      title: "Analytics",
      icon: LineChart,
      description: "Statistical analysis and interpretation of complex datasets",
      color: "from-orange-500/10 to-primary/10",
      accent: "border-orange-500/30"
    }
  ];

  return (
    <section id="skills" className="section relative min-h-screen overflow-hidden py-20">
      {/* Enhanced Background with Dynamic Mouse-Responsive Effects */}
      <div className="absolute inset-0">
        {/* Primary Background with Interactive Gradient */}
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(var(--primary-rgb), 0.06) 0%, 
                rgba(var(--primary-rgb), 0.02) 25%, 
                transparent 50%),
              linear-gradient(135deg, 
                hsl(var(--background)) 0%, 
                hsl(var(--background) / 0.95) 50%, 
                hsl(var(--background)) 100%)`
          }}
        />
        
        {/* Advanced Animated Background Elements */}
        <div className="absolute inset-0 opacity-50">
          {/* Large Interactive Orbs with Mouse Following */}
          <div 
            className="absolute w-48 h-48 bg-gradient-radial from-primary/12 via-primary/6 to-transparent rounded-full animate-pulse-slow transition-all duration-1000" 
            style={{
              top: `${15 + (mousePosition.y * 0.08)}%`,
              right: `${15 + (mousePosition.x * 0.12)}%`,
              filter: 'blur(25px)',
              transform: `scale(${1 + mousePosition.x * 0.001})`
            }}
          />
          <div 
            className="absolute w-40 h-40 bg-gradient-radial from-primary/10 via-primary/5 to-transparent rounded-full animate-pulse-slow delay-1000 transition-all duration-1200" 
            style={{
              bottom: `${15 + (mousePosition.y * 0.1)}%`,
              left: `${15 + (mousePosition.x * 0.09)}%`,
              filter: 'blur(20px)',
              transform: `scale(${1 + mousePosition.y * 0.0012})`
            }}
          />
          <div 
            className="absolute w-36 h-36 bg-gradient-radial from-primary/14 via-primary/7 to-transparent rounded-full animate-pulse-slow delay-1500 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-800" 
            style={{
              top: `${50 + Math.sin(mousePosition.x * 0.08) * 8}%`,
              left: `${50 + Math.cos(mousePosition.y * 0.08) * 8}%`,
              filter: 'blur(18px)',
              transform: `translate(-50%, -50%) scale(${1 + (mousePosition.x + mousePosition.y) * 0.0008})`
            }}
          />
          
          {/* Dynamic Light Streaks */}
          <div 
            className="absolute w-1.5 h-28 bg-gradient-to-b from-primary/35 to-transparent rounded-full animate-pulse-slow transition-all duration-700"
            style={{
              top: `${20 + mousePosition.y * 0.15}%`,
              left: `${20 + mousePosition.x * 0.18}%`,
              transform: `rotate(${30 + mousePosition.x * 0.4}deg)`,
              opacity: 0.5 + mousePosition.x * 0.003
            }}
          />
          <div 
            className="absolute w-2 h-24 bg-gradient-to-b from-primary/40 to-transparent rounded-full animate-pulse-slow delay-600 transition-all duration-900"
            style={{
              top: `${70 + mousePosition.y * 0.12}%`,
              right: `${25 + mousePosition.x * 0.15}%`,
              transform: `rotate(${-45 + mousePosition.y * 0.35}deg)`,
              opacity: 0.4 + mousePosition.y * 0.004
            }}
          />
          
          {/* Floating Tech Particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/50 rounded-full animate-pulse-slow transition-all duration-1000"
              style={{
                top: `${10 + i * 8 + Math.sin(mousePosition.x * 0.08 + i) * 6}%`,
                left: `${12 + i * 7 + Math.cos(mousePosition.y * 0.08 + i) * 9}%`,
                animationDelay: `${i * 250}ms`,
                opacity: 0.2 + (mousePosition.x + mousePosition.y) * 0.002,
                filter: 'blur(0.3px)'
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <SectionTitle 
          title="Technical Skills"
          subtitle="Expertise across physics, AI, and computational methods."
          alignment="center"
        />
        
        {/* Modern Skills Grid */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-12 sm:mt-16">
            {skillCategories.map((category, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2">
                {/* Dynamic Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative p-6 sm:p-8 backdrop-blur-sm">
                  {/* Header */}
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <category.icon className="text-primary h-5 w-5 sm:h-7 sm:w-7 group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{category.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 leading-tight">{category.description}</p>
                    </div>
                  </div>
                  
                  {/* Detailed Content */}
                  {category.title === "Computational Skills" ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-background/50 border border-primary/10">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                          <Code className="w-4 h-4 mr-2 text-primary" />
                          Languages:
                        </h4>
                        <p className="text-sm text-muted-foreground">{category.languages}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-background/50 border border-primary/10">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                          <Database className="w-4 h-4 mr-2 text-primary" />
                          Tools/Frameworks:
                        </h4>
                        <p className="text-sm text-muted-foreground">{category.tools}</p>
                      </div>
                    </div>
                  ) : category.title === "Soft Skills" ? (
                    <div className="space-y-2 sm:space-y-3">
                      {category.skills?.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-background/30 border border-primary/5 group-hover:border-primary/20 transition-colors duration-300">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          <span className="text-xs sm:text-sm font-medium text-foreground">{skill}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-background/30 border border-primary/10">
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="inline-block group">
              <Button asChild variant="outline" className="group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300">
                <Link to="/certifications" className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>View Certifications</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
