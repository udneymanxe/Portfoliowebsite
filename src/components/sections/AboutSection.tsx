import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '@/components/SectionTitle';
import { Calendar, FileText, Mail, User, ArrowRight, Linkedin, Github, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AboutSectionProps {
  isSummary?: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ isSummary = false }) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const summaryText = "Physics graduate with a deep passion for AI and its transformative potential. Committed to leveraging artificial intelligence to solve meaningful real-world problems and drive positive impact in society.";

  const detailedDescription = "As a physics graduate with a strong foundation in theoretical and computational physics, I am driven by the vision of using AI to create meaningful change. My focus lies at the intersection of physics and artificial intelligence—applying machine learning, deep learning, and data-driven approaches to solve complex problems. With two years of physics education experience, I have developed exceptional skills in communicating complex scientific concepts and breaking down intricate ideas. I am passionate about building AI solutions that address real challenges, from scientific discovery to societal impact, and aspire to contribute meaningfully to the field of AI.";

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('about')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.addEventListener('mousemove', handleMouseMove);
      return () => aboutSection.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);
  
  return (
    <section id="about" className={`section relative min-h-screen overflow-hidden ${isSummary ? 'py-16' : 'py-20'}`}>
      {/* Billion Dollar Hero-to-About Transition Bridge */}
      {isSummary && (
        <div className="absolute -top-32 left-0 w-full h-64 overflow-hidden pointer-events-none">
          {/* Continuation Wave from Hero */}
          <svg
            viewBox="0 0 1200 120"
            className="absolute top-0 w-full h-full transform rotate-180"
            style={{
              filter: 'drop-shadow(0 10px 30px rgba(var(--primary-rgb), 0.15))'
            }}
          >
            <defs>
              <linearGradient id="aboutWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(var(--primary-rgb), 0.6)" />
                <stop offset="25%" stopColor="rgba(var(--primary-rgb), 0.3)" />
                <stop offset="50%" stopColor="rgba(var(--primary-rgb), 0.8)" />
                <stop offset="75%" stopColor="rgba(var(--primary-rgb), 0.3)" />
                <stop offset="100%" stopColor="rgba(var(--primary-rgb), 0.6)" />
              </linearGradient>
            </defs>
            <path
              d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
              fill="url(#aboutWaveGradient)"
              className="animate-pulse-slow"
            />
          </svg>
          
          {/* Morphing Gradient Bridge */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary/10 to-background/80"></div>
          
          {/* Energy Particles Rising */}
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce"
                style={{
                  left: `${5 + i * 6}%`,
                  top: `${60 + Math.sin(i * 0.8) * 30}px`,
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '3s',
                  filter: 'blur(0.5px)'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Background with Dynamic Mouse-Responsive Effects */}
      <div className="absolute inset-0">
        {/* Primary Background with Interactive Gradient */}
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(var(--primary-rgb), 0.08) 0%, 
                rgba(var(--primary-rgb), 0.03) 25%, 
                transparent 50%),
              linear-gradient(135deg, 
                hsl(var(--background)) 0%, 
                hsl(var(--background) / 0.95) 50%, 
                hsl(var(--background)) 100%)`
          }}
        />
        
        {/* Advanced Animated Background Elements */}
        <div className="absolute inset-0 opacity-70">
          {/* Large Interactive Orbs with Mouse Following */}
          <div 
            className="absolute w-40 h-40 bg-gradient-radial from-primary/15 via-primary/8 to-transparent rounded-full animate-pulse-slow transition-all duration-1000" 
            style={{
              top: `${20 + (mousePosition.y * 0.1)}%`,
              right: `${20 + (mousePosition.x * 0.1)}%`,
              filter: 'blur(20px)',
              transform: `scale(${1 + mousePosition.x * 0.002})`
            }}
          />
          <div 
            className="absolute w-48 h-48 bg-gradient-radial from-primary/12 via-primary/6 to-transparent rounded-full animate-pulse-slow delay-1000 transition-all duration-1200" 
            style={{
              bottom: `${20 + (mousePosition.y * 0.08)}%`,
              left: `${20 + (mousePosition.x * 0.08)}%`,
              filter: 'blur(25px)',
              transform: `scale(${1 + mousePosition.y * 0.0015})`
            }}
          />
          <div 
            className="absolute w-32 h-32 bg-gradient-radial from-primary/18 via-primary/9 to-transparent rounded-full animate-pulse-slow delay-1500 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-800" 
            style={{
              top: `${50 + Math.sin(mousePosition.x * 0.1) * 10}%`,
              left: `${50 + Math.cos(mousePosition.y * 0.1) * 10}%`,
              filter: 'blur(15px)',
              transform: `translate(-50%, -50%) scale(${1 + (mousePosition.x + mousePosition.y) * 0.001})`
            }}
          />
          
          {/* Dynamic Light Streaks Following Mouse */}
          <div 
            className="absolute w-2 h-24 bg-gradient-to-b from-primary/40 to-transparent rounded-full animate-pulse-slow transition-all duration-700"
            style={{
              top: `${25 + mousePosition.y * 0.2}%`,
              left: `${25 + mousePosition.x * 0.15}%`,
              transform: `rotate(${45 + mousePosition.x * 0.5}deg)`,
              opacity: 0.6 + mousePosition.x * 0.004
            }}
          />
          <div 
            className="absolute w-1.5 h-20 bg-gradient-to-b from-primary/50 to-transparent rounded-full animate-pulse-slow delay-800 transition-all duration-900"
            style={{
              top: `${75 + mousePosition.y * 0.1}%`,
              right: `${33 + mousePosition.x * 0.12}%`,
              transform: `rotate(${-30 + mousePosition.y * 0.3}deg)`,
              opacity: 0.5 + mousePosition.y * 0.005
            }}
          />
          
          {/* Constellation Effect */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/60 rounded-full animate-pulse-slow transition-all duration-1000"
              style={{
                top: `${20 + i * 10 + Math.sin(mousePosition.x * 0.1 + i) * 5}%`,
                left: `${15 + i * 8 + Math.cos(mousePosition.y * 0.1 + i) * 8}%`,
                animationDelay: `${i * 300}ms`,
                opacity: 0.3 + (mousePosition.x + mousePosition.y) * 0.003,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>
        
        {/* Interactive Micro Elements */}
        <div 
          className="absolute w-20 h-20 bg-gradient-radial from-primary/25 to-transparent rounded-full animate-pulse-slow delay-500 transition-all duration-600" 
          style={{
            top: `${32 + mousePosition.y * 0.15}%`,
            right: `${32 + mousePosition.x * 0.1}%`,
            filter: 'blur(10px)',
            transform: `scale(${0.8 + mousePosition.x * 0.004})`
          }}
        />
        <div 
          className="absolute w-24 h-24 bg-gradient-radial from-primary/20 to-transparent rounded-full animate-pulse-slow delay-1000 transition-all duration-800" 
          style={{
            bottom: `${10 + mousePosition.y * 0.08}%`,
            left: `${10 + mousePosition.x * 0.12}%`,
            filter: 'blur(12px)',
            transform: `scale(${0.9 + mousePosition.y * 0.003})`
          }}
        />
      </div>

      <div className="relative z-10">
        <SectionTitle 
          title="About Me" 
          subtitle={isSummary ? undefined : "Physics & AI Enthusiast | Machine Learning | Computational Science"}
          alignment='center'
        />
      
      {isSummary ? (
        <div className="container max-w-7xl mx-auto">
          {/* Hero Card Layout */}
          <div className="relative">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-3xl"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-12">
              {/* Photo Section - Simplified for Mobile */}
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <div className="relative group">
                  {/* Simplified Mandala System Container - Reduced complexity for mobile */}
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 group/mandala transition-all duration-1000">
                    
                    {/* Outer Ring - Simplified for mobile performance */}
                    <div className="hidden sm:block absolute -inset-4 animate-spin-mega-slow group-hover/mandala:animate-spin-mega-slow-hover opacity-25 transition-all duration-1000">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={`outer-dot-${i}`}
                          className="absolute w-1 h-1 bg-primary/50 rounded-full"
                          style={{
                            top: `${50 + Math.sin(i * Math.PI / 4) * 48}%`,
                            left: `${50 + Math.cos(i * Math.PI / 4) * 48}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    {/* Second Ring - Simplified for mobile */}
                    <div className="hidden md:block absolute -inset-2 animate-spin-mega-slow group-hover/mandala:animate-spin-mega-slow-hover opacity-30 transition-all duration-1000">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={`square-${i}`}
                          className="absolute w-2 h-2 border border-primary/60 rounded-sm"
                          style={{
                            top: `${50 + Math.sin(i * Math.PI / 3) * 46}%`,
                            left: `${50 + Math.cos(i * Math.PI / 3) * 46}%`,
                            transform: `translate(-50%, -50%) rotate(${i * 60}deg)`
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    {/* Third Ring - Main Sacred Circle with pattern */}
                    <div className="absolute inset-0 animate-spin-mega-slow group-hover/mandala:animate-spin-mega-slow-hover opacity-35 transition-all duration-1000">
                      <div className="absolute inset-0 rounded-full border border-primary/40"></div>
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={`main-circle-pattern-${i}`}
                          className="absolute w-0.5 h-2 bg-primary/40"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-48px)`
                          }}
                        ></div>
                      ))}
                    </div>

                    {/* Fourth Ring - Inner smaller circles */}
                    <div className="absolute inset-8 animate-spin-mega-slow group-hover/mandala:animate-spin-mega-slow-hover opacity-40 transition-all duration-1000">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={`inner-dot-${i}`}
                          className="absolute w-1.5 h-1.5 bg-primary/60 rounded-full"
                          style={{
                            top: `${50 + Math.sin(i * Math.PI / 6) * 42}%`,
                            left: `${50 + Math.cos(i * Math.PI / 6) * 42}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        ></div>
                      ))}
                    </div>

                    {/* Fifth Ring - Another layer of boxes */}
                    <div className="absolute inset-12 animate-spin-mega-slow group-hover/mandala:animate-spin-mega-slow-hover opacity-30 transition-all duration-1000">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={`inner-square-${i}`}
                          className="absolute w-2 h-2 border border-primary/50 rounded-sm"
                          style={{
                            top: `${50 + Math.sin(i * Math.PI / 3) * 38}%`,
                            left: `${50 + Math.cos(i * Math.PI / 3) * 38}%`,
                            transform: `translate(-50%, -50%) rotate(${i * 60}deg)`
                          }}
                        ></div>
                      ))}
                    </div>

                    {/* Primary Sacred Square - Rotated */}
                    <div className="absolute inset-16 animate-spin-mega-slow group-hover/mandala:animate-spin-mega-slow-hover opacity-40 transition-all duration-1000">
                      <div className="w-full h-full border-2 border-primary/70 rounded-lg transform rotate-45"></div>
                    </div>

                    {/* Additional Box Layer 1 - Subtle outer rotation */}
                    <div className="absolute inset-4 animate-spin-mega-slow group-hover/mandala:animate-spin-mega-slow-hover opacity-20 transition-all duration-1000">
                      <div className="w-full h-full border border-primary/30 rounded-xl transform rotate-15"></div>
                    </div>

                    {/* Additional Box Layer 2 - Inner rotation */}
                    <div className="absolute inset-14 animate-spin-mega-slow group-hover/mandala:animate-spin-mega-slow-hover opacity-35 transition-all duration-1000">
                      <div className="w-full h-full border border-primary/50 rounded-md transform rotate-60"></div>
                    </div>
                    
                    {/* Central Sacred Core with more detail */}
                    <div className="absolute inset-20 animate-spin-mega-slow group-hover/mandala:animate-spin-mega-slow-hover opacity-50 transition-all duration-1000">
                      <div className="w-full h-full rounded-full border-2 border-primary/80"></div>
                      
                      {/* Central Petal-like design */}
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={`central-petal-${i}`}
                          className="absolute w-4 h-4 rounded-full border border-primary/70"
                          style={{
                            top: `${50 + Math.sin(i * Math.PI / 2 + Math.PI / 4) * 25}%`,
                            left: `${50 + Math.cos(i * Math.PI / 2 + Math.PI / 4) * 25}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        ></div>
                      ))}

                      {/* Central Om Symbol */}
                      <div className="absolute top-1/2 left-1/2 w-3 h-3 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-full h-full rounded-full bg-primary/70"></div>
                      </div>
                    </div>

                    {/* Additional Circle Layer 1 - Slow */}
                    <div className="absolute inset-6 animate-spin-mega-slow group-hover/mandala:animate-spin-mega-slow-hover opacity-25 transition-all duration-1000">
                      <div className="w-full h-full rounded-full border border-primary/40"></div>
                    </div>

                    {/* Additional Circle Layer 2 - Slower */}
                    <div className="absolute inset-10 animate-spin-mega-slow group-hover/mandala:animate-spin-mega-slow-hover opacity-30 transition-all duration-1000">
                      <div className="w-full h-full rounded-full border border-primary/50"></div>
                    </div>

                    {/* Central Photo Container with Pulsing Ring */}
                    <div className="absolute inset-20 lg:inset-24 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-700">
                      {/* Pulsing Outer Ring */}
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary via-primary/50 to-primary animate-pulse-slow opacity-60"></div>
                      
                      {/* Photo Ring */}
                      <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/30">
                        <div className="w-full h-full rounded-full overflow-hidden relative">
                          <img 
                            src="mkn.jpeg"
                            alt="Mahesh Kumar Neupane - Physics & AI Enthusiast"
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-3"
                          />
                          {/* Dynamic Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-primary/20 transition-all duration-500"></div>
                        </div>
                      </div>
                    </div>


                    {/* Background Glow Effects */}
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-primary/5 via-transparent to-transparent animate-pulse-slow"></div>
                    <div className="absolute -inset-8 rounded-full bg-gradient-radial from-primary/3 via-transparent to-transparent animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                    
                    {/* Interactive Hover Particles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-primary rounded-full animate-ping"
                          style={{
                            top: `${20 + Math.sin(i * 0.785) * 30}%`,
                            left: `${50 + Math.cos(i * 0.785) * 30}%`,
                            animationDelay: `${i * 0.2}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:col-span-8 space-y-6">
                {/* Header with Interactive Elements */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-1 bg-primary rounded-full"></div>
                    <span className="text-primary font-medium tracking-wide">ABOUT</span>
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Bridging Physics & 
                    <span className="relative inline-block ml-2">
                      <span className="text-primary">Medicine</span>
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/30"></div>
                    </span>
                  </h2>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl">
            {summaryText}
          </p>
          
                {/* Advanced Interactive Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { label: "Physics Degree", value: "B.S.", icon: "🎓", color: "from-blue-500/10 to-primary/10" },
                    { label: "Teaching Exp.", value: "2+ Years", icon: "👨‍🏫", color: "from-green-500/10 to-primary/10" },
                    { label: "Research Focus", value: "AI + Medical", icon: "🔬", color: "from-purple-500/10 to-primary/10" },
                    { label: "From", value: "Nepal", icon: "🏔️", color: "from-orange-500/10 to-primary/10" }
                  ].map((stat, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                      {/* Dynamic Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      
                      {/* Rotating Border Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-primary rounded-xl animate-spin-slow opacity-20"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="relative p-3 sm:p-4 backdrop-blur-sm">
                        <div className="text-xl sm:text-2xl mb-1 sm:mb-2 transform group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground group-hover:text-primary/80 transition-colors duration-300 leading-tight">{stat.label}</div>
                        <div className="text-sm sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{stat.value}</div>
                      </div>
                      
                      {/* Particle Effect on Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-primary rounded-full animate-ping"
                            style={{
                              top: `${20 + i * 20}%`,
                              right: `${10 + i * 15}%`,
                              animationDelay: `${i * 0.2}s`
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Advanced Research Expertise Tags */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-sm font-medium text-foreground/80 uppercase tracking-wide">Research Expertise</h4>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {[
                      { name: "DFT", icon: "⚛️", level: 95 },
                      { name: "PINN", icon: "🧠", level: 88 },
                      { name: "Computational Modeling", icon: "💻", level: 90 }
                    ].map((tag, index) => (
                      <div 
                        key={index} 
                        className="group relative overflow-hidden px-3 sm:px-4 py-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full border border-primary/20 hover:border-primary/40 transition-all duration-500 cursor-default hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Background Progress Bar */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"
                          style={{ transitionDelay: `${index * 50}ms` }}
                        ></div>
                        
                        {/* Content */}
                        <div className="relative flex items-center space-x-1 sm:space-x-2">
                          <span className="text-sm group-hover:animate-bounce">{tag.icon}</span>
                          <span className="text-xs sm:text-xs font-medium text-primary group-hover:text-primary transition-colors duration-300">
                            {tag.name}
                          </span>
                          
                          {/* Skill Level Indicator */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                                    i < Math.floor(tag.level / 20) ? 'bg-primary' : 'bg-primary/20'
                                  }`}
                                  style={{ animationDelay: `${i * 100}ms` }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Floating Particles */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {[...Array(2)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-0.5 h-0.5 bg-primary rounded-full animate-ping"
                              style={{
                                top: `${30 + i * 40}%`,
                                left: `${20 + i * 50}%`,
                                animationDelay: `${i * 0.3}s`
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links & CTA */}
                <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between pt-4 space-y-4 sm:space-y-0">
                  {/* Social Links */}
                  <div className="flex space-x-3 sm:space-x-4">
                    {[
                      { icon: Linkedin, href: "https://www.linkedin.com/in/mahesh-kumar-neupane-54a58618a/", label: "LinkedIn" },
                      { icon: Github, href: "https://github.com/udneymanxe", label: "GitHub" },
                      { icon: Youtube, href: "https://www.youtube.com/@neupai", label: "YouTube" }
                    ].map((social, index) => (
                      <a 
                        key={index}
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={social.label}
                        className="group relative w-10 h-10 sm:w-10 sm:h-10 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary active:bg-primary/80 transition-all duration-300 hover:scale-110 active:scale-95"
                      >
                        <social.icon size={18} className="text-primary group-hover:text-primary-foreground transition-colors" />
                        <div className="absolute inset-0 bg-primary rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </a>
                    ))}
          </div>
          
                  {/* CTA Button */}
                  <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Link to="/about" className="flex items-center space-x-2">
                      <span>Explore My Journey</span>
                      <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Professional Photo Section */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="relative">
              {/* Main Photo Container */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-1">
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src="mkn.jpeg"
                    alt="Mahesh Kumar Neupane - Physics & AI Enthusiast"
                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-3 order-1 lg:order-2 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
              </div>
              <div>
                  <h3 className="text-2xl font-bold text-foreground">Mahesh Kumar Neupane</h3>
                  <p className="text-primary font-medium">Physics & AI • Machine Learning • Computational Science</p>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed text-base">
              {detailedDescription}
            </p>
            </div>
            
            {/* Research Interests */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Research Interests</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Machine Learning & Deep Learning",
                  "AI for Scientific Discovery",
                  "Natural Language Processing",
                  "Computational Physics",
                  "Computer Vision",
                  "AI for Social Good"
                ].map((interest, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{interest}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                    <h5 className="font-medium text-foreground">Education</h5>
                    <p className="text-sm text-muted-foreground">B.S. Physics, St. Xavier's College</p>
                    <p className="text-xs text-muted-foreground">Tribhuvan University, Kathmandu</p>
                </div>
              </div>
              
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                    <h5 className="font-medium text-foreground">Experience</h5>
                    <p className="text-sm text-muted-foreground">Physics Education & Research</p>
                    <p className="text-xs text-muted-foreground">2+ years teaching & mentoring</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                    <h5 className="font-medium text-foreground">Contact</h5>
                  <p className="text-sm text-muted-foreground">maheshkneupane90@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">Location</h5>
                    <p className="text-sm text-muted-foreground">Kalikot, Nepal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-4">
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to="/contact">
                    Collaborate with Me <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/5">
                  <a href="/cv" target="_blank">
                    View CV <FileText className="ml-2 h-4 w-4" />
                  </a>
                </Button>
            </div>
          </div>
          </div>
        </div>
      )}

      {/* New Section: My Roots */} 
      {!isSummary && (
        <div id="kalikot-roots" className="mt-16 pt-12 border-t border-border/50">
           <SectionTitle 
            title="My Roots: Kalikot, Nepal" 
            subtitle="A glimpse into where my journey began."
            alignment='center'
          />
          <div className="max-w-3xl mx-auto text-center text-muted-foreground mb-10">
            <p>Kalikot is a remote mountain district in Nepal. Being from this unique and challenging environment has shaped my perspective and resilience. It's a place of incredible natural beauty and strong community spirit.</p>
          </div>
          
          {/* Video Player */} 
          <div className="mb-12 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">A Glimpse of Kalikot</h3>
            <div className="aspect-video overflow-hidden rounded-lg shadow-lg bg-black border border-border/50">
              <video 
                 controls 
                 className="w-full h-full"
                 src={"/kalikot1.mp4"} // Root-relative path to video in public
                 aria-label={"Video of Kalikot, Nepal"}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Image Gallery Placeholder - Removed */}
          
        </div>
      )}
      </div>

    </section>
  );
};

export default AboutSection;
