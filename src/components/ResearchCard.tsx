
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ResearchCardProps {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  index: number;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ 
  title, 
  description, 
  image = '/placeholder.svg', 
  tags = [],
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Calculate animation delay based on index
  const delay = 100 + (index * 150);

  useEffect(() => {
    if (!cardRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(cardRef.current);
    
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-2xl glass transition-all duration-500",
        "opacity-0 translate-y-8",
        "md:hover:scale-[1.02] md:active:scale-[0.98]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <h3 className="text-xl font-semibold mb-2 reveal-title">{title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3 reveal-text">
          {description}
        </p>
        
        <div className="mt-4 flex justify-end">
          <button className="btn-secondary text-sm py-2 px-4">
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResearchCard;
