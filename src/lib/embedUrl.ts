/** Appends autoplay (and mute for YouTube) so embedded players work in modal. */
export function withModalAutoplay(embedUrl: string): string {
  const trimmed = embedUrl.trim();
  if (!trimmed) return trimmed;
  const isYoutube =
    trimmed.includes("youtube.com/embed") || trimmed.includes("youtu.be");
  const sep = trimmed.includes("?") ? "&" : "?";
  if (isYoutube) {
    return `${trimmed}${sep}autoplay=1&mute=1`;
  }
  return `${trimmed}${sep}autoplay=1`;
}
