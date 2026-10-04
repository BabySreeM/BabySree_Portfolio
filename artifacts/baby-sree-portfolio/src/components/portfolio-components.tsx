import { useEffect, useState, type ReactNode } from 'react';
import { portfolio, type Project } from '@/data/portfolio';

const sections = [
  { id: 'home', label: 'INDEX' },
  { id: 'work', label: 'WORK' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'journey', label: 'JOURNEY' },
  { id: 'profiles', label: 'PROFILES' },
  { id: 'contact', label: 'CONTACT' },
];

export function LiveStatus() {
  const [time, setTime] = useState('');
  const [statusIndex, setStatusIndex] = useState(0);
  const statuses = ['BUILDING', 'LEARNING', 'DEBUGGING', 'EXPERIMENTING'];
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false,
    }).format(new Date()));
    update();
    const clock = window.setInterval(update, 30000);
    const cycle = window.setInterval(() => setStatusIndex((index) => (index + 1) % statuses.length), 8000);
    return () => { window.clearInterval(clock); window.clearInterval(cycle); };
  }, []);
  return <div className="top-right">
    <div className="status-chip" aria-label={`Online. India Standard Time ${time}. Currently ${statuses[statusIndex].toLowerCase()}.`} data-testid="status-live">
      <span className="live-dot" /><span>ONLINE</span><span>{time ? `IST ${time}` : 'IST --:--'}</span>
    </div>
    <span className="mono">CURRENTLY: {statuses[statusIndex]}</span>
  </div>;
}

export function Header({ active }: { active: string }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(range > 0 ? window.scrollY / range : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <header className="topbar">
    <a className="wordmark" href="#home" data-cursor="OPEN" data-testid="link-home">BS<span style={{ color: 'var(--clay)' }}>.</span></a>
    <nav className="top-nav" aria-label="Main navigation">
      {sections.slice(1).map((section) => <a key={section.id} href={`#${section.id}`} className={active === section.id ? 'active' : ''} data-cursor="OPEN" data-testid={`link-nav-${section.id}`}>{section.label}</a>)}
    </nav>
    <LiveStatus />
    <div className="progress-track" aria-hidden="true"><div className="progress-fill" style={{ transform: `scaleX(${progress})` }} /></div>
  </header>;
}

export function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const targets = sections.map(({ id }) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, .15, .4] });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return active;
}

export function SectionHeading({ number, title, note }: { number: string; title: string; note: string }) {
  return <div className="section-heading">
    <div><div className="mono section-no">SECTION / {number}</div><h2>{title}</h2></div>
    <p>{note}</p>
  </div>;
}

export function ProjectVisual({ project }: { project: Project }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return <div className={`project-visual ${project.id === '02' ? 'vision-project-visual' : ''}`} data-cursor="SCAN" role="img" aria-label={project.imageAlt} tabIndex={0}
    onPointerMove={(event) => {
      if (event.pointerType === 'touch') return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      event.currentTarget.style.transform = `perspective(900px) rotateX(${-y * 2.8}deg) rotateY(${x * 3.2}deg) scale(1.012)`;
    }}
    onPointerLeave={(event) => { event.currentTarget.style.transform = ''; }}>
    <div className="visual-frame" aria-hidden="true">
      <div className="image-placeholder">
        <span className="mono placeholder-path">{project.image}</span>
        <span className="placeholder-corners" />
        <div className="placeholder-center">
          <strong>Screenshot<br />needed</strong>
          <span className="mono">IMAGE SLOT / NOT PROVIDED</span>
        </div>
        <span className="mono placeholder-path">DROP PROJECT CAPTURE HERE</span>
      </div>
    </div>
    {project.image && <img className={`project-screenshot ${imageLoaded ? 'is-loaded' : ''}`} src={project.image} alt="" aria-hidden="true" loading="lazy" onLoad={() => setImageLoaded(true)} onError={() => setImageLoaded(false)} />}
    {project.id === '02' && <div className="vision-overlay" aria-hidden="true"><span>PERSON 0.94</span><span>OBJECT 0.87</span><span>ALERT 0.91</span></div>}
    <span className="mono visual-id">FIG. {project.id}</span>
  </div>;
}

export function ProjectCaseStudy({ project, reverse = false }: { project: Project; reverse?: boolean }) {
  return <article className={`case-study ${reverse ? 'reverse' : ''}`} data-cursor="INSPECT">
    <ProjectVisual project={project} />
    <div className="project-copy">
      <div className="project-index mono">PROJECT {project.id}</div>
      <h3 className="project-title">{project.title}</h3>
      <div className="mono project-context">{project.context}</div>
      <p className="project-description">{project.description}</p>
      <div className="tag-list">{project.focus.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <div className="project-foot">
        <div><div className="mono">TECHNOLOGY</div><div className="mono" style={{ color: 'var(--ink)', marginTop: 5 }}>{project.technology}</div></div>
        <div><div className="mono">ROLE / CONTEXT</div><div className="mono" style={{ color: 'var(--ink)', marginTop: 5 }}>{project.role}</div></div>
      </div>
    </div>
  </article>;
}

export function ProjectArchive() {
  const [selected, setSelected] = useState<number | null>(null);
  const [preview, setPreview] = useState<number | null>(null);
  return <div className="archive-list" aria-label="Project index">
    {portfolio.smallerProjects.map((project, index) => <button className="archive-row" key={project.title} type="button" onClick={() => setSelected(selected === index ? null : index)} onMouseEnter={() => setPreview(index)} onMouseLeave={() => setPreview(null)} onFocus={() => setPreview(index)} onBlur={() => setPreview(null)} aria-expanded={selected === index} data-cursor="INSPECT" data-testid={`button-project-${index + 1}`}>
      <span className="archive-num">{String(index + 1).padStart(2, '0')}</span><span className="archive-name">{project.title}</span><span className="archive-meta">{project.tech}</span><span className="archive-arrow" aria-hidden="true">↗</span>
      {preview === index && selected !== index && <span className="archive-hover-preview" aria-hidden="true">{project.note}</span>}
      {selected === index && <span className="archive-expanded">{project.note}<span className="mono"> &nbsp; / &nbsp; {project.tech}</span></span>}
    </button>)}
  </div>;
}

export function SkillTerm({ name }: { name: string }) {
  const note = portfolio.skills.find((skill) => skill.name === name)?.note ?? '';
  return <span className="skill-item" tabIndex={0} aria-label={`${name}: ${note}`}>{name}<small aria-hidden="true">→ {note}</small></span>;
}

export function CursorGuide() {
  const [position, setPosition] = useState({ x: -40, y: -40 });
  const [label, setLabel] = useState('CROSSHAIR');
  useEffect(() => {
    const move = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-cursor]') : null;
      setLabel(target?.dataset.cursor ?? (event.target instanceof Element && event.target.closest('a,button,h1,h2,h3,p,span') ? 'TEXT' : 'CROSSHAIR'));
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div className="mouse-cursor" style={{ transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)` }} aria-hidden="true"><span className="cursor-word">{label}</span></div>;
}

export function Annotation({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`mono ${className}`}>{children}</span>;
}

export function ProfilePlaceholder({ name, placeholder }: { name: string; placeholder: string }) {
  return <div className="profile-item" aria-label={`${name} profile placeholder`}>
    <span className="profile-name">{name}</span><span className="profile-detail"><span className="mono">{placeholder}</span></span>
  </div>;
}