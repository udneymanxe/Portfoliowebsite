
import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import ResearchCard from '@/components/ResearchCard';

const ResearchSection: React.FC = () => {
  // Sample research projects
  const researchProjects = [
    {
      title: 'Optimizing Radiation Therapy Dosage',
      description: 'Research focused on improving radiation therapy precision through advanced dosimetry techniques and computational modeling.',
      tags: ['Radiation Therapy', 'Dosimetry'],
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
    },
    {
      title: 'PET Imaging Enhancement Techniques',
      description: 'Developing new methodologies to enhance PET imaging resolution and diagnostic accuracy using machine learning algorithms.',
      tags: ['PET', 'Machine Learning'],
      image: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
    },
    {
      title: 'MRI-guided Radiation Therapy',
      description: 'Exploring the integration of MRI technology with radiation therapy systems for improved target visualization and treatment delivery.',
      tags: ['MRI', 'Treatment Delivery'],
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
    }
  ];
  
  return (
    <section id="research" className="section bg-secondary/30">
      <SectionTitle 
        title="Research Projects" 
        subtitle="Research at the intersection of physics, AI, and computational science."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {researchProjects.map((project, index) => (
          <ResearchCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            tags={project.tags}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ResearchSection;
