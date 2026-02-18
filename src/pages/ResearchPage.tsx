import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ExternalLink, Award, BookOpen, Calendar, Quote, ChevronRight, Star, Atom, Microscope, Dna, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ResearchPage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const researchPapers = [
    {
      id: 1,
      title: "Study on the Molecular Dynamics of 2‑(4-Fluorophenyl)-6-methyl-4-(3-(trifluoromethyl)phenyl)-1,2-dihydrodipyrazolo[3,4-b:3′,4′‑d]pyridin-3(6H)‑one for Cancer Immunotherapy Using a DFT Model",
      authors: [
        { name: "Mahesh Kumar Neupane", affiliation: "St. Xavier's College", highlight: true, isFirst: true },
        { name: "Bijay Sijapati Magar", affiliation: "St. Xavier's College", corresponding: true },
        { name: "Basanta Gurung", affiliation: "St. Xavier's College" },
        { name: "Rupak Raj Lamichhane", affiliation: "St. Xavier's College" },
        { name: "Prakash Pandey", affiliation: "Research Collaborator" }
      ],
      journal: "ACS Omega",
      volume: "10",
      articleNumber: "59359−59378",
      year: "2025",
      published: "November 26, 2025",
      doi: "https://doi.org/10.1021/acsomega.5c05359",
      url: "https://pubs.acs.org/doi/10.1021/acsomega.5c05359",
      abstract: "Small-molecule inhibitors targeting the B7−CD28 pathway represent a promising strategy for cancer immunotherapy. This study presents a comprehensive in silico characterization of a novel compound to evaluate its potential as a dual-target inhibitor. Using density functional theory (DFT) at the B3LYP/6-311G(d) level, we characterized structural and electronic properties, simulated spectroscopic profiles, and performed molecular docking with AutoDock Vina, revealing strong binding affinities toward CD80 and CTLA-4.",
      keywords: ["DFT", "Cancer Immunotherapy", "Molecular Docking", "ADMET", "HOMO-LUMO"],
      subjects: ["Biophysics", "Computational Chemistry", "Drug Discovery"],
      significance: "Demonstrates the potential of a small-molecule inhibitor to effectively target the B7−CD28/CTLA-4 signaling axis, offering a cost-effective alternative to antibody therapies.",
      methodology: ["DFT (B3LYP/6-311G(d))", "Spectroscopic Analysis", "NBO Analysis", "Topological Analysis (ELF, LOL)", "Molecular Docking", "ADMET Profiling"],
      isFirstAuthor: true,
      icon: <Dna className="w-6 h-6 text-primary" />
    },
    {
      id: 2,
      title: "Theoretical investigation on PD-L1-In-1 for cancer immunotherapy via density functional theory",
      authors: [
        { name: "Bijay Sijapati Magar", affiliation: "St. Xavier's College" },
        { name: "Kiran Pudasainee", affiliation: "St. Xavier's College" },
        { name: "Prakash Pandey", affiliation: "Research Collaborator" },
        { name: "Mahesh Kumar Neupane", affiliation: "St. Xavier's College", highlight: true },
        { name: "Rupak Raj Lamichhane", affiliation: "St. Xavier's College" },
        { name: "Basanta Gurung", affiliation: "St. Xavier's College" },
        { name: "Khagendra Tripathi", affiliation: "St. Xavier's College" },
        { name: "Binod Adhikari", affiliation: "St. Xavier's College" }
      ],
      journal: "Scientific Reports (Nature)",
      volume: "15",
      articleNumber: "30476",
      year: "2025",
      published: "20 August 2025",
      doi: "https://doi.org/10.1038/s41598-025-92180-9",
      url: "https://www.nature.com/articles/s41598-025-92180-9",
      abstract: "A comprehensive theoretical analysis of PD-L1-In-1 using DFT (B3LYP/6-311G(d)). We simulated FT-IR, Raman, and UV–Vis spectra, performed NBO analysis for hyperconjugative interactions, and analyzed electronic properties via HOMO–LUMO and DOS. Molecular docking studies explored interactions with the PD-L1 checkpoint protein, indicating strong ligand–protein interactions promising for cancer immunotherapy.",
      keywords: ["DFT", "PD-L1", "Immunotherapy", "Molecular Docking", "Electronic Structure"],
      subjects: ["Biophysics", "Cancer Research", "Material Science"],
      significance: "Provides theoretical insights into PD-L1-In-1 as a potential immunotherapy agent, guiding future experimental research targeting the PD-1/PD-L1 pathway.",
      methodology: ["DFT Calculations", "Geometry Optimization", "Spectroscopic Analysis", "NBO Analysis", "Molecular Docking", "Electronic Structure (Multiwfn)"],
      isFirstAuthor: false,
      icon: <Atom className="w-6 h-6 text-primary" />
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
      gsap.from('.research-header > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Cards Animation
      gsap.from('.research-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.research-list',
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
        {/* Dynamic Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 transition-all duration-1000 ease-out"
            style={{
              background: `
                radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                  rgba(var(--primary-rgb), 0.08) 0%, 
                  rgba(var(--primary-rgb), 0.02) 40%, 
                  transparent 60%),
                linear-gradient(to bottom, hsl(var(--background)), hsl(var(--background) / 0.95))`
            }}
          />
          {/* Floating Molecules/Orbs */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/5 blur-3xl animate-pulse-slow"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 5 + 5}s`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `translate(${mousePosition.x * 0.02 * (i % 2 === 0 ? 1 : -1)}px, ${mousePosition.y * 0.02 * (i % 2 === 0 ? 1 : -1)}px)`
              }}
            />
          ))}
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 z-10 research-header">
          <div className="container max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20 backdrop-blur-sm">
              <Microscope className="w-4 h-4 mr-2" />
              <span>Scientific Publications</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Exploring the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">Quantum</span> Frontier
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Bridging computational physics and medicine through advanced molecular simulations and density functional theory.
            </p>
          </div>
        </section>

        {/* Research Papers Section */}
        <section className="relative pb-24 z-10 research-list">
          <div className="container max-w-5xl mx-auto px-6">
            {researchPapers.map((paper, index) => (
              <article 
                key={paper.id} 
                className={`research-card group relative bg-card/50 backdrop-blur-md border ${paper.isFirstAuthor ? 'border-primary/40 shadow-[0_0_30px_-10px_rgba(var(--primary-rgb),0.2)]' : 'border-border/60'} rounded-3xl p-8 mb-12 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-primary/60 hover:-translate-y-1`}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Paper Header */}
                <header className="relative z-10 mb-8">
                  <div className="flex items-center gap-3 mb-5 flex-wrap">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-3 py-1">
                      <Award className="w-3.5 h-3.5 mr-1.5" />
                      {paper.journal}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-primary/20 text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      {paper.published}
                    </Badge>
                    {paper.isFirstAuthor && (
                      <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20 shadow-sm animate-pulse-slow">
                        <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
                        First Author
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-start justify-between gap-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                      {paper.title}
                    </h2>
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-500">
                      {paper.icon}
                    </div>
                  </div>
                  
                  {/* Authors */}
                  <div className="mb-6 p-4 rounded-xl bg-muted/30 border border-border/50">
                    <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider flex items-center">
                      <Users className="w-3.5 h-3.5 mr-2" />
                      Research Team
                    </h3>
                    <div className="flex flex-wrap gap-x-2 gap-y-1">
                      {paper.authors.map((author, idx) => (
                        <span key={idx} className={`text-sm ${author.highlight ? 'font-semibold text-primary bg-primary/5 px-2 py-0.5 rounded-md' : 'text-muted-foreground'}`}>
                          {author.name}{idx < paper.authors.length - 1 && <span className="text-muted-foreground/40 ml-1">,</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Journal Details */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 flex-wrap font-mono opacity-80">
                    <span>{paper.journal}</span>
                    <span className="text-primary/40">•</span>
                    <span>Vol. {paper.volume}</span>
                    <span className="text-primary/40">•</span>
                    <span>No. {paper.articleNumber}</span>
                    <span className="text-primary/40">•</span>
                    <span>{paper.year}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                      <a href={paper.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Read Publication
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors">
                      <a href={paper.doi} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        DOI Access
                      </a>
                    </Button>
                  </div>
                </header>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                  {/* Abstract Column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                        <Quote className="w-5 h-5 mr-2 text-primary" />
                        Abstract
                      </h3>
                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent rounded-full opacity-50" />
                        <p className="pl-5 text-muted-foreground leading-relaxed text-sm md:text-base">
                          {paper.abstract}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {paper.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors cursor-default text-xs font-normal border border-transparent hover:border-primary/20">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className="space-y-6">
                    <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                      <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        Significance
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {paper.significance}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Methodologies</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {paper.methodology.map((method, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground group/item">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors" />
                            <span className="group-hover/item:text-foreground transition-colors">{method}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Fields</h3>
                      <div className="flex flex-wrap gap-2">
                        {paper.subjects.map((subject, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs font-normal text-muted-foreground border-border/60">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
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
                  <span className="text-sm font-medium text-muted-foreground">More groundbreaking research in progress</span>
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

export default ResearchPage;
