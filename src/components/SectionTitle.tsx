
import React, { useEffect, useRef } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  alignment = 'center' 
}) => {
  const titleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);
  
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto'
  };
  
  return (
    <div 
      ref={titleRef} 
      className={`mb-16 ${alignmentClasses[alignment]} opacity-0 translate-y-4 transition-all duration-700 ease-out`}
    >
      <h2 className={`text-3xl md:text-4xl font-bold reveal-title ${subtitle ? 'mb-3' : 'mb-0'}`}>
        <span className="title-underline pb-2">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mt-4 reveal-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
