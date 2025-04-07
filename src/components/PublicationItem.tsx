
import React, { useRef, useEffect } from 'react';

interface PublicationItemProps {
  title: string;
  journal: string;
  authors: string;
  year: string;
  url?: string;
  index: number;
}

const PublicationItem: React.FC<PublicationItemProps> = ({
  title,
  journal,
  authors,
  year,
  url,
  index
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = React.useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-x-0');
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    
    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [index]);
  
  return (
    <div
      ref={itemRef}
      className="glass p-6 rounded-lg mb-4 transition-all duration-500 opacity-0 -translate-x-4 hover:shadow-md"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer">
        <div>
          <h3 className="font-semibold text-lg reveal-text">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 reveal-subtitle">
            {authors}
          </p>
          <div className="flex items-center mt-2 gap-3">
            <span className="text-sm font-medium text-primary">
              {journal}
            </span>
            <span className="text-sm text-muted-foreground">
              {year}
            </span>
          </div>
        </div>
        
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm py-2 px-4 self-start md:self-center"
            onClick={(e) => e.stopPropagation()}
          >
            Read Paper
          </a>
        )}
      </div>
      
      {expanded && (
        <div className="mt-4 pt-4 border-t border-border animate-fade-in">
          <p className="text-sm text-muted-foreground reveal-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
            Praesent eu est non metus faucibus fermentum. Duis ac magna at eros 
            feugiat tristique non eu metus.
          </p>
        </div>
      )}
    </div>
  );
};

export default PublicationItem;
