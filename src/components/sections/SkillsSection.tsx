import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Shield, Brain, Microscope, Code, Database, LineChart, FileText, Link as LinkIcon, Upload, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
  
  // Updated Certifications Data
  const certifications = [
    {
      id: 1, 
      name: "Machine Learning Specialization", 
      issuer: "DeepLearning.AI / Stanford Online (Coursera)", 
      date: "Date TBD", // <-- Update this if you know the date
      link: null, 
      fileUrl: null // No file provided
    },
    // Add more certifications here as provided
  ];
  
  return (
    <section id="skills" className="section">
      <SectionTitle 
        title="Technical Skills & Certifications" 
        subtitle="Expertise across medical physics, computational methods, and professional certifications."
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
      
      <div className="glass p-8 rounded-xl mt-16">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Certifications</h3>
          <Button variant="outline" size="sm" disabled>
            <Upload className="mr-2 h-4 w-4" /> Upload Certificate
          </Button>
        </div>
        
        {certifications.length > 0 ? (
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="border p-4 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-grow">
                  {/* Make name a link if cert.link exists */}
                  {cert.link ? (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      <h4 className="font-semibold">{cert.name}</h4>
                    </a>
                  ) : (
                    <h4 className="font-semibold">{cert.name}</h4>
                  )}
                  <p className="text-sm text-muted-foreground">{cert.issuer} - <span className="text-xs"><Badge variant="secondary">{cert.date}</Badge></span></p>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0 mt-2 sm:mt-0">
                  {cert.link && (
                    <Button variant="ghost" size="icon" asChild>
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" aria-label="Verification Link">
                        <LinkIcon className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {cert.fileUrl && (
                    <Button variant="ghost" size="icon" asChild>
                      <a href={cert.fileUrl} target="_blank" rel="noopener noreferrer" aria-label="View Certificate File">
                        <FileText className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center">No certifications added yet.</p>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
