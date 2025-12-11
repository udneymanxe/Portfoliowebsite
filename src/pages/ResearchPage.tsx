import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import { ExternalLink, Award, BookOpen, Users, Calendar, Quote, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ResearchPage: React.FC = () => {
  const researchPapers = [
    {
      id: 1,
      title: "Study on the Molecular Dynamics of 2‑(4-Fluorophenyl)-6-methyl-4-(3-(trifluoromethyl)phenyl)-1,2-dihydrodipyrazolo[3,4-b:3′,4′‑d]pyridin-3(6H)‑one for Cancer Immunotherapy Using a DFT Model",
      authors: [
        { name: "Mahesh Kumar Neupane", affiliation: "St. Xavier's College", highlight: true, isFirst: true },
        { name: "Bijay Sijapati Magar", affiliation: "St. Xavier's College", corresponding: true },
        { name: "Basanta Gurung", affiliation: "St. Xavier's College" },
        { name: "Rupak Raj Lamichhane", affiliation: "St. Xavier's College" },
        { name: "Prakash Pandey", affiliation: "Research Collaborator" }
      ],
      journal: "ACS Omega",
      volume: "10",
      articleNumber: "59359−59378",
      year: "2025",
      published: "November 26, 2025",
      doi: "https://doi.org/10.1021/acsomega.5c05359",
      url: "https://pubs.acs.org/doi/10.1021/acsomega.5c05359",
      abstract: "Small-molecule inhibitors targeting the B7−CD28 pathway represent a promising strategy for cancer immunotherapy. This study presents a comprehensive in silico characterization of 2-(4-fluorophenyl)-6-methyl-4-(3-(trifluoromethyl)-phenyl)-1,2-dihydropyrazolo[3,4-b:3′,4′-d]-pyridin-3(6H)-one to evaluate its potential as a dual-target inhibitor within the B7-CD28 pathway. Using density functional theory (DFT) at the B3LYP/6-311G(d) level, the molecule’s structural and electronic properties were thoroughly characterized. Simulated spectroscopic profiles (FT-IR, Raman, and UV−Vis) were generated, with vibrational modes validated through potential energy distribution (PED) analysis. Electronic characterization—including the HOMO−LUMO energy gap, density of states (DOS), and topological descriptors such as the electron localization function (ELF), localized orbital locator (LOL), and reduced density gradient (RDG)—highlighted features governing the molecule’s reactivity and stability. Natural bond orbital (NBO) analysis quantified key hyperconjugative interactions (E(2)) contributing to intramolecular stability, while local reactivity was further examined using Fukui functions. The 1H and 13C NMR chemical shifts were predicted via the gauge-independent atomic orbital (GIAO) method. Molecular docking with AutoDock Vina revealed strong binding affinities toward CD80 (−7.54 kcal·mol⁻¹) and CTLA-4 (−7.97 kcal·mol⁻¹), suggesting effective inhibition of the B7−CD28/CTLA-4 signaling axis. Additionally, in silico ADMET analysis indicated favorable pharmacokinetic and absorption properties, supporting the compound’s potential as a promising immunotherapeutic candidate.",
      keywords: ["DFT", "B7-CD28", "Cancer Immunotherapy", "Molecular Docking", "ADMET", "FT-IR", "Raman", "NBO", "HOMO-LUMO", "AutoDock Vina"],
      subjects: ["Biophysics", "Computational Chemistry", "Drug Discovery", "Cancer Immunotherapy"],
      significance: "This research demonstrates the potential of a small-molecule inhibitor to effectively target the B7−CD28/CTLA-4 signaling axis for cancer immunotherapy. The strong binding affinities and favorable ADMET properties position this compound as a promising immunotherapeutic candidate, offering advantages over antibody-based therapies including lower production costs and improved bioavailability.",
      methodology: [
        "Density Functional Theory (DFT) at B3LYP/6-311G(d) level",
        "Spectroscopic analysis (FT-IR, Raman, UV-Vis)",
        "Natural Bond Orbital (NBO) analysis",
        "HOMO-LUMO energy gap and DOS analysis",
        "Topological analysis (ELF, LOL, RDG)",
        "Molecular docking with AutoDock Vina",
        "In silico ADMET analysis"
      ],
      isFirstAuthor: true
    },
    {
      id: 2,
      title: "Theoretical investigation on PD-L1-In-1 for cancer immunotherapy via density functional theory",
      authors: [
        { name: "Bijay Sijapati Magar", affiliation: "St. Xavier's College" },
        { name: "Kiran Pudasainee", affiliation: "St. Xavier's College" },
        { name: "Prakash Pandey", affiliation: "Research Collaborator" },
        { name: "Mahesh Kumar Neupane", affiliation: "St. Xavier's College", highlight: true },
        { name: "Rupak Raj Lamichhane", affiliation: "St. Xavier's College" },
        { name: "Basanta Gurung", affiliation: "St. Xavier's College" },
        { name: "Khagendra Tripathi", affiliation: "St. Xavier's College" },
        { name: "Binod Adhikari", affiliation: "St. Xavier's College" }
      ],
      journal: "Scientific Reports (Nature)",
      volume: "15",
      articleNumber: "30476",
      year: "2025",
      published: "20 August 2025",
      doi: "https://doi.org/10.1038/s41598-025-92180-9",
      url: "https://www.nature.com/articles/s41598-025-92180-9",
      abstract: "This study presents a comprehensive theoretical analysis of PD-L1-In-1 (C21H23N5O2) using the B3LYP functional with the 6-311G(d) basis set, focusing on its structural, electronic, and spectroscopic properties. Fourier Transform Infrared (FT-IR), Raman, and UV–Vis spectra were simulated, and vibrational modes were assigned via potential energy distribution (PED) analysis using the VEDA 4 program. Natural Bond Orbital (NBO) analysis revealed hyperconjugative interactions (E2) and provided insights into donor–acceptor electron densities. The energy band gap was obtained from HOMO–LUMO calculations and further analyzed through the density of states (DOS) spectrum. Electron Localization Function (ELF) and Localized Orbital Locator (LOL) analyses, performed using Multiwfn, highlighted regions of electron localization and orbital overlap. Reduced Density Gradient (RDG) analysis uncovered non-covalent interactions. Ground-state 1H and 13C NMR chemical shifts were predicted using the Gauge-Independent Atomic Orbital (GIAO) method. Fukui function analysis identified reactive sites and evaluated the chemical reactivity of the molecule. Molecular docking studies using AutoDock Vina explored interactions between PD-L1-In-1 and the PD-L1 checkpoint protein, shedding light on its potential biological activity. Notably, the simulations indicated strong ligand–protein interactions, positioning PD-L1-In-1 as a promising candidate for cancer immunotherapy targeting the PD-1/PD-L1 pathway.",
      keywords: ["DFT", "PD-L1", "PD-1", "Immunotherapy", "Molecular docking", "FT-IR", "Raman", "RDG", "ELF", "LOL", "PED assignment", "Multiwfn", "VEDA", "Gaussian", "AutoDock"],
      subjects: ["Biochemistry", "Biophysics", "Cancer", "Chemistry", "Drug discovery", "Materials science", "Physics"],
      significance: "This research contributes to the understanding of PD-L1-In-1 as a potential cancer immunotherapy agent, providing theoretical insights that may guide future experimental research and drug development targeting the PD-1/PD-L1 pathway.",
      methodology: [
        "Density Functional Theory (DFT) calculations using B3LYP/6-311G(d)",
        "Molecular geometry optimization using Gaussian 09W",
        "Spectroscopic analysis (FT-IR, Raman, UV-Vis)",
        "Natural Bond Orbital (NBO) analysis",
        "Molecular docking studies with AutoDock Vina",
        "Electronic structure analysis using Multiwfn"
      ],
      isFirstAuthor: false
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="container max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4 mr-2" />
                Published Research
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Research Papers
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Peer-reviewed publications in computational chemistry and physics
              </p>
            </div>
          </div>
        </section>

        {/* Research Papers Section */}
        <section className="pb-20">
          <div className="container max-w-4xl mx-auto px-6">
            {researchPapers.map((paper) => (
              <article key={paper.id} className={`bg-card border ${paper.isFirstAuthor ? 'border-primary/50 shadow-md' : 'border-border'} rounded-2xl p-8 mb-12 hover:shadow-lg transition-all duration-300`}>
                {/* Paper Header */}
                <header className="mb-8">
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <Award className="w-3 h-3 mr-1" />
                      {paper.journal}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {paper.published}
                    </Badge>
                    {paper.isFirstAuthor && (
                      <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        First Author
                      </Badge>
                    )}
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                    {paper.title}
                  </h2>
                  
                  {/* Authors */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                      Authors
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {paper.authors.map((author, index) => (
                        <span key={index} className={`text-sm ${author.highlight ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
                          {author.name}{index < paper.authors.length - 1 && ','}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Journal Info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 flex-wrap">
                    <span className="font-medium">{paper.journal}</span>
                    <span>•</span>
                    <span>Volume {paper.volume}</span>
                    <span>•</span>
                    <span>Article {paper.articleNumber}</span>
                    <span>•</span>
                    <span>{paper.year}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button asChild className="bg-primary hover:bg-primary/90">
                      <a href={paper.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Read Full Paper
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href={paper.doi} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        DOI
                      </a>
                    </Button>
                  </div>
                </header>

                {/* Abstract */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Quote className="w-5 h-5 mr-2 text-primary" />
                    Abstract
                  </h3>
                  <div className="bg-primary/5 border-l-4 border-primary/30 p-4 rounded-r-lg">
                    <p className="text-muted-foreground leading-relaxed">
                      {paper.abstract}
                    </p>
                  </div>
                </div>

                {/* Research Significance */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Research Significance
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {paper.significance}
                  </p>
                </div>

                {/* Methodology */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Key Methodologies
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {paper.methodology.map((method, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{method}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keywords */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {paper.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="bg-muted text-muted-foreground text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Research Subjects */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Research Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {paper.subjects.map((subject, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </article>
            ))}

            {/* More Research Coming Soon */}
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
                <span className="text-sm">More research publications coming soon</span>
                <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ResearchPage;
