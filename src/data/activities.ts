// src/data/activities.ts

// Define the data structure for activities
export interface Activity {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string; // Short summary
  detailedDescription?: string; // Longer description for detail page
  imageUrl?: string; // Main card image
  images?: string[]; // Array of image URLs for detail page
  videoUrl?: string; // Optional video URL
  link?: string;
}

// Define the activities data array
export const activities: Activity[] = [
  {
    id: 2,
    title: "Volunteer, Be the Change Project", 
    date: "2021-22", 
    category: "volunteer", 
    description: "Contributed to establishing a library for underprivileged students in Sindhupalchowk, Nepal.", 
    detailedDescription: "Contributed to the \"Be the Change Project,\" a literacy initiative by the Leo Club under Lions Club International, aimed at establishing a library for underprivileged students in Sindhupalchowk, Nepal, a rural area with limited access to educational resources. Facilitated book collection by promoting and managing a donation drive, utilizing St. Xavier's College, Kathmandu, as a designated drop-off point to gather a diverse range of books for the library. Worked closely with local volunteers in Sindhupalchowk to set up the library, organizing bookshelves, arranging reading materials, and creating an accessible and welcoming space to encourage a reading culture among children and young people. Supported the project's mission to promote literacy and education in underserved communities, aligning with the Leo Club's motto of \"Learn, Lead, Serve\" and contributing to the United Nations Sustainable Development Goals (SDGs) for quality education. Observed the direct impact of the initiative, as children in Sindhupalchowk engaged with books for the first time, fostering their enthusiasm for learning and personal growth. Developed skills in project coordination, community outreach, and teamwork while addressing educational disparities in rural Nepal.",
    imageUrl: "library1.jpg",
    images: [
      "library1.jpg",
      "library2.jpg",
      "library3.jpg",
      "library4.jpg",
      "library5.jpg",
      "library6.jpg"
    ]
  },
  {
    id: 3,
    title: "Founder & Charter President, Leo Club of Kathmandu Temple Siddhi Binayak",
    date: "2020-2023", 
    category: "leadership",
    description: "Founded the club, built a team of 30 members, and organized 12 community service programs.", 
    detailedDescription: "I founded the Leo Club of Kathmandu Temple Siddhi Binayak and served as its Charter President. During my leadership, we focused on serving the needs of our local community through various impactful initiatives. I successfully built a strong team of 30 dedicated members, united by a shared commitment to help and serve others. Together, we organized 12 community service programs, including environmental campaigns and skill development initiatives aimed at empowering and uplifting the community.", 
    imageUrl: "Leo_event1.jpg",
    images: [
      "Leo_event1.jpg",
      "Leo_event2.jpg",
      "Leo_event3.jpg", 
      "Leo_event4.jpg",
      "Leo_event5.jpg"
    ]
  },
  {
    id: 4,
    title: "Volunteer, IAPS School Day and Outreach Programme – SXPC-Nepal", 
    date: "December 10-12, 2022", 
    category: "volunteer", 
    description: "Contributed to the IAPS School Day and Outreach Programme, focusing on \"Physics for Sustainable Development\" at Surke Secondary School.",
    detailedDescription: "Contributed to the \"IAPS School Day and Outreach Programme: Physics for Sustainable Development,\" organized by the St. Xavier's Physics Council (SXPC-Nepal) in collaboration with the International Association of Physics Students (IAPS) and St. Xavier's College, Kathmandu, at Surke Secondary School in Kharidhunga, Nepal. Designed and conducted hands-on physics experiments for students, focusing on the theme \"Physics for Sustainable Development,\" to demonstrate the role of physics in addressing global sustainability challenges, such as renewable energy and environmental conservation. Engaged with young students to foster curiosity and scientific thinking, observing their inquisitive minds as they explored physics concepts through interactive demonstrations, enhancing their understanding of sustainable development principles. Collaborated with a team of volunteers to plan and execute the outreach program, ensuring an organized and impactful learning experience for students in a rural educational setting. Supported the program's mission to promote STEM education in underserved communities, aligning with the United Nations Sustainable Development Goals (SDGs) for quality education and sustainable development. Developed skills in science communication, event coordination, and teamwork while contributing to educational outreach in rural Nepal.",
    imageUrl: "sxpc1.jpg",
    images: [
      "sxpc1.jpg",
      "sxpc2.jpg",
      "sxpc3.jpg",
      "sxpc4.jpg",
      "sxpc5.jpg",
      "sxpc6.jpg"
    ]
  },
  {
    id: 7, 
    title: "Live Physics Demonstration Lead (SXPC Nepal)",
    date: "2/2/24", 
    category: "academic",
    description: "Led a live physics demonstration at St. Xavier's College, featuring interactive stalls like the Chladni Plate experiment.",
    detailedDescription: "To help make science more fun and understandable, I led a live physics demonstration at St. Xavier's College, Kathmandu, as part of SXPC Nepal. We set up interactive stalls where students could see and experience physics in action. One of the most popular setups was the Chladni Plate experiment, where sound waves created beautiful sand patterns on a metal plate. It was a great way to show how sound and vibration work, and it really caught people's attention. We also talked about solid-state physics, including how crystals are structured and how materials conduct electricity. Alongside that, we demonstrated concepts from mechanics, optics, and electromagnetism—turning textbook theories into hands-on experiences. The booth was filled with posters of famous physicists, charts, and live experiments. Lots of students stopped by, asked questions, and got involved with the activities. Our goal was simple: to spark curiosity and show that physics isn't just theory—it's all around us and can be exciting to explore.",
    imageUrl: "cladiniplate1.jpg",
    images: [
      "cladiniplate1.jpg",
      "cladiniplate2.jpg",
      "cladiniplate3.jpg",
      "cladiniplate4.jpg"
    ],
    videoUrl: "cladiniplate5.mp4" 
  }
]; 