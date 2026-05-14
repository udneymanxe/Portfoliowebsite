import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import { 
  Download, Award, BookOpen, Code, Briefcase, ArrowRight, 
  CalendarCheck, Users, Linkedin, Github, Mail, Phone, MapPin, Globe,
  Network, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CVSectionProps {
  isSummary?: boolean;
}

const CVSection: React.FC<CVSectionProps> = ({ isSummary = false }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

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
    if (isSummary) return;

    const ctx = gsap.context(() => {
      gsap.from('.cv-header > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });

      gsap.from('.cv-section', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.cv-container',
          start: 'top 85%',
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, [isSummary]);
  
  const summaryContent = (
    <div className="container max-w-4xl mx-auto text-center relative z-10">
      <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-3xl p-12 shadow-xl">
        <FileText className="w-16 h-16 mx-auto text-primary mb-6 opacity-80" />
        <h3 className="text-2xl font-bold mb-4">Professional Resume</h3>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Physics & AI Enthusiast | Aspiring to build meaningful AI solutions for real-world impact.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
            <Link to="/cv">
              View Full CV <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button 
            variant="outline" 
            asChild
            className="border-primary/20 hover:bg-primary/5"
          >
            <a 
              href="/CV_fall_2026.pdf" 
              download="CV_fall_2026.pdf"
              aria-label="Download CV"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </a>
          </Button>
        </div>
      </div>
    </div>
  );

  const fullContent = (
    <div className="cv-container max-w-5xl mx-auto relative z-10 px-6">
      {/* Header Card */}
      <div className="cv-header bg-card/80 backdrop-blur-xl border border-primary/20 rounded-3xl p-8 md:p-12 mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative z-10">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">Mahesh Kumar Neupane</h1>
            <p className="text-xl text-primary font-medium mb-6">Physics & AI Enthusiast | Building AI for Meaningful Impact</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="space-y-2">
                <div className="flex items-center"><MapPin size={16} className="mr-2 text-primary" /> Kalikot, Nepal</div>
                <a href="mailto:maheshkneupane90@gmail.com" className="flex items-center hover:text-primary transition-colors"><Mail size={16} className="mr-2 text-primary" /> maheshkneupane90@gmail.com</a>
                <a href="tel:+9779863354076" className="flex items-center hover:text-primary transition-colors"><Phone size={16} className="mr-2 text-primary" /> +977 9863354076</a>
              </div>
              <div className="space-y-2">
                <a href="https://www.maheshkneupane.com.np" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors"><Globe size={16} className="mr-2 text-primary" /> maheshkneupane.com.np</a>
                <a href="https://linkedin.com/in/mahesh-kumar-neupane-54a58618a/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors"><Linkedin size={16} className="mr-2 text-primary" /> LinkedIn</a>
                <a href="https://github.com/udneymanxe" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors"><Github size={16} className="mr-2 text-primary" /> GitHub</a>
              </div>
            </div>
          </div>
          
          <Button 
            className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 whitespace-nowrap"
            asChild
          >
            <a 
              href="/CV_fall_2026.pdf" 
              download="CV_fall_2026.pdf"
              aria-label="Download Full CV"
            >
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </Button>
        </div>
      </div>
      
      <div className="space-y-12">
        {/* Education */}
        <div className="cv-section relative pl-8 border-l-2 border-primary/20">
          <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center">
            <BookOpen className="text-primary h-5 w-5" />
          </div>
          <h3 className="text-2xl font-bold mb-8 text-foreground">Education</h3>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <h4 className="text-xl font-bold text-foreground">St. Xavier's College, Maitighar, Nepal</h4>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">Sep 2024</span>
            </div>
            <p className="text-primary/80 font-medium mb-2">Affiliated to Tribhuvan University</p>
            <p className="text-foreground font-medium mb-2">Bachelor of Science in Physics</p>
          </div>
        </div>

        {/* Publications */}
        <div className="cv-section relative pl-8 border-l-2 border-primary/20">
          <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center">
            <Network className="text-primary h-5 w-5" />
          </div>
          <h3 className="text-2xl font-bold mb-8 text-foreground">Publications</h3>
          
          <div className="space-y-6">
            {[
              {
                title: "Study on the Molecular Dynamics of 2-(4-fluorophenyl)-6-methyl-4-(3-(trifluoromethyl)phenyl)-1,2-dihydrodipyrazolo[3,4-b:3',4'-d]pyridin-3(6H)-one for Cancer Immunotherapy Using a DFT Model",
                authors: "M. K. Neupane, B. S. Magar, B. Gurung, R. R. Lamichhane, P. Pandey",
                journal: "ACS Omega, Q1, 2025",
                doi: "https://doi.org/10.1021/acsomega.5c08756",
                contribution: "Performed DFT and MD simulations; calculated HOMO-LUMO, NBO, ELF, LOL, RDG; simulated FT-IR, Raman, UV-Vis; conducted molecular docking with CD28, CD80, CD86, CTLA-4; ADMET analysis; manuscript writing."
              },
              {
                title: "Comparative Study of Soft and Hard Boundary Constraints in Physics-Informed Neural Networks for Quantum Mechanical Eigenvalue Problems",
                authors: "A. Dhamala*, S. Bhattarai, B. Gurung, C. Hyolmo, M. K. Neupane, R. R. Lamichhane, S. Chaulagain, B. S. Magar",
                journal: "Heliyon, Q1, Submitted, 2025",
                doi: "https://doi.org/10.5281/zenodo.17515333",
                contribution: "Developed PINN models; implemented soft and hard BCs; benchmarked against analytical/numerical solutions; adaptive learning rate optimization; evaluated efficiency and accuracy."
              },
              {
                title: "Theoretical Investigation on PD-L1-In-1 for Cancer Immunotherapy via Density Functional Theory",
                authors: "B. Sijapati Magar, K. Pudasainee, P. Pandey, M. K. Neupane, et al.",
                journal: "Scientific Reports, Q1, 2025",
                doi: "https://doi.org/10.1038/s41598-025-92180-9",
                contribution: "DFT-based structural, electronic, and spectroscopic characterization; NBO analysis; HOMO-LUMO and DOS studies; molecular docking with PD-L1; predicted pharmacokinetics and biological activity."
              }
            ].map((pub, i) => (
              <div key={i} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-colors">
                <h4 className="font-bold mb-2 text-lg leading-tight">{i + 1}. {pub.title}</h4>
                <p className="text-muted-foreground text-sm mb-2" dangerouslySetInnerHTML={{ __html: pub.authors.replace('M. K. Neupane', '<span class="font-bold text-primary">M. K. Neupane</span>') }} />
                <p className="text-sm mb-3 font-medium">{pub.journal} | DOI: <a href={pub.doi} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">link</a></p>
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <p className="text-muted-foreground text-sm"><span className="font-semibold text-primary">Contribution:</span> {pub.contribution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Research Experience */}
        <div className="cv-section relative pl-8 border-l-2 border-primary/20">
          <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center">
            <Briefcase className="text-primary h-5 w-5" />
          </div>
          <h3 className="text-2xl font-bold mb-8 text-foreground">Research Experience</h3>
          
          <div className="space-y-8">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h4 className="text-lg font-bold">Independent Research Project</h4>
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">July 2025 – Nov 2025</span>
              </div>
              <p className="text-primary font-medium mb-4">DFT Modeling & Molecular Docking for Cancer Immunotherapy</p>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-2 marker:text-primary">
                <li>Led a comprehensive <i>in silico</i> characterization of a novel small-molecule inhibitor targeting the B7-CD28 signaling axis.</li>
                <li>Employed Density Functional Theory (DFT) at the B3LYP/6-311G(d) level using <strong>Gaussian 09W</strong>.</li>
                <li>Conducted molecular docking simulations using <strong>AutoDock Vina</strong> (CTLA-4: −7.97 kcal·mol⁻¹, CD80: −7.54 kcal·mol⁻¹).</li>
                <li>Performed advanced topological analyses (ELF, LOL, RDG) and Natural Bond Orbital (NBO) analysis.</li>
                <li>Analyzed ADMET properties confirming high human intestinal absorption (94%).</li>
                <li>Published results as the <strong>Main Author</strong> in <i>ACS Omega</i> (2025).</li>
              </ul>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h4 className="text-lg font-bold">ML based Research Project</h4>
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">Jun 2025 – Sep 2025</span>
              </div>
              <p className="text-primary font-medium mb-4">Boundary Constraints for Physics-Informed Neural Networks (PINNs)</p>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-2 marker:text-primary">
                <li>Investigated boundary condition enforcement techniques in PINNs with a team of seven.</li>
                <li>Compared soft- and hard-constrained models solving the Schrödinger equation.</li>
                <li>Demonstrated hard-constrained models converge faster and achieve higher accuracy.</li>
                <li>Achieved over <strong>100×</strong> improvement in accuracy using adaptive learning rates.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Projects */}
        <div className="cv-section relative pl-8 border-l-2 border-primary/20">
          <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center">
            <Code className="text-primary h-5 w-5" />
          </div>
          <h3 className="text-2xl font-bold mb-8 text-foreground">Additional Projects</h3>
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h4 className="text-lg font-bold">TargetScoreAI – AI Adaptive Learning Platform</h4>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">2025</span>
            </div>
            <p className="text-sm mb-4"><a href="https://targetscoreai.xyz" className="text-primary hover:underline font-medium">targetscoreai.xyz</a> | 2nd Place Asia-wide</p>
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-2 marker:text-primary">
              <li>Developed platform serving 1,500+ users with adaptive algorithms.</li>
              <li>Built Python-React-PostgreSQL backend with analytics dashboards.</li>
              <li>Demonstrated ability to deliver production-grade AI systems.</li>
            </ul>
          </div>
        </div>
        
        {/* Skills */}
        <div className="cv-section relative pl-8 border-l-2 border-primary/20">
          <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center">
            <Award className="text-primary h-5 w-5" />
          </div>
          <h3 className="text-2xl font-bold mb-8 text-foreground">Skills</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-colors">
              <h4 className="font-bold mb-3 text-primary">Programming</h4>
              <p className="text-sm text-muted-foreground">Python (NumPy, Pandas, Matplotlib, PyTorch), C</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-colors">
              <h4 className="font-bold mb-3 text-primary">Tools</h4>
              <p className="text-sm text-muted-foreground">Jupyter Notebook, Git, LaTeX, Gaussian 09W, VEDA 4, Multiwfn, GaussSum, AutoDock Vina</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-colors">
              <h4 className="font-bold mb-3 text-primary">Languages</h4>
              <p className="text-sm text-muted-foreground">Nepali, English (<strong>IELTS 7.0 overall</strong>)</p>
            </div>
          </div>
        </div>

        {/* Workshops & Training */}
        <div className="cv-section relative pl-8 border-l-2 border-primary/20">
          <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center">
            <CalendarCheck className="text-primary h-5 w-5" />
          </div>
          <h3 className="text-2xl font-bold mb-8 text-foreground">Workshops & Training</h3>
          <div className="space-y-4">
            {[
              { text: "Trained in X-ray diffraction (XRD) methods for crystal structure determination and data interpretation, Charotar University of Science and Technology (CHARUSAT), India", year: "2024" },
              { text: "Participated in a particle physics mini-workshop simulating Higgs boson data analysis, gaining experience in event-based data analysis and visualization, ICTP Physics Without Frontiers", year: "2023" },
              { text: "Gained the experience of training neural networks on high-performance computing infrastructure for physics and engineering applications, Kathmandu University (KU), Nepal", year: "2022" }
            ].map((item, i) => (
              <div key={i} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:border-primary/30 transition-colors flex justify-between items-start gap-4">
                <p className="text-sm text-muted-foreground">{item.text}</p>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap">{item.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Teaching Experience */}
        <div className="cv-section relative pl-8 border-l-2 border-primary/20">
          <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center">
            <Briefcase className="text-primary h-5 w-5" />
          </div>
          <h3 className="text-2xl font-bold mb-8 text-foreground">Teaching Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold">Private Physics Tutor – Grade 12</h4>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">Feb 2024 – Sep 2024</span>
              </div>
              <p className="text-muted-foreground text-sm"><i>wave motion, electric circuits, intro to nuclear and particle physics</i></p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold">NEB High School Math Tutor</h4>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">Nov 2024 – Present</span>
              </div>
              <p className="text-muted-foreground text-sm"><i>complex numbers, counting problems, vectors, calculus, statistics</i></p>
            </div>
          </div>
        </div>

        {/* Honors & Awards */}
        <div className="cv-section relative pl-8 border-l-2 border-primary/20">
          <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center">
            <Award className="text-primary h-5 w-5" />
          </div>
          <h3 className="text-2xl font-bold mb-8 text-foreground">Honors & Awards</h3>
          <div className="space-y-3">
            {[
              "College Need-Based Scholarships (2020–2023).",
              "2nd Place, Lovable Shipped Program for TargetScoreAI (Asia-wide).",
              "Recognition for Volunteer Work in Community Outreach Projects, Nepal."
            ].map((award, i) => (
              <div key={i} className="flex items-center gap-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:border-primary/30 transition-colors">
                <Award className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{award}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Leadership & Activities */}
        <div className="cv-section relative pl-8 border-l-2 border-primary/20 pb-12">
          <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center">
            <Users className="text-primary h-5 w-5" />
          </div>
          <h3 className="text-2xl font-bold mb-8 text-foreground">Leadership & Activities</h3>
          <div className="space-y-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
                <h4 className="font-bold">Founder & Charter President, Leo Club of Kathmandu</h4>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">2020 – 2023</span>
              </div>
              <p className="text-muted-foreground text-sm mb-1">Founded a 30-member chapter; led 12+ community and STEM outreach events. <a href="https://www.maheshkneupane.com.np/extracurricular/3" className="text-primary hover:underline font-medium">[Link]</a></p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
                <h4 className="font-bold">Volunteer, Be the Change Project</h4>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">2021 – 2022</span>
              </div>
              <p className="text-muted-foreground text-sm mb-1">Established a library for underprivileged students in Sindhupalchowk. <a href="https://www.maheshkneupane.com.np/extracurricular/2" className="text-primary hover:underline font-medium">[Link]</a></p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
                <h4 className="font-bold">Lead Demonstrator, Live Physics Expo (SXPC-Nepal)</h4>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">2024</span>
              </div>
              <p className="text-muted-foreground text-sm mb-1">Organized interactive physics demonstration stalls for 200+ students. <a href="https://www.maheshkneupane.com.np/extracurricular/7" className="text-primary hover:underline font-medium">[Link]</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="cv" ref={sectionRef} className={`section relative overflow-hidden ${isSummary ? 'py-20' : 'min-h-screen py-24'}`}>
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(var(--primary-rgb), 0.05) 0%, 
                rgba(var(--primary-rgb), 0.01) 40%, 
                transparent 70%),
              linear-gradient(to bottom, hsl(var(--background)), hsl(var(--background) / 0.98))`
          }}
        />
        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      </div>

      {isSummary ? (
        <>
          <SectionTitle title="Curriculum Vitae" subtitle="A summary of my academic and professional journey." alignment="center" />
          {summaryContent}
        </>
      ) : fullContent}
    </section>
  );
};

export default CVSection;
