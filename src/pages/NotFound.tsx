
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
      <div className="glass p-12 rounded-2xl max-w-md mx-auto animate-fade-in">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        <p className="text-xl text-foreground mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-muted-foreground mb-8">
          It seems you've ventured into uncharted territory. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="btn-primary inline-flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
