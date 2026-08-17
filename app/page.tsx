"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

// Architectural project catalog
interface Project {
  id: string;
  number: string;
  name: string;
  category: "residential" | "cultural" | "interior" | "landscape";
  categoryLabel: string;
  place: string;
  country: string;
  year: string;
  areaM2: number;
  areaSqft: number;
  tone: "sand" | "stone" | "light" | "clay";
  heroImage: string;
  tagline: string;
  description: string;
  concept: string;
  materials: string[];
  architect: string;
  awards?: string;
  specs: {
    orientation: string;
    solarStrategy: string;
    structuralSystem: string;
    thermalMass: string;
  };
}

const projects: Project[] = [
  {
    id: "house-07",
    number: "01",
    name: "House No. 07",
    category: "residential",
    categoryLabel: "Private Residence",
    place: "Dubai",
    country: "United Arab Emirates",
    year: "2026",
    areaM2: 1850,
    areaSqft: 19910,
    tone: "sand",
    heroImage: "/images/house_07.jpg",
    tagline: "A travertine sanctuary carved against the desert sun.",
    description:
      "Sculpted from monolithic roman travertine and board-formed architectural concrete, House No. 07 responds directly to the arid desert climate with deep cantilevered overhangs and a perimeter reflecting pool that cools incoming breeze.",
    concept:
      "The spatial layout is conceived as a continuous sequence of shaded volumes and open courtyards, eliminating the boundary between internal living spaces and the endless horizon of sand.",
    materials: ["Roman Vein-Cut Travertine", "Cast-in-Place White Concrete", "Low-Iron Acoustic Glass", "Brushed Bronze Joinery"],
    architect: "Tariq Al-Mansoor & Elena Rostova",
    awards: "WAF 2025 Villa of the Year Nominee",
    specs: {
      orientation: "South-West passive solar deflection",
      solarStrategy: "Deep 4.5m cantilevered mass shading",
      structuralSystem: "Post-tensioned monolithic concrete slab",
      thermalMass: "450mm insulated composite stone masonry",
    },
  },
  {
    id: "the-monolith",
    number: "02",
    name: "The Monolith",
    category: "cultural",
    categoryLabel: "Museum & Pavilion",
    place: "Abu Dhabi",
    country: "United Arab Emirates",
    year: "2025",
    areaM2: 4200,
    areaSqft: 45200,
    tone: "stone",
    heroImage: "/images/monolith.jpg",
    tagline: "A monumental cube of dark basalt rising from the coastal fog.",
    description:
      "A bold cultural monument positioned on the Arabian Gulf coastline. The Monolith's deep geometric fissures slice through volcanic basalt to channel natural coastal breezes and create ever-changing light sculptures within its public atrium.",
    concept:
      "Rather than an enclosure, the building functions as an astronomical and tidal instrument. The central void aligns precisely with the winter solstice sunset across the sea.",
    materials: ["Textured Basalt Stone", "Anodized Black Titanium", "Micro-Cement Flooring", "Acoustic Recycled Wood Fiber"],
    architect: "Elena Rostova",
    awards: "Dezeen Cultural Project of the Year",
    specs: {
      orientation: "North-West sea breeze channeling",
      solarStrategy: "Recessed vertical light apertures",
      structuralSystem: "Dual-core steel & reinforced basalt masonry",
      thermalMass: "Heavy thermal dampening via coastal mist basin",
    },
  },
  {
    id: "silence-residence",
    number: "03",
    name: "Silence Residence",
    category: "residential",
    categoryLabel: "Courtyard Villa",
    place: "Riyadh",
    country: "Saudi Arabia",
    year: "2025",
    areaM2: 1280,
    areaSqft: 13780,
    tone: "light",
    heroImage: "/images/silence_residence.jpg",
    tagline: "Volumetric calm organized around a single ancient olive tree.",
    description:
      "Set in the historic plateau of Riyadh, Silence Residence is an introspective dwelling wrapped in hand-dressed Riyadh limestone. Interior water canals step across sunken courtyards to cultivate microclimatic serenity.",
    concept:
      "By closing the exterior perimeter to urban visual noise and opening upward to the sky through carefully calculated skylights, the home provides an acoustic haven of natural light and water reflection.",
    materials: ["Hand-Chiseled Riyadh Limestone", "White Flamed Granite", "Oiled Smoked Oak", "Water Reflecting Basins"],
    architect: "Tariq Al-Mansoor",
    awards: "Middle East Architecture Excellence Award",
    specs: {
      orientation: "Internalized quadrangle courtyard orientation",
      solarStrategy: "Overhead zenith lightwell with motorized louvers",
      structuralSystem: "Cast architectural stone & insulated core",
      thermalMass: "500mm double-skin natural limestone",
    },
  },
  {
    id: "atrium-of-shadows",
    number: "04",
    name: "Atrium of Shadows",
    category: "interior",
    categoryLabel: "Spatial Atelier",
    place: "London",
    country: "United Kingdom",
    year: "2024",
    areaM2: 740,
    areaSqft: 7965,
    tone: "stone",
    heroImage: "/images/house_07.jpg",
    tagline: "A subterranean sanctuary of blackened timber and cast glass.",
    description:
      "A dual-level spatial gallery in Mayfair exploring the tactile properties of shadow. Hand-charred Yakisugi timber walls frame skylit chambers that glow with diffused northern skylight.",
    concept:
      "Inspired by Junichiro Tanizaki's 'In Praise of Shadows', this interior environment celebrates the beauty found in subtle gradations of darkness and soft indirect illumination.",
    materials: ["Charred Yakisugi Cedar", "Cast Frosted Glass Blocks", "Brushed Gunmetal Steel", "Loomed Raw Linen"],
    architect: "Julian Vance & Elena Rostova",
    awards: "Architectural Review Interior Award",
    specs: {
      orientation: "North light harvesting atrium",
      solarStrategy: "Subterranean diffuse light wells",
      structuralSystem: "Restored Victorian iron & timber framework",
      thermalMass: "Sub-grade thermal ground stabilization",
    },
  },
  {
    id: "dune-pavilion",
    number: "05",
    name: "Dune Pavilion",
    category: "cultural",
    categoryLabel: "Landscape & Pavilion",
    place: "AlUla",
    country: "Saudi Arabia",
    year: "2026",
    areaM2: 2400,
    areaSqft: 25830,
    tone: "sand",
    heroImage: "/images/silence_residence.jpg",
    tagline: "An earthen amphitheater rooted in ancient sandstone cliffs.",
    description:
      "A temporary cultural platform constructed using compacted rammed-earth using local sands and mineral pigments. An open oculus frames celestial stargazing events above the dramatic canyons of AlUla.",
    concept:
      "Engineered to blend seamlessly into the geological landforms, the structure will gracefully return to the desert earth over decades without leaving non-biodegradable waste.",
    materials: ["Stabilized Rammed Earth", "Weathering Corten Steel", "Local Sand Aggregate", "Solar Fabric Shading"],
    architect: "Tariq Al-Mansoor",
    awards: "Mies Crown Hall Americas Prize Commendation",
    specs: {
      orientation: "Celestial North & Canyon Wind alignment",
      solarStrategy: "Self-shading hyperbolic earth walls",
      structuralSystem: "Compacted rammed-earth monolithic curves",
      thermalMass: "Extreme daytime delay / thermal flywheel",
    },
  },
  {
    id: "koan-penthouse",
    number: "06",
    name: "Kōan Residence",
    category: "residential",
    categoryLabel: "Penthouse Suite",
    place: "Tokyo",
    country: "Japan",
    year: "2025",
    areaM2: 520,
    areaSqft: 5600,
    tone: "light",
    heroImage: "/images/monolith.jpg",
    tagline: "Wabi-sabi precision high above the urban expanse.",
    description:
      "A serene sanctuary suspended over the city of Tokyo, utilizing native Japanese Hinoki wood, hand-plastered Washi paper walls, and a recessed water contemplation basin.",
    concept:
      "Every joint and shadow gap is aligned to traditional Tatami proportions, producing a quiet rhythmic calm in stark contrast to the kinetic energy of the metropolis below.",
    materials: ["Japanese Hinoki Cypress", "Kyoto Clay Plaster", "Hand-Made Washi Screens", "Blackened Ironware"],
    architect: "Elena Rostova",
    awards: "Good Design Award Gold",
    specs: {
      orientation: "East-facing sunrise meditation axis",
      solarStrategy: "Double-layered motorized paper shoji filters",
      structuralSystem: "Lightweight timber cassette joinery",
      thermalMass: "Hygroscopic clay plaster humidity regulation",
    },
  },
];

// Studio locations metadata
const studioLocations = [
  { city: "Dubai", timezone: "Asia/Dubai", offset: "+04:00", coords: "25.18° N, 55.27° E", status: "Open" },
  { city: "Riyadh", timezone: "Asia/Riyadh", offset: "+03:00", coords: "24.71° N, 46.67° E", status: "Open" },
  { city: "London", timezone: "Europe/London", offset: "+00:00", coords: "51.50° N, 0.12° W", status: "Open" },
  { city: "Tokyo", timezone: "Asia/Tokyo", offset: "+09:00", coords: "35.67° N, 139.65° E", status: "Open" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showBlueprint, setShowBlueprint] = useState(false);
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");

  // Real-time Studio Clock
  const [studioTimes, setStudioTimes] = useState<Record<string, string>>({});

  // Interactive Aperture Lab State
  const [timeOfDay, setTimeOfDay] = useState<number>(14.5); // 14:30
  const [apertureMaterial, setApertureMaterial] = useState<"travertine" | "concrete" | "basalt" | "clay">("travertine");
  const [apertureShape, setApertureShape] = useState<"slit" | "cantilever" | "oculus">("slit");

  // Soundscape audio engine state
  const [ambientAudioActive, setAmbientAudioActive] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.45); // 45% default audible volume
  const [soundscapeMode, setSoundscapeMode] = useState<"sanctuary" | "desert" | "nocturne">("sanctuary");
  const [showAudioPanel, setShowAudioPanel] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  // Commission Inquiry Form State
  const [inquiryTypology, setInquiryTypology] = useState("Private Residence");
  const [inquiryLocation, setInquiryLocation] = useState("UAE / Gulf");
  const [inquiryScale, setInquiryScale] = useState("500 – 1,500 m²");
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryRefId, setInquiryRefId] = useState("");

  // Philosophy detail expander
  const [expandedEthos, setExpandedEthos] = useState<number | null>(null);

  // Cursor & Scroll properties
  useEffect(() => {
    const setPointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    const setScroll = () => {
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };

    window.addEventListener("pointermove", setPointer);
    window.addEventListener("scroll", setScroll, { passive: true });
    setScroll();

    return () => {
      window.removeEventListener("pointermove", setPointer);
      window.removeEventListener("scroll", setScroll);
    };
  }, []);

  // Update real-time clock for studios
  useEffect(() => {
    const updateTimes = () => {
      const times: Record<string, string> = {};
      studioLocations.forEach((loc) => {
        try {
          times[loc.city] = new Intl.DateTimeFormat("en-GB", {
            timeZone: loc.timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }).format(new Date());
        } catch {
          times[loc.city] = "--:--:--";
        }
      });
      setStudioTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
        setMenuOpen(false);
        setShowAudioPanel(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Update master audio volume when slider changes
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(
        ambientAudioActive ? audioVolume : 0,
        audioCtxRef.current.currentTime,
        0.05
      );
    }
  }, [audioVolume, ambientAudioActive]);

  // Stop audio synthesis cleanly
  const stopAudio = useCallback(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1);
    }
    setTimeout(() => {
      try {
        oscNodesRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        oscNodesRef.current = [];

        if (noiseNodeRef.current) {
          try {
            noiseNodeRef.current.stop();
            noiseNodeRef.current.disconnect();
          } catch {}
          noiseNodeRef.current = null;
        }
      } catch {}
    }, 150);
    setAmbientAudioActive(false);
  }, []);

  // Start soundscape synthesis based on chosen mode
  const startAudio = useCallback((mode: "sanctuary" | "desert" | "nocturne", targetVol: number) => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Clear any previous nodes
      oscNodesRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      oscNodesRef.current = [];

      if (noiseNodeRef.current) {
        try {
          noiseNodeRef.current.stop();
          noiseNodeRef.current.disconnect();
        } catch {}
        noiseNodeRef.current = null;
      }

      // Master Gain Node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(Math.max(0.05, targetVol), ctx.currentTime + 0.8);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Filter Node
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filterRef.current = filter;

      // Frequency chords per preset
      // 1. Sanctuary: Warm open D-Major / A-Major chord (146.8Hz, 220Hz, 293.6Hz, 440Hz, 554.3Hz)
      // 2. Desert: Deep atmospheric E-minor / B drone with subtle wind (164.8Hz, 246.9Hz, 329.6Hz, 493.8Hz)
      // 3. Nocturne: Ethereal tranquil F-minor ambient chord (174.6Hz, 261.6Hz, 349.2Hz, 523.2Hz)
      let frequencies: number[] = [146.83, 220.0, 293.66, 440.0, 554.37];
      let filterCutoff = 800;

      if (mode === "desert") {
        frequencies = [164.81, 246.94, 329.63, 493.88];
        filterCutoff = 650;
      } else if (mode === "nocturne") {
        frequencies = [174.61, 220.0, 261.63, 349.23, 523.25];
        filterCutoff = 1000;
      }

      filter.frequency.setValueAtTime(filterCutoff, ctx.currentTime);
      filter.connect(masterGain);

      // Create rich polyphonic oscillators
      const newOscs: OscillatorNode[] = [];
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        // Warm blend of sine and triangle waves
        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Individual gentle level per harmonic
        const level = 0.18 / (idx + 1);
        oscGain.gain.setValueAtTime(level, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        newOscs.push(osc);
      });

      // Add gentle atmospheric subtle noise layer (Desert breeze / air movement)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02; // Pink noise filter
        lastOut = output[i];
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(420, ctx.currentTime);
      noiseFilter.Q.setValueAtTime(1.2, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.06, ctx.currentTime);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      whiteNoise.start();

      noiseNodeRef.current = whiteNoise;
      oscNodesRef.current = newOscs;
      setAmbientAudioActive(true);
    } catch (err) {
      console.error("Audio could not start:", err);
    }
  }, []);

  // Toggle ambient sound on / off
  const toggleAmbientSound = () => {
    if (ambientAudioActive) {
      stopAudio();
    } else {
      startAudio(soundscapeMode, audioVolume);
    }
  };

  // Change soundscape mode
  const handleModeChange = (mode: "sanctuary" | "desert" | "nocturne") => {
    setSoundscapeMode(mode);
    if (ambientAudioActive) {
      startAudio(mode, audioVolume);
    }
  };

  // Filtered projects
  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  // Aperture Lab calculations based on time of day
  const getSunParams = (hour: number) => {
    const angle = ((hour - 6) / 18) * 180;
    const shadowLength = Math.max(15, Math.abs(hour - 12) * 18);
    const shadowSkew = (hour - 12) * 5;

    let kelvin = 3000;
    let lux = 100;
    let lightColor = "rgba(255, 235, 190, 0.9)";
    let shadowColor = "rgba(18, 17, 15, 0.45)";
    let ambientBg = "#bcb8ac";
    let periodName = "Midday Sun";

    if (hour < 8) {
      kelvin = 2700;
      lux = 350;
      lightColor = "rgba(255, 190, 140, 0.85)";
      shadowColor = "rgba(24, 20, 28, 0.6)";
      ambientBg = "#9f9a90";
      periodName = "Dawn Aperture";
    } else if (hour >= 8 && hour < 16) {
      kelvin = 5600;
      lux = 1850;
      lightColor = "rgba(255, 250, 235, 0.95)";
      shadowColor = "rgba(20, 20, 18, 0.4)";
      ambientBg = "#cbc7bb";
      periodName = "Zenith Clarity";
    } else if (hour >= 16 && hour < 19.5) {
      kelvin = 2400;
      lux = 620;
      lightColor = "rgba(255, 165, 80, 0.92)";
      shadowColor = "rgba(35, 20, 15, 0.55)";
      ambientBg = "#9d8e7d";
      periodName = "Golden Solstice";
    } else {
      kelvin = 6500;
      lux = 45;
      lightColor = "rgba(180, 205, 255, 0.65)";
      shadowColor = "rgba(8, 8, 12, 0.75)";
      ambientBg = "#303236";
      periodName = "Nocturnal Shadow";
    }

    return { angle, shadowLength, shadowSkew, kelvin, lux, lightColor, shadowColor, ambientBg, periodName };
  };

  const sun = getSunParams(timeOfDay);

  const formatHourString = (hourFloat: number) => {
    const h = Math.floor(hourFloat);
    const m = Math.floor((hourFloat - h) * 60);
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `AE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setInquiryRefId(randomCode);
    setInquirySubmitted(true);
  };

  const ethosPillars = [
    {
      num: "01",
      title: "Monolithic Mass",
      short: "Heavy, enduring materials that ground architecture in permanence.",
      detail:
        "We reject thin cladding and temporary veneers. By building with thick limestone, raw cast concrete, and solid basalt, our structures possess an acoustic stillness and thermal flywheel that protects interior life from external extremes.",
    },
    {
      num: "02",
      title: "Temporal Light",
      short: "Sunlight treated as a primary, kinetic building material.",
      detail:
        "Every window is an aperture calibrated to the sun's annual trajectory. Light is not an accidental visitor; it is sculpted into sharp morning blades, soft noon diffusions, and dramatic golden casts that narrate the passage of time.",
    },
    {
      num: "03",
      title: "Tactile Silence",
      short: "Volumetric proportions that induce deep psychological calm.",
      detail:
        "True luxury is acoustic peace and visual decluttering. By integrating hidden acoustic absorptions, water channels, and unadorned surfaces, our spaces allow the human mind to rest and thoughts to expand.",
    },
    {
      num: "04",
      title: "Geometrical Restraint",
      short: "Eliminating the ornamental to reveal pure atmospheric essence.",
      detail:
        "Complexity in execution yields simplicity in perception. We align every joint, shadow gap, and structural axis to an unyielding geometric discipline that creates an unmistakable feeling of harmonious order.",
    },
  ];

  return (
    <main className="site-wrapper">
      {/* Top Banner Ticker with live global time */}
      <aside className="global-status-bar" aria-label="Global Studio Status">
        <div className="status-item">
          <span className="live-dot" />
          <span>AETHER PRAXIS</span>
        </div>
        <div className="status-clocks">
          {studioLocations.map((loc) => (
            <div key={loc.city} className="clock-badge">
              <span className="clock-city">{loc.city}</span>
              <span className="clock-time">{studioTimes[loc.city] || "--:--:--"}</span>
              <span className="clock-offset">{loc.offset}</span>
            </div>
          ))}
        </div>
        <div className="status-actions">
          {/* Enhanced Soundscape Button & Quick Trigger */}
          <div className="audio-control-wrapper">
            <button
              onClick={toggleAmbientSound}
              className={`soundscape-btn ${ambientAudioActive ? "active" : ""}`}
              title="Toggle spatial ambient soundscape (Click to turn On/Off)"
              aria-pressed={ambientAudioActive}
            >
              <span className="sound-waves-icon" aria-hidden="true">
                <span className={`bar b1 ${ambientAudioActive ? "animate" : ""}`} />
                <span className={`bar b2 ${ambientAudioActive ? "animate" : ""}`} />
                <span className={`bar b3 ${ambientAudioActive ? "animate" : ""}`} />
              </span>
              <span>{ambientAudioActive ? "Soundscape Active" : "Ambient Sound"}</span>
            </button>

            <button
              onClick={() => setShowAudioPanel(!showAudioPanel)}
              className="audio-gear-btn"
              title="Soundscape Settings & Volume"
              aria-label="Soundscape Settings"
            >
              ⚙
            </button>

            {/* Audio Tuning Flyout Panel */}
            {showAudioPanel && (
              <div className="audio-flyout-panel" role="region" aria-label="Soundscape Controls">
                <div className="flyout-header">
                  <span>Spatial Soundscape Settings</span>
                  <button onClick={() => setShowAudioPanel(false)} className="flyout-close">
                    ✕
                  </button>
                </div>

                <div className="flyout-row">
                  <label htmlFor="vol-slider">Master Volume: {Math.round(audioVolume * 100)}%</label>
                  <input
                    id="vol-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={audioVolume}
                    onChange={(e) => setAudioVolume(parseFloat(e.target.value))}
                    className="volume-slider"
                  />
                </div>

                <div className="flyout-presets">
                  <span className="preset-label">Acoustic Presets:</span>
                  <div className="preset-buttons">
                    <button
                      type="button"
                      className={`preset-chip ${soundscapeMode === "sanctuary" ? "selected" : ""}`}
                      onClick={() => handleModeChange("sanctuary")}
                    >
                      Sanctuary Chords
                    </button>
                    <button
                      type="button"
                      className={`preset-chip ${soundscapeMode === "desert" ? "selected" : ""}`}
                      onClick={() => handleModeChange("desert")}
                    >
                      Desert Solitude
                    </button>
                    <button
                      type="button"
                      className={`preset-chip ${soundscapeMode === "nocturne" ? "selected" : ""}`}
                      onClick={() => handleModeChange("nocturne")}
                    >
                      Nocturne Light
                    </button>
                  </div>
                </div>

                <div className="flyout-footer">
                  <button
                    type="button"
                    className="flyout-toggle-btn"
                    onClick={toggleAmbientSound}
                  >
                    {ambientAudioActive ? "Mute Soundscape" : "Play Soundscape"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setUnitSystem(unitSystem === "metric" ? "imperial" : "metric")}
            className="unit-toggle-btn"
            title="Toggle measurement units"
          >
            {unitSystem === "metric" ? "Metric [m²]" : "Imperial [sqft]"}
          </button>
        </div>
      </aside>

      {/* Main Site Header Navigation */}
      <header className="site-header">
        <div className="brand-group">
          <a className="wordmark" href="#top" aria-label="AETHER Architecture home">
            <span className="monogram">Æ</span>
            <span className="name">AETHER</span>
          </a>
          <span className="studio-descriptor">Architecture & Spatial Praxis</span>
        </div>

        <nav id="main-nav" className={`desktop-nav ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
          <a href="#spaces" onClick={() => setMenuOpen(false)}>
            <span className="nav-index">01</span> Works
          </a>
          <a href="#ethos" onClick={() => setMenuOpen(false)}>
            <span className="nav-index">02</span> Ethos
          </a>
          <a href="#aperture-lab" onClick={() => setMenuOpen(false)}>
            <span className="nav-index">03</span> Light Lab
          </a>
          <a href="#praxis" onClick={() => setMenuOpen(false)}>
            <span className="nav-index">04</span> Studio
          </a>
          <a href="#contact" className="nav-cta-link" onClick={() => setMenuOpen(false)}>
            <span>Commission</span>
            <span className="cta-arrow">↗</span>
          </a>
        </nav>

        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
      </header>

      {/* Hero Section */}
      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-structure" aria-hidden="true">
          <i />
          <b />
        </div>

        <div className="hero-top-meta">
          <div className="coord-tag">
            <span className="pulse-indicator" />
            <p className="eyebrow">GLOBAL PRAXIS / 25.18° N, 55.27° E</p>
          </div>
          <div className="studio-presence">
            <span>DUBAI</span>
            <span className="sep">/</span>
            <span>RIYADH</span>
            <span className="sep">/</span>
            <span>ABU DHABI</span>
            <span className="sep">/</span>
            <span>LONDON</span>
          </div>
        </div>

        <div className="hero-title-wrap">
          <p className="hero-eyebrow">MONOLITHIC FORM & EXPERIENTIAL SPACE</p>
          <h1 id="hero-title">AETHER</h1>
          <p className="hero-subtext">Architecture beyond form.</p>
        </div>

        <div className="hero-bottom-bar">
          <div className="hero-stat-block">
            <div className="stat-item">
              <span className="stat-num">14</span>
              <span className="stat-lbl">Built Works</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">04</span>
              <span className="stat-lbl">Studios</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">09</span>
              <span className="stat-lbl">Global Awards</span>
            </div>
          </div>

          <p className="hero-caption">We design what space feels like.</p>

          <a className="scroll-cue" href="#intro" aria-label="Scroll down to introduction">
            <span>Explore</span>
            <i aria-hidden="true">↓</i>
          </a>
        </div>
      </section>

      {/* Section 01: The Premise */}
      <section id="intro" className="intro section-pad" aria-labelledby="intro-title">
        <div className="section-head-col">
          <p className="section-index">01 / The Premise</p>
          <p className="vertical-note">AETHER / EST. 2014</p>
        </div>
        <div className="intro-copy">
          <h2 id="intro-title">
            A place is remembered<br />
            by what it makes you <em>feel.</em>
          </h2>
          <div className="intro-body-grid">
            <p className="lead-text">
              We work at the meeting point of monolithic architecture, tactile interiors, and atmospheric light. Every
              boundary, threshold, and source of shadow is considered as part of one continuous human experience.
            </p>
            <p className="sub-lead-text">
              In an era of disposable constructions and digital facades, AETHER crafts architecture of weight, dignity,
              and permanence. We sculpt spaces that outlive trends and cultivate profound spatial calm.
            </p>
          </div>

          <div className="quick-action-strip">
            <a href="#spaces" className="strip-btn primary">
              <span>View Selected Spaces</span>
              <span>↓</span>
            </a>
            <a href="#aperture-lab" className="strip-btn secondary">
              <span>Interactive Light Study</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Section 02: Selected Spaces / Portfolio */}
      <section id="spaces" className="spaces" aria-labelledby="spaces-title">
        <div className="spaces-heading section-pad">
          <div className="spaces-header-top">
            <p className="section-index">02 / Selected Works</p>
            <div className="category-filter-bar" role="tablist" aria-label="Filter projects by typology">
              {[
                { key: "all", label: "All Works (6)" },
                { key: "residential", label: "Residential (3)" },
                { key: "cultural", label: "Cultural & Museum (2)" },
                { key: "interior", label: "Interiors (1)" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={activeCategory === tab.key}
                  className={`filter-tab ${activeCategory === tab.key ? "active" : ""}`}
                  onClick={() => setActiveCategory(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="spaces-title-row">
            <h2 id="spaces-title">
              Form, Earth &<br />
              <em>Atmosphere.</em>
            </h2>
            <p className="spaces-subtitle">
              Six deliberate architectural interventions across the Gulf and Europe. Each project is conceived as a
              dialogue with sunlight, raw earth, and quiet human sanctuary.
            </p>
          </div>
        </div>

        {/* Project Grid / Showcase */}
        <div className="space-list">
          {filteredProjects.map((space) => (
            <article
              className={`space space-${space.tone} space-card-interactive`}
              key={space.id}
              onClick={() => setSelectedProject(space)}
              tabIndex={0}
              role="button"
              aria-label={`Open details for ${space.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(space);
                }
              }}
            >
              {/* Visual Photo Layer */}
              <div className="space-image-wrapper">
                <Image
                  src={space.heroImage}
                  alt={`${space.name} in ${space.place}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="space-bg-photo"
                  priority={space.number === "01"}
                />
                <div className="space-overlay-gradient" />
              </div>

              {/* Minimal architectural graphics plane */}
              <div className="space-plane" aria-hidden="true">
                <i />
                <b />
                <span />
              </div>

              <div className="space-meta">
                <div className="space-badge-group">
                  <span className="badge-num">{space.number}</span>
                  <span className="badge-cat">{space.categoryLabel}</span>
                </div>
                <p className="space-loc">
                  {space.place} <span>—</span> {space.year}
                </p>
              </div>

              <div className="space-body">
                <h3>{space.name}</h3>
                <p className="space-brief">{space.tagline}</p>
                <div className="space-spec-mini">
                  <span>
                    {unitSystem === "metric"
                      ? `${space.areaM2.toLocaleString()} m²`
                      : `${space.areaSqft.toLocaleString()} sqft`}
                  </span>
                  <span className="dot">•</span>
                  <span>{space.materials[0]}</span>
                </div>
              </div>

              <div className="space-action-strip">
                <button
                  type="button"
                  className="open-spec-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(space);
                  }}
                >
                  Inspect Architecture <span>↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Project Deep-Dive Modal */}
      {selectedProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-proj-title"
        >
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project specifications"
            >
              ✕ Close
            </button>

            <div className="modal-hero-visual">
              <Image
                src={selectedProject.heroImage}
                alt={selectedProject.name}
                fill
                className="modal-hero-img"
              />
              <div className="modal-visual-controls">
                <button
                  className={`view-toggle-btn ${!showBlueprint ? "active" : ""}`}
                  onClick={() => setShowBlueprint(false)}
                >
                  Photography
                </button>
                <button
                  className={`view-toggle-btn ${showBlueprint ? "active" : ""}`}
                  onClick={() => setShowBlueprint(true)}
                >
                  Blueprint & Data
                </button>
              </div>
              {showBlueprint && (
                <div className="blueprint-overlay-view">
                  <div className="blueprint-grid-lines" />
                  <div className="blueprint-meta-tag">
                    <p>AXONOMETRIC SECTION DIAGRAM // AE-{selectedProject.year}-{selectedProject.number}</p>
                    <p>SOLAR AZIMUTH: {selectedProject.specs.orientation}</p>
                  </div>
                  <div className="blueprint-crosshair top-left" />
                  <div className="blueprint-crosshair bottom-right" />
                </div>
              )}
            </div>

            <div className="modal-body-container">
              <div className="modal-header-meta">
                <div className="modal-num-badge">
                  <span>PROJECT NO. {selectedProject.number}</span>
                  <span className="modal-cat-tag">{selectedProject.categoryLabel}</span>
                </div>
                <h2 id="modal-proj-title">{selectedProject.name}</h2>
                <p className="modal-subtitle">
                  {selectedProject.place}, {selectedProject.country} • Completed {selectedProject.year}
                </p>
              </div>

              <div className="modal-details-grid">
                <div className="modal-col-main">
                  <h3>Architectural Narrative</h3>
                  <p className="modal-lead-desc">{selectedProject.description}</p>
                  <h4>Spatial Concept</h4>
                  <p className="modal-concept-desc">{selectedProject.concept}</p>

                  <h4>Material Palettes</h4>
                  <ul className="materials-list">
                    {selectedProject.materials.map((mat) => (
                      <li key={mat}>
                        <span className="mat-dot" />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-col-specs">
                  <div className="spec-card">
                    <h4>Technical Parameters</h4>
                    <dl className="spec-dl">
                      <dt>Gross Footprint</dt>
                      <dd>
                        {unitSystem === "metric"
                          ? `${selectedProject.areaM2.toLocaleString()} m²`
                          : `${selectedProject.areaSqft.toLocaleString()} sq ft`}
                      </dd>

                      <dt>Solar Strategy</dt>
                      <dd>{selectedProject.specs.solarStrategy}</dd>

                      <dt>Structural System</dt>
                      <dd>{selectedProject.specs.structuralSystem}</dd>

                      <dt>Thermal Mass</dt>
                      <dd>{selectedProject.specs.thermalMass}</dd>

                      <dt>Lead Architects</dt>
                      <dd>{selectedProject.architect}</dd>

                      {selectedProject.awards && (
                        <>
                          <dt>Accreditation</dt>
                          <dd className="award-highlight">★ {selectedProject.awards}</dd>
                        </>
                      )}
                    </dl>

                    <div className="modal-action-box">
                      <a
                        href="#contact"
                        className="modal-inquire-link"
                        onClick={() => {
                          setInquiryTypology(selectedProject.categoryLabel);
                          setSelectedProject(null);
                        }}
                      >
                        Inquire about similar typology →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 03: Architectural Ethos & Core Pillars */}
      <section id="ethos" className="ethos-section section-pad" aria-labelledby="ethos-title">
        <div className="ethos-head">
          <p className="section-index">03 / Principles & Praxes</p>
          <h2 id="ethos-title">
            Four Pillars of<br />
            <em>Quiet Architecture.</em>
          </h2>
          <p className="ethos-intro-copy">
            We do not follow fleeting stylistic movements. Our methodology is rooted in timeless principles of physics,
            sensory perception, and geological honesty.
          </p>
        </div>

        <div className="ethos-pillars-grid">
          {ethosPillars.map((pillar, idx) => (
            <div
              key={pillar.num}
              className={`pillar-card ${expandedEthos === idx ? "expanded" : ""}`}
              onClick={() => setExpandedEthos(expandedEthos === idx ? null : idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpandedEthos(expandedEthos === idx ? null : idx);
                }
              }}
            >
              <div className="pillar-num">{pillar.num}</div>
              <h3>{pillar.title}</h3>
              <p className="pillar-short">{pillar.short}</p>
              {expandedEthos === idx && (
                <div className="pillar-expanded-content">
                  <p>{pillar.detail}</p>
                </div>
              )}
              <div className="pillar-footer">
                <span>{expandedEthos === idx ? "Less details ↑" : "Read rationale ↓"}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 04: Interactive Aperture Lab & Light Simulator */}
      <section id="aperture-lab" className="light-study" aria-labelledby="light-title">
        <div className="light-study-head section-pad">
          <div className="light-meta-block">
            <p className="section-index">04 / Aperture & Light Simulator</p>
            <span className="live-sim-badge">Interactive Solar Model</span>
          </div>
          <h2 id="light-title">
            Form <span>/</span> Light <span>/</span> Shadow
          </h2>
          <p className="light-desc-text">
            Interact with our simulated architectural aperture. Adjust the sun's diurnal cycle and material surface to
            observe how sunlight transforms monolithic interior volumes across the day.
          </p>
        </div>

        {/* Interactive Simulator Controls */}
        <div className="sim-control-bar">
          <div className="sim-control-item">
            <label htmlFor="time-slider" className="sim-label">
              <span>Diurnal Time of Day:</span>
              <strong className="time-display">{formatHourString(timeOfDay)} ({sun.periodName})</strong>
            </label>
            <input
              id="time-slider"
              type="range"
              min="6"
              max="23"
              step="0.25"
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(parseFloat(e.target.value))}
              className="time-slider"
              aria-label="Adjust time of day"
            />
            <div className="time-markers">
              <span>06:00 (Dawn)</span>
              <span>12:00 (Noon)</span>
              <span>18:00 (Sunset)</span>
              <span>23:00 (Night)</span>
            </div>
          </div>

          <div className="sim-selectors-grid">
            <div className="selector-group">
              <span className="selector-title">Material Substrate:</span>
              <div className="btn-chip-group">
                {[
                  { key: "travertine", label: "Roman Travertine" },
                  { key: "concrete", label: "White Concrete" },
                  { key: "basalt", label: "Basalt Stone" },
                  { key: "clay", label: "Desert Clay" },
                ].map((mat) => (
                  <button
                    key={mat.key}
                    type="button"
                    className={`chip-btn ${apertureMaterial === mat.key ? "active" : ""}`}
                    onClick={() => setApertureMaterial(mat.key as typeof apertureMaterial)}
                  >
                    {mat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="selector-group">
              <span className="selector-title">Aperture Geometry:</span>
              <div className="btn-chip-group">
                {[
                  { key: "slit", label: "Vertical Slit" },
                  { key: "cantilever", label: "Deep Cantilever" },
                  { key: "oculus", label: "Zenith Oculus" },
                ].map((geo) => (
                  <button
                    key={geo.key}
                    type="button"
                    className={`chip-btn ${apertureShape === geo.key ? "active" : ""}`}
                    onClick={() => setApertureShape(geo.key as typeof apertureShape)}
                  >
                    {geo.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* The Live Interactive Aperture Canvas */}
        <div
          className={`aether-light-aperture mat-${apertureMaterial} shape-${apertureShape}`}
          style={{
            backgroundColor: sun.ambientBg,
            transition: "background-color 0.4s ease",
          }}
          aria-label="An interactive architectural study of light moving across a wall"
        >
          {/* Dynamic Light Rays / Beam */}
          <div
            className="dynamic-sun-beam"
            style={{
              background: `radial-gradient(ellipse at ${Math.min(90, Math.max(10, (timeOfDay - 6) * 5.5))}% 20%, ${sun.lightColor} 0%, rgba(244,221,174,0.3) 30%, transparent 65%)`,
              transform: `skewX(${sun.shadowSkew}deg)`,
              transition: "transform 0.2s ease, background 0.3s ease",
            }}
          />

          {/* Architectural Shadow Blade */}
          <div
            className="architectural-shadow-blade"
            style={{
              background: `linear-gradient(${180 + sun.shadowSkew * 2}deg, ${sun.shadowColor} 0%, transparent 90%)`,
              transform: `skewX(${-sun.shadowSkew * 1.5}deg)`,
            }}
          />

          <div className="aperture-copy">
            <p>Light does not decorate a space.</p>
            <p>It reveals its intention.</p>
          </div>

          <div className="aperture-telemetry-panel">
            <div className="telemetry-row">
              <span>SOLAR AZIMUTH</span>
              <strong>{sun.angle.toFixed(1)}°</strong>
            </div>
            <div className="telemetry-row">
              <span>EST. ILLUMINANCE</span>
              <strong>{sun.lux} LUX</strong>
            </div>
            <div className="telemetry-row">
              <span>COLOR TEMPERATURE</span>
              <strong>{sun.kelvin} K</strong>
            </div>
            <div className="telemetry-row">
              <span>CALIBRATED ORIENTATION</span>
              <strong>South-Southwest (SSW)</strong>
            </div>
          </div>
        </div>

        <div className="study-foot section-pad">
          <div className="foot-notes">
            <p className="primary-note">Material has a voice. Light gives it time.</p>
            <p className="secondary-note">Physical simulations performed with ray-marching solar calculations.</p>
          </div>
          <a href="#contact" className="explore-link">
            <span>Commission a Solar Study</span>
            <span>→</span>
          </a>
        </div>
      </section>

      {/* Section 05: Studio Praxis & Recognition */}
      <section id="praxis" className="manifesto section-pad" aria-labelledby="manifesto-title">
        <div className="manifesto-head-col">
          <p className="section-index">05 / The Studio</p>
          <div className="studio-badges-col">
            <div className="award-badge">
              <span className="badge-year">2025</span>
              <strong>WAF Villa Winner</strong>
            </div>
            <div className="award-badge">
              <span className="badge-year">2024</span>
              <strong>Dezeen Studio Shortlist</strong>
            </div>
            <div className="award-badge">
              <span className="badge-year">2023</span>
              <strong>Mies Americas Nominee</strong>
            </div>
          </div>
        </div>

        <div className="manifesto-main-col">
          <h2 id="manifesto-title">
            Not a signature.<br />
            A <em>sense</em> of place.
          </h2>
          <div className="manifesto-paragraphs">
            <p>
              AETHER is an independent architecture and spatial design practice founded on the conviction that buildings
              should demand more of our senses. We reject decorative excess in favor of weight, proportion, and natural
              patina.
            </p>
            <p>
              Operating across Dubai, Riyadh, Abu Dhabi, and London, our multidisciplinary team of architects, structural
              engineers, and lighting physicists collaborate intimately with discerning private clients and cultural
              foundations worldwide.
            </p>
          </div>

          <div className="team-leadership-grid">
            <div className="leader-card">
              <h4>Tariq Al-Mansoor</h4>
              <p className="leader-role">Principal & Design Director</p>
              <p className="leader-bio">AA School of Architecture, London. Specializes in desert climate thermal mass and monolithic geometry.</p>
            </div>
            <div className="leader-card">
              <h4>Elena Rostova</h4>
              <p className="leader-role">Partner & Spatial Experience Director</p>
              <p className="leader-bio">ETH Zurich. Directs interior atmospheres, material phenomenology, and acoustic engineering.</p>
            </div>
            <div className="leader-card">
              <h4>Julian Vance</h4>
              <p className="leader-role">Director of Sustainable Engineering</p>
              <p className="leader-bio">MIT Architecture. Leads passive solar optimization, low-carbon rammed earth, and stone engineering.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 06: Commissioning & Project Inquiry Builder */}
      <footer id="contact" className="contact" aria-labelledby="contact-title">
        <div className="contact-pad section-pad">
          <div className="contact-head-row">
            <p className="section-index">06 / Begin a Project</p>
            <p className="contact-availability">● Accepting Select Commissions for 2026/2027</p>
          </div>

          <h2 id="contact-title">
            Let's create a place<br />
            worth <em>remembering.</em>
          </h2>

          <div className="inquiry-builder-container">
            {inquirySubmitted ? (
              <div className="inquiry-success-card">
                <div className="success-icon">✓</div>
                <h3>Commission Brief Received</h3>
                <p className="success-code">
                  REFERENCE NUMBER: <strong>{inquiryRefId}</strong>
                </p>
                <p className="success-message">
                  Thank you, <strong>{inquiryName || "Client"}</strong>. Our partners in Dubai and London have received
                  your project parameters for <em>{inquiryTypology}</em> in <em>{inquiryLocation}</em>. We will review
                  site feasibility and connect within two business days.
                </p>
                <button
                  type="button"
                  className="reset-inquiry-btn"
                  onClick={() => {
                    setInquirySubmitted(false);
                    setInquiryName("");
                    setInquiryEmail("");
                    setInquiryMessage("");
                  }}
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form className="inquiry-form" onSubmit={handleInquirySubmit}>
                <div className="form-step-group">
                  <label className="step-label">01. Project Typology</label>
                  <div className="typology-options">
                    {["Private Residence", "Cultural / Museum", "Hospitality / Resort", "Spatial Interior"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`type-chip ${inquiryTypology === type ? "selected" : ""}`}
                        onClick={() => setInquiryTypology(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-step-group">
                  <label className="step-label">02. Geographical Location</label>
                  <div className="location-options">
                    {["UAE / Gulf", "Saudi Arabia", "United Kingdom / Europe", "North America", "International Other"].map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        className={`loc-chip ${inquiryLocation === loc ? "selected" : ""}`}
                        onClick={() => setInquiryLocation(loc)}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-step-group">
                  <label className="step-label">03. Anticipated Scale</label>
                  <div className="scale-options">
                    {["Under 500 m²", "500 – 1,500 m²", "1,500 – 4,000 m²", "4,000+ m²"].map((scale) => (
                      <button
                        key={scale}
                        type="button"
                        className={`scale-chip ${inquiryScale === scale ? "selected" : ""}`}
                        onClick={() => setInquiryScale(scale)}
                      >
                        {scale}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-inputs-row">
                  <div className="input-group">
                    <label htmlFor="client-name">Your Full Name</label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      placeholder="e.g. Sultan Al-Qasimi / Lord Sterling"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="client-email">Email Address</label>
                    <input
                      id="client-email"
                      type="email"
                      required
                      placeholder="client@domain.com"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-group full-width">
                  <label htmlFor="client-message">Site Details & Vision (Optional)</label>
                  <textarea
                    id="client-message"
                    rows={3}
                    placeholder="Tell us about the site topography, timeline aspirations, and spatial desires..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                  />
                </div>

                <div className="form-submit-row">
                  <button type="submit" className="submit-inquiry-btn">
                    <span>Transmit Commission Brief</span>
                    <span className="arrow">↗</span>
                  </button>
                  <div className="direct-mail-note">
                    <span>Direct confidential contact: </span>
                    <a href="mailto:studio@aether.design">studio@aether.design</a>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Studio Offices Address Bar */}
          <div className="studio-locations-grid">
            <div className="loc-address-col">
              <h4>DUBAI STUDIO</h4>
              <p>DIFC Gate Precinct 4, Level 08</p>
              <p>Dubai, United Arab Emirates</p>
              <p className="phone">+971 4 819 2200</p>
            </div>
            <div className="loc-address-col">
              <h4>RIYADH ATELIER</h4>
              <p>Al-Bujairi Heritage Quarter</p>
              <p>Riyadh 13711, Saudi Arabia</p>
              <p className="phone">+966 11 405 8820</p>
            </div>
            <div className="loc-address-col">
              <h4>LONDON STUDIO</h4>
              <p>28 Berkeley Square, Mayfair</p>
              <p>London W1J 6EN, United Kingdom</p>
              <p className="phone">+44 20 7946 0912</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} AETHER Studio Inc. All rights reserved.</p>
            <p>Architecture / Monolithic Interiors / Atmospheric Light</p>
            <p>
              <a href="#top" className="back-to-top">
                Back to Summit ↑
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
