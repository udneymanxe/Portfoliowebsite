import React from "react";
import Navbar from "@/components/Navbar";

const FlipkartePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navbar />
      <main className="pt-20">
        <iframe
          title="Karte Flashcards"
          src="/karte.html"
          className="h-[calc(100dvh-5rem)] w-full border-0"
        />
      </main>
    </div>
  );
};

export default FlipkartePage;
