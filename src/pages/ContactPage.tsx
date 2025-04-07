import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/sections/ContactSection';
import GlowingBalls from '@/components/GlowingBalls';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GlowingBalls />
      <main className="flex-grow pt-20 md:pt-24 relative z-10">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage; 