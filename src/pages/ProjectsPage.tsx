import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';

const ProjectsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="section pt-24"> {/* Add padding-top to avoid overlap with fixed Navbar */}
          <SectionTitle title="Projects" subtitle="A selection of my work and experiments" />
          <div className="container max-w-4xl mx-auto">
            {/* Placeholder for project items */}
            <p className="text-center text-muted-foreground">
              Project details will be added here soon.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProjectsPage; 