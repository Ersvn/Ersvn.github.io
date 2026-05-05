export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  tags: string[];
  images: {
    card: string;
    hero: string;
  };
  caseStudy: {
    year: string;
    role: string;
    duration: string;
    overviewHeading: string;
    overview: string[];
    challenge: string;
    approach: string;
    outcome: string;
  };
  links?: {
    github?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "price-engine",
    title: "Price Engine",
    description:
        "A dashboard for analyzing prices and comparing products automatically, built to handle larger datasets in a structured way.",
    tech: ["Spring Boot", "Postgres", "React", "Tailwind"],
    tags: ["Fullstack", "Java", "Data Analysis"],
    images: {
      card: "/images/price-engine-card.webp",
      hero: "/images/price-engine-hero.webp",
    },
    caseStudy: {
      year: "2026",
      role: "Fullstack Developer",
      duration: "Ongoing",
      overviewHeading:
          "A pricing tool where I focused on combining backend logic with a clear and simple UI.",
      overview: [
        "The idea was to collect and match product data from different sources and use that to support pricing decisions.",
        "A big part of the work was building the data structure and making sure the pricing logic is easy to understand and follow.",
      ],
      challenge:
          "The main challenge was handling messy product data (like different identifiers and formats) while still keeping the UI simple and easy to use.",
      approach:
          "I split the system into clear parts: backend for data handling and pricing logic, a database for storing snapshots, and a frontend that highlights the most important info.",
      outcome:
          "The result is a working foundation for a pricing tool that shows both backend logic and how to present data in a clean way.",
    },
    links: {
      github: "https://github.com/Ersvn/Product-Data-Analyzer",
    },
  },
  {
    slug: "scraper-pipeline",
    title: "Scraper Pipeline",
    description:
        "A pipeline that collects product data from websites and turns it into structured data.",
    tech: ["Python", "Playwright", "Postgres"],
    tags: ["Scraping", "Backend", "Automation"],
    images: {
      card: "/images/scraper-pipeline-card.webp",
      hero: "/images/scraper-pipeline-hero.webp",
    },
    caseStudy: {
      year: "2026",
      role: "Backend Developer",
      duration: "Ongoing",
      overviewHeading:
          "A data pipeline where I focused on structure and reliability.",
      overview: [
        "The project takes raw product data and processes it step by step into something usable.",
        "I wanted to make sure the flow is easy to understand and extend later.",
      ],
      challenge:
          "Working with different sources means inconsistent data, so it was tricky to keep everything clean and reliable.",
      approach:
          "I divided the pipeline into steps like fetching, parsing, and storing. That made it easier to debug and improve each part separately.",
      outcome:
          "The result is a simple but scalable pipeline that makes it easier to collect and reuse product data.",
    },
  },
  {
    slug: "aimtech",
    title: "Aimtech",
    description:
        "A company website I helped build, where the original request was to create it in WordPress.",
    tech: ["React", "Next.js", "Framer Motion"],
    tags: ["Frontend", "UI/UX", "Branding"],
    images: {
      card: "/images/aimtech-card.webp",
      hero: "/images/aimtech-hero.webp",
    },
    caseStudy: {
      year: "2026",
      role: "Frontend Developer",
      duration: "Project-based",
      overviewHeading:
          "A website project where I was asked to help build a WordPress solution, but explored a more custom frontend approach.",
      overview: [
        "I was asked to help create a new website for Aimtech, with the initial plan being to build it in WordPress.",
        "During the process, I explored how a custom frontend could give better performance and more control over the design.",
      ],
      challenge:
          "The challenge was balancing simplicity (like WordPress would provide) with the flexibility and performance of a custom-built solution.",
      approach:
          "I built the frontend using React and focused on keeping the design clean and structured, while still making it easy to navigate and maintain.",
      outcome:
          "The result is a modern and responsive site that shows how a more custom approach can improve both performance and user experience.",
    },
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
