import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '@/components/SectionTitle';
import { Calendar, FileText, Mail, User, ArrowRight, Linkedin, Github, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AboutSectionProps {
  isSummary?: boolean;
}

const PHOTO_FORMULAS = [
  { text: 'E = mc²', size: 'text-xs', x: -8, y: 10 },
  { text: 'ψ(x,t)', size: 'text-[11px]', x: 85, y: 5 },
  { text: '∇²φ = ρ/ε₀', size: 'text-[10px]', x: 95, y: 35 },
  { text: 'F = ma', size: 'text-xs', x: -12, y: 55 },
  { text: 'ℏω', size: 'text-sm', x: 90, y: 65 },
  { text: '∂ψ/∂t', size: 'text-[10px]', x: -5, y: 82 },
  { text: 'λ = h/p', size: 'text-[11px]', x: 80, y: 90 },
  { text: '∇ × B', size: 'text-[10px]', x: 15, y: -5 },
  { text: 'ΔxΔp ≥ ℏ/2', size: 'text-[9px]', x: 50, y: 97 },
  { text: 'S = k ln Ω', size: 'text-[10px]', x: 55, y: -6 },
  { text: 'iℏ∂/∂t', size: 'text-[10px]', x: -10, y: 35 },
  { text: '∮ E·dl', size: 'text-[10px]', x: 92, y: 50 },
];

const AboutSection: React.FC<AboutSectionProps> = ({ isSummary = false }) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const summaryText = "I am a physics graduate driven by a deep curiosity about how the universe works — from the quantum scale to the human body. My interests span across physics, medicine, and artificial intelligence, and I am passionate about using computational tools to solve real-world problems at the intersection of these fields. With hands-on experience in DFT calculations, molecular dynamics simulations, and AI-assisted research, I aim to contribute to innovations in medical physics, drug discovery, and intelligent systems.";

  const detailedDescription = "My journey in physics began with a B.S. from St. Xavier's College (Tribhuvan University), where I developed a strong foundation in theoretical and computational physics. During my studies and two years of teaching experience, I honed my skills in communicating complex scientific concepts and mentoring students.\n\nMy past research work includes computational investigations using density functional theory (DFT) and molecular dynamics (MD) to study material properties, molecular interactions, and electronic structures. I have applied these techniques to pharmaceutical materials, exploring drug-excipient interactions and formulation stability at the atomic level.\n\nI am now focused on expanding into three interconnected frontiers: Medical Physics — understanding radiation interactions, imaging modalities, and therapeutic applications; Artificial Intelligence — leveraging machine learning and neural networks to accelerate scientific discovery, from protein structure prediction to automated diagnostics; and Applied & Biopharmaceutical Physics — bridging fundamental physics with drug delivery, biomaterials, and advanced instrumentation.\n\nI believe the future of science lies at the convergence of physics, medicine, and AI — and I want to be at that crossroads, building tools and knowledge that transform healthcare and deepen our understanding of nature.";

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

  const PhysicsFormulaPhoto = ({ size = 'large' }: { size?: 'large' | 'medium' }) => {
    const isLarge = size === 'large';
    const containerClass = isLarge
      ? 'relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80'
      : 'relative w-full aspect-[4/5]';

    return (
      <div className={`${containerClass} group`}>
        {/* Floating Physics Formulas */}
        {PHOTO_FORMULAS.map((f, i) => (
          <span
            key={`formula-${i}`}
            className={`absolute ${f.size} font-mono text-primary/40 group-hover:text-primary/70 transition-all duration-700 select-none pointer-events-none`}
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              animation: `mandala-breathe ${5 + (i % 4) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
              textShadow: '0 0 8px hsl(var(--primary) / 0.3)',
              transform: `rotate(${((i * 23) % 30) - 15}deg) translate(${Math.sin(i) * 3}px, 0)`,
            }}
          >
            {f.text}
          </span>
        ))}

        {/* Orbiting dots */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary/60 transition-colors duration-500"
            style={{
              top: `${50 + Math.sin(i * Math.PI / 3) * 52}%`,
              left: `${50 + Math.cos(i * Math.PI / 3) * 52}%`,
              animation: `mandala-sparkle ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
              boxShadow: '0 0 6px hsl(var(--primary) / 0.4)',
            }}
          />
        ))}

        {/* Subtle orbit ring */}
        <div className="absolute inset-[-8%] rounded-full border border-primary/10 group-hover:border-primary/25 transition-colors duration-700" style={{ animation: 'mandala-rotate 80s linear infinite' }} />
        <div className="absolute inset-[-3%] rounded-full border border-dashed border-primary/8 group-hover:border-primary/20 transition-colors duration-700" style={{ animation: 'mandala-rotate-reverse 60s linear infinite' }} />

        {/* Glow backdrop */}
        <div className="absolute inset-[-15%] rounded-full bg-gradient-radial from-primary/5 via-transparent to-transparent animate-mandala-breathe" />

        {/* Photo container */}
        {isLarge ? (
          <div className="absolute inset-4 sm:inset-6 rounded-2xl overflow-hidden border border-primary/20 group-hover:border-primary/40 transition-all duration-700 shadow-lg group-hover:shadow-primary/10">
            <img
              src="mkn.jpeg"
              alt="Mahesh Kumar Neupane"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-primary/15 transition-all duration-500" />
          </div>
        ) : (
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-primary/20 group-hover:border-primary/40 transition-all duration-700 shadow-lg group-hover:shadow-primary/10">
            <img
              src="mkn.jpeg"
              alt="Mahesh Kumar Neupane"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent group-hover:from-primary/15 transition-all duration-500" />
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="about" className={`section relative min-h-screen overflow-hidden ${isSummary ? 'py-16' : 'py-20'}`}>
      {/* Transition Bridge */}
      {isSummary && (
        <div className="absolute -top-32 left-0 w-full h-64 overflow-hidden pointer-events-none">
          <svg
            viewBox="0 0 1200 120"
            className="absolute top-0 w-full h-full transform rotate-180"
            style={{ filter: 'drop-shadow(0 10px 30px rgba(var(--primary-rgb), 0.15))' }}
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
            <path d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z" fill="url(#aboutWaveGradient)" className="animate-pulse-slow" />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary/10 to-background/80" />
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="absolute w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce"
                style={{ left: `${5 + i * 6}%`, top: `${60 + Math.sin(i * 0.8) * 30}px`, animationDelay: `${i * 200}ms`, animationDuration: '3s', filter: 'blur(0.5px)' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(var(--primary-rgb), 0.08) 0%, rgba(var(--primary-rgb), 0.03) 25%, transparent 50%), linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 50%, hsl(var(--background)) 100%)`
          }}
        />
        <div className="absolute inset-0 opacity-70">
          <div className="absolute w-40 h-40 bg-gradient-radial from-primary/15 via-primary/8 to-transparent rounded-full animate-pulse-slow transition-all duration-1000"
            style={{ top: `${20 + (mousePosition.y * 0.1)}%`, right: `${20 + (mousePosition.x * 0.1)}%`, filter: 'blur(20px)' }}
          />
          <div className="absolute w-48 h-48 bg-gradient-radial from-primary/12 via-primary/6 to-transparent rounded-full animate-pulse-slow transition-all duration-1200"
            style={{ bottom: `${20 + (mousePosition.y * 0.08)}%`, left: `${20 + (mousePosition.x * 0.08)}%`, filter: 'blur(25px)', animationDelay: '1s' }}
          />
        </div>
      </div>

      <div className="relative z-10">
        <SectionTitle
          title="About Me"
          subtitle={isSummary ? undefined : "Physics | Medicine | Artificial Intelligence"}
          alignment='center'
        />

      {isSummary ? (
        <div className="container max-w-7xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-3xl" />
            <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-12">
              {/* Photo with Physics Formulas */}
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <PhysicsFormulaPhoto size="large" />
              </div>

              {/* Content Section */}
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-1 bg-primary rounded-full" />
                    <span className="text-primary font-medium tracking-wide">ABOUT</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Physics, Medicine &
                    <span className="relative inline-block ml-2">
                      <span className="text-primary">AI</span>
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/30" />
                    </span>
                  </h2>
                </div>

                <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl">
                  {summaryText}
                </p>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { label: "Physics Degree", value: "B.S.", icon: "🎓", color: "from-blue-500/10 to-primary/10" },
                    { label: "Teaching Exp.", value: "2+ Years", icon: "👨‍🏫", color: "from-green-500/10 to-primary/10" },
                    { label: "Research Focus", value: "Physics × AI", icon: "🧠", color: "from-purple-500/10 to-primary/10" },
                    { label: "From", value: "Nepal", icon: "🏔️", color: "from-orange-500/10 to-primary/10" }
                  ].map((stat, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-primary rounded-xl animate-spin-slow opacity-20" />
                      </div>
                      <div className="relative p-3 sm:p-4 backdrop-blur-sm">
                        <div className="text-xl sm:text-2xl mb-1 sm:mb-2 transform group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground group-hover:text-primary/80 transition-colors duration-300 leading-tight">{stat.label}</div>
                        <div className="text-sm sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{stat.value}</div>
                      </div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="absolute w-1 h-1 bg-primary rounded-full animate-ping"
                            style={{ top: `${20 + i * 20}%`, right: `${10 + i * 15}%`, animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expertise Tags */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-sm font-medium text-foreground/80 uppercase tracking-wide">Core Expertise</h4>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {[
                      { name: "Computational Physics & DFT", icon: "⚛️", level: 95 },
                      { name: "Medical Physics & Imaging", icon: "🏥", level: 88 },
                      { name: "AI & Machine Learning", icon: "🧠", level: 85 }
                    ].map((tag, index) => (
                      <div key={index} className="group relative overflow-hidden px-3 sm:px-4 py-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full border border-primary/20 hover:border-primary/40 transition-all duration-500 cursor-default hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"
                          style={{ transitionDelay: `${index * 50}ms` }}
                        />
                        <div className="relative flex items-center space-x-1 sm:space-x-2">
                          <span className="text-sm group-hover:animate-bounce">{tag.icon}</span>
                          <span className="text-xs sm:text-xs font-medium text-primary group-hover:text-primary transition-colors duration-300">{tag.name}</span>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <div key={i} className={`w-1 h-1 rounded-full transition-all duration-300 ${i < Math.floor(tag.level / 20) ? 'bg-primary' : 'bg-primary/20'}`} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links & CTA */}
                <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between pt-4 space-y-4 sm:space-y-0">
                  <div className="flex space-x-3 sm:space-x-4">
                    {[
                      { icon: Linkedin, href: "https://www.linkedin.com/in/mahesh-kumar-neupane-54a58618a/", label: "LinkedIn" },
                      { icon: Github, href: "https://github.com/udneymanxe", label: "GitHub" },
                      { icon: Youtube, href: "https://www.youtube.com/@neupai", label: "YouTube" }
                    ].map((social, index) => (
                      <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                        className="group relative w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary active:bg-primary/80 transition-all duration-300 hover:scale-110 active:scale-95"
                      >
                        <social.icon size={18} className="text-primary group-hover:text-primary-foreground transition-colors relative z-10" />
                        <div className="absolute inset-0 bg-primary rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>
                    ))}
                  </div>
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
          {/* Photo with Physics Formulas */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <PhysicsFormulaPhoto size="medium" />
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
          </div>

          {/* Content Section */}
          <div className="lg:col-span-3 order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Mahesh Kumar Neupane</h3>
                  <p className="text-primary font-medium">Physics • Medicine • Artificial Intelligence</p>
                </div>
              </div>
            </div>

            {/* Description - rendered as paragraphs */}
            <div className="prose prose-lg max-w-none space-y-4">
              {detailedDescription.split('\n\n').map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed text-base">{para}</p>
              ))}
            </div>

            {/* Research Interests */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Research Interests</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Medical Physics & Radiation Therapy",
                  "AI-Driven Drug Discovery",
                  "Molecular Dynamics & DFT Simulations",
                  "Machine Learning for Diagnostics",
                  "Biopharmaceutical Materials Science",
                  "Quantum Computing & Physics"
                ].map((interest, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
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
                    <p className="text-sm text-muted-foreground">Physics Teaching, DFT Research, AI Projects</p>
                    <p className="text-xs text-muted-foreground">2+ years teaching & computational research</p>
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
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">Location</h5>
                    <p className="text-sm text-muted-foreground">Kalikot, Nepal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
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

      {/* My Roots Section */}
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
          <div className="mb-12 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">A Glimpse of Kalikot</h3>
            <div className="aspect-video overflow-hidden rounded-lg shadow-lg bg-black border border-border/50">
              <video controls className="w-full h-full" src="/kalikot1.mp4" aria-label="Video of Kalikot, Nepal">
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};

export default AboutSection;
