import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Shield, Brain, Microscope, Code, Database, LineChart, FileText, Link as LinkIcon, Upload, Users, Download, Award, ExternalLink } from 'lucide-react';
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
      name: "Supervised Machine Learning: Regression and Classification", 
      issuer: "DeepLearning.AI / Stanford University (via Coursera)", 
      date: "April 21, 2025",
      link: "https://www.coursera.org/account/accomplishments/verify/K73UH3G7AUF1", 
      fileUrl: "/ML1.pdf", // Path to the PDF in public folder
      pdfDownloadName: "ML_Certificate_MaheshKNeupane.pdf" // Suggested download name
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
        </div>
        
        {certifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              // Postcard Style Div
              <div key={cert.id} className="border p-4 rounded-lg shadow-sm bg-card flex items-start space-x-4 hover:shadow-md transition-shadow duration-200">
                {/* Image as "Picture" */}
                <div className="w-24 h-auto flex-shrink-0 mt-1">
                  <img 
                    src="/ML1.jpeg"
                    alt={`${cert.name} Certificate Thumbnail`} 
                    className="rounded-md object-cover"
                  />
                </div>
                {/* Certificate Details */}
                <div className="flex-grow">
                  <h4 className="font-semibold mb-1">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground mb-3"><Badge variant="secondary">{cert.date}</Badge></p>
                  {/* Links */}
                  <div className="flex items-center space-x-3 mt-2">
                    {cert.link && (
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-primary hover:underline inline-flex items-center"
                        aria-label={`Verify ${cert.name} certificate`}
                       >
                        <ExternalLink className="mr-1 h-3 w-3" /> Verify
                      </a>
                    )}
                    {cert.fileUrl && (
                      <a 
                        href={cert.fileUrl} 
                        download={cert.pdfDownloadName} 
                        className="text-xs text-primary hover:underline inline-flex items-center"
                        aria-label={`Download ${cert.name} certificate PDF`}
                       >
                        <Download className="mr-1 h-3 w-3" /> Download PDF
                      </a>
                    )}
                  </div>
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
