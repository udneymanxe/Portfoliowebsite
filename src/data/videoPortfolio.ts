/** Replace copy as you like; embed URLs must use /embed/VIDEO_ID for playback in iframes. */
export type VideoPortfolioItem = {
  id: string;
  title: string;
  subtitle: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  embedUrl: string;
};

const ytThumb = (videoId: string) =>
  `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

export const videoPortfolioConfig = {
  heroVideoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
  /** Featured piece above the grid — same as first grid video */
  showreelEmbedUrl: "https://www.youtube.com/embed/iGu9Rb9xX9Q",
  contactEmail: "maheshkneupane90@gmail.com",
  headline: "Crafting Visual",
  headlineAccent: "Stories",
  tagline: "High-end video editing, color grading, and motion graphics.",
  availabilityNote: "Currently accepting new projects.",
  items: [
    {
      id: "feat-iGu9Rb9xX9Q",
      title: "Featured edit",
      subtitle: "Full project",
      thumbnailSrc: ytThumb("iGu9Rb9xX9Q"),
      thumbnailAlt: "YouTube video: featured edit",
      embedUrl: "https://www.youtube.com/embed/iGu9Rb9xX9Q",
    },
    {
      id: "short-bag68gbg3rM",
      title: "YouTube Short",
      subtitle: "Short-form",
      thumbnailSrc: ytThumb("bag68gbg3rM"),
      thumbnailAlt: "YouTube Short preview",
      embedUrl: "https://www.youtube.com/embed/bag68gbg3rM",
    },
    {
      id: "edit-0grwlYP551c",
      title: "Project edit",
      subtitle: "Editing & pacing",
      thumbnailSrc: ytThumb("0grwlYP551c"),
      thumbnailAlt: "YouTube video: project edit",
      embedUrl: "https://www.youtube.com/embed/0grwlYP551c",
    },
    {
      id: "ai-hES4hQHcqgI",
      title: "AI-assisted video",
      subtitle: "Creative workflow",
      thumbnailSrc: ytThumb("hES4hQHcqgI"),
      thumbnailAlt: "YouTube video: AI-assisted edit",
      embedUrl: "https://www.youtube.com/embed/hES4hQHcqgI",
    },
    {
      id: "edit-o9Hau1XuN8Y",
      title: "Additional project",
      subtitle: "Full edit",
      thumbnailSrc: ytThumb("o9Hau1XuN8Y"),
      thumbnailAlt: "YouTube video: additional project",
      embedUrl: "https://www.youtube.com/embed/o9Hau1XuN8Y",
    },
  ] satisfies VideoPortfolioItem[],
} as const;
