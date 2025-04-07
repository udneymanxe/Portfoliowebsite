import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import BlogPostCard from './BlogPostCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: 'Advances in Proton Therapy Treatment Planning',
    excerpt: 'Exploring recent innovations in treatment planning systems for proton therapy that improve dose accuracy and reduce computational time.',
    date: 'June 15, 2023',
    category: 'Radiation Therapy',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
  },
  {
    id: 2,
    title: 'The Future of AI in Medical Image Analysis',
    excerpt: 'How artificial intelligence is transforming diagnostic radiology and creating new opportunities for precision medicine.',
    date: 'May 2, 2023',
    category: 'Medical Imaging',
    image: 'https://images.unsplash.com/photo-1585380291499-2198dd047b0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
  },
  {
    id: 3,
    title: 'Reflections on My First Year in Medical Physics Research',
    excerpt: 'Personal thoughts on the challenges and rewards of beginning a career in medical physics research, with insights for new graduate students.',
    date: 'March 18, 2023',
    category: 'Personal',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
  }
];

// Define props interface
interface BlogSectionProps {
  isSummary?: boolean;
}

const BlogSection: React.FC<BlogSectionProps> = ({ isSummary = false }) => {
  
  // Optionally show fewer posts in summary mode, e.g., the first one
  const postsToShow = isSummary ? blogPosts.slice(0, 1) : blogPosts;

  return (
    <section id="blog" className={`section ${isSummary ? 'py-16 bg-secondary/30' : ''}`}>
      <SectionTitle 
        title="From the Blog" 
        subtitle={isSummary ? "Latest thoughts and insights." : "Thoughts, insights, and discussions on medical physics and beyond."}
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
