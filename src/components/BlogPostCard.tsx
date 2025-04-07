import React, { useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
  isSummaryView?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, index, isSummaryView = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isSummaryView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isSummaryView]);
  
  return (
    <div 
      ref={cardRef} 
      className={`group glass rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-2 opacity-0 -translate-y-4 transition-all duration-700 ease-out`}
      style={{ transitionDelay: `${index * 100 + 100}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full z-20">
          {post.category}
        </span>
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center text-muted-foreground text-xs">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{post.date}</span>
        </div>
      </div>
      
      <a 
        href={`/blog/${post.id}`} 
        className="absolute inset-0 z-20" 
        aria-label={`Read more about ${post.title}`}
      ></a>
    </div>
  );
};

export default BlogPostCard;
