import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import { 
  File, Download, Award, BookOpen, Code, Briefcase, ArrowRight, 
  CalendarCheck, Users, Linkedin, Github, Youtube, Mail, Phone, MapPin
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
        Physics graduate with teaching experience, seeking opportunities in Medical Physics. Exploring AI applications in healthcare. Key skills include physics instruction, problem-solving, and foundational programming.
      </p>
      <Button asChild className="mr-4">
        <Link to="/cv">
          View Full CV <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button 
        variant="secondary" 
        onClick={(e) => {
          e.preventDefault();
          alert('CV download functionality will be implemented here');
        }}
       >
         <Download className="mr-2 h-4 w-4" />
         Download CV
       </Button>
    </div>
  );

  const fullContent = (
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between mb-10">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Mahesh Kumar Neupane</h3>
            <p className="text-muted-foreground mb-4">Aspiring Medical Physicist | AI Enthusiast | Educator</p> 
            
            {/* Added Social Links */}
            <div className="flex space-x-4 text-muted-foreground">
              <a href="mailto:maheshkneupane90@gmail.com" aria-label="Email" className="hover:text-primary"><Mail size={20} /></a>
              <a href="tel:+9779863354076" aria-label="Phone" className="hover:text-primary"><Phone size={20} /></a>
              <a href="https://www.linkedin.com/in/mahesh-kumar-neupane-54a58618a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary"><Linkedin size={20} /></a>
              <a href="https://github.com/udneymanxe" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary"><Github size={20} /></a>
              <a href="https://www.youtube.com/@neupai" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-primary"><Youtube size={20} /></a>
              {/* TikTok icon isn't directly in lucide-react, using a placeholder or consider another icon library if needed */}
              <a href="https://www.tiktok.com/@neupane.life" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-primary"> {/* Placeholder: Add TikTok SVG or use different icon */} <span title="TikTok">Ti</span> </a> 
            </div>
          </div>
          
          <Button 
            variant="secondary" 
            onClick={(e) => {
              e.preventDefault();
              alert('CV download functionality will be implemented here');
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Full CV
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
              
              <div className="mt-4">
                <h5 className="font-semibold text-sm mb-2">Relevant Coursework:</h5>
                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <li>Machine Learning (Coursera)</li>
                  <li>Deep Learning (Coursera)</li>
                  <li>C-Programming</li>
                  <li>Computational Course</li>
                  <li>Numerical Methods</li>
                  <li>Calculus (I, II, & III)</li>
                  <li>Statistics</li>
                  <li>Probability & Inference</li>
                  <li>Linear Algebra</li>
                </ul>
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
        
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Briefcase className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Relevant Experience</h3>
          </div>
          
          <div className="ml-14 space-y-8">
            {/* Removed Research Assistant & Intern entries */} 
            {/* We can add your Teaching Experience details here later */}
          </div>
        </div>
        
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Code className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Skills</h3>
          </div>
          
          <div className="ml-14 space-y-6">
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-100">
              <h4 className="font-medium mb-2">Programming Languages</h4>
              <p className="text-muted-foreground text-sm">C, Matlab, Python (NumPy, Pandas, Matplotlib), R</p>
            </div>
            
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-150">
              <h4 className="font-medium mb-2">Tools and Frameworks</h4>
              <p className="text-muted-foreground text-sm">Jupyter Notebook, R studio, git, LaTex, PyTorch, TensorFlow</p>
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
          <div className="ml-14 space-y-4">
            <div className="cv-item opacity-0 -translate-y-4 transition-all duration-700 ease-out delay-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <p className="font-medium">Rural Immersion Camp Volunteer</p>
                <span className="text-muted-foreground text-sm mt-1 sm:mt-0">2022 & 2023</span>
              </div>
              <p className="text-muted-foreground text-sm">Volunteered in Makwanpur and Lamjung districts, informing students on STEM education and careers.</p>
            </div>
          </div>
        </div>

      </div>
  );

  return (
    <section id="cv" className={`section ${isSummary ? 'py-16' : ''}`} ref={sectionRef}>
      <SectionTitle
        title="Curriculum Vitae"
        subtitle={isSummary ? undefined : "My academic journey and exploration into medical physics."}
      />
      {isSummary ? summaryContent : fullContent}
    </section>
  );
};

export default CVSection;
