import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import { Badge } from '@/components/ui/badge';
import { Download, ExternalLink } from 'lucide-react';

// Interface for Certification data
interface Certification {
  id: number | string;
  name: string;
  issuer: string;
  date: string;
  link?: string; // Optional verification link
  fileUrl?: string; // Optional path to PDF in public folder
  pdfDownloadName?: string; // Optional suggested download name
  imageUrl?: string; // Optional image thumbnail URL
}

// Actual Certifications Data (Moved from SkillsSection)
const certifications: Certification[] = [
  {
    id: 1, 
    name: "Supervised Machine Learning: Regression and Classification", 
    issuer: "DeepLearning.AI / Stanford University (via Coursera)", 
    date: "April 21, 2025",
    link: "https://www.coursera.org/account/accomplishments/verify/K73UH3G7AUF1", 
    fileUrl: "/ML1.pdf",
    pdfDownloadName: "ML_Certificate_MaheshKNeupane.pdf",
    imageUrl: "/ML1.jpeg" // Added image URL
  },
  // TODO: Add more certifications here
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

const CertificationsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="section pt-24">
          <SectionTitle title="Certifications" subtitle="My professional certifications and completed courses" />
          <div className="container max-w-5xl mx-auto">
            {certifications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert) => (
                  <div key={cert.id} className="border p-4 rounded-lg shadow-sm bg-card flex items-start space-x-4 hover:shadow-md transition-shadow duration-200">
                    {cert.imageUrl && (
                      <div className="w-24 h-auto flex-shrink-0 mt-1">
                        <img 
                          src={cert.imageUrl} 
                          alt={`${cert.name} Certificate Thumbnail`} 
                          className="rounded-md object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <h4 className="font-semibold mb-1">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground mb-3"><Badge variant="secondary">{cert.date}</Badge></p>
                      <div className="flex items-center space-x-3 mt-2">
                        {cert.link && (
                          <a 
                            href={cert.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-xs text-primary hover:underline inline-flex items-center"
                            aria-label={`Verify ${cert.name} certificate`}
                          >
                            <ExternalLink className="mr-1 h-3 w-3" /> Verify
                          </a>
                        )}
                        {cert.fileUrl && (
                          <a 
                            href={cert.fileUrl} 
                            download={cert.pdfDownloadName} 
                            className="text-xs text-primary hover:underline inline-flex items-center"
                            aria-label={`Download ${cert.name} certificate PDF`}
                          >
                            <Download className="mr-1 h-3 w-3" /> Download PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No certifications have been added yet.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CertificationsPage; 