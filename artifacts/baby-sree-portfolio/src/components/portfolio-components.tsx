import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
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
    <div><div className="mono section-no">{number} / FIELD NOTES</div><h2>{title}</h2></div>
    <p>{note}</p>
  </div>;
}

const objectNames = ['MINI CCTV CAMERA', 'CIRCUIT BOARD', 'TERMINAL', 'USB DRIVE', 'WATER DROPLET + TURBINE', 'JAVA PACKAGE', 'NEURAL NETWORK NODE', 'CODE BRACKET / HARDWARE TAG'];
const objectLabels = ['VISION SENSOR', 'CONTROL BOARD', 'TERMINAL', 'DATA DEVICE', 'RESOURCE LOOP', 'JAVA PACKAGE', 'MODEL GRAPH', 'INTERFACE'];
const objectHover = ['COMPUTER VISION', 'EMBEDDED SYSTEM', 'SOFTWARE', 'DATA / STORAGE', 'WATER + ENERGY', 'JAVA', 'MACHINE LEARNING', 'BUILD'];
const objectClass = ['obj-camera', 'obj-pcb', 'obj-terminal', 'obj-usb', 'obj-drop', 'obj-jar', 'obj-nodes', 'obj-tag'];

export function FloatingArtifact({ index, style }: { index: number; style?: CSSProperties }) {
  return <div className={`object object-${index + 1}`} style={style} tabIndex={0} role="img" aria-label={`${objectNames[index]}, ${objectLabels[index]}`} data-cursor="ROTATE"
    onPointerMove={(event) => {
      if (event.pointerType === 'touch') return;
      const rect = event.currentTarget.getBoundingClientRect();
      const depth = 5 + ((index * 7) % 15);
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * depth * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * depth * 2;
      event.currentTarget.style.setProperty('--parallax-x', `${x.toFixed(1)}px`);
      event.currentTarget.style.setProperty('--parallax-y', `${y.toFixed(1)}px`);
    }}
    onPointerLeave={(event) => {
      event.currentTarget.style.removeProperty('--parallax-x');
      event.currentTarget.style.removeProperty('--parallax-y');
    }}>
    {index === 4
      ? <span className="artifact obj-water-wheel"><i className="mini-drop" /><i className="mini-wheel" /></span>
      : <span className={`artifact ${objectClass[index]}`}>{index === 7 ? '</>' : index === 2 ? <span className="terminal-lines">npm run build<br />system ready</span> : null}</span>}
    <span className="object-label mono">OBJECT {String(index + 1).padStart(2, '0')} · {objectLabels[index]}<br /><b>{objectHover[index]}</b></span>
  </div>;
}

export function ProjectVisual({ project }: { project: Project }) {
  return <div className={`project-visual ${project.visual === 'innovexa' ? 'innovexa-scene' : project.visual === 'vision' ? 'vision-scene' : 'research-scene'} ${project.image ? 'has-screenshot' : ''}`} data-cursor="SCAN" role="img" aria-label={project.imageAlt} tabIndex={0}
    onPointerMove={(event) => {
      if (event.pointerType === 'touch') return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      event.currentTarget.style.transform = `perspective(900px) rotateX(${-y * 2.8}deg) rotateY(${x * 3.2}deg) scale(1.012)`;
    }}
    onPointerLeave={(event) => { event.currentTarget.style.transform = ''; }}>
    {project.image && <img className="project-screenshot" src={project.image} alt="" aria-hidden="true" loading="lazy" />}
    <span className="mono visual-label">{project.visual === 'vision' ? 'MODEL ACTIVE / SCAN' : project.visual === 'innovexa' ? 'SYSTEM 01 / RESOURCE LOOP' : 'INPUT / SPEECH SIGNAL'}</span>
    {project.visual === 'innovexa' ? <div className="visual-frame">
      <div className="pipe" /><div className="waterline" /><div className="turbine" />
      <span className="mono visual-caption">FLOW → ENERGY</span>
    </div> : project.visual === 'vision' ? <div className="visual-frame">
      <div className="camera-grid" /><div className="person-figure" /><div className="bbox person" /><span className="bbox label">PERSON 0.94</span><div className="scan-line" /><span className="mono vision-note">OBJECT DETECTED / ALERT 0.91</span>
    </div> : <div className="visual-frame research-wave" aria-hidden="true">
      <div className="wave-label mono">SIGNAL / 01</div>
      <div className="waveform">{Array.from({ length: 48 }, (_, i) => <i key={i} style={{ height: `${9 + ((i * 13 + 17) % 34)}px` }} />)}</div>
      <div className="research-caption mono">VOICE INPUT → FEATURE ANALYSIS</div>
    </div>}
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
        <div><div className="mono">TECHNOLOGY</div><div className="mono" style={{ color: 'var(--brown)', marginTop: 5 }}>{project.technology}</div></div>
        <div><div className="mono">ROLE / CONTEXT</div><div className="mono" style={{ color: 'var(--brown)', marginTop: 5 }}>{project.role}</div></div>
      </div>
    </div>
  </article>;
}

export function ProjectArchive() {
  const [selected, setSelected] = useState<number | null>(null);
  return <div className="archive-list" aria-label="Project index">
    {portfolio.smallerProjects.map((project, index) => <button className="archive-row" key={project.title} type="button" onClick={() => setSelected(selected === index ? null : index)} aria-expanded={selected === index} data-cursor="INSPECT" data-testid={`button-project-${index + 1}`}>
      <span className="archive-num">{String(index + 1).padStart(2, '0')}</span><span className="archive-name">{project.title}</span><span className="archive-meta">{project.tech}</span><span className="archive-arrow" aria-hidden="true">↗</span>
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
    <span className="profile-name">{name}</span><span className="profile-detail"><span className="mono">{placeholder}</span><span className="profile-open mono">OPEN →</span></span>
  </div>;
}