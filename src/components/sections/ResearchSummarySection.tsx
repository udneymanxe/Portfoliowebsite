import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

// TODO: Define Research type and fetch/import actual research data
interface Research {
  id: number | string;
  title: string;
  journal?: string; // Optional journal/conference
  year?: number; // Optional year
}

const ResearchSummarySection: React.FC = () => {
  // Placeholder research papers
  const researchItems: Research[] = [
    { id: 1, title: "Exploring Quantum Effects in...", journal: "Journal of Physics A", year: 2024 },
    { id: 2, title: "AI Applications in Medical Imaging Analysis", journal: "Nature Communications", year: 2023 },
    { id: 3, title: "Development of a Novel Particle Detector", journal: "IEEE Transactions", year: 2023 },
  ];

  return (
    <section id="research-summary" className="section">
      <SectionTitle title="Recent Research" subtitle="Latest publications and findings" alignment='center' />
      
      <div className="container max-w-5xl mx-auto">
        <div className="space-y-6 mb-12">
          {researchItems.map((item) => (
            <div key={item.id} className="glass p-6 rounded-lg flex items-start gap-4 transition-all duration-300 hover:shadow-primary/20 hover:border-primary/30 border border-transparent">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                <FileText className="text-primary h-4 w-4" />
              </div>
              <div className="flex-grow">
                <h3 className="text-md font-semibold mb-1">{item.title}</h3>
                {item.journal && (
                  <p className="text-sm text-muted-foreground">
                    {item.journal}{item.year ? `, ${item.year}` : ''}
                  </p>
                )}
                {/* Optional: Link to abstract or full paper */}
                {/* <a href="#" target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline mt-2 inline-block">View Abstract</a> */}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild>
            <Link to="/research">
              View All Research <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResearchSummarySection; 