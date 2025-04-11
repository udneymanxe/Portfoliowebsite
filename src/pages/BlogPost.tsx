import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import GlowingBalls from '@/components/GlowingBalls';

// Import blog post data from the new data file
import { blogPosts } from '@/data/blogPosts';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(post => post.id === id);
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <GlowingBalls />
        <main className="flex-grow pt-20 md:pt-24 relative z-10">
        <div className="container max-w-4xl mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog" className="btn-secondary inline-flex">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GlowingBalls />
      <main className="flex-grow pt-20 md:pt-24 relative z-10">
        <div className="container max-w-4xl mx-auto px-6 py-12">
          <div className="mb-8">
            <Link to="/blog" className="text-primary inline-flex items-center hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Posts
            </Link>
          </div>
          
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t">
              <div className="flex flex-wrap gap-2 items-center">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
