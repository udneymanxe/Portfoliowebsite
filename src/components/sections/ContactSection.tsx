import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import ContactForm from '@/components/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';
import PhysicsHero from '@/components/PhysicsHero';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="section relative">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <PhysicsHero />
      </div>
      
      <div className="relative z-10">
        <SectionTitle 
          title="Get in Touch" 
          subtitle="Interested in collaboration or have questions? Let's connect."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glass p-6 rounded-lg flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Mail className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <a 
              href="mailto:maheshkneupane90@gmail.com" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              maheshkneupane90@gmail.com
            </a>
          </div>
          
          <div className="glass p-6 rounded-lg flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Phone className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <a 
              href="tel:+9779863354076" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              +9779863354076
            </a>
          </div>
          
          <div className="glass p-6 rounded-lg flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <MapPin className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <p className="text-muted-foreground">KATHMANDU, NEPAL</p>
          </div>
        </div>
        
        <div className="glass p-8 rounded-xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
