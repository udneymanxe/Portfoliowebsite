import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'CV', 'Projects', 'Research', 'Certifications', 'Blog', 'Extracurricular', 'Contact'];

  const getNavItemHref = (item: string) => {
    const lowercaseItem = item.toLowerCase();
    if (item === 'Home') return '/';
    if (item === 'About') return '/about';
    if (item === 'Projects') return '/projects';
    if (item === 'Research') return '/research';
    if (item === 'Certifications') return '/certifications';
    if (item === 'CV') return '/cv';
    if (item === 'Blog') return '/blog';
    if (item === 'Extracurricular') return '/extracurricular';
    if (item === 'Contact') return '/contact';
    return `/${lowercaseItem}`;
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled 
          ? 'py-3 backdrop-blur-sm bg-black/20' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-foreground font-display font-bold text-xl tracking-tight interactive">
          NEUPANE<span className="text-primary">Portfolio</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item} 
              to={getNavItemHref(item)}
              className="text-foreground/80 hover:text-primary transition-colors duration-300 relative text-sm font-medium interactive overflow-hidden group"
            >
              <span className="relative z-10">{item}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          ))}
        </nav>
        
        <button 
          className="md:hidden interactive"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full py-4 bg-black/95 backdrop-blur-md animate-fade-in border-t border-primary/20 shadow-lg">
          <nav className="flex flex-col items-center gap-4 py-6">
            {navItems.map((item) => (
              <Link 
                key={item} 
                to={getNavItemHref(item)}
                className="text-foreground/90 hover:text-primary active:text-primary/80 transition-colors duration-200 font-medium py-3 px-6 text-base rounded-lg hover:bg-primary/10 active:bg-primary/20 min-w-[120px] text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
