import { useEffect, useMemo, useRef, useState } from "react";
import { getProjectBySlug, projects, type Project } from "./data/projects";

const pageMeta = {
  title: "Erik Svensson | Java & Fullstack Developer",
  description:
    "Portfolio for Erik Svensson, a Java and fullstack developer in Malmo focused on backend systems, data automation, and polished product interfaces.",
};

function useDocumentMeta(title = pageMeta.title, description = pageMeta.description) {
  useEffect(() => {
    document.title = title;
    const descriptionTag = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (descriptionTag) descriptionTag.content = description;
  }, [title, description]);
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function Header() {
  const navItems = [
    { label: "Projects", href: "/#projects" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      data-site-header="true"
      className="site-header fixed top-0 z-[100] flex w-full items-center justify-between bg-transparent px-6 py-4 transition-all duration-500 md:px-12 md:py-6"
    >
      <a
        className="font-serif text-xl font-bold tracking-tighter text-[#121212] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F2ED]"
        aria-label="Go to homepage"
        href="/"
      >
        E.
      </a>
      <div className="flex gap-4 md:gap-10">
        {navItems.map((item) => (
          <a
            href={item.href}
            className="group relative block h-[20px] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F2ED]"
            key={item.label}
          >
            <div className="flex flex-col items-start transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-translate-y-[20px] group-focus-visible:-translate-y-[20px] motion-reduce:transition-none">
              <span className="font-sans text-[9px] uppercase leading-[20px] tracking-[0.2em] text-[#121212] md:text-[10px] md:tracking-[0.3em]">
                {item.label}
              </span>
              <span className="font-sans text-[9px] uppercase leading-[20px] tracking-[0.2em] text-[#C5A059] md:text-[10px] md:tracking-[0.3em]">
                {item.label}
              </span>
            </div>
          </a>
        ))}
      </div>
    </nav>
  );
}

function saveScrollPosition() {
  sessionStorage.setItem("home-scroll-y", String(window.scrollY));
  sessionStorage.setItem("home-return-pending", "1");
}

function restoreScrollPosition() {
  const pending = sessionStorage.getItem("home-return-pending") === "1";
  const scrollY = sessionStorage.getItem("home-scroll-y");
  if (!pending || !scrollY) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: Number.isFinite(Number(scrollY)) ? Number(scrollY) : 0,
        behavior: "auto",
      });
      sessionStorage.removeItem("home-return-pending");
    });
  });
}

function ProjectImage({
  image,
  title,
  sizes,
}: {
  image?: string;
  title: string;
  sizes: string;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0B1018]">
      {image ? (
        <img
          src={image}
          alt={title}
          sizes={sizes}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover select-none will-change-transform"
          style={{ objectPosition: "50% 52%" }}
        />
      ) : (
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(197,160,89,0.20),_transparent_35%),linear-gradient(135deg,_#101725,_#0b1018_55%,_#151f30)]" />
      )}
    </div>
  );
}

function ProjectCard({
  project,
  compact = false,
  windowMode = false,
}: {
  project: Project;
  compact?: boolean;
  windowMode?: boolean;
}) {
  const href = `/projects/${project.slug}`;
  const cardImage = project.images.card;
  const heroImage = project.images.hero;
  const sizes = compact
    ? "(max-width: 767px) 100vw, 50vw"
    : "(max-width: 767px) 100vw, (max-width: 1279px) 92vw, 46vw";
  const image = windowMode ? heroImage : cardImage;
  const height = { height: "clamp(420px, 56vh, 720px)" };

  const visual = (
    <>
      <div className={`absolute inset-0 overflow-hidden ${windowMode ? "rounded-[inherit]" : ""}`}>
        <ProjectImage image={image} title={project.title} sizes={sizes} />
        <div
          className={`absolute inset-0 ${
            compact
              ? "bg-gradient-to-t from-black/70 via-black/14 to-transparent"
              : "bg-gradient-to-t from-black/58 via-black/12 to-transparent"
          }`}
        />
      </div>
      {windowMode && (
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-black/6" />
      )}
    </>
  );

  return (
    <a
      href={href}
      onClick={saveScrollPosition}
      data-project-card={project.slug}
      aria-label={`Open case study for ${project.title}`}
      className="group relative block w-full text-left focus:outline-none"
    >
      <article
        className={
          compact
            ? "relative w-full overflow-hidden rounded-[2.5rem] shadow-[0_24px_60px_rgba(0,0,0,0.14)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 motion-reduce:transition-none"
            : "relative w-full overflow-hidden rounded-[1.9rem] shadow-[0_30px_70px_rgba(0,0,0,0.16)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:shadow-[0_38px_85px_rgba(0,0,0,0.20)] motion-reduce:transition-none"
        }
        style={height}
      >
        {visual}
        <div
          className={
            compact
              ? "absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_32%,rgba(5,8,14,0.14)_100%)]"
              : "absolute inset-0 z-10 bg-[linear-gradient(to_top,rgba(7,9,14,0.12),transparent_36%)]"
          }
        />
        <div
          className={
            compact
              ? "absolute inset-0 z-20 flex items-center justify-center bg-[#0A1128]/26 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
              : "absolute inset-0 z-20 flex items-center justify-center bg-[#0A1128]/34 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
          }
        >
          <span className="translate-y-3 border-b border-[#C5A059] pb-2 font-serif text-2xl italic text-[#FDFCF8] transition-transform duration-500 group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:translate-y-0 motion-reduce:transition-none">
            View Case Study
          </span>
        </div>
        <div
          className={
            compact
              ? "absolute inset-0 z-30 rounded-[2.5rem] ring-1 ring-white/10 transition duration-500 group-hover:ring-white/20 group-focus-visible:ring-white/30 motion-reduce:transition-none"
              : "absolute inset-0 z-30 rounded-[1.9rem] ring-1 ring-black/5 transition duration-500 group-hover:ring-black/10 group-focus-visible:ring-black/15 motion-reduce:transition-none"
          }
        />
      </article>
    </a>
  );
}

function HomePage() {
  useDocumentMeta();
  const isMobile = useIsMobile();

  useEffect(restoreScrollPosition, []);

  return (
    <>
      <Header />
      {isMobile ? <MobileHome /> : <DesktopHome />}
    </>
  );
}

function DesktopHome() {
  return (
    <div className="relative bg-[#121212]">
      <main className="relative z-20 rounded-b-[3rem] bg-[#F5F2ED] shadow-[0_30px_120px_rgba(0,0,0,0.14)]">
        <section className="relative flex h-screen items-center justify-center overflow-hidden px-6 md:px-20">
          <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(18,18,18,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.7)_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="relative flex w-full max-w-7xl flex-col">
            <div className="mb-6 flex items-end justify-between">
              <div className="vite-slide-up">
                <h1 className="font-serif text-7xl tracking-tighter text-[#121212] md:text-9xl">
                  Erik<span className="text-[#C5A059]">.</span>
                </h1>
              </div>
              <div className="hidden pb-4 text-right opacity-50 md:block">
                <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#121212]">
                  Malmo, SE / Available for work
                </p>
              </div>
            </div>
            <div className="h-[1px] w-full origin-left bg-[#C5A059] opacity-40" />
            <div className="mt-10 flex flex-col justify-between gap-10 md:flex-row">
              <div className="max-w-xl vite-slide-up">
                <h2 className="font-serif text-4xl italic leading-[1.1] tracking-tight text-[#121212]/90 md:text-6xl">
                  Junior Java Developer <br /> with fullstack range
                </h2>
              </div>
              <div className="flex flex-col items-start justify-between md:items-end vite-slide-up">
                <p className="max-w-[320px] font-sans text-base leading-relaxed text-[#121212]/60 md:text-right md:text-lg">
                  I build backend-driven products where data logic, usability,
                  and polished interfaces work together.
                </p>
                <div className="mt-8 flex flex-wrap gap-3 md:justify-end">
                  <a
                    href="mailto:erik.svensson@gritacademy.se"
                    className="rounded-full bg-[#121212] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#F5F2ED] transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F2ED] motion-reduce:transition-none"
                  >
                    Contact me
                  </a>
                  <a
                    href="https://github.com/Ersvn"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[#121212]/15 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#121212] transition-colors duration-300 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F2ED] motion-reduce:transition-none"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="overflow-hidden border-t border-black/5 px-6 py-48 md:px-20 md:py-64"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-24 md:grid-cols-2">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm grayscale shadow-2xl transition-all duration-[1200ms] hover:grayscale-0 md:mx-0 motion-reduce:transition-none">
              <img
                src="/images/me.webp"
                alt="Erik"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="mb-12 text-center font-sans text-[15px] uppercase tracking-[0.4em] text-[#C5A059] md:text-left">
                The Profile
              </h3>
              <h2 className="mb-10 text-center font-serif text-4xl leading-tight tracking-tight text-[#121212] md:text-left md:text-6xl">
                I like building things <br /> that feel useful, stable, and
                considered.
              </h2>
              <p className="mx-auto max-w-md text-center font-sans text-xl leading-relaxed text-[#121212]/70 md:mx-0 md:text-left">
                I am a newly graduated Java developer who enjoys the meeting
                point between robust backend work, data-driven flows, and
                thoughtful UI. My projects show how I take an idea from system
                logic to an experience that is easy to understand, use, and
                present.
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="relative overflow-hidden bg-[#F5F2ED] py-64">
          <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(circle_at_center,rgba(18,18,18,0.18)_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="mx-auto mb-32 max-w-7xl px-6 md:px-20">
            <h3 className="font-sans text-[15px] uppercase tracking-[0.4em] text-[#C5A059]">
              Selected Works
            </h3>
          </div>
          <div className="mx-auto max-w-7xl space-y-64">
            {projects.map((project, index) => {
              const even = index % 2 === 0;
              return (
                <article
                  className={`flex flex-col items-center gap-20 px-6 md:px-20 ${
                    even ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  key={project.slug}
                >
                  <div className="flex w-full flex-col justify-center md:w-1/2">
                    <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-[#C5A059]">
                      {project.tags.join(" / ")}
                    </p>
                    <h2 className="mb-10 font-serif text-4xl leading-none tracking-tight text-[#121212] md:text-7xl">
                      {project.title}
                    </h2>
                    <p className="mb-12 font-sans text-xl leading-relaxed text-[#121212]/60">
                      {project.description}
                    </p>
                    <div className="mb-10">
                      <div className="mb-10 flex flex-wrap gap-3">
                        {project.tech.map((tech) => (
                          <span
                            className="rounded-full border border-[#121212]/14 bg-white/65 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-[#121212]/88 shadow-[0_2px_10px_rgba(18,18,18,0.05)] backdrop-blur-sm"
                            key={tech}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-[1px] w-16 bg-[#C5A059]/40" />
                        <span className="text-[10px] uppercase tracking-[0.4em] text-[#121212]/45">
                          View case study
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <ProjectCard project={project} windowMode />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <div aria-hidden="true" className="pointer-events-none relative z-10 h-[35vh] bg-transparent" />
      <TechFooter />
    </div>
  );
}

function MobileHome() {
  return (
    <div className="relative bg-[#121212]">
      <main className="relative z-20 rounded-b-[2.5rem] bg-[#F5F2ED]">
        <section className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-14 pt-28">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-[#C5A059]">
              Malmo / Sweden
            </p>
            <h1 className="font-serif text-[22vw] leading-none tracking-tighter text-[#121212]">
              Erik<span className="text-[#C5A059]">.</span>
            </h1>
            <p className="mt-6 max-w-[280px] font-sans text-base leading-relaxed text-[#121212]/70">
              Junior Java developer with fullstack range, backend logic, and UI
              that feels considered from the first click.
            </p>
          </div>
          <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-black/5 bg-[#ECE6DB] p-6 shadow-[0_24px_50px_rgba(18,18,18,0.08)]">
            <div className="relative mb-8 aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <img
                src="/images/me.webp"
                alt="Erik"
                className="absolute inset-0 h-full w-full object-cover grayscale"
              />
            </div>
            <h2 className="mb-6 font-serif text-4xl italic leading-tight tracking-tight">
              Backend meets <br /> product feel.
            </h2>
            <p className="mb-8 max-w-[280px] font-sans text-sm leading-relaxed opacity-70">
              I build projects where data flows, APIs, and interfaces connect in
              a way that feels technically stable and easy to use.
            </p>
            <div className="flex gap-4">
              <div className="h-1 w-1 rounded-full bg-[#C5A059]" />
              <div className="h-1 w-1 rounded-full bg-[#C5A059]/40" />
              <div className="h-1 w-1 rounded-full bg-[#C5A059]/10" />
            </div>
            <div className="pointer-events-none absolute right-0 top-0 h-full w-full bg-gradient-to-br from-[#C5A059]/10 to-transparent" />
          </div>
        </section>

        <section id="projects" className="bg-[#F5F2ED] py-10">
          <div className="mb-12 flex items-baseline justify-between px-6 font-serif">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#C5A059]">
              Works
            </h3>
            <span className="text-sm italic opacity-40">Tap to explore</span>
          </div>
          <div className="space-y-8">
            {projects.map((project) => (
              <div className="relative mb-8 px-4" key={project.slug}>
                <ProjectCard project={project} compact />
              </div>
            ))}
          </div>
        </section>

        <section className="relative bg-[#F5F2ED] px-6 py-40 text-center">
          <div className="inline-block">
            <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-[#C5A059]">
              Available for work
            </p>
            <h2 className="mb-10 font-serif text-6xl italic tracking-tighter">
              Let's build.
            </h2>
            <div className="mx-auto mb-10 h-[1px] w-12 bg-[#C5A059]" />
            <a
              href="mailto:erik.svensson@gritacademy.se"
              className="border-b border-black pb-2 text-xs font-bold uppercase tracking-[0.3em]"
            >
              Contact me
            </a>
          </div>
        </section>
      </main>
      <div aria-hidden="true" className="pointer-events-none relative z-10 h-[35vh] bg-transparent" />
      <TechFooter />
    </div>
  );
}

function TechFooter() {
  const isMobile = useIsMobile();
  const footerRef = useRef<HTMLElement | null>(null);
  const footerStartRef = useRef<HTMLDivElement | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(false);
  const idleSpeed = 0.006;
  const [rotation, setRotation] = useState(0);
  const dragging = useRef(false);
  const lastPointerX = useRef(0);
  const velocity = useRef(idleSpeed);

  useEffect(() => {
    const footerStart = footerStartRef.current;
    if (!footerStart) return;

    const updateCarouselState = () => {
      const footerStartsAt = footerStart.offsetTop;
      const viewportBottom = window.scrollY + window.innerHeight;
      setIsCarouselActive(viewportBottom >= footerStartsAt);
    };

    updateCarouselState();
    window.addEventListener("scroll", updateCarouselState, { passive: true });
    window.addEventListener("resize", updateCarouselState);

    return () => {
      window.removeEventListener("scroll", updateCarouselState);
      window.removeEventListener("resize", updateCarouselState);
    };
  }, []);

  useEffect(() => {
    if (!isCarouselActive) return;

    let frame = 0;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const delta = Math.min(time - lastTime, 32);
      lastTime = time;

      if (!dragging.current) {
        setRotation((current) => current + velocity.current * delta);
        velocity.current = velocity.current * 0.985 + idleSpeed * 0.015;
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [isCarouselActive]);

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    lastPointerX.current = event.clientX;
    velocity.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const drag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const delta = event.clientX - lastPointerX.current;
    lastPointerX.current = event.clientX;
    velocity.current = delta * -0.014;
    setRotation((current) => current - delta * 0.42);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const tech = [
    { name: "Java", logo: "openjdk" },
    { name: "JavaScript", logo: "javascript" },
    { name: "React", logo: "react" },
    { name: "TypeScript", logo: "typescript" },
    { name: "C%23", logo: "dotnet" },
    { name: "Next.js", logo: "nextdotjs" },
    { name: "Tailwind", logo: "tailwindcss" },
    { name: "PostgreSQL", logo: "postgresql" },
    { name: "Node.js", logo: "nodedotjs" },
  ];
  const links = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/erik-svensson-20a191382/",
    },
    { name: "GitHub", href: "https://github.com/Ersvn" },
    { name: "Email", href: "mailto:erik.svensson@gritacademy.se" },
  ];

  return (
    <>
    <div ref={footerStartRef} aria-hidden="true" className="h-px bg-transparent" />
    <footer
      ref={footerRef}
      id="contact"
      className="sticky bottom-0 z-0 flex h-screen w-full select-none flex-col items-center justify-between overflow-hidden bg-[#030609] px-10 py-24 text-[#F5F2ED]"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C5A059] opacity-15 blur-[160px]" />
      <div className="relative flex h-full w-full flex-1 flex-col items-center justify-center">
        {isCarouselActive && (
          <>
            <h2
              className="pointer-events-none absolute z-0 font-serif text-[22vw] uppercase leading-none tracking-tighter text-[#F5F2ED]/[0.05]"
              style={{ WebkitTextStroke: "1px rgba(245, 242, 237, 0.1)" }}
            >
              ERIK
            </h2>
            <div className="absolute inset-0">
              {tech.map((item, index) => {
                const angle =
                  (rotation + index * (360 / tech.length)) * (Math.PI / 180);
                const xRadius = isMobile ? 36 : 28;
                const yRadius = isMobile ? 3.5 : 8;
                const depth = (Math.sin(angle) + 1) / 2;
                const x = Math.cos(angle) * xRadius;
                const y =
                  Math.sin(angle) * yRadius + (isMobile ? depth * 1.1 : 0);
                const isFront = depth > 0.52;

                return (
                  <div
                    className="absolute pointer-events-none will-change-transform"
                    style={{
                      left: "50%",
                      top: "50%",
                      opacity: 0.18 + depth * 0.72,
                      transform: `translate(-50%, -50%) translate(${x}vw, ${y}vh) scale(${0.78 + depth * 0.32})`,
                      zIndex: isFront ? 35 : 10,
                    }}
                    key={item.name}
                  >
                    <div className="group relative">
                      <div className="absolute inset-0 rounded-full bg-[#C5A059] opacity-60 blur-[10px] transition-opacity group-hover:opacity-20" />
                      <img
                        src={`https://img.shields.io/badge/${item.name}-121212?style=flat&logo=${item.logo}&logoColor=C5A059&labelColor=121212`}
                        alt={item.name.replace("C%23", "C#")}
                        className="relative h-6 w-auto rounded-md border border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.5)] md:h-8"
                        style={{ filter: "contrast(1.3)" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <h2
              className="pointer-events-none absolute z-20 font-serif text-[22vw] uppercase leading-none tracking-tighter"
              style={{
                WebkitTextStroke: "1.5px rgba(245, 242, 237, 0.3)",
                color: "#030609",
              }}
            >
              ERIK
            </h2>
            <p
              className="pointer-events-none absolute z-50 -translate-y-2 text-center font-serif text-3xl font-bold uppercase italic tracking-[0.2em] text-[#C5A059] md:text-5xl"
              style={{
                bottom: isMobile ? "33%" : "17%",
                textShadow: "0 10px 30px rgba(0,0,0,0.8)",
              }}
            >
              Tech Stack
            </p>
            <div
              className="absolute inset-0 z-40 cursor-grab touch-none active:cursor-grabbing"
              aria-label="Drag to rotate tech stack"
              role="slider"
              aria-valuemin={0}
              aria-valuemax={360}
              aria-valuenow={Math.round(((rotation % 360) + 360) % 360)}
              tabIndex={0}
              onPointerDown={startDrag}
              onPointerMove={drag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            />
          </>
        )}
      </div>
      <div className="relative z-50 flex w-full flex-col items-center gap-8">
        <div className="mb-2 h-[1px] w-12 bg-[#C5A059]/30" />
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {links.map((link) => (
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="group relative block h-[30px] cursor-pointer overflow-hidden px-2"
              key={link.name}
            >
              <div className="flex flex-col items-center transition-transform duration-600 ease-[0.33,1,0.68,1] group-hover:-translate-y-[30px]">
                <span className="block font-sans text-[11px] uppercase leading-[30px] tracking-[0.5em] text-[#F5F2ED] opacity-70">
                  {link.name}
                </span>
                <span className="block font-sans text-[11px] font-bold uppercase leading-[30px] tracking-[0.5em] text-[#C5A059]">
                  {link.name}
                </span>
              </div>
              <div className="absolute bottom-1 left-0 h-[1px] w-full origin-center scale-x-0 bg-[#C5A059] transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>
      </div>
      <div className="relative z-50 translate-y-5 pb-4 pt-10 font-sans text-[8px] uppercase tracking-[1.5em] text-[#F5F2ED] opacity-60">
        AVAILABLE FOR HIRE / JUNIOR JAVA & FULLSTACK ROLES
      </div>
    </footer>
    </>
  );
}

function ProjectPage({ project }: { project: Project }) {
  useDocumentMeta(`${project.title} | Erik Svensson`, project.description);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F5F2ED]">
        <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#0B1018] px-6 pb-18 pt-36 text-[#F5F2ED] md:px-20 md:pb-32 md:pt-36">
          <ProjectImage
            image={project.images.hero}
            title={project.title}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(7,9,14,0.16),_rgba(7,9,14,0.24)_22%,_rgba(7,9,14,0.64)_64%,_rgba(11,16,24,0.96)_100%)]" />
          <div className="relative z-10 w-full max-w-7xl">
            <a
              href="/#projects"
              className="mb-12 inline-block border-b border-[#C5A059]/50 pb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#F5F2ED]/80"
            >
              Back to portfolio
            </a>
            <p className="mb-6 text-[10px] uppercase tracking-[0.4em] text-[#C5A059]">
              {project.caseStudy.year} / {project.tags.join(" / ")}
            </p>
            <h1 className="mb-8 font-serif text-6xl leading-none tracking-tight text-[#F5F2ED] md:text-9xl">
              {project.title}
            </h1>
            <p className="max-w-2xl font-sans text-xl leading-relaxed text-[#F5F2ED]/70">
              {project.description}
            </p>
          </div>
        </section>

        <section className="px-6 py-32 md:px-20 md:py-64">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-[0.95fr_1.05fr] md:gap-24">
            <aside className="space-y-6">
              <CaseMeta label="Role" value={project.caseStudy.role} />
              <CaseMeta label="Duration" value={project.caseStudy.duration} />
              <CaseMeta label="Stack" value={project.tech.join(" / ")} />
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block border-b border-[#121212] pb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#121212]"
                >
                  GitHub repository
                </a>
              )}
            </aside>
            <article className="max-w-3xl">
              <p className="mb-6 text-[10px] uppercase tracking-[0.4em] text-[#C5A059]">
                Overview
              </p>
              <h2 className="mb-10 font-serif text-4xl leading-tight tracking-tight text-[#121212] md:text-6xl">
                {project.caseStudy.overviewHeading}
              </h2>
              {project.caseStudy.overview.map((paragraph) => (
                <p
                  className="mb-8 font-sans text-xl leading-relaxed text-[#121212]/70"
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}
              <CaseText title="Challenge" text={project.caseStudy.challenge} />
              <CaseText title="Approach" text={project.caseStudy.approach} />
              <CaseText title="Outcome" text={project.caseStudy.outcome} />
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

function CaseMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-[#121212]/15 pt-5">
      <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#C5A059]">
        {label}
      </p>
      <p className="font-sans text-lg leading-relaxed text-[#121212]/70">{value}</p>
    </div>
  );
}

function CaseText({ title, text }: { title: string; text: string }) {
  return (
    <section className="mt-16">
      <h3 className="mb-5 font-serif text-3xl tracking-tight text-[#121212] md:text-5xl">
        {title}
      </h3>
      <p className="font-sans text-xl leading-relaxed text-[#121212]/70">{text}</p>
    </section>
  );
}

function NotFoundPage() {
  useDocumentMeta("Page not found | Erik Svensson");

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#F5F2ED] px-6 text-center">
        <p className="mb-6 text-[10px] uppercase tracking-[0.4em] text-[#C5A059]">
          404
        </p>
        <h1 className="mb-10 font-serif text-6xl italic tracking-tight text-[#121212]">
          Page not found.
        </h1>
        <a
          className="border-b border-black pb-2 text-xs font-bold uppercase tracking-[0.3em]"
          href="/"
        >
          Return home
        </a>
      </main>
    </>
  );
}

export function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  const projectMatch = path.match(/^\/projects\/([^/]+)$/);
  const project = useMemo(
    () => (projectMatch ? getProjectBySlug(projectMatch[1]) : undefined),
    [projectMatch],
  );

  if (path === "" || path === "/") {
    return <HomePage />;
  }

  if (projectMatch) {
    return project ? <ProjectPage project={project} /> : <NotFoundPage />;
  }

  return <NotFoundPage />;
}
