import { useActiveSection, Header, SectionHeading, FloatingArtifact, ProjectCaseStudy, ProjectArchive, SkillTerm, CursorGuide, Annotation, ProfilePlaceholder } from '@/components/portfolio-components';
import { portfolio } from '@/data/portfolio';

function Hero() {
  return <section className="hero" id="home" aria-labelledby="hero-title">
    <div className="hero-copy">
      <div className="eyebrow mono"><span>FIG. 01</span><span>BUILD 2026</span></div>
      <h1 id="hero-title">{portfolio.hero.headline}</h1>
      <p className="hero-subline">{portfolio.hero.secondLine}</p>
      <p className="hero-support">{portfolio.hero.supporting}</p>
      <div className="hero-meta mono"><span>SYSTEM 01</span><span>CHENNAI / INDIA</span><span>SECOND YEAR</span></div>
    </div>
    <div className="hero-art" aria-hidden="true">
      <svg viewBox="0 0 180 150" fill="none">
        <path d="M10 126H169M21 140V13M21 126L151 22" stroke="#806F63" strokeOpacity=".36" strokeDasharray="2 5"/>
        <circle cx="96" cy="79" r="36" stroke="#B96F4A" strokeOpacity=".7"/>
        <circle cx="96" cy="79" r="24" stroke="#5A4032" strokeOpacity=".4"/>
        <path d="M96 38V120M55 79H137" stroke="#806F63" strokeOpacity=".5"/>
        <path d="M140 20h17M148.5 11.5v17" stroke="#B96F4A"/>
        <circle cx="96" cy="79" r="4" fill="#B96F4A"/>
        <text x="26" y="20" fill="#806F63" fontSize="7" fontFamily="monospace">X: 13.0827</text>
        <text x="111" y="135" fill="#806F63" fontSize="7" fontFamily="monospace">Y: 80.2707</text>
      </svg>
    </div>
    <aside className="hero-aside">
      <p className="mono">B.TECH INFORMATION TECHNOLOGY</p>
      <p className="mono coord">{portfolio.college}</p>
      <p className="mono coord">{portfolio.years} / SECOND YEAR</p>
      <p className="mono coord">COORD: 13.0827° N / 80.2707° E</p>
    </aside>
    <FloatingArtifact index={0} style={{ right: '4%', top: '61%' }} />
    <FloatingArtifact index={2} style={{ right: '34%', top: '12%', animationDelay: '-3s' }} />
  </section>;
}

function WorkSection() {
  return <section className="section section-rule projects" id="work">
    <SectionHeading number="01" title="Selected work" note="Systems built around practical problems, from computer vision to resource intelligence." />
    <ProjectCaseStudy project={portfolio.projects[0]} />
    <FloatingArtifact index={4} style={{ top: '29%', right: '4%', animationDelay: '-5s' }} />
    <ProjectCaseStudy project={portfolio.projects[1]} reverse />
    <FloatingArtifact index={1} style={{ top: '53%', left: '2%', animationDelay: '-1.5s' }} />
    <ProjectCaseStudy project={portfolio.projects[2]} />
    <FloatingArtifact index={6} style={{ right: '5%', bottom: '8%', animationDelay: '-4s' }} />
    <div className="archive-head">
      <div><Annotation>BUILD 04 / SMALLER SYSTEMS</Annotation><h3 className="archive-title">From the workbench</h3></div>
      <p className="archive-intro">A few compact builds and studies. Select a row to inspect its note.</p>
    </div>
    <ProjectArchive />
    <FloatingArtifact index={5} style={{ right: '4%', bottom: '1%', animationDelay: '-2s' }} />
  </section>;
}

function SkillsSection() {
  return <section className="section section-rule" id="skills">
    <SectionHeading number="02" title="Tools & materials" note="A working set across software, AI and the parts that connect them." />
    <div className="skills-layout">
      {portfolio.skillGroups.map((group, index) => <div className="skill-group" key={group.title}>
        <h3 className="mono">{String(index + 1).padStart(2, '0')} / {group.title}</h3>
        <div className="skill-items">{group.skills.map((skill) => <SkillTerm key={skill} name={skill} />)}</div>
      </div>)}
      <p className="skills-note">Curious about how things work — especially when hardware, data and people meet.</p>
    </div>
    <div className="interest-strip"><span className="mono">OPEN QUESTIONS /</span>{portfolio.interests.map((interest) => <span key={interest}>{interest}</span>)}</div>
    <FloatingArtifact index={7} style={{ right: '5%', top: '29%', animationDelay: '-6s' }} />
    <FloatingArtifact index={3} style={{ left: '4%', bottom: '10%', animationDelay: '-2s' }} />
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
    <h2>Let’s build<br />something.</h2>
    <p className="contact-lede">Always interested in interesting problems, ambitious projects and things that are slightly harder than they need to be.</p>
    <div className="contact-grid">{portfolio.contact.map((item) => <div className="contact-cell" key={item.label}><span className="mono">{item.label}</span><strong>{item.value}</strong></div>)}</div>
    <FloatingArtifact index={2} style={{ right: '7%', top: '18%', animationDelay: '-2s' }} />
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
    <footer className="footer"><span>Baby Sree M · {portfolio.role}</span><span className="mono">NOTEBOOK / VERSION 01</span><a href="#home" className="mono back-top" data-cursor="OPEN">BACK TO TOP ↑</a></footer>
    <div className="page-count" aria-live="polite">{activeNumber} / 06</div>
    <CursorGuide />
  </div>;
}

export default App;
