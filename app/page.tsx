"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Project = {
  number: string;
  name: string;
  location: string;
  year: string;
  image: string;
  line: string;
  material: string;
  idea: string;
};

const projects: Project[] = [
  {
    number: "01",
    name: "House No. 07",
    location: "Dubai",
    year: "2026",
    image: "/images/house_07_dubai_1786964236169.jpg",
    line: "A residence drawn by shade, not walls.",
    material: "Roman travertine / Cast concrete / Bronze",
    idea: "Deep overhangs temper the desert sun while water draws cooler air through a continuous sequence of courtyards.",
  },
  {
    number: "02",
    name: "The Monolith",
    location: "Abu Dhabi",
    year: "2025",
    image: "/images/monolith_abudhabi_1786964256991.jpg",
    line: "A cultural volume calibrated to the horizon.",
    material: "Basalt / Black titanium / Coastal mist",
    idea: "A single fissure crosses the mass, aligning the public interior with the winter solstice and the sea beyond.",
  },
  {
    number: "03",
    name: "Silence Residence",
    location: "Riyadh",
    year: "2025",
    image: "/images/silence_residence_riyadh_1786964270326.jpg",
    line: "A home turned inward toward light and water.",
    material: "Riyadh limestone / Oak / Reflecting water",
    idea: "The perimeter excludes urban noise. Above, measured apertures bring the sky into a private stone sanctuary.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [light, setLight] = useState({ x: 62, y: 28 });
  const [hour, setHour] = useState(16);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProject]);

  const moveLight = (event: React.PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    setLight({
      x: Math.max(8, Math.min(92, ((event.clientX - box.left) / box.width) * 100)),
      y: Math.max(10, Math.min(82, ((event.clientY - box.top) / box.height) * 100)),
    });
  };

  const lightColor = hour < 9 ? "255, 182, 110" : hour < 16 ? "255, 246, 217" : hour < 20 ? "255, 153, 67" : "160, 185, 225";
  const lightName = hour < 9 ? "First light" : hour < 16 ? "Zenith" : hour < 20 ? "Last light" : "Moon field";

  return (
    <main>
      <header className="header">
        <a className="brand" href="#top" aria-label="Aether home">AETHER</a>
        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Primary navigation">
          <a href="#spaces" onClick={() => setMenuOpen(false)}>Spaces</a>
          <a href="#light" onClick={() => setMenuOpen(false)}>Light</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Commission</a>
        </nav>
        <button className="menu" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <Image className="hero-image" src="/images/house_07_dubai_1786964236169.jpg" alt="House No. 07 emerging from the desert landscape" fill priority sizes="100vw" />
        <div className="hero-shutter" aria-hidden="true" />
        <p className="hero-kicker">Architecture / Interiors / Experiences</p>
        <div className="hero-title">
          <h1 id="hero-title">AETHER</h1>
          <p>Architecture beyond form.</p>
        </div>
        <p className="hero-statement">We design what<br />space feels like.</p>
        <a className="enter-link" href="#premise">Enter <span>↓</span></a>
      </section>

      <section id="premise" className="premise" aria-labelledby="premise-title">
        <p className="index">01 / Premise</p>
        <h2 id="premise-title">A building is seen.<br />A place is <em>felt.</em></h2>
        <p className="premise-copy">We shape mass, silence, and natural light into spaces that remain with you long after you leave.</p>
      </section>

      <section id="spaces" className="works" aria-labelledby="works-title">
        <div className="works-intro">
          <p className="index">02 / Selected spaces</p>
          <h2 id="works-title">Three studies<br />in atmosphere.</h2>
        </div>
        {projects.map((project) => (
          <article className="project" key={project.number}>
            <Image className="project-image" src={project.image} alt={`${project.name}, ${project.location}`} fill sizes="100vw" />
            <div className="project-shade" aria-hidden="true" />
            <div className="project-top">
              <span>{project.number} / 03</span>
              <span>{project.location} — {project.year}</span>
            </div>
            <div className="project-bottom">
              <div>
                <h3>{project.name}</h3>
                <p>{project.line}</p>
              </div>
              <button type="button" onClick={() => setActiveProject(project)} aria-label={`Enter ${project.name}`}>
                Enter space <span>↗</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      <section id="light" className="light-section" aria-labelledby="light-title">
        <div className="light-heading">
          <p className="index">03 / Light study</p>
          <h2 id="light-title">Form / Light / Silence</h2>
          <p>Move through the wall. Change the hour.</p>
        </div>
        <div
          className="aether-light-lab"
          onPointerMove={moveLight}
          style={{ "--light-x": `${light.x}%`, "--light-y": `${light.y}%`, "--light-rgb": lightColor } as React.CSSProperties}
          tabIndex={0}
          aria-label="Interactive light field. Move the pointer or adjust the time control."
        >
          <div className="light-aperture" aria-hidden="true" />
          <p className="light-quote">Light reveals<br /><em>intention.</em></p>
          <div className="light-control">
            <div><span>{lightName}</span><strong>{String(hour).padStart(2, "0")}:00</strong></div>
            <input aria-label="Time of day" type="range" min="6" max="22" value={hour} onChange={(event) => setHour(Number(event.target.value))} />
            <div className="time-labels"><span>06</span><span>14</span><span>22</span></div>
          </div>
        </div>
      </section>

      <section className="belief" aria-labelledby="belief-title">
        <p className="index">04 / Aether</p>
        <div>
          <h2 id="belief-title">We do not design an image.<br />We design a <em>memory.</em></h2>
          <p>Every project begins with one question: what should this place make a person feel?</p>
        </div>
      </section>

      <footer id="contact" className="contact">
        <p className="index">05 / Begin</p>
        <h2>Let&apos;s create a place<br />worth remembering.</h2>
        <a href="mailto:studio@aether.design">Start a project <span>↗</span></a>
        <div className="contact-foot"><span>AETHER</span><span>Dubai / Riyadh / London</span><span>© 2026</span></div>
      </footer>

      {activeProject && (
        <div className="project-room" role="dialog" aria-modal="true" aria-labelledby="room-title">
          <Image className="room-image" src={activeProject.image} alt="" fill sizes="100vw" />
          <div className="room-shade" aria-hidden="true" />
          <button className="room-close" type="button" onClick={() => setActiveProject(null)} autoFocus>Close <span>×</span></button>
          <div className="room-number">{activeProject.number} / AETHER</div>
          <div className="room-content">
            <p>{activeProject.location} — {activeProject.year}</p>
            <h2 id="room-title">{activeProject.name}</h2>
            <p className="room-idea">{activeProject.idea}</p>
            <p className="room-material">{activeProject.material}</p>
          </div>
        </div>
      )}
    </main>
  );
}
