
import React from 'react';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import PublicationItem from '@/components/PublicationItem';

const PublicationsSection: React.FC = () => {
  // Sample publications
  const publications = [
    {
      title: 'Novel Approaches to Radiation Dose Calculation in Heterogeneous Media',
      journal: 'Journal of Medical Physics',
      authors: 'Your Name, Collaborator A, Collaborator B',
      year: '2023',
      url: '#',
    },
    {
      title: 'Machine Learning Applications in Radiation Oncology: A Systematic Review',
      journal: 'Physics in Medicine & Biology',
      authors: 'Your Name, Collaborator C',
      year: '2022',
      url: '#',
    },
    {
      title: 'Quantitative Analysis of PET Image Quality Enhancement Techniques',
      journal: 'Medical Physics',
      authors: 'Your Name, Collaborator D, Collaborator E',
      year: '2021',
      url: '#',
    }
  ];
  
  return (
    <section id="publications" className="section bg-secondary/30">
      <SectionTitle 
        title="Publications" 
        subtitle="Research contributions to the field of medical physics."
      />
      
      <div className="max-w-4xl mx-auto">
        {publications.map((pub, index) => (
          <PublicationItem
            key={index}
            title={pub.title}
            journal={pub.journal}
            authors={pub.authors}
            year={pub.year}
            url={pub.url}
            index={index}
          />
        ))}
      </div>
      
      <div className="mt-10 flex justify-center">
        <a href="#" className="btn-secondary">
          View All Publications
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </section>
  );
};

export default PublicationsSection;
