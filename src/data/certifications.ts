// Interface for Certification data
export interface Certification {
  id: number | string;
  name: string;
  issuer: string;
  date: string;
  link?: string; // Optional verification link
  fileUrl?: string; // Optional path to PDF in public folder
  pdfDownloadName?: string; // Optional suggested download name
  imageUrl?: string; // Optional image thumbnail URL
}

// Actual Certifications Data - Replace/add your actual data
export const certificationsData: Certification[] = [
  {
    id: 1,
    name: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI / Stanford University (via Coursera)",
    date: "April 21, 2025",
    link: "https://www.coursera.org/account/accomplishments/verify/K73UH3G7AUF1",
    fileUrl: "/ML1.pdf",
    pdfDownloadName: "ML_Certificate_MaheshKNeupane.pdf",
    imageUrl: "/ML1.jpeg"
  },
  // Example structure for another cert:
  // {
  //   id: 2,
  //   name: "Another Certification Name",
  //   issuer: "Issuing Body",
  //   date: "Month Day, Year",
  //   link: "https://verify.link/here",
  //   fileUrl: "/path/to/cert2.pdf",
  //   pdfDownloadName: "Cert2_DownloadName.pdf",
  //   imageUrl: "/path/to/cert2_thumb.jpg"
  // },
]; 