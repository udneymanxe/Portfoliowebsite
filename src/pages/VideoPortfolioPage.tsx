import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlowingBalls from "@/components/GlowingBalls";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { videoPortfolioConfig } from "@/data/videoPortfolio";
import { withModalAutoplay } from "@/lib/embedUrl";

const VideoPortfolioPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");

  const openPlayer = useCallback((embedUrl: string) => {
    setModalSrc(withModalAutoplay(embedUrl));
    setModalOpen(true);
  }, []);

  const handleModalOpenChange = (open: boolean) => {
    setModalOpen(open);
    if (!open) setModalSrc("");
  };

  const cfg = videoPortfolioConfig;

  return (
    <div className="min-h-screen flex flex-col bg-black text-foreground font-sans">
      <Navbar />
      <GlowingBalls />
      <main className="flex-grow relative z-10">
        {/* Hero */}
        <header className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-24 pb-16">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-50"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
            >
              <source src={cfg.heroVideoSrc} type="video/mp4" />
            </video>
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black"
              aria-hidden
            />
          </div>
          <div className="relative z-10 max-w-3xl px-5">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-[0.12em] mb-4">
              {cfg.headline}{" "}
              <span className="text-primary">{cfg.headlineAccent}</span>
            </h1>
            <p className="text-lg sm:text-xl font-light text-muted-foreground mb-8 max-w-xl mx-auto">
              {cfg.tagline}
            </p>
            <a
              href="#portfolio"
              className="inline-block px-9 py-3.5 bg-primary text-primary-foreground font-medium uppercase tracking-wider text-sm rounded transition-transform duration-300 hover:-translate-y-1 hover:brightness-110 interactive"
            >
              View my work
            </a>
          </div>
        </header>

        {/* Showreel */}
        <section className="py-20 md:py-28 px-[5%] text-center border-t border-white/5">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.15em] mb-10">
            Director&apos;s showreel
          </h2>
          <div className="max-w-5xl mx-auto relative aspect-video rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
            <iframe
              title="Showreel"
              src={cfg.showreelEmbedUrl}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>

        {/* Portfolio grid */}
        <section
          id="portfolio"
          className="py-20 md:py-28 px-[5%] text-center border-t border-white/5"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.15em] mb-12">
            Selected works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {cfg.items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openPlayer(item.embedUrl)}
                className="group relative aspect-video rounded-lg overflow-hidden text-left cursor-pointer ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary interactive"
              >
                <img
                  src={item.thumbnailSrc}
                  alt={item.thumbnailAlt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 px-4 text-center">
                  <h3 className="font-display text-xl font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-primary text-xs uppercase tracking-widest">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="py-20 md:py-28 px-[5%] text-center border-t border-white/5"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.15em] mb-4">
            Let&apos;s collaborate
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {cfg.availabilityNote}{" "}
            <Link
              to="/contact"
              className="text-primary underline-offset-4 hover:underline interactive"
            >
              Full contact form
            </Link>
            .
          </p>
          <a
            href={`mailto:${cfg.contactEmail}`}
            className="inline-block px-9 py-3.5 border-2 border-foreground text-foreground font-medium uppercase tracking-wider text-sm rounded transition-colors duration-300 hover:bg-foreground hover:text-black interactive"
          >
            {cfg.contactEmail}
          </a>
        </section>
      </main>
      <Footer />

      <Dialog open={modalOpen} onOpenChange={handleModalOpenChange}>
        <DialogContent className="max-w-[min(1000px,96vw)] w-full p-0 gap-0 border-0 bg-black sm:rounded-lg overflow-hidden [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:z-20">
          <DialogTitle className="sr-only">Project video</DialogTitle>
          <div className="relative aspect-video w-full bg-black">
            {modalSrc ? (
              <iframe
                title="Project playback"
                src={modalSrc}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoPortfolioPage;
