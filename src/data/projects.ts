export interface Project {
  id: number | string;
  title: string;
  description: string;
  imageUrl?: string; // Optional image
  // Add other relevant fields: tags, link, githubLink, etc.
}

// Placeholder projects - Replace with your actual data
export const projectsData: Project[] = [
  {
    id: 1,
    title: "Project Alpha",
    description: "An innovative project exploring...".substring(0, 100) + "...",
    imageUrl: "/placeholder-project1.jpg"
  },
  {
    id: 2,
    title: "Project Beta",
    description: "Developing a novel approach to...".substring(0, 100) + "...",
    imageUrl: "/placeholder-project2.jpg"
  },
  {
    id: 3,
    title: "Project Gamma",
    description: "Research and implementation of...".substring(0, 100) + "...",
    imageUrl: "/placeholder-project3.jpg"
  },
]; 