import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import BlogPostCard from '@/components/BlogPostCard';
import GlowingBalls from '@/components/GlowingBalls';

// Import blog post data from the new data file
import { blogPosts } from '@/data/blogPosts';

// Sample blog post data - REMOVED

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GlowingBalls />
      <main className="flex-grow pt-20 md:pt-24 relative z-10">
        <div className="container max-w-7xl mx-auto px-6 py-12">
          <SectionTitle 
            title="Blog" 
            subtitle="Thoughts, insights, and discussions on physics, philosophy, AI and technology."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogPostCard 
                key={post.id} 
                post={post} 
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
