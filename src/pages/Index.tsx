import React, { useEffect, useState } from 'react';

// Import components
import Navbar from '@/components/Navbar';
import GlowingBalls from '@/components/GlowingBalls';
import Footer from '@/components/Footer';

// Import section components
import HeroSection from '@/components/sections/HeroSection';
import SkillsSection from '@/components/sections/SkillsSection';
import PublicationsSection from '@/components/sections/PublicationsSection';
// Re-import sections needed for summaries
import AboutSection from '@/components/sections/AboutSection';
import CVSection from '@/components/CVSection';
import BlogSection from '@/components/BlogSection';
import ExtracurricularSection from '@/components/sections/ExtracurricularSection';
// Import new summary sections
import ProjectsSummarySection from '@/components/sections/ProjectsSummarySection';
import ResearchSummarySection from '@/components/sections/ResearchSummarySection';
// Contact section is usually not summarized on the main page, keeping it separate.

// Import animation utilities
import { initAllTextReveals } from '@/utils/textReveal';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Handle scroll for parallax effect (may need adjustment if sections use it)
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    document.body.classList.add('page-1');
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('page-1');
    };
  }, []);
  
  // Initialize text reveal animations
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      initAllTextReveals();
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-6 w-64" />
          </div>
          <div className="h-screen flex flex-col items-center justify-center space-y-6">
            <Skeleton className="h-16 w-3/4 md:w-1/2" />
            <Skeleton className="h-8 w-2/3 md:w-1/3" />
            <Skeleton className="h-10 w-32 mt-4" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative min-h-screen bg-background animate-fade-in">
      <Navbar />
      {/* <GlowingBalls /> Removed from homepage, HeroSection has its own particle effect */}
      
      <HeroSection />
      {/* Summary Sections */}
      <AboutSection isSummary={true} />
      <SkillsSection /> { /* Keep full skills section */}
      <CVSection isSummary={true} />
      <ProjectsSummarySection /> {/* Add Projects Summary */}
      <ResearchSummarySection /> {/* Add Research Summary */}
      <BlogSection isSummary={true} />
      <ExtracurricularSection isSummary={true} />
      {/* Contact section remains on its dedicated page /contact */}
      
      <Footer />
    </div>
  );
};

export default Index;
