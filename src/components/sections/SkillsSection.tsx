import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Shield, Brain, Microscope, Code, Database, LineChart, FileText, Link as LinkIcon, Upload, Users, Download, Award, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const SkillsSection: React.FC = () => {
  const skillCategories = [
    {
      title: "Research Methods",
      icon: Microscope,
      description: "Proficiency in designing and conducting physics experiments"
    },
    {
      title: "Computational Skills",
      icon: Code,
      description: "Programming languages and tools/frameworks proficiency"
    },
    {
      title: "Soft Skills",
      icon: Users,
      description: "Essential interpersonal and professional abilities"
    },
    {
      title: "Analytics",
      icon: LineChart,
      description: "Statistical analysis and interpretation of complex datasets"
    }
  ];
  
  // Certifications data moved to CertificationsPage.tsx

  return (
    <section id="skills" className="section">
      <SectionTitle 
        title="Technical Skills"
        subtitle="Expertise across medical physics and computational methods."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {skillCategories.map((category, index) => (
          <div key={index} className="glass p-6 rounded-lg transform transition-all duration-300 hover:translate-y-[-5px]">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <category.icon className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
            
            {/* Conditional Rendering for Detailed Skills */}
            {category.title === "Computational Skills" ? (
              <div className="space-y-3 text-sm text-muted-foreground mt-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Languages:</h4>
                  <p>C, Matlab, Python (NumPy, Pandas, Matplotlib), R</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Tools/Frameworks:</h4>
                  <p>Jupyter Notebook, R studio, git, LaTex, PyTorch, TensorFlow</p>
                </div>
              </div>
            ) : category.title === "Soft Skills" ? (
              <div className="space-y-3 text-sm text-muted-foreground mt-4">
                <p>• Communication</p>
                <p>• Presentation</p>
                <p>• Problem-solving</p>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">{category.description}</p>
            )}
          </div>
        ))}
      </div>
      
      {/* Link to Certifications Page */}
      <div className="text-center mt-12">
        <Button asChild variant="outline">
          <Link to="/certifications">
            View Certifications <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default SkillsSection;
