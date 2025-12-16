import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import { 
  Download, Award, BookOpen, Code, Briefcase, ArrowRight, 
  CalendarCheck, Users, Linkedin, Github, Mail, Phone, MapPin, Globe,
  Network
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CVSectionProps {
  isSummary?: boolean;
}

const CVSection: React.FC<CVSectionProps> = ({ isSummary = false }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (isSummary) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    let observedItems: Element[] = [];
    if (sectionRef.current) {
      observedItems = Array.from(sectionRef.current.querySelectorAll('.cv-item'));
      observedItems.forEach((item) => observer.observe(item));
    }
    
    return () => {
      observedItems.forEach((item) => observer.unobserve(item));
    };
  }, [isSummary]);
  
  const summaryContent = (
    <div className="container max-w-4xl mx-auto text-center">
      <p className="text-lg text-muted-foreground mb-8">
        Physics & AI Enthusiast | Aspiring to build meaningful AI solutions for real-world impact.
      </p>
      <Button asChild className="mr-4">
        <Link to="/cv">
          View Full CV <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button 
        variant="secondary" 
        asChild
      >
        <a 
          href="/CV_fall_2026.pdf" 
          download="CV_fall_2026.pdf"
          aria-label="Download CV"
        >
          <Download className="mr-2 h-4 w-4" />
          Download CV
        </a>
      </Button>
    </div>
  );

  const fullContent = (
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between mb-10">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Mahesh Kumar Neupane</h3>
            <p className="text-muted-foreground mb-4">Physics & AI Enthusiast | Building AI for Meaningful Impact</p>
            
            {/* Contact Info & Social Links */}
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              {/* Row 1: Core Contact */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <div className="flex items-center"><MapPin size={16} className="mr-1.5" /> Kalikot, Nepal</div>
                <a href="mailto:maheshkneupane90@gmail.com" className="flex items-center hover:text-primary transition-colors"><Mail size={16} className="mr-1.5" /> maheshkneupane90@gmail.com</a>
                <a href="tel:+9779863354076" className="flex items-center hover:text-primary transition-colors"><Phone size={16} className="mr-1.5" /> +977 9863354076</a>
              </div>
              {/* Row 2: Social/Professional Links */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <a href="https://www.maheshkneupane.com.np" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors"><Globe size={16} className="mr-1.5" /> maheshkneupane.com.np</a>
                <a href="https://linkedin.com/in/mahesh-kumar-neupane-54a58618a/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors"><Linkedin size={16} className="mr-1.5" /> LinkedIn</a>
                <a href="https://github.com/udneymanxe" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors"><Github size={16} className="mr-1.5" /> GitHub</a>
              </div>
            </div>
          </div>
          
          <Button 
            variant="secondary" 
            asChild
          >
            <a 
              href="/CV_fall_2026.pdf" 
              download="CV_fall_2026.pdf"
              aria-label="Download Full CV"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Full CV
            </a>
          </Button>
        </div>
        
        {/* Education */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <BookOpen className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Education</h3>
          </div>
          
          <div className="ml-14 space-y-8">
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h4 className="font-bold">St. Xavier's College, Maitighar, Nepal</h4>
                <span className="text-muted-foreground text-sm">Sep 2024</span>
              </div>
              <p className="text-primary font-medium mb-1">Affiliated to Tribhuvan University</p>
              <p className="text-foreground font-medium mb-1">Bachelor of Science in Physics</p>
              <p className="text-muted-foreground text-sm">
                Average percentage: 68.50 (CGPA: 3.54/4.00 
                <a 
                  href="/converted gpa.pdf" 
                  download="GPA_Conversion_MaheshKNeupane.pdf"
                  className="text-primary font-semibold hover:underline cursor-pointer ml-1"
                  title="Click to download GPA conversion document"
                >
                  Alpha Grade conversion
                </a>
                )
              </p>
            </div>
          </div>
        </div>

        {/* Publications */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Network className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Publications</h3>
          </div>
          
          <div className="ml-14 space-y-8">
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-100">
              <h4 className="font-bold mb-1">1. Study on the Molecular Dynamics of 2-(4-fluorophenyl)-6-methyl-4-(3-(trifluoromethyl)phenyl)-1,2-dihydrodipyrazolo[3,4-b:3',4'-d]pyridin-3(6H)-one for Cancer Immunotherapy Using a DFT Model</h4>
              <p className="text-muted-foreground text-sm mb-1"><span className="font-semibold text-primary">M. K. Neupane</span>, B. S. Magar, B. Gurung, R. R. Lamichhane, P. Pandey</p>
              <p className="text-sm mb-1">ACS Omega, Q1, 2025 | DOI: <a href="https://doi.org/10.1021/acsomega.5c08756" className="text-primary hover:underline">link</a></p>
              <p className="text-muted-foreground text-sm mt-2"><span className="font-semibold">Contribution:</span> Performed DFT and MD simulations; calculated HOMO-LUMO, NBO, ELF, LOL, RDG; simulated FT-IR, Raman, UV-Vis; conducted molecular docking with CD28, CD80, CD86, CTLA-4; ADMET analysis; manuscript writing.</p>
            </div>

            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-150">
              <h4 className="font-bold mb-1">2. Comparative Study of Soft and Hard Boundary Constraints in Physics-Informed Neural Networks for Quantum Mechanical Eigenvalue Problems</h4>
              <p className="text-muted-foreground text-sm mb-1">A. Dhamala*, S. Bhattarai, B. Gurung, C. Hyolmo, <span className="font-semibold text-primary">M. K. Neupane</span>, R. R. Lamichhane, S. Chaulagain, B. S. Magar</p>
              <p className="text-sm mb-1">Heliyon, Q1, Submitted, 2025 | DOI: <a href="https://doi.org/10.5281/zenodo.17515333" className="text-primary hover:underline">link</a></p>
              <p className="text-muted-foreground text-sm mt-2"><span className="font-semibold">Contribution:</span> Developed PINN models; implemented soft and hard BCs; benchmarked against analytical/numerical solutions; adaptive learning rate optimization; evaluated efficiency and accuracy.</p>
            </div>

            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-200">
              <h4 className="font-bold mb-1">3. Theoretical Investigation on PD-L1-In-1 for Cancer Immunotherapy via Density Functional Theory</h4>
              <p className="text-muted-foreground text-sm mb-1">B. Sijapati Magar, K. Pudasainee, P. Pandey, <span className="font-semibold text-primary">M. K. Neupane</span>, et al.</p>
              <p className="text-sm mb-1">Scientific Reports, Q1, 2025 | DOI: <a href="https://doi.org/10.1038/s41598-025-92180-9" className="text-primary hover:underline">link</a></p>
              <p className="text-muted-foreground text-sm mt-2"><span className="font-semibold">Contribution:</span> DFT-based structural, electronic, and spectroscopic characterization; NBO analysis; HOMO-LUMO and DOS studies; molecular docking with PD-L1; predicted pharmacokinetics and biological activity.</p>
            </div>
          </div>
        </div>
        
        {/* Research Experience */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Briefcase className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Research Experience</h3>
          </div>
          
          <div className="ml-14 space-y-8">
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h4 className="font-bold">Independent Research Project</h4>
                <span className="text-muted-foreground text-sm">July 2025 – Nov 2025</span>
              </div>
              <p className="text-primary font-medium mb-3">DFT Modeling & Molecular Docking for Cancer Immunotherapy</p>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 mb-3">
                <li>Led a comprehensive <i>in silico</i> characterization of a novel small-molecule inhibitor targeting the B7-CD28 signaling axis for cancer immunotherapy application.</li>
                <li>Employed Density Functional Theory (DFT) at the B3LYP/6-311G(d) level using <strong>Gaussian 09W</strong> to simulate molecular geometry, electronic properties, and vibrational/NMR spectra.</li>
                <li>Conducted molecular docking simulations using <strong>AutoDock Vina</strong>, demonstrating strong binding affinity toward CTLA-4 (−7.97 kcal·mol⁻¹) and CD80 (−7.54 kcal·mol⁻¹) checkpoint proteins.</li>
                <li>Performed advanced topological analyses (ELF, LOL, RDG) and Natural Bond Orbital (NBO) analysis to visualize intermolecular interactions and electronic stability in polar solvents.</li>
                <li>Analyzed ADMET properties to predict favorable pharmacokinetics, confirming high human intestinal absorption (94%) and drug-likeness.</li>
                <li>Published results as the <strong>Main Author</strong> in <i>ACS Omega</i> (2025).</li>
              </ul>
            </div>

            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-150">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h4 className="font-bold">ML based Research Project</h4>
                <span className="text-muted-foreground text-sm">Jun 2025 – Sep 2025</span>
              </div>
              <p className="text-primary font-medium mb-3">Boundary Constraints for Physics-Informed Neural Networks (PINNs)</p>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 mb-3">
                <li>Initiated and coordinated a study with seven peers to investigate how boundary condition enforcement techniques affect solution accuracy and convergence in PINNs.</li>
                <li>Compared the performance of soft- and hard-constrained models in solving the Schrödinger equation for various potentials, benchmarking against analytical and numerical solutions.</li>
                <li>Demonstrated that hard-constrained models with ansätze reflecting the required asymptotic behavior and a variable parameter converge faster and achieve higher accuracy.</li>
                <li>Achieved over <strong>100×</strong> improvement in accuracy using adaptive learning rates for hard-constrained models compared to constant rates.</li>
                <li>Co-authored a manuscript detailing methodology and results.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Projects */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Code className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Additional Projects</h3>
          </div>
          <div className="ml-14 space-y-6">
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <h4 className="font-bold">TargetScoreAI – AI Adaptive Learning Platform</h4>
                <span className="text-muted-foreground text-sm">2025</span>
              </div>
              <p className="text-sm mb-2"><a href="https://targetscoreai.xyz" className="text-primary hover:underline">targetscoreai.xyz</a> | 2nd Place Asia-wide</p>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                <li>Developed platform serving 1,500+ users with adaptive algorithms.</li>
                <li>Built Python-React-PostgreSQL backend with analytics dashboards.</li>
                <li>Demonstrated ability to deliver production-grade AI systems.</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Skills */}
        <div id="skills" className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Award className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Skills</h3>
          </div>
          
          <div className="ml-14 space-y-4">
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-100">
              <p className="text-sm"><span className="font-bold">Programming:</span> Python (NumPy, Pandas, Matplotlib, PyTorch), C</p>
            </div>
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-150">
              <p className="text-sm"><span className="font-bold">Tools:</span> Jupyter Notebook, Git, LaTeX, Gaussian 09W, VEDA 4, Multiwfn, GaussSum, AutoDock Vina</p>
            </div>
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-200">
              <p className="text-sm"><span className="font-bold">Languages:</span> Nepali, English (<strong>IELTS 7.0 overall</strong>)</p>
            </div>
          </div>
        </div>

        {/* Workshops & Training */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <CalendarCheck className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Workshops & Training</h3>
          </div>
          <div className="ml-14 space-y-4">
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-2">
              <li className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-100">
                Trained in X-ray diffraction (XRD) methods for crystal structure determination and data interpretation, <i>Charotar University of Science and Technology (CHARUSAT), India</i> <span className="float-right text-xs bg-secondary px-2 py-0.5 rounded-full">2024</span>
              </li>
              <li className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-150">
                Participated in a particle physics mini-workshop simulating Higgs boson data analysis, gaining experience in event-based data analysis and visualization, <i>ICTP Physics Without Frontiers</i> <span className="float-right text-xs bg-secondary px-2 py-0.5 rounded-full">2023</span>
              </li>
              <li className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-200">
                Gained the experience of training neural networks on high-performance computing infrastructure for physics and engineering applications, <i>Kathmandu University (KU), Nepal</i> <span className="float-right text-xs bg-secondary px-2 py-0.5 rounded-full">2022</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Teaching Experience */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Briefcase className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Teaching Experience</h3>
          </div>
          <div className="ml-14 space-y-6">
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <h4 className="font-bold">Private Physics Tutor – Grade 12</h4>
                <span className="text-muted-foreground text-sm">Feb 2024 – Sep 2024</span>
              </div>
              <p className="text-muted-foreground text-sm"><i>wave motion, electric circuits, intro to nuclear and particle physics</i></p>
            </div>
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <h4 className="font-bold">NEB High School Math Tutor</h4>
                <span className="text-muted-foreground text-sm">Nov 2024 – Present</span>
              </div>
              <p className="text-muted-foreground text-sm"><i>complex numbers, counting problems, vectors, calculus, statistics</i></p>
            </div>
          </div>
        </div>

        {/* Honors & Awards */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Award className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Honors & Awards</h3>
          </div>
          <div className="ml-14 space-y-4">
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-2">
              <li className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-100">College Need-Based Scholarships (2020–2023).</li>
              <li className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-150">2nd Place, Lovable Shipped Program for TargetScoreAI (Asia-wide).</li>
              <li className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-200">Recognition for Volunteer Work in Community Outreach Projects, Nepal.</li>
            </ul>
          </div>
        </div>
        
        {/* Leadership & Activities */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Users className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Leadership & Activities</h3>
          </div>
          <div className="ml-14 space-y-6">
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-100">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-1">
                <h4 className="font-bold">Founder & Charter President, Leo Club of Kathmandu</h4>
                <span className="text-muted-foreground text-sm mt-1 sm:mt-0 flex-shrink-0 pl-2">2020 – 2023</span>
              </div>
              <p className="text-muted-foreground text-sm mb-1">Founded a 30-member chapter; led 12+ community and STEM outreach events; managed fundraising and logistics. <a href="https://www.maheshkneupane.com.np/extracurricular/3" className="text-primary hover:underline">[Link]</a></p>
            </div>

            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-150">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-1">
                <h4 className="font-bold">Volunteer, Be the Change Project</h4>
                <span className="text-muted-foreground text-sm mt-1 sm:mt-0 flex-shrink-0 pl-2">2021 – 2022</span>
              </div>
              <p className="text-muted-foreground text-sm mb-1">Established a library for underprivileged students in Sindhupalchowk; coordinated book collection and distribution. <a href="https://www.maheshkneupane.com.np/extracurricular/2" className="text-primary hover:underline">[Link]</a></p>
            </div>

            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-200">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-1">
                <h4 className="font-bold">Lead Demonstrator, Live Physics Expo (SXPC-Nepal)</h4>
                <span className="text-muted-foreground text-sm mt-1 sm:mt-0 flex-shrink-0 pl-2">2024</span>
              </div>
              <p className="text-muted-foreground text-sm mb-1">Organized interactive physics demonstration stalls for 200+ students. <a href="https://www.maheshkneupane.com.np/extracurricular/7" className="text-primary hover:underline">[Link]</a></p>
            </div>

            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-250">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-1">
                <h4 className="font-bold">Outreach Volunteer, IAPS School Day Programme</h4>
                <span className="text-muted-foreground text-sm mt-1 sm:mt-0 flex-shrink-0 pl-2">2022</span>
              </div>
              <p className="text-muted-foreground text-sm mb-1">Delivered physics demonstrations and STEM awareness sessions in rural schools. <a href="https://www.maheshkneupane.com.np/extracurricular/4" className="text-primary hover:underline">[Link]</a></p>
            </div>
          </div>
        </div>
      </div>
  );

  return (
    <section id="cv" className={`section ${isSummary ? 'py-16' : ''}`} ref={sectionRef}>
      <SectionTitle
        title="Curriculum Vitae"
      />
      {isSummary ? summaryContent : fullContent}
    </section>
  );
};

export default CVSection;
