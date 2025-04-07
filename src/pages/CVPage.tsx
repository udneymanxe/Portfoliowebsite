import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CVSection from '@/components/CVSection';
import GlowingBalls from '@/components/GlowingBalls';

const CVPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GlowingBalls />
      <main className="flex-grow pt-20 md:pt-24 relative z-10">
        <CVSection />
      </main>
      <Footer />
    </div>
  );
};

export default CVPage; 