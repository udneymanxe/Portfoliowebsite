import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import BlogPostCard from './BlogPostCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Import blog post data from the new data file
import { blogPosts } from '@/data/blogPosts';

// Sample blog post data - REMOVED

// Define props interface
interface BlogSectionProps {
  isSummary?: boolean;
}

const BlogSection: React.FC<BlogSectionProps> = ({ isSummary = false }) => {
  
  // Show the latest post in summary mode, or all posts otherwise
  const postsToShow = isSummary 
    ? [...blogPosts].reverse().slice(0, 1) // Reverse a copy, then take the first (latest)
    : blogPosts;

  return (
    <section id="blog" className={`section ${isSummary ? 'py-16 bg-secondary/30' : ''}`}>
      <SectionTitle 
        title="From the Blog" 
        subtitle={isSummary ? "Latest thoughts and insights." : "Thoughts, insights, and discussions on AI, physics, and technology."}
        alignment='center'
      />
      
      <div className={`grid grid-cols-1 ${isSummary ? 'md:grid-cols-1 max-w-2xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
        {postsToShow.map((post, index) => (
          <BlogPostCard 
            key={post.id}
            post={post}
            index={index}
            isSummaryView={isSummary}
          />
        ))}
      </div>
      
      {isSummary && (
      <div className="mt-12 text-center">
           <Button asChild>
             <Link to="/blog">
               Visit the Blog <ArrowRight className="ml-2 h-4 w-4" />
             </Link>
           </Button>
      </div>
      )}
    </section>
  );
};

export default BlogSection;
