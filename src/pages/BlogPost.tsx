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
          
          {/* Two-column layout for image and content */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            {/* Image Column (Right side on md+) */}
            {post.image && (
              <div className="md:w-1/3 lg:w-2/5 order-first md:order-last">
                <div className="sticky top-24 rounded-lg overflow-hidden shadow-lg border border-border/50">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}

            {/* Content Column (Left side on md+) */}
            <div className={`flex-1 ${post.image ? 'md:w-2/3 lg:w-3/5' : 'w-full'}`}> {/* Takes full width if no image */} 
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{post.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6 border-b pb-4">
                 {/* Metadata: Date, Author, Category */}
                 <span className="flex items-center"><Calendar className="h-4 w-4 mr-1.5" /> {post.date}</span>
                 {post.author && <span>by {post.author}</span>}
                 <span className="flex items-center"><Tag className="h-4 w-4 mr-1.5" /> {post.category}</span>
               </div>
    
              <div className="prose prose-lg max-w-none prose-invert" dangerouslySetInnerHTML={{ __html: post.content }}></div>
              
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
