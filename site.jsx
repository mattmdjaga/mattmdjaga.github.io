/* global React */
const { useState, useEffect } = React;

// ============================================================
// Mateusz Dziemian — Personal Site
// Single component. Theme driven by data-theme attribute + CSS vars.
// Respects prefers-color-scheme, persists user choice in localStorage.
// ============================================================

function Site() {
  const [theme, setTheme] = useState("light");
  const [hovered, setHovered] = useState(null);

  // init theme
  useEffect(() => {
    const saved = localStorage.getItem("mdz-theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      return;
    }
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  // react to system changes if user hasn't chosen
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      if (!localStorage.getItem("mdz-theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("mdz-theme", next);
  };

  return (
    <div data-theme={theme} className="site">
      <style>{siteCss}</style>

      {/* ─────────── Chrome ─────────── */}
      <header className="chrome">
        <div className="chrome-left">
          <span className="mono">Mateusz Dziemian</span>
        </div>
        <nav className="chrome-nav">
          <a href="#research" className="nav-link">research</a>
          <a href="#about" className="nav-link">about</a>
          <a href="#oss" className="nav-link">open source</a>
          <a href="#contact" className="nav-link">contact</a>
        </nav>
        <div className="chrome-right">
          <span className="mono">London, UK</span>
          <ThemeToggle theme={theme} onToggle={toggle} />
        </div>
      </header>

      {/* ─────────── Hero ─────────── */}
      <section className="hero">
        <div className="hero-left">
          <div className="eyebrow">
            <span className="smallcaps">01 — Index</span>
          </div>

          <h1 className="display-name">
            Mateusz<br />
            <em className="display-name-accent">Dziemian</em>
          </h1>

          <p className="lead-body">
            I build benchmarks and red teaming tools to stress test AI.
            My latest work is a <a href="https://arxiv.org/abs/2603.15714" target="_blank" rel="noopener" className="inline-link">first author paper on indirect
            prompt injection</a> with authors from major labs. Currently
            interested in <em className="em">eval awareness</em> and
            automating AI safety research.
          </p>

          <div className="contact-row">
            {CONTACTS.map((c, i) => (
              <a
                key={c.key}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener" : undefined}
                className={"contact-link" + (hovered === c.key ? " contact-link-hover" : "")}
                onMouseEnter={() => setHovered(c.key)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="contact-num">{String(i + 1).padStart(2, "0")}</span>
                <span>{c.key}</span>
                <span className="contact-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div className="portrait-wrap">
            <div className="portrait-glow">
              <div className="portrait-frame">
                <img src="profile.jpg" alt="Mateusz Dziemian" className="portrait-img" />
              </div>
            </div>
          </div>
          <div className="hero-meta">
            <div className="meta-row">
              <span className="meta-label">Role</span>
              <span className="meta-value">AI Safety Engineer</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">At</span>
              <span className="meta-value">Gray Swan AI</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Based</span>
              <span className="meta-value">London, UK</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Stats strip ─────────── */}
      <section className="stats">
        {[
          { n: "30M+", l: "HF downloads" },
          { n: "200+", l: "Citations" },
          { n: "6", l: "Papers" },
          { n: "V6", l: "Bouldering" },
        ].map((s, i) => (
          <div key={i} className="stat-cell">
            <div className="stat-num">{s.n}</div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </section>

      {/* ─────────── Research ─────────── */}
      <section id="research" className="section">
        <SectionHead num="02" title="Selected Research" kicker="Papers & preprints" />
        <div className="papers">
          {PAPERS.map((p, i) => <Paper key={i} paper={p} idx={i} />)}
        </div>
      </section>

      {/* ─────────── About ─────────── */}
      <section id="about" className="section">
        <SectionHead num="03" title="About" kicker="Notes from the author" />
        <div className="about-body">
          <p className="about-para">
            <span className="dropcap">A</span>I Safety Engineer at Gray Swan AI.
            I work on red teaming AI agents and building safety benchmarks.
            At Gray Swan I focus on automated red teaming (<em className="em">Shade</em>),
            our public red teaming competitions (<em className="em">the Arena</em>),
            and pre release safety evaluations for frontier models.
          </p>
          <p className="about-para">
            Currently interested in <strong>eval awareness</strong> and{" "}
            <strong>automating AI safety research</strong>, in the direction of
            work like <a href="https://alignment.anthropic.com/2025/petri/" target="_blank" rel="noopener" className="inline-link">Petri</a> and <a href="https://arxiv.org/abs/2602.22755v3" target="_blank" rel="noopener" className="inline-link">AuditBench</a>.
          </p>
          <p className="about-para">
            Outside of research, I'm a purple belt in BJJ (10th Planet London)
            turned boulderer, currently projecting V6. Based in London.
          </p>
        </div>
      </section>

      {/* ─────────── Open Source ─────────── */}
      <section id="oss" className="section">
        <SectionHead num="04" title="Open Source" kicker="Shipped into the world" />
        <div className="oss-grid">
          {OSS.map((o, i) => (
            <div key={i} className="oss-card">
              <div className="oss-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="oss-title">{o.title}</div>
              <div className="oss-meta">{o.meta}</div>
              <p className="oss-body">{o.body}</p>
              <div className="oss-links">
                {o.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener"
                    className="oss-link"
                  >
                    {l.label} <span className="contact-arrow">↗</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────── Contact ─────────── */}
      <section id="contact" className="contact">
        <div className="contact-inner">
          <div className="eyebrow">
            <span className="smallcaps contact-eyebrow">05 — Correspondence</span>
          </div>
          <h2 className="contact-head">
            Let's <em className="em-display">talk</em>.
          </h2>
          <p className="contact-lead">
            Interested in Gray Swan, collaborating on research, or just
            doing interesting things. Reach out.
          </p>
          <a href="mailto:mattmdjaga@gmail.com" className="contact-cta">
            mattmdjaga@gmail.com <span className="contact-cta-arrow">→</span>
          </a>
        </div>
      </section>

      {/* ─────────── Footer ─────────── */}
      <footer className="footer">
        <div>© 2026 · Mateusz Dziemian</div>
        <div className="mono">London</div>
        <div>
          <a href="https://x.com/mattmdjaga" target="_blank" rel="noopener" className="foot-link">x</a>
          <span className="foot-dot">·</span>
          <a href="https://www.linkedin.com/in/mateusz-dziemian-28076874/" target="_blank" rel="noopener" className="foot-link">linkedin</a>
          <span className="foot-dot">·</span>
          <a href="https://github.com/mattmdjaga" target="_blank" rel="noopener" className="foot-link">github</a>
        </div>
      </footer>
    </div>
  );
}

// ─────────── Theme toggle ───────────

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className={"tt-track" + (isDark ? " tt-track-dark" : "")}>
        <span className={"tt-thumb" + (isDark ? " tt-thumb-dark" : "")}>
          {isDark ? (
            // moon
            <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
              <path
                d="M12 10.2A5 5 0 0 1 5.8 4 5 5 0 1 0 12 10.2z"
                fill="currentColor"
              />
            </svg>
          ) : (
            // sun
            <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
              <circle cx="8" cy="8" r="3" fill="currentColor" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <rect
                  key={deg}
                  x="7.4"
                  y="0.5"
                  width="1.2"
                  height="2.2"
                  fill="currentColor"
                  transform={`rotate(${deg} 8 8)`}
                />
              ))}
            </svg>
          )}
        </span>
      </span>
    </button>
  );
}

// ─────────── Bits ───────────

function SectionHead({ num, title, kicker }) {
  return (
    <div className="section-head">
      <div className="section-head-left">
        <div className="eyebrow">
          <span className="smallcaps">{num} — {kicker}</span>
        </div>
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="section-rule" />
    </div>
  );
}

function Authors({ text }) {
  const parts = text.split(/(M\.\s?Dziemian)/g);
  return (
    <span>
      {parts.map((p, i) =>
        /^M\.\s?Dziemian$/.test(p)
          ? <strong key={i} className="author-me">{p}</strong>
          : <React.Fragment key={i}>{p}</React.Fragment>
      )}
    </span>
  );
}

function Paper({ paper, idx }) {
  const [open, setOpen] = useState(idx === 0);
  return (
    <article
      className={"paper" + (open ? " paper-open" : "")}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="paper-gutter">
        <div className="paper-num">{String(idx + 1).padStart(2, "0")}</div>
        <div className="paper-year">{paper.venue}</div>
      </div>
      <div className="paper-main">
        <h3 className="paper-title">{paper.title}</h3>
        <div className="paper-authors"><Authors text={paper.authors} /></div>
        {open && (
          <div className="paper-extra">
            <div className="paper-tags">
              {paper.tags.map((t) => <span key={t} className="paper-tag">{t}</span>)}
            </div>
            <div className="paper-links">
              {paper.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  className="paper-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  {l.label} <span className="contact-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="paper-toggle">{open ? "−" : "+"}</div>
    </article>
  );
}

// ─────────── Data ───────────

const CONTACTS = [
  { key: "email", href: "mailto:mattmdjaga@gmail.com" },
  { key: "scholar", href: "https://scholar.google.com/citations?user=5VQMaEEAAAAJ&hl=en" },
  { key: "github", href: "https://github.com/mattmdjaga" },
  { key: "x", href: "https://x.com/mattmdjaga" },
  { key: "huggingface", href: "https://huggingface.co/mattmdjaga" },
  { key: "linkedin", href: "https://www.linkedin.com/in/mateusz-dziemian-28076874/" },
];

const PAPERS = [
  {
    title: "How Vulnerable Are AI Agents to Indirect Prompt Injections? Insights from a Large Scale Public Competition",
    authors: "M. Dziemian, M. Lin, X. Fu, M. Nowak, N. Winter, E. K. Jones, A. Zou, L. Ahmad, K. Chaudhuri, S. Chennabasappa, X. Davies, et al.",
    venue: "Preprint · 2026",
    tags: ["First author", "13 frontier models", "272K+ attacks"],
    links: [{ label: "arxiv", href: "https://arxiv.org/abs/2603.15714" }],
  },
  {
    title: "A New Framework for Cybersecurity Refusals in AI Agents",
    authors: "E. K. Jones, M. Dziemian, M. Fredrikson, J. Z. Kolter",
    venue: "ICML · 2026",
    tags: ["Refusals", "Cybersecurity", "8 frontier models"],
    links: [{ label: "arxiv", href: "https://arxiv.org/abs/2606.02644" }],
  },
  {
    title: "Security Challenges in AI Agent Deployment: Insights from a Large Scale Public Competition",
    authors: "A. Zou, M. Lin, E. K. Jones, M. Nowak, M. Dziemian, N. Winter, A. Grattan, V. Nathanael, et al.",
    venue: "NeurIPS · 2025",
    tags: ["Deployment", "Competition"],
    links: [{ label: "pdf", href: "https://openreview.net/pdf/04ee18b8ef31f3174b11ef48164ec65bb4b5ca6b.pdf" }],
  },
  {
    title: "AgentHarm: A Benchmark for Measuring Harmfulness of LLM Agents",
    authors: "M. Andriushchenko, A. Souly, M. Dziemian, D. Duenas, M. Lin, J. Wang, D. Hendrycks, A. Zou, et al.",
    venue: "ICLR · 2025",
    tags: ["Benchmark", "200+ citations"],
    links: [
      { label: "data", href: "https://huggingface.co/ai-safety-institute/AgentHarm" },
      { label: "pdf", href: "https://arxiv.org/abs/2410.09024" },
    ],
  },
  {
    title: "Deceptive Automated Interpretability: Language Models Coordinating to Fool Oversight Systems",
    authors: "S. Lermen, M. Dziemian, N. Pérez-Campanero Antolín",
    venue: "NeurIPS · 2024 · SATA",
    tags: ["Interpretability", "Workshop"],
    links: [{ label: "pdf", href: "https://arxiv.org/abs/2504.07831" }],
  },
  {
    title: "Applying Refusal Vector Ablation to Llama 3.1 70B Agents",
    authors: "S. Lermen, M. Dziemian, G. Pimpale",
    venue: "NeurIPS · 2024 · SafeGenAi",
    tags: ["Refusal", "Workshop"],
    links: [{ label: "pdf", href: "https://arxiv.org/abs/2410.10871" }],
  },
];

const OSS = [
  {
    title: "AgentHarm",
    meta: "200+ citations · benchmark",
    body: "Open sourced subset of the AgentHarm benchmark. 44 of 110 behaviors publicly available, covering 11 harm categories.",
    links: [
      { label: "huggingface", href: "https://huggingface.co/ai-safety-institute/AgentHarm" },
      { label: "inspect", href: "https://github.com/UKGovernmentBEIS/inspect_evals/tree/main/src/inspect_evals/agentharm" },
      { label: "paper", href: "https://arxiv.org/abs/2410.09024" },
    ],
  },
  {
    title: "segformer_b2_clothes",
    meta: "30,000,000+ downloads",
    body: "Fine tuned SegFormer for body parts and clothing segmentation. One of the most liked segmentation models on Hugging Face.",
    links: [
      { label: "huggingface", href: "https://huggingface.co/mattmdjaga/segformer_b2_clothes" },
    ],
  },
  {
    title: "Contributions",
    meta: "Inspect AI · HF Course",
    body: "PRs to Inspect AI for Hugging Face agent support. Sections on multi modal and generative models for the HuggingFace CV course.",
    links: [
      { label: "github", href: "https://github.com/mattmdjaga" },
    ],
  },
];

// ─────────── Styles ───────────

const siteCss = `
/* Theme tokens */
.site[data-theme="light"] {
  --bg: #F2EEE7;
  --bg-2: #EAE3D6;
  --fg: #1A1815;
  --fg-2: #4A463E;
  --fg-3: #8B8679;
  --rule: rgba(26,24,21,0.22);
  --teal: oklch(0.52 0.08 195);
  --teal-rgb: 32 97 108;
  --invert-bg: #1A1815;
  --invert-fg: #F2EEE7;
}
.site[data-theme="dark"] {
  --bg: #0E0D0B;
  --bg-2: #16140F;
  --fg: #E8E2D5;
  --fg-2: #B5AE9D;
  --fg-3: #6E6A5E;
  --rule: rgba(232,226,213,0.14);
  --teal: oklch(0.78 0.14 195);
  --teal-rgb: 112 214 224;
  --invert-bg: #16140F;
  --invert-fg: #E8E2D5;
}

.site {
  font-family: "Geist", system-ui, sans-serif;
  background: var(--bg);
  color: var(--fg);
  min-height: 100%;
  width: 100%;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  transition: background 0.35s ease, color 0.35s ease;
}
.site a { color: inherit; }
.site ::selection { background: var(--teal); color: var(--bg); }

.mono {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--fg-2);
  text-transform: uppercase;
}
.smallcaps {
  font-family: "Geist", sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--fg-2);
}

/* Chrome */
.chrome {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 20px 48px;
  border-bottom: 1px solid var(--rule);
  background: var(--bg);
  position: sticky;
  top: 0;
  z-index: 10;
}
.chrome-left { display: flex; gap: 8px; align-items: center; }
.chrome-nav { display: flex; gap: 28px; }
.nav-link {
  font-family: "Geist", sans-serif;
  font-size: 13px;
  color: var(--fg-2);
  text-decoration: none;
  letter-spacing: 0.02em;
}
.nav-link:hover { color: var(--teal); }
.chrome-right { display: flex; gap: 16px; align-items: center; justify-content: flex-end; }

/* Theme toggle */
.theme-toggle {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: inherit;
}
.tt-track {
  width: 44px;
  height: 22px;
  border-radius: 12px;
  border: 1px solid var(--rule);
  background: var(--bg-2);
  position: relative;
  display: inline-block;
  transition: all 0.3s ease;
}
.tt-thumb {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--teal);
  color: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease;
  box-shadow: 0 0 0 1px var(--rule);
}
.tt-thumb-dark {
  transform: translateX(22px);
  background: var(--teal);
  box-shadow: 0 0 10px oklch(0.78 0.14 195 / 0.6);
}

/* Hero */
.hero {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  border-bottom: 1px solid var(--rule);
  align-items: start;
}
.hero-left {
  padding: 88px 64px 96px 48px;
  border-right: 1px solid var(--rule);
}
.hero-right {
  padding: 88px 48px 64px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}
.eyebrow { display: flex; align-items: baseline; margin-bottom: 28px; }

.display-name {
  font-family: "Cormorant Garamond", serif;
  font-weight: 400;
  font-size: clamp(64px, 14vw, 128px);
  line-height: 0.9;
  letter-spacing: -0.02em;
  margin: 0 0 40px 0;
  color: var(--fg);
}
.display-name-accent {
  font-style: italic;
  font-weight: 400;
  color: var(--teal);
}

.lead-body {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(18px, 2.4vw, 24px);
  line-height: 1.4;
  font-weight: 400;
  max-width: 560px;
  color: var(--fg);
  margin: 0 0 40px 0;
  text-wrap: pretty;
  overflow-wrap: break-word;
}
.em { font-style: italic; color: var(--teal); font-weight: 500; }
.em-display { font-style: italic; color: var(--teal); }
.inline-link {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  text-decoration-color: var(--teal);
  color: var(--fg);
}

/* Hero portrait */
.portrait-wrap { width: 280px; display: flex; flex-direction: column; }
.portrait-glow {
  width: 280px;
  height: 360px;
  border-radius: 50% 50% 0 0 / 32% 32% 0 0;
  position: relative;
}
.portrait-frame {
  position: absolute;
  inset: 0;
  border-radius: 50% 50% 0 0 / 32% 32% 0 0;
  overflow: hidden;
  background: var(--bg-2);
  box-shadow:
    0 0 0 1px var(--teal),
    0 0 40px 0 rgb(var(--teal-rgb) / 0.35),
    0 0 80px 0 rgb(var(--teal-rgb) / 0.2);
  animation: tealPulse 5s ease-in-out infinite;
}
.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  display: block;
  filter: contrast(1.02) saturate(0.95);
}
@keyframes tealPulse {
  0%, 100% {
    box-shadow:
      0 0 0 1px var(--teal),
      0 0 40px 0 rgb(var(--teal-rgb) / 0.35),
      0 0 80px 0 rgb(var(--teal-rgb) / 0.2);
  }
  50% {
    box-shadow:
      0 0 0 1px var(--teal),
      0 0 60px 0 rgb(var(--teal-rgb) / 0.55),
      0 0 120px 0 rgb(var(--teal-rgb) / 0.3);
  }
}

.hero-meta {
  display: grid;
  border-top: 1px solid var(--rule);
  width: 280px;
}
.meta-row {
  display: grid;
  grid-template-columns: 110px 1fr;
  padding: 12px 0;
  border-bottom: 1px solid var(--rule);
  align-items: baseline;
}
.meta-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-3);
}
.meta-value {
  font-family: "Cormorant Garamond", serif;
  font-size: 22px;
  font-weight: 400;
  color: var(--fg);
}

/* Contact row */
.contact-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--rule);
  max-width: 560px;
}
.contact-link {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px;
  align-items: baseline;
  padding: 14px 12px 14px 0;
  border-bottom: 1px solid var(--rule);
  border-right: 1px solid var(--rule);
  font-family: "Geist", sans-serif;
  font-size: 13px;
  color: var(--fg);
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
  cursor: pointer;
}
.contact-link-hover { background: var(--fg); color: var(--bg); }
.contact-num {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--fg-3);
  padding-left: 12px;
}
.contact-link-hover .contact-num { color: var(--bg); opacity: 0.7; }
.contact-arrow { font-size: 10px; opacity: 0.6; padding-right: 12px; }

/* Stats */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid var(--rule);
}
.stat-cell {
  padding: 40px 40px 32px 40px;
  border-right: 1px solid var(--rule);
}
.stat-num {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(44px, 7vw, 80px);
  line-height: 1;
  letter-spacing: -0.02em;
  font-weight: 400;
  color: var(--teal);
  margin-bottom: 12px;
}
.stat-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-2);
}

/* Section */
.section {
  padding: 96px 48px;
  border-bottom: 1px solid var(--rule);
}
.section-head {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 40px;
  margin-bottom: 56px;
}
.section-title {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(44px, 8vw, 80px);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1;
  margin: 0;
  color: var(--fg);
}
.section-rule {
  width: 280px;
  height: 1px;
  background: var(--fg);
  opacity: 0.85;
  margin-bottom: 18px;
}

/* Papers */
.papers { border-top: 1px solid var(--rule); }
.paper {
  display: grid;
  grid-template-columns: 96px 1fr auto;
  gap: 32px;
  padding: 24px 0;
  border-bottom: 1px solid var(--rule);
  cursor: pointer;
  transition: background 0.15s;
}
.paper-open { background: var(--bg-2); padding-left: 16px; padding-right: 16px; }
.paper-gutter {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 4px;
}
.paper-num {
  font-family: "Cormorant Garamond", serif;
  font-size: 36px;
  color: var(--teal);
  line-height: 1;
  font-weight: 400;
}
.paper-year {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-3);
}
.paper-main { padding-right: 32px; }
.paper-title {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(20px, 3.2vw, 30px);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.005em;
  margin: 0 0 12px 0;
  color: var(--fg);
  text-wrap: pretty;
}
.paper-authors {
  font-size: 13px;
  line-height: 1.6;
  color: var(--fg-2);
  max-width: 820px;
}
.author-me { color: var(--teal); font-weight: 600; }
.paper-extra {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.paper-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.paper-tag {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  border: 1px solid var(--fg);
  color: var(--fg);
}
.paper-links { display: flex; gap: 20px; }
.paper-link {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--teal);
  text-decoration: none;
  border-bottom: 1px solid var(--teal);
  padding-bottom: 2px;
}
.paper-toggle {
  font-family: "Cormorant Garamond", serif;
  font-size: 28px;
  color: var(--fg-3);
  align-self: start;
  padding-right: 16px;
  padding-top: 4px;
}

/* About */
.about-body {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(19px, 2.8vw, 26px);
  line-height: 1.45;
  color: var(--fg);
  max-width: 820px;
}
.about-para { margin: 0 0 24px 0; text-wrap: pretty; }
.dropcap {
  font-family: "Cormorant Garamond", serif;
  font-size: 84px;
  line-height: 0.85;
  float: left;
  padding: 8px 12px 0 0;
  color: var(--teal);
  font-weight: 500;
}

/* OSS */
.oss-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--rule);
  border-left: 1px solid var(--rule);
}
.oss-card {
  padding: 36px 32px;
  border-right: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 280px;
  background: var(--bg);
}
.oss-num {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--fg-3);
}
.oss-title {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(26px, 3.6vw, 36px);
  font-weight: 400;
  letter-spacing: -0.01em;
  color: var(--fg);
  line-height: 1.05;
  word-break: break-word;
}
.oss-meta {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--teal);
}
.oss-body {
  font-size: 14px;
  line-height: 1.6;
  color: var(--fg-2);
  margin: 0;
  flex: 1;
}
.oss-links { display: flex; gap: 16px; flex-wrap: wrap; }
.oss-link {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg);
  text-decoration: none;
  border-bottom: 1px solid var(--fg);
  padding-bottom: 2px;
}

/* Contact */
.contact {
  padding: 140px 48px;
  background: var(--invert-bg);
  color: var(--invert-fg);
  border-bottom: 1px solid var(--invert-bg);
}
.site[data-theme="dark"] .contact { background: var(--bg-2); color: var(--fg); }
.contact-eyebrow { color: rgba(232, 226, 213, 0.55) !important; }
.site[data-theme="dark"] .contact-eyebrow { color: var(--fg-3) !important; }

.contact-inner { max-width: 820px; }
.contact-head {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(72px, 16vw, 160px);
  line-height: 1;
  font-weight: 300;
  letter-spacing: -0.02em;
  margin: 16px 0 28px 0;
  color: inherit;
}
.contact-lead {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(18px, 2.6vw, 26px);
  line-height: 1.4;
  color: rgba(242, 238, 231, 0.75);
  margin: 0 0 44px 0;
  max-width: 580px;
}
.site[data-theme="dark"] .contact-lead { color: var(--fg-2); }
.contact-cta {
  display: inline-flex;
  align-items: baseline;
  gap: 18px;
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: clamp(22px, 4.5vw, 44px);
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 6px;
  word-break: break-word;
}
.contact-cta-arrow { font-size: 30px; font-style: normal; }

/* Footer */
.footer {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 24px 48px;
  font-size: 12px;
  font-family: "Geist", sans-serif;
  color: var(--fg-2);
  background: var(--bg);
}
.foot-link { color: var(--fg-2); text-decoration: none; padding: 0 6px; }
.foot-dot { color: var(--fg-3); }

.site, .site *, .site *::before, .site *::after { box-sizing: border-box; }
.site img:not(.portrait-img) { max-width: 100%; height: auto; }

/* ─── Tablet (≤ 900px) ─── */
@media (max-width: 900px) {
  .chrome { padding: 16px 24px; gap: 16px; }
  .chrome-nav { gap: 18px; }
  .chrome-right { gap: 12px; }
  .nav-link { font-size: 12px; }

  .hero { grid-template-columns: 1fr; }
  .hero-left {
    padding: 56px 24px 48px 24px;
    border-right: none;
    order: 1;
  }
  .hero-right {
    padding: 24px 24px 56px 24px;
    border-top: 1px solid var(--rule);
    order: 2;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 32px;
    align-items: flex-start;
  }
  .portrait-wrap, .portrait-glow, .hero-meta { width: 220px; }
  .portrait-glow { height: 280px; }

  .stats { grid-template-columns: repeat(2, 1fr); }
  .stat-cell:nth-child(2n) { border-right: none; }
  .stat-cell:nth-child(-n+2) { border-bottom: 1px solid var(--rule); }
  .stat-cell { padding: 28px 24px 24px 24px; }

  .section { padding: 64px 24px; }
  .section-head { gap: 24px; margin-bottom: 36px; }
  .section-rule { width: 120px; }

  .oss-grid { grid-template-columns: repeat(2, 1fr); }
  .oss-card { padding: 28px 24px; min-height: 240px; }

  .contact { padding: 96px 24px; }
  .footer { padding: 20px 24px; }
}

/* ─── Mobile (≤ 640px) ─── */
@media (max-width: 640px) {
  .chrome {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    gap: 12px;
  }
  .chrome-nav { display: none; }
  .chrome-right { gap: 10px; }
  .chrome-right .mono { display: none; }

  .hero-left { padding: 40px 20px 32px 20px; }
  .hero-right {
    padding: 32px 20px 48px 20px;
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
  }
  .portrait-wrap { width: 100%; align-items: center; }
  .portrait-glow { width: 220px; height: 280px; align-self: center; }
  .hero-meta { width: 100%; max-width: 320px; align-self: center; }
  .meta-row { grid-template-columns: 90px 1fr; }

  .display-name { margin-bottom: 28px; }
  .lead-body { margin-bottom: 32px; }

  .contact-row { grid-template-columns: 1fr; max-width: none; }
  .contact-link { border-right: none; padding: 14px 0; }
  .contact-num { padding-left: 4px; }
  .contact-arrow { padding-right: 4px; }

  .stats { grid-template-columns: repeat(2, 1fr); }
  .stat-cell { padding: 22px 18px 20px 18px; }

  .section { padding: 56px 20px; }
  .section-head {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 28px;
  }
  .section-rule { display: none; }

  .paper {
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "gutter toggle"
      "main main";
    gap: 12px 16px;
    padding: 20px 0;
  }
  .paper-open { padding: 20px 12px; }
  .paper-gutter {
    grid-area: gutter;
    flex-direction: row;
    align-items: baseline;
    gap: 12px;
    padding-left: 0;
  }
  .paper-num { font-size: 24px; }
  .paper-main { grid-area: main; padding-right: 0; }
  .paper-toggle { grid-area: toggle; padding-right: 4px; padding-top: 0; }
  .paper-links { gap: 14px; flex-wrap: wrap; }
  .paper-tags { gap: 6px; }

  .about-body { font-size: clamp(17px, 4.5vw, 22px); }
  .dropcap { font-size: 60px; padding: 4px 10px 0 0; }

  .oss-grid { grid-template-columns: 1fr; }
  .oss-card { min-height: 0; padding: 24px 20px; }

  .contact { padding: 80px 20px; }
  .contact-cta { gap: 12px; }

  .footer {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 20px 20px;
    text-align: left;
  }
  .footer .mono { justify-self: start; }
  .footer > div:last-child { padding-left: 0; }
  .foot-link:first-child { padding-left: 0; }
}

/* ─── Small mobile (≤ 380px) ─── */
@media (max-width: 380px) {
  .stats { grid-template-columns: 1fr 1fr; }
  .meta-row { grid-template-columns: 70px 1fr; }
  .meta-value { font-size: 18px; }
}
`;

window.Site = Site;
