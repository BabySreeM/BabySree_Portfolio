import { useActiveSection, Header, SectionHeading, ProjectCaseStudy, ProjectArchive, SkillTerm, CursorGuide, Annotation, ProfilePlaceholder } from '@/components/portfolio-components';
import { portfolio } from '@/data/portfolio';
import { motion, useReducedMotion } from 'framer-motion';

function HeroVisionObject() {
  return <div className="hero-vision-object" aria-hidden="true" data-cursor="ROTATE"
    onPointerMove={(event) => {
      if (event.pointerType === 'touch') return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
      event.currentTarget.style.setProperty('--camera-x', `${x.toFixed(1)}px`);
      event.currentTarget.style.setProperty('--camera-y', `${y.toFixed(1)}px`);
    }}
    onPointerLeave={(event) => {
      event.currentTarget.style.removeProperty('--camera-x');
      event.currentTarget.style.removeProperty('--camera-y');
    }}>
    <span className="vision-reticle" />
    <span className="vision-camera-body"><i className="vision-camera-lens" /><i className="vision-camera-indicator" /></span>
    <span className="mono vision-object-label">CV / IMAGE INPUT</span>
  </div>;
}

function Hero() {
  const reduceMotion = useReducedMotion();
  return <section className="hero" id="home" aria-labelledby="hero-title">
    <motion.div className="hero-copy"
      initial={reduceMotion ? 'visible' : 'hidden'}
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.075 } } }}>
      <motion.div className="eyebrow mono" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.55, ease: 'easeOut' }}><span>FIG. 01</span><span>BUILD 2026</span></motion.div>
      <motion.h1 id="hero-title" variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.65, ease: 'easeOut' }}>{portfolio.hero.headline.split(/(see things\.)/).map((part, index) => part === 'see things.' ? <em key={index}>{part}</em> : part)}</motion.h1>
      <motion.p className="hero-subline" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.55, ease: 'easeOut' }}>{portfolio.hero.secondLine}</motion.p>
      <motion.p className="hero-support" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5, ease: 'easeOut' }}>{portfolio.hero.supporting}</motion.p>
      <motion.div className="hero-meta mono" variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.45, ease: 'easeOut' }}><span>SYSTEM 01</span><span>CHENNAI / INDIA</span><span>SECOND YEAR</span></motion.div>
    </motion.div>
    <HeroVisionObject />
    <aside className="hero-aside">
      <p className="mono">B.TECH INFORMATION TECHNOLOGY</p>
      <p className="mono coord">{portfolio.college}</p>
      <p className="mono coord">{portfolio.years} / SECOND YEAR</p>
      <p className="mono coord">COORD: 13.0827° N / 80.2707° E</p>
    </aside>
  </section>;
}

function WorkSection() {
  return <section className="section section-rule projects" id="work">
    <SectionHeading number="01" title="Selected work" note="Systems built around practical problems, from computer vision to resource intelligence." />
    <ProjectCaseStudy project={portfolio.projects[0]} />
    <ProjectCaseStudy project={portfolio.projects[1]} reverse />
    <ProjectCaseStudy project={portfolio.projects[2]} />
    <div className="archive-head">
      <div><Annotation>BUILD 04 / SMALLER SYSTEMS</Annotation><h3 className="archive-title">From the workbench</h3></div>
      <p className="archive-intro">A few compact builds and studies. Select a row to inspect its note.</p>
    </div>
    <ProjectArchive />
  </section>;
}

function SkillsSection() {
  return <section className="section dark-section" id="skills">
    <SectionHeading number="02" title="Tools & materials" note="A working set across software, AI and the parts that connect them." />
    <div className="skills-layout">
      {portfolio.skillGroups.map((group, index) => <div className="skill-group" key={group.title}>
        <h3 className="mono">{String(index + 1).padStart(2, '0')} / {group.title}</h3>
        <div className="skill-items">{group.skills.map((skill) => <SkillTerm key={skill} name={skill} />)}</div>
      </div>)}
      <p className="skills-note">Curious about how things work — especially when hardware, data and people meet.</p>
    </div>
    <div className="interest-strip"><span className="mono">OPEN QUESTIONS /</span>{portfolio.interests.map((interest) => <span key={interest}>{interest}</span>)}</div>
  </section>;
}

function JourneySection() {
  return <section className="section section-rule" id="journey">
    <SectionHeading number="03" title="In progress" note="An evolving path through study, practical AI work and questions worth following." />
    <div className="journey">
      {portfolio.timeline.map((item, index) => <div className="journey-entry" key={`${item.year}-${item.title}`}>
        <div className="journey-year">{item.year}<span className="mono" style={{ display: 'block', fontSize: 8, marginTop: 4 }}>0{index + 1}</span></div>
        <div className="journey-content"><h3>{item.title}</h3><p>{item.detail}</p></div>
      </div>)}
    </div>
    <div className="internship-note">
      <Annotation>INTERNSHIP / AI DEVELOPMENT / 2026</Annotation>
      <span className="internship-title">CodSoft</span>
      <span className="internship-sub mono">AI Chatbot &nbsp;·&nbsp; Image Captioning &nbsp;·&nbsp; Recommendation AI</span>
    </div>
  </section>;
}

function ProfilesSection() {
  return <section className="section section-rule" id="profiles">
    <SectionHeading number="04" title="Elsewhere" note="Profiles and places to follow the work. Links will be added when available." />
    <div className="profiles">{portfolio.profiles.map((profile) => <ProfilePlaceholder key={profile.name} {...profile} />)}</div>
  </section>;
}

function ContactSection() {
  return <section className="contact" id="contact">
    <Annotation>05 / OPEN INPUT</Annotation>
    <h2>Let’s build<br /><span className="orange">something.</span></h2>
    <p className="contact-lede">Always interested in interesting problems, ambitious projects and things that are slightly harder than they need to be.</p>
    <div className="contact-grid">{portfolio.contact.map((item) => <div className="contact-cell" key={item.label}><span className="mono">{item.label}</span><strong>{item.value}</strong></div>)}</div>
  </section>;
}

function App() {
  const active = useActiveSection();
  const activeNumber = String(Math.max(1, ['home', 'work', 'skills', 'journey', 'profiles', 'contact'].indexOf(active) + 1)).padStart(2, '0');
  return <div className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <Header active={active} />
    <main id="main">
      <Hero />
      <WorkSection />
      <SkillsSection />
      <JourneySection />
      <ProfilesSection />
      <ContactSection />
    </main>
    <footer className="footer"><span>Baby Sree M · {portfolio.role}</span><span className="mono">AI / SOFTWARE / BUILD 01</span><a href="#home" className="mono back-top" data-cursor="OPEN">BACK TO TOP ↑</a></footer>
    <div className="page-count" aria-live="polite">{activeNumber} / 06</div>
    <CursorGuide />
  </div>;
}

export default App;
