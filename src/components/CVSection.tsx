import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import { 
  File, Download, Award, BookOpen, Code, Briefcase, ArrowRight, 
  CalendarCheck, Users, Linkedin, Github, Youtube, Mail, Phone, MapPin, Globe, Film,
  Network,
  FlaskConical,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { activities } from '@/data/activities';

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
          href="/CV_MaheshKNeupane_Updated.pdf" 
          download="CV_MaheshKNeupane_Updated.pdf"
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
            
            {/* Contact Info & Social Links - Arranged for clarity */}
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              {/* Row 1: Core Contact */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <Link to="/about#kalikot-roots" aria-label="Location: Kalikot, Nepal" className="flex items-center hover:text-primary transition-colors"><MapPin size={16} className="mr-1.5" /> Kalikot, Nepal</Link>
                <a href="tel:+9779863354076" aria-label="Phone" className="flex items-center hover:text-primary transition-colors"><Phone size={16} className="mr-1.5" /> +977 9863354076</a>
                <a href="mailto:maheshkneupane90@gmail.com" aria-label="Email" className="flex items-center hover:text-primary transition-colors"><Mail size={16} className="mr-1.5" /> maheshkneupane90@gmail.com</a>
                <a href="https://www.maheshkneupane.com.np" target="_blank" rel="noopener noreferrer" aria-label="Website" className="flex items-center hover:text-primary transition-colors"><Globe size={16} className="mr-1.5" /> www.maheshkneupane.com.np</a>
              </div>
              {/* Row 2: Social/Professional Links */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <a href="https://www.linkedin.com/in/mahesh-kumar-neupane-54a58618a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center hover:text-primary transition-colors"><Linkedin size={16} className="mr-1.5" /> LinkedIn</a>
                <a href="https://github.com/udneymanxe" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center hover:text-primary transition-colors"><Github size={16} className="mr-1.5" /> GitHub</a>
                <a href="https://www.youtube.com/@neupai" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex items-center hover:text-primary transition-colors"><Youtube size={16} className="mr-1.5" /> YouTube</a>
                <a href="https://x.com/Udneymanxe" target="_blank" rel="noopener noreferrer" aria-label="X/Twitter" className="flex items-center hover:text-primary transition-colors"><Network size={16} className="mr-1.5" /> X (Twitter)</a>
                 {/* Placeholder: Add TikTok SVG or use different icon. Using 'Film' as temporary visual */}
                <a href="https://www.tiktok.com/@neupane.life" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="flex items-center hover:text-primary transition-colors"><Film size={16} className="mr-1.5" /> TikTok</a> 
              </div>
            </div>
          </div>
          
          <Button 
            variant="secondary" 
            asChild
          >
            <a 
              href="/CV_MaheshKNeupane_Updated.pdf" 
              download="CV_MaheshKNeupane_Updated.pdf"
              aria-label="Download Full CV"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Full CV
            </a>
          </Button>
        </div>
        
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Briefcase className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Education</h3>
          </div>
          
          <div className="ml-14 space-y-8">
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h4 className="font-bold">B.S. in Physics</h4>
                <span className="text-muted-foreground text-sm">2019 - 2023</span>
              </div>
              <p className="text-primary font-medium mb-2">St. Xavier's College, Maitighar, Kathmandu, Nepal (affiliated to Tribhuvan University)</p>
              
              <div className="mt-4">
                <h5 className="font-semibold text-sm mb-2">Key Achievements:</h5>
                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                  <li>Graduated with distinction in Physics</li>
                  <li>Active participation in physics research projects and seminars</li>
                  <li>Member of the college physics society</li>
                  <li>Contributed to organizing physics workshops and events</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h5 className="font-semibold text-sm mb-3">Relevant Coursework:</h5>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <h6 className="font-medium text-sm text-primary mb-1">Physics:</h6>
                    <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                      <li>General Physics I & II (with labs)</li>
                      <li>Modern Physics</li>
                      <li>Electricity and Magnetism</li>
                      <li>Nuclear Physics</li>
                      <li>Quantum Mechanics</li>
                    </ul>
                  </div>

                  <div>
                    <h6 className="font-medium text-sm text-primary mb-1">Mathematics & Statistics:</h6>
                    <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                      <li>Calculus (I, II, & III)</li>
                      <li>Linear Algebra</li>
                      <li>Statistics</li>
                      <li>Probability & Inference</li>
                    </ul>
                  </div>

                  <div>
                    <h6 className="font-medium text-sm text-primary mb-1">Computer Science & Computational Methods:</h6>
                    <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                  <li>C-Programming</li>
                  <li>Computational Course</li>
                  <li>Numerical Methods</li>
                    </ul>
                  </div>

                  <div>
                    <h6 className="font-medium text-sm text-primary mb-1">Machine Learning / AI:</h6>
                    <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                      <li>Machine Learning (Coursera)</li>
                      <li>Deep Learning (Coursera)</li>
                </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Added REHDON College */}
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-150">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h4 className="font-bold">+2 Science / High School</h4>
                <span className="text-muted-foreground text-sm">2016 - 2018</span>
              </div>
              <p className="text-primary font-medium mb-2">REHDON College and School, Samakhushi, Kathmandu, Nepal</p>
              {/* Add any relevant details like major subjects if needed */}
            </div>
          </div>
        </div>
        
        {/* Certifications Section - Added */}
        <div id="certifications" className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Award className="text-primary h-5 w-5" /> {/* Using Award icon */}
            </div>
            <h3 className="text-xl font-bold">Certifications</h3>
          </div>
          <div className="ml-14 space-y-8">
            {/* Machine Learning Certificate Entry - Styled as a card */}
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-100 p-4 border rounded-lg shadow-sm bg-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <h4 className="font-bold">Supervised Machine Learning: Regression and Classification</h4>
                <span className="text-muted-foreground text-sm mt-1 sm:mt-0 flex-shrink-0 pl-0 sm:pl-2">April 21, 2025</span>
              </div>
              <p className="text-primary font-medium mb-3">DeepLearning.AI / Stanford University (via Coursera)</p>
              
              {/* Links for Verification and PDF Download */}
              <div className="flex items-center space-x-4 mt-3">
                <a 
                  href="https://www.coursera.org/account/accomplishments/verify/K73UH3G7AUF1"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-flex items-center"
                  aria-label="Verify Certificate on Coursera"
                >
                  <ExternalLink className="mr-1.5 h-4 w-4" /> Verify Certificate
                </a>
                <a 
                  href="/ML1.pdf" 
                  download="ML_Certificate_MaheshKNeupane.pdf" // Suggest a descriptive filename
                  className="text-sm text-primary hover:underline inline-flex items-center"
                  aria-label="Download Certificate PDF"
                 >
                  <Download className="mr-1.5 h-4 w-4" /> Download PDF
                </a>
              </div>
            </div>
            {/* Add more certificate entries here if needed */}
          </div>
        </div>

        {/* Combined Experience Section - Added ID */}
        <div id="experience" className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              {/* Using Briefcase icon for general Experience */}
              <Briefcase className="text-primary h-5 w-5" />
            </div>
            {/* Changed title to Experience */}
            <h3 className="text-xl font-bold">Experience</h3>
          </div>
          
          <div className="ml-14 space-y-8">
            {/* Research Entry - Now under Experience */}
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h4 className="font-bold">Research Contributor (Computational Chemistry/Biophysics)</h4>
                <span className="text-muted-foreground text-sm">2023 – 2025</span>
              </div>
              {/* <p className="text-primary font-medium mb-3">[Optional: Lab/Group Name if applicable]</p> */}
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 mb-3">
                <li>Contributed as a co-author to a theoretical investigation utilizing Density Functional Theory (DFT) for cancer immunotherapy research.</li>
                <li>Performed DFT calculations using software packages like Gaussian, VEDA, Multiwfn.</li>
                <li>Assisted in processing and analyzing computational output data.</li>
                <li>Contributed to the literature review and background sections of the manuscript.</li>
              </ul>
              <p className="text-muted-foreground text-sm">
                <span className="font-medium">Paper Title:</span> "Theoretical Investigation on PD-L1-In-1 for Cancer Immunotherapy via Density Functional Theory"
              </p>
              <p className="text-muted-foreground text-sm">
                <span className="font-medium">Status:</span> Accepted for publication in Scientific Reports (Nature Publishing Group).
              </p>
            </div>

            {/* Teaching Entry - Now under Experience */}
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-150"> {/* Adjusted delay */} 
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h4 className="font-bold">Secondary School Teacher</h4>
                <span className="text-muted-foreground text-sm">August 2022 – March 2025</span>
              </div>
              <p className="text-primary font-medium mb-3">Glen Buds Secondary School, Maharajgunj</p>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                <li>Provided comprehensive instruction in Science, Mathematics, and Optional Mathematics for secondary level students (Grades 8-10), emphasizing foundational concepts and analytical problem-solving.</li>
                <li>Developed and delivered lesson plans, assignments, and assessments to foster student learning and engagement.</li>
                <li>Effectively communicated complex scientific and mathematical concepts in an accessible manner.</li>
                <li>Managed classroom dynamics and provided academic support to students.</li>
              </ul>
            </div>
            {/* We can add more experiences here if needed */} 
          </div>
        </div>
        
        {/* Skills Section - Added ID */}
        <div id="skills" className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Code className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Skills</h3>
          </div>
          
          <div className="ml-14 space-y-6">
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-100">
              <h4 className="font-medium mb-2">Programming Languages</h4>
              <p className="text-muted-foreground text-sm">C, Matlab, Python (NumPy, Pandas, Matplotlib)</p>
            </div>
            
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-150">
              <h4 className="font-medium mb-2">Tools and Frameworks</h4>
              <p className="text-muted-foreground text-sm">Jupyter Notebook, git, LaTex, PyTorch</p>
            </div>
            
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-200">
              <h4 className="font-medium mb-2">Soft Skills</h4>
              <p className="text-muted-foreground text-sm">Communication, Presentation, Problem-solving</p>
            </div>
          </div>
        </div>

        {/* Added Relevant Workshops Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <CalendarCheck className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Relevant Workshops</h3>
          </div>
          <div className="ml-14 space-y-4">
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <p className="font-medium">Mini-Workshop on Data Analysis in Particle Physics</p>
                <span className="text-muted-foreground text-sm mt-1 sm:mt-0">2023</span>
              </div>
              <p className="text-muted-foreground text-sm">Organized by ICTP (Physics without Frontiers program)</p>
            </div>
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <p className="font-medium">Workshop on Deep Learning in Physics</p>
                <span className="text-muted-foreground text-sm mt-1 sm:mt-0">2022</span>
              </div>
              <p className="text-muted-foreground text-sm">Organized by Kathmandu University, Dhulikhel, Nepal</p>
            </div>
          </div>
        </div>
        
        {/* Added Extracurricular Activities Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Users className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Extracurricular Activities</h3>
          </div>
          <div className="ml-14 space-y-6">
            {activities.map((activity, index) => (
              <div 
                key={activity.id} 
                className={`cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out`} 
                style={{ transitionDelay: `${100 + index * 50}ms` }}
              >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                  <Link 
                    to={`/extracurricular/${activity.id}`}
                    className="font-medium hover:text-primary transition-colors duration-200"
                  >
                    {activity.title}
                  </Link>
                  <span className="text-muted-foreground text-sm mt-1 sm:mt-0 flex-shrink-0 pl-2">{activity.date}</span>
                </div>
                <p className="text-muted-foreground text-sm">{activity.description}</p>
              </div>
            ))}
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

// === End of CVSection component ===
export default CVSection;
