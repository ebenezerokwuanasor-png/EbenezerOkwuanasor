import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";

const GITHUB_USER = "ebenezerokwuanasor-png";
const GITHUB_REPO = "EbenezerOkwuanasor";
const GITHUB_IMAGE_REFS = ["HEAD", "main", "master"] as const;
const MEDIA_CACHE_VERSION = "portfolio-media-v3";
const MEDIA_RETRY_KEY = `${MEDIA_CACHE_VERSION}-${Date.now().toString(36)}`;

const encodeRepoPath = (fileName: string) => fileName.split("/").map(encodeURIComponent).join("/");

const rawGithubImageUrl = (fileName: string, ref: (typeof GITHUB_IMAGE_REFS)[number], cacheKey = MEDIA_CACHE_VERSION) =>
  `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${ref}/${encodeRepoPath(fileName)}?v=${cacheKey}`;

const imageFromRepo = (fileName: string) => [
  ...GITHUB_IMAGE_REFS.map((ref) => rawGithubImageUrl(fileName, ref)),
  ...GITHUB_IMAGE_REFS.map((ref) => rawGithubImageUrl(fileName, ref, MEDIA_RETRY_KEY)),
];

type Theme = "dark" | "light";

type Project = {
  name: string;
  description: string;
  url: string;
  githubUrl: string;
  tags: string[];
  screenshots: string[];
  client?: boolean;
};

type SiteModalState = {
  project: Project;
  mode: "choice" | "embed";
};

type GalleryState = {
  project: Project;
  index: number;
};

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Book", href: "#book" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const technologyGroups = [
  {
    title: "Frontend",
    summary: "Modern, responsive interfaces that feel fast, refined, and accessible.",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "React",
      "Vite",
      "Tailwind CSS",
      "Responsive Web Design",
      "Progressive Web Apps",
      "Accessibility",
    ],
  },
  {
    title: "Backend & Cloud",
    summary: "Secure data flows, scalable backends, and cloud-ready product foundations.",
    items: [
      "Supabase",
      "Firebase",
      "Vercel",
      "REST APIs",
      "SQL Databases",
      "Authentication Systems",
      "Edge Functions",
      "Cloud Storage",
      "Serverless Architecture",
      "Real-time Databases",
    ],
  },
  {
    title: "Development Tools",
    summary: "A professional workflow for planning, building, shipping, and iterating.",
    items: [
      "GitHub",
      "Visual Studio Code",
      "AI-assisted Development Tools",
      "Cloudflare",
      "Netlify",
      "Product Documentation",
      "Debugging Workflows",
      "Performance Auditing",
      "Deployment Pipelines",
      "Maintenance Systems",
    ],
  },
];

const expertiseItems = [
  {
    title: "Full-Stack Development",
    copy: "End-to-end product builds from interface architecture to backend logic and deployment.",
  },
  {
    title: "AI Product Engineering",
    copy: "Practical use of AI workflows for research, prototyping, debugging, testing, and documentation.",
  },
  {
    title: "Frontend Engineering",
    copy: "Responsive, accessible, mobile-first interfaces with clear hierarchy and premium polish.",
  },
  {
    title: "Backend Development",
    copy: "APIs, authentication, data models, storage, serverless logic, and secure integrations.",
  },
  {
    title: "Database Design",
    copy: "Structured data systems that support reliability, clarity, and long-term product growth.",
  },
  {
    title: "PWA Development",
    copy: "Installable web experiences with offline-ready architecture and app-like performance.",
  },
  {
    title: "Cloud Deployment",
    copy: "Production hosting, deployment pipelines, edge-ready delivery, and release workflows.",
  },
  {
    title: "Performance Optimization",
    copy: "Fast-loading products tuned for usability, SEO, responsiveness, and conversion.",
  },
];

const services = [
  "Custom Web Applications",
  "Full-Stack Product Development",
  "Business Websites",
  "Landing Pages",
  "API Integration",
  "Dashboard Development",
  "Progressive Web Apps",
  "Cloud Deployment",
  "Database Design",
  "Website Optimization",
  "Maintenance",
  "AI-Assisted Product Development",
  "Education Websites / Eduportals",
];

const projects: Project[] = [
  {
    name: "Ebenslator",
    description: "A modern web-based calculator tool used to solve arithmetic problems with a clean, responsive interface.",
    url: "https://ebenslator.vercel.app",
    githubUrl: `https://github.com/${GITHUB_USER}?tab=repositories`,
    tags: ["Web App", "JavaScript", "Responsive UI", "Vercel"],
    screenshots: ["ebenslator1.png", "ebenslator2.png", "ebenslator3.png"],
  },
  {
    name: "MY-VITALS.CHECK",
    description:
      "A digital health platform that helps users understand common health measurements by providing simple, easy-to-read interpretations of vital health information, promoting greater health awareness and informed decision-making.",
    url: "https://my-vitals-check.vercel.app",
    githubUrl: `https://github.com/${GITHUB_USER}?tab=repositories`,
    tags: ["Health Tech", "PWA", "Interpretation UI", "Vercel"],
    screenshots: ["my-vitals-check1.png", "my-vitals-check2.png", "my-vitals-check3.png"],
  },
  {
    name: "MR Tech Hub",
    description: "An online marketing platform created to promote businesses, increase visibility, and help brands grow online.",
    url: "https://mrtechhub.vercel.app",
    githubUrl: `https://github.com/${GITHUB_USER}?tab=repositories`,
    tags: ["Client Work", "Marketing", "Business Platform", "Vercel"],
    screenshots: ["mr1.png", "mr2.png", "mr3.png"],
    client: true,
  },
];

const contactMethods = [
  {
    label: "Email",
    value: "ebenezerokwuanasor@gmail.com",
    href:
      "https://mail.google.com/mail/?view=cm&fs=1&to=ebenezerokwuanasor@gmail.com&su=Portfolio%20Inquiry",
    icon: <MailIcon />,
  },
  {
    label: "WhatsApp",
    value: "+234 904 582 5791",
    href: "https://wa.me/2349045825791?text=Hello%20Ebenezer%2C%20I%20would%20like%20to%20discuss%20a%20project.",
    icon: <WhatsAppIcon />,
  },
  {
    label: "Phone",
    value: "+234 904 582 5791",
    href: "tel:+2349045825791",
    icon: <PhoneIcon />,
  },
];

const socialLinks = [
  {
    label: "Facebook",
    value: "Connect on Facebook",
    href: "https://www.facebook.com/share/1JYTkiz7Sm/",
    icon: <FacebookIcon />,
  },
  {
    label: "Instagram",
    value: "Follow on Instagram",
    href: "https://www.instagram.com/ebenezer_okwuanasor?igsh=MWk3Z2djcmJnZHMwMQ==",
    icon: <InstagramIcon />,
  },
];

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return (window.localStorage.getItem("portfolio-theme-v2") as Theme | null) ?? "light";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [siteModal, setSiteModal] = useState<SiteModalState | null>(null);
  const [gallery, setGallery] = useState<GalleryState | null>(null);

  const isOverlayOpen = mobileMenuOpen || contactOpen || Boolean(siteModal) || Boolean(gallery);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.removeItem("portfolio-theme");
    window.localStorage.setItem("portfolio-theme-v2", theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = isOverlayOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOverlayOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setContactOpen(false);
        setSiteModal(null);
        setGallery(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const toggleTheme = () => setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));

  const closeAllProjectDialogs = () => {
    setSiteModal(null);
    setGallery(null);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-500">
      <SkipLink />
      <SiteBackground />
      <Header
        theme={theme}
        onThemeToggle={toggleTheme}
        mobileMenuOpen={mobileMenuOpen}
        onMenuToggle={() => setMobileMenuOpen((isOpen) => !isOpen)}
      />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main id="main-content" className="relative z-10">
        <Hero onHire={() => setContactOpen(true)} />
        <TechStack />
        <About />
        <CoreExpertise />
        <Services />
        <Projects
          onVisit={(project) => setSiteModal({ project, mode: "choice" })}
          onViewScreenshots={(project) => setGallery({ project, index: 0 })}
        />
        <Publication />
        <Education />
        <Contact onHire={() => setContactOpen(true)} />
      </main>

      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <SitePreviewModal
        state={siteModal}
        onClose={closeAllProjectDialogs}
        onEmbed={() => setSiteModal((current) => (current ? { ...current, mode: "embed" } : current))}
      />
      <ScreenshotModal
        state={gallery}
        onClose={() => setGallery(null)}
        onNavigate={(direction) => {
          setGallery((current) => {
            if (!current) {
              return current;
            }

            const total = current.project.screenshots.length;
            const nextIndex = direction === "next" ? (current.index + 1) % total : (current.index - 1 + total) % total;

            return { ...current, index: nextIndex };
          });
        }}
      />
    </div>
  );
}

function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-full bg-[var(--text-primary)] px-4 py-2 text-sm font-semibold text-[var(--page-bg)] transition focus:translate-y-0"
    >
      Skip to content
    </a>
  );
}

function SiteBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="hero-aura absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="hero-aura hero-aura-delayed absolute bottom-[-22rem] right-[-10rem] h-[38rem] w-[38rem] rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--page-bg)_72%)]" />
    </div>
  );
}

function Header({
  theme,
  onThemeToggle,
  mobileMenuOpen,
  onMenuToggle,
}: {
  theme: Theme;
  onThemeToggle: () => void;
  mobileMenuOpen: boolean;
  onMenuToggle: () => void;
}) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--border)] bg-[color:var(--nav-bg)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <a href="#home" className="group inline-flex items-center gap-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-sm font-bold text-blue-300 shadow-[var(--shadow-soft)] transition group-hover:scale-105">
            EO
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-semibold tracking-tight text-[var(--text-primary)]">Okwuanasor Ebenezer</span>
            <span className="block text-xs text-[var(--text-secondary)]">Full-Stack AI Product Engineer</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={onThemeToggle} className="icon-button" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            onClick={onMenuToggle}
            className="icon-button lg:hidden"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span className="relative h-5 w-5">
              <span className={cn("menu-line top-1", mobileMenuOpen && "top-2 rotate-45")} />
              <span className={cn("menu-line top-2", mobileMenuOpen && "opacity-0")} />
              <span className={cn("menu-line top-3", mobileMenuOpen && "top-2 -rotate-45")} />
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={cn("fixed inset-0 z-40 lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      <button
        type="button"
        className={cn("absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
        aria-label="Close menu backdrop"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "absolute right-0 top-0 h-full w-[min(88vw,24rem)] border-l border-[var(--border)] bg-[var(--panel-bg)] p-6 pt-24 shadow-[var(--shadow)] backdrop-blur-2xl transition-transform duration-500 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <button type="button" onClick={onClose} className="absolute right-5 top-5 icon-button" aria-label="Close navigation menu">
          <CloseIcon />
        </button>
        <div className="space-y-3">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="mobile-nav-link"
              style={{ transitionDelay: open ? `${index * 35}ms` : "0ms" }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
}

function Hero({ onHire }: { onHire: () => void }) {
  return (
    <section id="home" className="relative isolate flex min-h-screen items-center px-4 pb-20 pt-28 sm:px-6 lg:px-8" aria-labelledby="hero-title">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal className="max-w-4xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.32em] text-blue-300">Portfolio</p>
          <h1 id="hero-title" className="max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl xl:text-8xl">
            Okwuanasor Ebenezer Onyekachukwu
          </h1>
          <p className="mt-6 text-xl font-medium text-blue-300 sm:text-2xl">Full-Stack AI Product Engineer</p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            I design, build, deploy, and optimize modern digital products by combining frontend engineering, backend systems, cloud platforms, and AI-assisted development workflows.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="primary-button">
              View Projects
            </a>
            <a href="#contact" className="secondary-button">
              Contact Me
            </a>
            <button type="button" onClick={onHire} className="ghost-button">
              Hire Me
            </button>
          </div>
        </Reveal>

        <Reveal delay={160} className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div className="profile-orbit absolute inset-[-1.25rem] rounded-full border border-blue-400/20" aria-hidden="true" />
          <div className="relative aspect-square overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[var(--shadow)]">
            <ExternalImage
              src={imageFromRepo("profile.png")}
              alt="Professional portrait of Okwuanasor Ebenezer Onyekachukwu"
              fallbackLabel="Okwuanasor Ebenezer Onyekachukwu"
              className="h-full w-full rounded-full object-cover"
              loading="eager"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section id="skills" className="section-shell" aria-labelledby="skills-title">
      <Reveal>
        <SectionHeader
          eyebrow="Technology Stack"
          title="Tools for building complete, production-ready products."
          copy="A focused stack for interfaces, backend systems, cloud delivery, and AI-assisted engineering."
        />
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {technologyGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 120} className="surface-panel p-6 sm:p-7">
            <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/20">
              <StackIcon index={index} />
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">{group.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{group.summary}</p>
            <div className="mt-7 grid gap-2">
              {group.items.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-primary)] transition hover:-translate-y-0.5 hover:border-blue-400/35 hover:bg-blue-500/5">
                  <span>{item}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" aria-hidden="true" />
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-shell" aria-labelledby="about-title">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal>
          <SectionHeader
            eyebrow="About Me"
            title="Engineering practical products with clarity, speed, and discipline."
            copy="My work is shaped by careful technical decision-making, modern product thinking, and the responsible use of AI throughout the development process."
          />
        </Reveal>
        <Reveal delay={120} className="surface-panel p-6 sm:p-8">
          <div className="space-y-5 text-base leading-8 text-[var(--text-secondary)]">
            <p>
              I am Okwuanasor Ebenezer Onyekachukwu, a Full-Stack AI Product Engineer specializing in the design, development, and deployment of modern web applications and digital products.
            </p>
            <p>
              I build scalable, user-focused solutions across the complete product lifecycle: planning, interface design, backend architecture, deployment, optimization, and long-term maintenance.
            </p>
            <p>
              AI tools help me accelerate research, prototyping, debugging, testing, documentation, and optimization, but every product is still guided by sound engineering principles, critical thinking, reliability, and maintainability.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CoreExpertise() {
  return (
    <section className="section-shell" aria-labelledby="expertise-title">
      <Reveal>
        <SectionHeader
          eyebrow="Core Expertise"
          title="Product engineering across the full lifecycle."
          copy="From architecture to deployment, the focus is always on building products that are useful, maintainable, and ready to grow."
        />
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {expertiseItems.map((item, index) => (
          <Reveal key={item.title} delay={index * 55} className="surface-panel group p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400/35">
            <div className="mb-5 h-px w-14 bg-gradient-to-r from-blue-400 to-transparent" />
            <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section-shell" aria-labelledby="services-title">
      <Reveal>
        <SectionHeader
          eyebrow="Services"
          title="Premium development support for founders, businesses, and teams."
          copy="I provide end-to-end software development services for websites, applications, platforms, and growth-focused digital products."
        />
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service} delay={index * 45} className="surface-panel group flex min-h-28 items-start justify-between gap-5 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400/35 hover:shadow-[var(--shadow-soft)]">
            <div>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">{service}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">Built with clean architecture, responsive design, and production-focused delivery.</p>
            </div>
            <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--border)] text-blue-300 transition group-hover:scale-105 group-hover:border-blue-400/50">
              <ArrowIcon />
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Projects({
  onVisit,
  onViewScreenshots,
}: {
  onVisit: (project: Project) => void;
  onViewScreenshots: (project: Project) => void;
}) {
  return (
    <section id="projects" className="section-shell" aria-labelledby="projects-title">
      <Reveal>
        <SectionHeader
          eyebrow="Featured Projects"
          title="Selected products and live builds."
          copy="Each project is designed around practical value, clean usability, responsive performance, and production deployment."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.name} delay={index * 120} className="surface-panel group overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-blue-400/35 hover:shadow-[var(--shadow)]">
            <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--border)] bg-[var(--surface-muted)]">
              {project.client ? <div className="client-stamp">Client</div> : null}
              <ExternalImage
                src={imageFromRepo(project.screenshots[0])}
                alt={`${project.name} project screenshot preview`}
                fallbackLabel={`${project.name} screenshot`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">{project.name}</h3>
              <p className="mt-3 min-h-24 text-sm leading-6 text-[var(--text-secondary)]">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => onVisit(project)} className="primary-button min-h-12 text-sm">
                  Visit Site
                </button>
                <button type="button" onClick={() => onViewScreenshots(project)} className="secondary-button min-h-12 text-sm">
                  View Screenshots
                </button>
              </div>
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-blue-400/50 hover:text-[var(--text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                GitHub Repository
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={160} className="mt-8 surface-panel p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-blue-300">Future Projects</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">Expanding into education, healthcare, productivity, and technology-driven industries.</h3>
          </div>
          <p className="text-base leading-8 text-[var(--text-secondary)]">
            I am continuously expanding my portfolio with innovative digital solutions focused on practical value, stronger everyday experiences, and software that helps people make better decisions and work more effectively.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Publication() {
  return (
    <section id="book" className="section-shell" aria-labelledby="book-title">
      <Reveal>
        <SectionHeader
          eyebrow="Publication"
          title="The Lucid Mind"
          copy="A concise feature of my published work on critical thinking, self-awareness, and clear judgment."
        />
      </Reveal>
      <Reveal delay={120} className="mt-12 surface-panel overflow-hidden p-5 sm:p-7">
        <div className="grid gap-8 md:grid-cols-[0.42fr_1fr] md:items-center">
          <div className="mx-auto w-full max-w-xs overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface-muted)] shadow-[var(--shadow-soft)]">
            <ExternalImage
              src={imageFromRepo("book.png")}
              alt="Book cover for The Lucid Mind by Okwuanasor Ebenezer Onyekachukwu"
              fallbackLabel="THE LUCID MIND"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-blue-300">Author</p>
            <h3 id="book-title" className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              THE LUCID MIND: Mastering Critical Thinking, Self-Awareness and the Psychology of Clear Judgement
            </h3>
            <p className="mt-5 text-base leading-8 text-[var(--text-secondary)]">
              Beyond software engineering, I am the author of a book that explores rational decision-making, self-awareness, critical thinking, and the psychology behind sound judgment.
            </p>
            <a href="https://selar.com/27o21yob17" target="_blank" rel="noreferrer" className="primary-button mt-7 inline-flex">
              Get Here
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section-shell" aria-labelledby="education-title">
      <Reveal>
        <SectionHeader
          eyebrow="Education"
          title="Academic foundation with a product engineering mindset."
          copy="My education supports a disciplined approach to problem-solving, research, health awareness, and user-centered product thinking."
        />
      </Reveal>
      <Reveal delay={120} className="mt-12 surface-panel p-6 sm:p-8">
        <div className="relative pl-8">
          <span className="absolute bottom-2 left-2 top-2 w-px bg-gradient-to-b from-blue-400 via-blue-400/40 to-transparent" aria-hidden="true" />
          <span className="absolute left-0 top-2 h-4 w-4 rounded-full border-4 border-[var(--page-bg)] bg-blue-400 shadow-[0_0_0_1px_var(--border)]" aria-hidden="true" />
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-blue-300">Rivers State University</p>
          <h3 id="education-title" className="mt-3 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">Bachelor of Radiography (B.RAD) - In View</h3>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--text-secondary)]">
            This academic path strengthens my analytical thinking, attention to detail, and interest in building technology that can improve health awareness, decision-making, and practical everyday outcomes.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Contact({ onHire }: { onHire: () => void }) {
  return (
    <section id="contact" className="section-shell pb-24" aria-labelledby="contact-title">
      <Reveal>
        <SectionHeader
          eyebrow="Contact"
          title="Let us build something useful, scalable, and polished."
          copy="Reach out for web applications, business websites, landing pages, dashboards, eduportals, API integrations, cloud deployment, or AI-assisted product development."
        />
      </Reveal>
      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Reveal delay={100} className="surface-panel p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">Start a conversation</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">Choose the channel that works best for you.</p>
            </div>
            <button type="button" onClick={onHire} className="primary-button">
              Hire Me
            </button>
          </div>
          <ContactGrid items={contactMethods} className="mt-8" />
        </Reveal>
        <Reveal delay={180} className="surface-panel p-6 sm:p-8">
          <h3 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">Follow me on</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">Connect through social channels for updates, work, and professional activity.</p>
          <ContactGrid items={socialLinks} className="mt-8" />
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--border)] px-4 py-10 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-[var(--text-primary)]">&copy; 2026 Okwuanasor Ebenezer Onyekachukwu</p>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">Full-Stack AI Product Engineer</p>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">Built with modern web technologies.</p>
    </footer>
  );
}

function SectionHeader({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-blue-300">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">{copy}</p>
    </div>
  );
}

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("reveal", visible && "reveal-visible", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function ExternalImage({
  src,
  alt,
  fallbackLabel,
  className,
  loading = "lazy",
}: {
  src: string | string[];
  alt: string;
  fallbackLabel: string;
  className: string;
  loading?: "eager" | "lazy";
}) {
  const sources = Array.isArray(src) ? src : [src];
  const sourceKey = sources.join("|");
  const [sourceIndex, setSourceIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setSourceIndex(0);
    setFailed(false);
  }, [sourceKey]);

  const currentSource = sources[sourceIndex] ?? sources[0];

  const handleImageError = () => {
    if (sourceIndex < sources.length - 1) {
      setSourceIndex((currentIndex) => currentIndex + 1);
      return;
    }

    setFailed(true);
  };

  if (failed) {
    return (
      <div className={cn("grid place-items-center bg-[var(--surface-muted)] p-6 text-center", className)}>
        <span className="max-w-xs text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={currentSource}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={handleImageError}
    />
  );
}

function ContactGrid({
  items,
  className,
}: {
  items: Array<{ label: string; value: string; href: string; icon: ReactNode }>;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3", className)}>
      {items.map((item) => (
        <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className="contact-link">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/20">
            {item.icon}
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-[var(--text-primary)]">{item.label}</span>
            <span className="block truncate text-sm text-[var(--text-secondary)]">{item.value}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) {
    return null;
  }

  return (
    <ModalFrame title="Hire Okwuanasor Ebenezer" onClose={onClose}>
      <p className="text-sm leading-6 text-[var(--text-secondary)]">
        Choose a contact channel to discuss your project, product idea, business website, dashboard, API integration, or AI-assisted development need.
      </p>
      <ContactGrid items={contactMethods} className="mt-6" />
      <div className="mt-6 border-t border-[var(--border)] pt-6">
        <p className="text-sm font-semibold text-[var(--text-primary)]">Follow me on</p>
        <ContactGrid items={socialLinks} className="mt-4" />
      </div>
    </ModalFrame>
  );
}

function SitePreviewModal({ state, onClose, onEmbed }: { state: SiteModalState | null; onClose: () => void; onEmbed: () => void }) {
  if (!state) {
    return null;
  }

  const openInBrowser = () => {
    window.open(state.project.url, "_blank", "noopener,noreferrer");
  };

  if (state.mode === "embed") {
    return (
      <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${state.project.name} embedded website preview`}>
        <div className="flex h-[92vh] w-[94vw] max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--panel-bg)] shadow-[var(--shadow)]">
          <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] p-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--text-primary)]">{state.project.name}</p>
              <p className="truncate text-xs text-[var(--text-secondary)]">{state.project.url}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" onClick={openInBrowser} className="secondary-button hidden min-h-10 text-xs sm:inline-flex">
                Open in Browser
              </button>
              <button type="button" onClick={onClose} className="icon-button" aria-label="Close website preview">
                <CloseIcon />
              </button>
            </div>
          </div>
          <iframe
            src={state.project.url}
            title={`${state.project.name} live website`}
            className="h-full w-full bg-white"
            loading="lazy"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-downloads"
          />
        </div>
      </div>
    );
  }

  return (
    <ModalFrame title={`Visit ${state.project.name}`} onClose={onClose} size="sm">
      <p className="text-sm leading-6 text-[var(--text-secondary)]">
        Open this project inside a preview overlay or launch it in a new browser tab. If a site blocks embedded previews, use the browser option.
      </p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={onEmbed} className="primary-button">
          Open Here
        </button>
        <button type="button" onClick={openInBrowser} className="secondary-button">
          Open in Browser
        </button>
      </div>
    </ModalFrame>
  );
}

function ScreenshotModal({
  state,
  onClose,
  onNavigate,
}: {
  state: GalleryState | null;
  onClose: () => void;
  onNavigate: (direction: "previous" | "next") => void;
}) {
  if (!state) {
    return null;
  }

  const currentScreenshot = state.project.screenshots[state.index];

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${state.project.name} screenshots`}>
      <div className="flex h-[90vh] w-[94vw] max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--panel-bg)] shadow-[var(--shadow)]">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] p-4">
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{state.project.name}</p>
            <p className="text-xs text-[var(--text-secondary)]">
              Screenshot {state.index + 1} of {state.project.screenshots.length}
            </p>
          </div>
          <button type="button" onClick={onClose} className="icon-button" aria-label="Close screenshots">
            <CloseIcon />
          </button>
        </div>
        <div className="grid min-h-0 flex-1 place-items-center bg-black/20 p-4 sm:p-6">
          <ExternalImage
            src={imageFromRepo(currentScreenshot)}
            alt={`${state.project.name} screenshot ${state.index + 1}`}
            fallbackLabel={`${state.project.name} screenshot ${state.index + 1}`}
            className="max-h-full w-full rounded-3xl border border-[var(--border)] object-contain shadow-[var(--shadow-soft)]"
          />
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] p-4">
          <button type="button" onClick={() => onNavigate("previous")} className="secondary-button min-h-10 text-xs">
            Previous
          </button>
          <div className="flex items-center gap-2" aria-hidden="true">
            {state.project.screenshots.map((screenshot, index) => (
              <span key={screenshot} className={cn("h-2 w-2 rounded-full transition", index === state.index ? "bg-blue-400" : "bg-[var(--border)]")} />
            ))}
          </div>
          <button type="button" onClick={() => onNavigate("next")} className="primary-button min-h-10 text-xs">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalFrame({
  title,
  children,
  onClose,
  size = "md",
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  size?: "sm" | "md";
}) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button type="button" className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close dialog backdrop" />
      <div className={cn("relative max-h-[88vh] w-[92vw] overflow-y-auto rounded-[2rem] border border-[var(--border)] bg-[var(--panel-bg)] p-6 shadow-[var(--shadow)] backdrop-blur-2xl sm:p-8", size === "sm" ? "max-w-lg" : "max-w-2xl")}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id="modal-title" className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            {title}
          </h2>
          <button type="button" onClick={onClose} className="icon-button shrink-0" aria-label="Close dialog">
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function StackIcon({ index }: { index: number }) {
  if (index === 0) {
    return <CodeIcon />;
  }

  if (index === 1) {
    return <CloudIcon />;
  }

  return <ToolIcon />;
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.4 14.5A8.5 8.5 0 0 1 9.5 3.6 8.6 8.6 0 1 0 20.4 14.5Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m8 9-4 3 4 3" />
      <path d="m16 9 4 3-4 3" />
      <path d="m14 5-4 14" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.5 18H8a5 5 0 1 1 1.1-9.88A6 6 0 0 1 20 11.5 3.25 3.25 0 0 1 17.5 18Z" />
    </svg>
  );
}

function ToolIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 0-5 5l-5.2 5.2a2.1 2.1 0 0 0 3 3l5.2-5.2a4 4 0 0 0 5-5l-2.8 2.8-3-3 2.8-2.8Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12.04 3.5a8.41 8.41 0 0 0-7.16 12.82L4 20.5l4.28-.85A8.41 8.41 0 1 0 12.04 3.5Zm0 1.65a6.76 6.76 0 1 1 0 13.52 6.7 6.7 0 0 1-3.44-.95l-.38-.22-2.01.4.41-1.95-.25-.4a6.76 6.76 0 0 1 5.67-10.4Zm-2.3 3.25c-.15-.36-.31-.37-.46-.38h-.39c-.14 0-.36.05-.55.26-.19.21-.72.7-.72 1.72 0 1.01.74 1.99.84 2.13.1.14 1.43 2.29 3.53 3.12 1.75.69 2.1.55 2.48.52.38-.04 1.22-.5 1.39-.98.17-.48.17-.89.12-.98-.05-.09-.19-.14-.39-.25-.21-.1-1.22-.6-1.41-.67-.19-.07-.33-.1-.46.1-.14.21-.53.67-.65.81-.12.14-.24.15-.45.05-.21-.1-.88-.32-1.67-1.03-.62-.55-1.03-1.23-1.15-1.44-.12-.21-.01-.32.09-.42.09-.09.21-.24.31-.36.1-.12.14-.21.21-.34.07-.14.03-.26-.02-.36-.05-.1-.45-1.12-.65-1.52Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 3.2 2 2 0 0 1 4.11 1h2a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.81a2 2 0 0 1-.45 2.11L7.46 8.5a16 16 0 0 0 8 8l.86-.86a2 2 0 0 1 2.11-.45c.91.31 1.85.53 2.81.66A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M14.5 8.5V6.8c0-.82.54-1.01.92-1.01H18V2.1L14.45 2C10.9 2 10.1 4.66 10.1 6.36V8.5H7.5v4h2.6V22h4.4v-9.5h3.1l.4-4h-3.5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}