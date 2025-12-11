import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ExternalLink, Award, BookOpen, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ResearchPaper {
  id: number | string;
  title: string;
  description: string;
  longDescription: string;
  website: string;
  achievements: Array<{
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
  }>;
  methods: string[];
  journal: string;
  status: string;
  year: string;
}

const ResearchSummarySection: React.FC = () => {
  const featuredResearch: ResearchPaper[] = [
    {
      id: 1,
      title: "Molecular Dynamics Study for Cancer Immunotherapy",
      description: "DFT study of a dual-target small molecule inhibitor for cancer immunotherapy targeting the B7-CD28/CTLA-4 signaling axis.",
      longDescription: "Comprehensive in silico characterization of a novel small molecule inhibitor using DFT at B3LYP/6-311G(d) level. The study revealed strong binding affinities toward CD80 (−7.54 kcal·mol⁻¹) and CTLA-4 (−7.97 kcal·mol⁻¹), with favorable ADMET properties for immunotherapy application.",
      website: "https://pubs.acs.org/doi/10.1021/acsomega.5c05359",
      achievements: [
        {
          title: "Published in ACS Omega",
          subtitle: "First Author",
          icon: Award
        },
        {
          title: "Dual-Target Inhibitor",
          subtitle: "Cancer Immunotherapy",
          icon: BookOpen
        }
      ],
      methods: ["Density Functional Theory", "Molecular Dynamics", "Molecular Docking", "ADMET Analysis", "AutoDock Vina"],
      journal: "ACS Omega",
      status: "Published",
      year: "2025"
    }
  ];

  return (
    <section id="research-summary" className="section py-20 bg-muted/30">
      <div className="container max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Featured Research
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Recent Research
          </h2>
          <p className="text-lg text-muted-foreground">
            Published work in computational chemistry and physics
          </p>
        </div>

        {/* Featured Research */}
        <div className="mb-12">
          {featuredResearch.map((paper, index) => (
            <article key={paper.id} className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              {/* Paper Header */}
              <header className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-foreground">{paper.title}</h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    {paper.year}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {paper.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {paper.journal}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {paper.longDescription}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                    <a href={paper.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Read Paper
                    </a>
                  </Button>
                </div>
              </header>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                  Publication Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {paper.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10 rounded-lg">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <achievement.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Methods & Tools */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                  Methods & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {paper.methods.map((method, methodIndex) => (
                    <Badge key={methodIndex} variant="secondary" className="bg-muted text-muted-foreground text-xs">
                      {method}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* View All Research CTA */}
        <div className="text-center">
          <Button asChild variant="outline" className="group">
            <Link to="/research" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              View All Research
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResearchSummarySection;