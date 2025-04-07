import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import GlowingBalls from '@/components/GlowingBalls';

// Sample blog post data - this would normally come from an API or CMS
const blogPosts = [
  {
    id: "1",
    title: 'Advances in Proton Therapy Treatment Planning',
    content: `
      <p>Proton therapy has emerged as a powerful tool in radiation oncology, offering unique advantages over conventional photon-based therapies. The precision of proton beams allows for superior dose distribution, enhancing tumor coverage while minimizing damage to surrounding healthy tissues. This is particularly valuable when treating tumors in proximity to critical structures.</p>
      
      <h2>Recent Innovations in Treatment Planning</h2>
      
      <p>The field of proton therapy treatment planning has seen remarkable advancements in recent years. Traditionally, treatment planning for proton therapy has been computationally intensive and time-consuming, limiting its widespread adoption. However, several innovations are changing this landscape:</p>
      
      <h3>Machine Learning Approaches</h3>
      
      <p>Artificial intelligence and machine learning algorithms are revolutionizing the efficiency and accuracy of treatment planning. Deep learning models can now predict dose distributions with remarkable speed and precision, reducing the need for time-consuming Monte Carlo simulations in many cases.</p>
      
      <p>These models are trained on vast datasets of previous treatment plans and can account for complex tissue heterogeneities that affect proton range and dose deposition. The result is faster plan generation without sacrificing accuracy.</p>
      
      <h3>GPU-Accelerated Monte Carlo Simulations</h3>
      
      <p>When the highest accuracy is required, Monte Carlo simulations remain the gold standard for modeling proton interactions in tissue. Recent developments in GPU-accelerated Monte Carlo codes have dramatically reduced computation times from hours to minutes, making comprehensive simulation-based planning more feasible in clinical settings.</p>
      
      <h3>Robust Optimization Techniques</h3>
      
      <p>Uncertainties in patient setup and proton range can significantly impact treatment efficacy. Modern treatment planning systems now incorporate robust optimization algorithms that create plans resilient to these uncertainties. By simulating multiple scenarios and optimizing across them, these systems produce plans that maintain target coverage despite potential variations in daily treatment conditions.</p>
      
      <h2>Clinical Impact</h2>
      
      <p>These technological advancements have substantial clinical implications. Reduced planning times allow for more patients to benefit from proton therapy. Greater plan robustness improves treatment reliability, while enhanced accuracy enables dose escalation strategies that may improve tumor control rates.</p>
      
      <p>As these technologies continue to evolve, we can expect further democratization of proton therapy, making this valuable treatment modality accessible to more patients worldwide.</p>
    `,
    date: 'June 15, 2023',
    author: 'Your Name',
    category: 'Radiation Therapy',
    tags: ['Proton Therapy', 'Treatment Planning', 'Medical Physics', 'Radiation Oncology'],
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
  },
  {
    id: "2",
    title: 'The Future of AI in Medical Image Analysis',
    content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,
    date: 'May 2, 2023',
    author: 'Your Name',
    category: 'Medical Imaging',
    tags: ['Artificial Intelligence', 'Medical Imaging', 'Radiology'],
    image: 'https://images.unsplash.com/photo-1585380291499-2198dd047b0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
  },
];

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
