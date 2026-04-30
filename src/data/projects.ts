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
      "An advanced dashboard for price analysis and automated price comparison, built to handle large product datasets with precision.",
    tech: ["Spring Boot", "Postgres", "React", "Tailwind"],
    tags: ["Fullstack", "Java", "Data Analysis"],
    images: {
      card: "/images/price-engine-card.webp",
      hero: "/images/price-engine-hero.webp",
    },
    caseStudy: {
      year: "2026",
      role: "Fullstack Engineer / System Design",
      duration: "Ongoing product build",
      overviewHeading:
        "A pricing platform that combines data quality, backend logic, and clear decision support in the interface.",
      overview: [
        "The project focuses on collecting, matching, and analyzing product data from multiple sources to create a stronger foundation for pricing decisions.",
        "The core work is robust data modeling, clear rules for price logic, and an interface that makes complex information understandable within seconds.",
      ],
      challenge:
        "The challenge was to combine technical complexity with clear presentation. The system needed to handle large amounts of product data, different identifiers, and multiple pricing strategies without feeling heavy or cluttered.",
      approach:
        "The solution was built as a structured fullstack flow: backend logic for import, matching, and pricing rules; data storage for snapshots and analysis; and a frontend layer that highlights the most important decisions in a calm, polished UI.",
      outcome:
        "The result is a strong foundation for a real product tool where technology, business logic, and UX work together. It shows both technical range and the ability to package complexity professionally.",
    },
    links: {
      github: "https://github.com/Ersvn/Product-Data-Analyzer",
    },
  },
  {
    slug: "scraper-pipeline",
    title: "Scraper Pipeline",
    description:
      "An automated data collection flow, from sitemaps to enriched product data and stored snapshots.",
    tech: ["Python", "Playwright", "Postgres"],
    tags: ["Scraping", "Backend", "Automation"],
    images: {
      card: "/images/scraper-pipeline-card.webp",
      hero: "/images/scraper-pipeline-hero.webp",
    },
    caseStudy: {
      year: "2026",
      role: "Backend Engineer / Data Automation",
      duration: "Pipeline architecture and enrichment flow",
      overviewHeading:
        "A data collection pipeline where structure, reliability, and data quality stay at the center.",
      overview: [
        "The project takes product data from raw sources to a more useful and enriched format through an automated step-by-step flow.",
        "The goal was to build something that can grow over time without compromising clarity, traceability, or stability in the data process.",
      ],
      challenge:
        "When multiple external sources, formats, and quality levels meet, it quickly becomes difficult to keep a reliable data flow. The challenge was to create structure without making the system rigid.",
      approach:
        "The solution was divided into clear stages for fetching, parsing, enrichment, and storage. That gave better control over error handling, quality filters, and the ability to improve each part independently.",
      outcome:
        "The result is a more scalable foundation for data collection where automation does not only save time, but also improves the quality of information used later in analysis and pricing logic.",
    },
  },
  {
    slug: "aimtech",
    title: "Aimtech",
    description:
      "A digital identity and modern web experience for Aimtech, focused on performance, SEO, and premium UI/UX.",
    tech: ["React", "Next.js", "Framer Motion"],
    tags: ["Frontend", "UI/UX", "Branding"],
    images: {
      card: "/images/aimtech-card.webp",
      hero: "/images/aimtech-hero.webp",
    },
    caseStudy: {
      year: "2026",
      role: "Frontend Developer / Brand Direction",
      duration: "Concept to premium web presence",
      overviewHeading:
        "A digital identity where security, credibility, and a premium feel meet in a modern interface.",
      overview: [
        "Aimtech was designed to feel more like an established premium brand than a traditional service page, with focus on tone, balance, and visual discipline.",
        "The work was as much about defining a consistent expression as it was about optimizing performance, responsiveness, and information hierarchy.",
      ],
      challenge:
        "The main challenge was creating an experience that feels premium without becoming heavy or overdesigned. Every detail needed to support the brand without disturbing the reading flow.",
      approach:
        "A restrained palette, consistent spacing system, clear typography, and controlled motion created an experience that feels considered in every layer.",
      outcome:
        "The project shows the ability to combine branding, UX, and implementation into a cohesive experience that feels both visual and business-minded.",
    },
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
