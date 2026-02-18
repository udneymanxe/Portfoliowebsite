import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import { Badge } from '@/components/ui/badge';
import { Download, ExternalLink, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Certification {
  id: number | string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
  fileUrl?: string;
  pdfDownloadName?: string;
  imageUrl?: string;
}

const certifications: Certification[] = [
  {
    id: 1, 
    name: "Supervised Machine Learning: Regression and Classification", 
    issuer: "DeepLearning.AI / Stanford University", 
    date: "April 21, 2025",
    link: "https://www.coursera.org/account/accomplishments/verify/K73UH3G7AUF1", 
    fileUrl: "/ML1.pdf",
    pdfDownloadName: "ML_Certificate_MaheshKNeupane.pdf",
    imageUrl: "/ML1.jpeg"
  }
];

const CertificationsPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth) * 100,
        y: (clientY / innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cert-header > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });

      gsap.from('.cert-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.cert-grid',
          start: 'top 85%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(var(--primary-rgb), 0.08) 0%, 
                rgba(var(--primary-rgb), 0.02) 40%, 
                transparent 70%),
              linear-gradient(to bottom, hsl(var(--background)), hsl(var(--background) / 0.98))`
          }}
        />
        {/* Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-primary/10 rotate-45 animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `translate(${mousePosition.x * 0.02 * (i % 2 === 0 ? 1 : -1)}px, ${mousePosition.y * 0.02 * (i % 2 === 0 ? 1 : -1)}px)`
            }}
          />
        ))}
      </div>

      <main ref={containerRef} className="flex-grow pt-32 pb-20 relative z-10">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="cert-header text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20 backdrop-blur-sm">
              <Award className="w-4 h-4 mr-2" />
              <span>Professional Credentials</span>
            </div>
            <SectionTitle 
              title="Certifications & Courses" 
              subtitle="Continuous learning and professional development in Physics, AI, and Data Science."
              alignment='center'
            />
          </div>

          <div className="cert-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.length > 0 ? (
              certifications.map((cert) => (
                <div 
                  key={cert.id} 
                  className="cert-card group relative bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 flex flex-col"
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Image/Thumbnail */}
                  <div className="relative h-48 bg-muted/30 overflow-hidden border-b border-border/50">
                    {cert.imageUrl ? (
                      <>
                        <img 
                          src={cert.imageUrl} 
                          alt={`${cert.name} Certificate`} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/5">
                        <Award className="w-16 h-16 text-primary/20" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <div className="bg-background/80 backdrop-blur-sm text-primary p-2 rounded-full shadow-sm border border-primary/10">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <Badge variant="outline" className="mb-3 border-primary/20 text-primary/80">
                        {cert.date}
                      </Badge>
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">
                        Issued by {cert.issuer}
                      </p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-border/50 flex gap-3">
                      {cert.link && (
                        <Button asChild variant="default" size="sm" className="flex-1 bg-primary hover:bg-primary/90 shadow-sm">
                          <a href={cert.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3.5 h-3.5 mr-2" />
                            Verify
                          </a>
                        </Button>
                      )}
                      {cert.fileUrl && (
                        <Button asChild variant="outline" size="sm" className="flex-1 border-primary/20 hover:bg-primary/5">
                          <a href={cert.fileUrl} download={cert.pdfDownloadName}>
                            <Download className="w-3.5 h-3.5 mr-2" />
                            PDF
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No certifications added yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CertificationsPage;
