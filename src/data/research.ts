export interface ResearchItem {
  id: number | string;
  title: string;
  journal?: string; // Optional journal/conference
  year?: number; // Optional year
  // Add other relevant fields: link, abstract, doi, etc.
}

// Placeholder research papers - Replace with your actual data
export const researchData: ResearchItem[] = [
  {
    id: 1,
    title: "Exploring Quantum Effects in...",
    journal: "Journal of Physics A",
    year: 2024
  },
  {
    id: 2,
    title: "AI Applications in Medical Imaging Analysis",
    journal: "Nature Communications",
    year: 2023
  },
  {
    id: 3,
    title: "Development of a Novel Particle Detector",
    journal: "IEEE Transactions",
    year: 2023
  },
]; 