import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomCursor from "./components/CustomCursor";
import { setupSmoothScrolling } from "./utils/smoothScroll";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import CVPage from "./pages/CVPage";
import ExtracurricularPage from "./pages/ExtracurricularPage";
import ContactPage from "./pages/ContactPage";
import ActivityPage from "./pages/ActivityPage";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Setup smooth scrolling when the app loads
    setupSmoothScrolling();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <CustomCursor />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cv" element={<CVPage />} />
            <Route path="/extracurricular" element={<ExtracurricularPage />} />
            <Route path="/extracurricular/:id" element={<ActivityPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
