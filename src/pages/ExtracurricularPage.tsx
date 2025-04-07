import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExtracurricularSection from '@/components/sections/ExtracurricularSection';
import GlowingBalls from '@/components/GlowingBalls';

const ExtracurricularPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GlowingBalls />
      <main className="flex-grow pt-20 md:pt-24 relative z-10">
        <ExtracurricularSection />
      </main>
      <Footer />
    </div>
  );
};

export default ExtracurricularPage; 