
import React from 'react';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import PublicationItem from '@/components/PublicationItem';

const PublicationsSection: React.FC = () => {
  // Publications
  const publications = [
    {
      title: 'Study on the Molecular Dynamics of 2‑(4-Fluorophenyl)-6-methyl-4-(3-(trifluoromethyl)phenyl)-1,2-dihydrodipyrazolo[3,4-b:3′,4′‑d]pyridin-3(6H)‑one for Cancer Immunotherapy Using a DFT Model',
      journal: 'ACS Omega',
      authors: 'M. K. Neupane, B. S. Magar, B. Gurung, R. R. Lamichhane, P. Pandey',
      year: '2025',
      url: 'https://pubs.acs.org/doi/10.1021/acsomega.5c05359',
    },
    {
      title: 'Theoretical investigation on PD-L1-In-1 for cancer immunotherapy via density functional theory',
      journal: 'Scientific Reports (Nature)',
      authors: 'B. S. Magar, K. Pudasainee, P. Pandey, M. K. Neupane, R. R. Lamichhane, B. Gurung, K. Tripathi, B. Adhikari',
      year: '2025',
      url: 'https://www.nature.com/articles/s41598-025-92180-9',
    },
    {
      title: 'Deep Learning Approaches in Computational Physics',
      journal: 'Computational Physics Journal',
      authors: 'M. K. Neupane, Collaborators',
      year: '2025',
      url: '#',
    },
    {
      title: 'AI-Driven Scientific Discovery: Methods and Applications',
      journal: 'Journal of Machine Learning Research',
      authors: 'M. K. Neupane, Research Team',
      year: '2025',
      url: '#',
    }
  ];
  
  return (
    <section id="publications" className="section bg-secondary/30">
      <SectionTitle 
        title="Publications" 
        subtitle="Research contributions to physics, AI, and computational science."
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
