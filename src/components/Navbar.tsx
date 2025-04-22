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

  const navItems = ['Home', 'About', 'CV', 'Blog', 'Extracurricular', 'Contact'];

  const getNavItemHref = (item: string) => {
    const lowercaseItem = item.toLowerCase();
    if (item === 'Home') return '/';
    if (item === 'About') return '/about';
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
          <span className="text-primary">Neupane</span> Portfolio
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
        <div className="md:hidden absolute top-full left-0 w-full py-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <nav className="flex flex-col items-center gap-6 py-8">
            {navItems.map((item) => (
              <Link 
                key={item} 
                to={getNavItemHref(item)}
                className="text-foreground/90 hover:text-primary transition-colors duration-300 font-medium py-2 text-lg interactive"
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
