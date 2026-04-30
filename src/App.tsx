import { getProjectBySlug, projects, type Project } from "./data/projects";

const meta = {
  title: "Erik Svensson | Java & Fullstack Developer",
  description:
    "Portfolio for Erik Svensson, a Java and fullstack developer in Malmo focused on backend systems, data automation, and polished product interfaces.",
};

function setDocumentMeta(title = meta.title, description = meta.description) {
  document.title = title;
  const descriptionTag = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]',
  );
  if (descriptionTag) descriptionTag.content = description;
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand-mark" aria-label="Go to homepage" href="/">
        E.
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="/#projects">Projects</a>
        <a href="/#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a className="project-card" href={`/projects/${project.slug}`}>
      <img
        src={project.images.card}
        alt=""
        loading="lazy"
        width="900"
        height="675"
      />
      <div className="project-card__content">
        <div className="eyebrow">{project.tags.join(" / ")}</div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul className="chip-list" aria-label={`${project.title} tech stack`}>
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </a>
  );
}

function HomePage() {
  setDocumentMeta();

  return (
    <>
      <Header />
      <main>
        <section className="hero section-pad">
          <div className="hero__copy">
            <p className="eyebrow">Malmo / Sweden</p>
            <h1>
              Erik<span>.</span>
            </h1>
            <p className="hero__lead">
              Junior Java developer with fullstack range, backend logic, and UI
              that feels considered from the first click.
            </p>
          </div>
          <aside className="profile-panel" aria-label="Short introduction">
            <img src="/images/me.webp" alt="Portrait of Erik Svensson" />
            <h2>Backend meets product feel.</h2>
            <p>
              I build projects where data flows, APIs, and interfaces connect in
              a way that feels technically stable and easy to use.
            </p>
          </aside>
        </section>

        <section className="projects section-pad" id="projects">
          <div className="section-heading">
            <p className="eyebrow">Works</p>
            <h2>Selected projects</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard project={project} key={project.slug} />
            ))}
          </div>
        </section>

        <section className="about section-pad" id="about">
          <p className="eyebrow">About</p>
          <h2>Fullstack work with backend weight and a polished surface.</h2>
          <p>
            My work sits close to the practical parts of software: data quality,
            backend logic, API structure, automation, and interfaces that help
            people make sense of complex systems quickly.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ProjectPage({ project }: { project: Project }) {
  setDocumentMeta(`${project.title} | Erik Svensson`, project.description);

  return (
    <>
      <Header />
      <main className="case-page">
        <section className="case-hero">
          <img src={project.images.hero} alt="" width="1400" height="900" />
          <div className="case-hero__copy">
            <a className="back-link" href="/">
              Back to portfolio
            </a>
            <p className="eyebrow">{project.caseStudy.year}</p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
          </div>
        </section>

        <section className="case-content section-pad">
          <div className="case-meta" aria-label="Project details">
            <div>
              <span>Role</span>
              <strong>{project.caseStudy.role}</strong>
            </div>
            <div>
              <span>Duration</span>
              <strong>{project.caseStudy.duration}</strong>
            </div>
            <div>
              <span>Stack</span>
              <strong>{project.tech.join(", ")}</strong>
            </div>
          </div>

          <div className="case-narrative">
            <p className="eyebrow">Overview</p>
            <h2>{project.caseStudy.overviewHeading}</h2>
            {project.caseStudy.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <CaseSection title="Challenge" text={project.caseStudy.challenge} />
            <CaseSection title="Approach" text={project.caseStudy.approach} />
            <CaseSection title="Outcome" text={project.caseStudy.outcome} />
            {project.links?.github && (
              <a className="text-link" href={project.links.github}>
                View GitHub repository
              </a>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function CaseSection({ title, text }: { title: string; text: string }) {
  return (
    <section className="case-section">
      <h3>{title}</h3>
      <p>{text}</p>
    </section>
  );
}

function NotFoundPage() {
  setDocumentMeta("Page not found | Erik Svensson");
  return (
    <>
      <Header />
      <main className="not-found section-pad">
        <p className="eyebrow">404</p>
        <h1>Page not found.</h1>
        <a className="text-link" href="/">
          Return home
        </a>
      </main>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer section-pad" id="contact">
      <p className="eyebrow">Available for work</p>
      <h2>Let's build.</h2>
      <a href="mailto:erik.svensson@gritacademy.se">Contact me</a>
    </footer>
  );
}

export function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  const projectMatch = path.match(/^\/projects\/([^/]+)$/);

  if (path === "" || path === "/") {
    return <HomePage />;
  }

  if (projectMatch) {
    const project = getProjectBySlug(projectMatch[1]);
    return project ? <ProjectPage project={project} /> : <NotFoundPage />;
  }

  return <NotFoundPage />;
}
