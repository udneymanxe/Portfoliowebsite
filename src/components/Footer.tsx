import React from 'react';
import { Linkedin, Mail, Phone, Github, Youtube, Network } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {

  // Helper function to get the correct path for quick links
  const getQuickLinkPath = (item: string): string => {
    const lowerItem = item.toLowerCase();
    switch (lowerItem) {
      case 'home': return '/';
      case 'about': return '/about';
      case 'research': return '/cv#experience'; // Link to Experience section ID
      case 'skills': return '/cv#skills'; // Link to Skills section ID
      case 'publications': return '/cv#experience'; // Link to Experience section ID (contains research)
      case 'contact': return '/contact';
      default: return '/'; // Default fallback to home
    }
  };

  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-xl font-display font-bold mb-4">
            NEUPANE<span className="text-primary">Portfolio</span>
          </h2>
          <p className="text-muted-foreground max-w-md">
            Exploring the physics of healing through innovative research, dedicated practice, and continuous learning.
          </p>
          <div className="flex mt-6 space-x-4">
            <a 
              href="https://www.linkedin.com/in/mahesh-kumar-neupane-54a58618a/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-icon text-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="mailto:maheshkneupane90@gmail.com" 
              className="btn-icon text-foreground hover:text-primary transition-colors"
              aria-label="Send Email"
            >
              <Mail size={18} />
            </a>
            <a 
              href="tel:+9779863354076" 
              className="btn-icon text-foreground hover:text-primary transition-colors"
              aria-label="Call Phone"
            >
              <Phone size={18} />
            </a>
            <a 
              href="https://github.com/udneymanxe" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-icon text-foreground hover:text-primary transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://www.youtube.com/@neupai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-icon text-foreground hover:text-primary transition-colors"
              aria-label="YouTube Channel"
            >
              <Youtube size={18} />
            </a>
            <a 
              href="https://x.com/Udneymanxe" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-icon text-foreground hover:text-primary transition-colors"
              aria-label="X/Twitter Profile"
            >
              <Network size={18} />
            </a>
            <a 
              href="https://www.tiktok.com/@neupane.life" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-icon text-foreground hover:text-primary transition-colors"
              aria-label="TikTok Profile"
            >
              <span title="TikTok">Ti</span>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {['Home', 'About', 'Research', 'Skills', 'Publications', 'Contact'].map((item) => (
              <li key={item}>
                <Link 
                  to={getQuickLinkPath(item)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} NEUPANE Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
