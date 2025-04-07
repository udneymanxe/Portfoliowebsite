import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import BlogPostCard from '@/components/BlogPostCard';
import GlowingBalls from '@/components/GlowingBalls';

// Sample blog post data - this would normally come from an API or CMS
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
  },
  {
    id: 4,
    title: 'Quality Assurance in Radiation Oncology: Best Practices',
    excerpt: 'A comprehensive guide to implementing effective quality assurance protocols in radiation oncology departments.',
    date: 'February 5, 2023',
    category: 'Radiation Therapy',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
  },
  {
    id: 5,
    title: 'Understanding PET/MRI Hybrid Imaging',
    excerpt: 'An exploration of the technical challenges and clinical benefits of combined PET and MRI imaging systems.',
    date: 'January 12, 2023',
    category: 'Medical Imaging',
    image: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
  },
  {
    id: 6,
    title: 'Career Paths in Medical Physics: Beyond Clinical Work',
    excerpt: 'Exploring the diverse career opportunities available to medical physicists outside of traditional clinical roles.',
    date: 'December 8, 2022',
    category: 'Career',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
  }
];

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GlowingBalls />
      <main className="flex-grow pt-20 md:pt-24 relative z-10">
        <div className="container max-w-7xl mx-auto px-6 py-12">
          <SectionTitle 
            title="Blog" 
            subtitle="Thoughts, insights, and discussions on medical physics and beyond."
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
