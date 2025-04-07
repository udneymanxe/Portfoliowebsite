import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutSection from '@/components/sections/AboutSection';
import GlowingBalls from '@/components/GlowingBalls';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GlowingBalls />
      <main className="flex-grow pt-20 md:pt-24 relative z-10">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage; 