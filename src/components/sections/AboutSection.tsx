import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '@/components/SectionTitle';
import { Calendar, FileText, Mail, User, ArrowRight, Linkedin, Github, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AboutSectionProps {
  isSummary?: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ isSummary = false }) => {
  const summaryText = "A physics graduate aspiring to contribute to the field of medical physics, particularly exploring the potential of AI applications. Bringing teaching experience and a passion for innovation...";

  const detailedDescription = "I am a physics graduate passionate about the intersection of physics, technology, and healthcare. My goal is to contribute to the field of medical physics, with a particular interest in leveraging Artificial Intelligence to enhance diagnostic and therapeutic techniques. While my direct medical physics experience is developing, I bring two years of valuable experience teaching physics at the secondary level, honing my communication and explanation skills.";
  
  return (
    <section id="about" className={`section ${isSummary ? 'py-16' : ''}`}>
      <SectionTitle 
        title="About Me" 
        subtitle={isSummary ? undefined : "Physics Aspirant | AI Enthusiast | Educator"}
        alignment='center'
      />
      
      {isSummary ? (
        <div className="container max-w-4xl mx-auto text-center">
          <p className="text-lg text-muted-foreground mb-8">
            {summaryText}
          </p>
          
          <div className="flex justify-center space-x-6 mb-8 text-muted-foreground">
            <a href="https://www.linkedin.com/in/mahesh-kumar-neupane-54a58618a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary"><Linkedin size={24} /></a>
            <a href="https://github.com/udneymanxe" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary"><Github size={24} /></a>
            <a href="https://www.youtube.com/@neupai" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-primary"><Youtube size={24} /></a>
            <a href="https://www.tiktok.com/@neupane.life" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-primary"> <span title="TikTok" className="text-2xl font-bold">Ti</span> </a>
          </div>
          
          <Button asChild>
            <Link to="/about">
              Learn More About Me <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="glass rounded-md p-8 animate-slide-in">
            <div className="flex items-center mb-6">
              <div className="relative w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center mr-4">
                <User className="text-primary h-8 w-8" />
                <div className="absolute inset-0 rounded-md border-2 border-primary/30 animate-pulse-slow"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold animate-fade-in-up">Mahesh Kumar Neupane</h3>
                <p className="text-muted-foreground animate-fade-in-up delay-100">Physics and AI Enthusiast | Exploring Science & Technology</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              {detailedDescription}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-3" />
                <div>
                  <h4 className="font-medium">Experience</h4>
                  <p className="text-sm text-muted-foreground">2 years Secondary School Physics Teacher</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-primary mr-3" />
                <div>
                  <h4 className="font-medium">Education</h4>
                  <p className="text-sm text-muted-foreground">B.S. in Physics from St. Xavier's College, Kathmandu (affiliated to Tribhuvan University)</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <div>
                  <h4 className="font-medium">Contact</h4>
                  <p className="text-sm text-muted-foreground">maheshkneupane90@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative h-[600px] rounded-md overflow-hidden animate-scale-in border border-primary/10 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <img 
              src="mkn.jpeg"
              alt="Mahesh Kumar Neupane"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
        </div>
      )}

      {/* New Section: My Roots */} 
      {!isSummary && (
        <div id="kalikot-roots" className="mt-16 pt-12 border-t border-border/50">
           <SectionTitle 
            title="My Roots: Kalikot, Nepal" 
            subtitle="A glimpse into where my journey began."
            alignment='center'
          />
          <div className="max-w-3xl mx-auto text-center text-muted-foreground mb-10">
            <p>Kalikot is a remote mountain district in Nepal. Being from this unique and challenging environment has shaped my perspective and resilience. It's a place of incredible natural beauty and strong community spirit.</p>
          </div>
          
          {/* Video Player */} 
          <div className="mb-12 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">A Glimpse of Kalikot</h3>
            <div className="aspect-video overflow-hidden rounded-lg shadow-lg bg-black border border-border/50">
              <video 
                 controls 
                 className="w-full h-full"
                 src={"/kalikot1.mp4"} // Root-relative path to video in public
                 aria-label={"Video of Kalikot, Nepal"}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Image Gallery Placeholder - Removed */}
          
        </div>
      )}

    </section>
  );
};

export default AboutSection;
