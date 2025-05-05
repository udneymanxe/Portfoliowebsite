import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';

const ResearchPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="section pt-24"> {/* Add padding-top to avoid overlap with fixed Navbar */}
          <SectionTitle title="Research" subtitle="Explorations and findings in my field" />
          <div className="container max-w-4xl mx-auto">
            {/* Placeholder for research items */}
            <p className="text-center text-muted-foreground">
              Research details and papers will be added here soon.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ResearchPage; 