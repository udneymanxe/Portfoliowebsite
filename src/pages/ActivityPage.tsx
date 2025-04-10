import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlowingBalls from '@/components/GlowingBalls';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import the activities data from the new data file
import { activities } from '@/data/activities';

const ActivityPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the activity by ID (convert id from string to number)
  const activityId = id ? parseInt(id, 10) : undefined;
  const activity = activityId !== undefined 
    ? activities.find(act => act.id === activityId) 
    : undefined;

  if (!activity) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <GlowingBalls />
        <main className="flex-grow pt-20 md:pt-24 relative z-10 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Activity not found</h1>
            <p className="mb-6">The activity you're looking for doesn't exist.</p>
            <Button asChild variant="secondary">
               <Link to="/extracurricular">
                 <ArrowLeft className="mr-2 h-4 w-4" />
                 Back to Activities
               </Link>
            </Button>
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
          {/* Back Button */}
          <div className="mb-8">
             <Button asChild variant="outline" size="sm">
               <Link to="/extracurricular">
                 <ArrowLeft className="mr-2 h-4 w-4" />
                 Back to Activities
               </Link>
            </Button>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{activity.title}</h1>
          <p className="text-muted-foreground mb-8">{activity.date} | Category: {activity.category}</p>
          
          {/* Detailed Description */}
          <div className="prose prose-invert lg:prose-lg mb-12">
             {activity.detailedDescription ? (
                <p>{activity.detailedDescription}</p>
             ) : (
                <p>{activity.description} (No further details provided)</p>
             )}
          </div>

          {/* Image Gallery */}
          {activity.images && activity.images.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {activity.images.map((imgUrl, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-md">
                    <img 
                       src={imgUrl.startsWith('http') 
                            ? imgUrl // Use directly if it's an external URL
                            : `${imgUrl}` // Use local URL directly
                       } 
                       alt={`${activity.title} - Image ${index + 1}`} 
                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Player */}
          {activity.videoUrl && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Video</h2>
              <div className="aspect-video overflow-hidden rounded-lg shadow-md bg-black">
                <video 
                   controls 
                   className="w-full h-full"
                   src={activity.videoUrl} 
                   aria-label={`${activity.title} - Video`}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}

          {/* Optional Link */}
          {activity.link && (
             <Button asChild variant="link" className="px-0">
                <a href={activity.link} target="_blank" rel="noopener noreferrer">
                   Visit Link <ArrowRight className="ml-2 h-4 w-4" />
                </a>
             </Button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ActivityPage; 