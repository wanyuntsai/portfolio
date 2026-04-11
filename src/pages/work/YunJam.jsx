import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../../components/AnimatedSection';
import { useToc } from '../../hooks/useToc';

/* ─── Design tokens ───────────────────────────────────────────────────────── */
const C = {
  bg:      '#f0ece3',
  text:    '#1a1815',
  muted:   '#6b6560',
  border:  '#d9d3c8',
  accent:  '#b8813a',
  pillBg:  '#e8e1d6',
  white:   '#faf8f4',
};

/* ─── Tiny helpers ────────────────────────────────────────────────────────── */
const Pill = ({ children }) => (
  <span style={{ background: C.pillBg, color: C.muted, border: `1px solid ${C.border}` }}
    className="inline-block rounded-full px-3 py-0.5 text-xs font-mono tracking-wide">
    {children}
  </span>
);

const Divider = () => (
  <hr style={{ borderColor: C.border }} className="border-t my-0" />
);

const SectionLabel = ({ children }) => (
  <p style={{ color: C.accent }} className="font-mono text-xs tracking-[0.2em] uppercase mb-6">
    {children}
  </p>
);

const Heading = ({ children, className = '' }) => (
  <h2 style={{ fontFamily: '"DM Serif Display", serif', color: C.text }}
    className={`text-2xl md:text-3xl leading-snug mb-4 ${className}`}>
    {children}
  </h2>
);

const Body = ({ children, className = '' }) => (
  <p style={{ color: C.muted, fontFamily: '"DM Sans", sans-serif' }}
    className={`text-base leading-relaxed ${className}`}>
    {children}
  </p>
);

/* ─── Data ────────────────────────────────────────────────────────────────── */
const tools = ['HTML', 'CSS', 'JavaScript', 'Spotify Embed API', 'Claude AI'];

const decisions = [
  {
    num: '01',
    title: 'Grid cards → turntable UI',
    body: 'The first version was a 2×2 grid of square cards. I saw a DJ simulator interface and thought: what if selecting a song felt like dropping a tonearm? That visual metaphor drove the whole redesign — the record spins, the arm drops, the music starts.',
  },
  {
    num: '02',
    title: 'Embed over full API',
    body: "Spotify's Web Playback SDK enables full custom controls — but requires a Premium account. That breaks the experience for most visitors. The Embed iframe works for everyone, no login needed. I chose reach over control.",
  },
  {
    num: '03',
    title: 'Tool, not showcase',
    body: 'The biggest shift: instead of showing my four songs, I made it so anyone can build their own. Paste a Spotify URL → auto-fetch metadata via oEmbed → add a mood tag → share via URL. The playlist is yours, not mine.',
  },
];

const myDecisions = [
  'The concept (personal playlist → shareable tool)',
  'Visual direction (turntable aesthetic, warm cream palette)',
  'Which features to build and in what order',
  'Song selection and mood tags',
  'Choosing Spotify Embed over the full SDK',
];

const claudeContributions = [
  'Translating design directions into working HTML / CSS / JS',
  'Suggesting the oEmbed API for auto-fetching song info',
  'Implementing URL hash encoding for the share feature',
  'Debugging issues throughout',
];

const features = [
  { icon: '◉', label: 'Turntable UI', desc: 'Spinning vinyl with CSS animation, tonearm drops on track select' },
  { icon: '▶', label: 'Spotify Embed playback', desc: 'Real in-page audio — no login required for most users' },
  { icon: '+', label: 'Add any song', desc: 'Paste a Spotify URL and the song appears instantly' },
  { icon: '⟳', label: 'Auto-fetch metadata', desc: 'Title, artist, and album art pulled via oEmbed API — no API key needed' },
  { icon: '⤴', label: 'Share your Jam', desc: 'Entire playlist encoded into a single shareable URL' },
  { icon: '✎', label: 'Editable playlist name', desc: 'Click the title to rename your Jam' },
  { icon: '◫', label: 'Persistent storage', desc: 'localStorage keeps your playlist between sessions' },
];

const learned = [
  'Browser-based audio limitations shape product decisions more than any API feature list.',
  'The difference between auth-gated APIs (Web Playback SDK) and open ones (oEmbed) is a UX decision, not just a technical one.',
  'Encoding structured data into URLs is a lightweight, dependency-free way to enable shareable state.',
  'Working with AI on code is less about prompting and more about knowing what you want — clarity of direction is everything.',
];

/* ─── Component ───────────────────────────────────────────────────────────── */
function YunJam() {
  const { tocItems, activeId, showToc, scrollToSection } = useToc();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  /* Inject fonts */
  useEffect(() => {
    document.title = 'Yun Jam | Yun Tsai';
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500&display=swap';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
      setShowBackToTop(scrolled > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 z-60 h-0.5 transition-all duration-100"
        style={{ width: `${scrollProgress}%`, background: C.accent }} />

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-sm transition-opacity hover:opacity-70"
          style={{ background: C.accent, color: '#fff' }}
          aria-label="Back to top"
        >↑</button>
      )}

      <PageTransition>
      <div style={{ background: C.bg, color: C.text, fontFamily: '"DM Sans", sans-serif' }} className="min-h-screen pt-20">

        {/* ── Breadcrumb ─────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-5 md:px-16 xl:px-20 pt-4 md:pt-6">
          <div className="flex items-center gap-2 text-sm font-mono" style={{ color: C.muted }}>
            <Link to="/work" className="hover:underline" style={{ color: C.accent }}>Work</Link>
            <span>›</span>
            <span style={{ color: C.text }}>Yun Jam</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            1. HERO
        ══════════════════════════════════════════════════════════════ */}
        <header className="max-w-7xl mx-auto px-5 md:px-16 xl:px-20 pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="max-w-3xl">
            <h1 style={{ fontFamily: '"DM Serif Display", serif', color: C.text }}
              className="text-5xl md:text-7xl leading-none mb-4">
              Yun Jam
            </h1>
            <p style={{ color: C.muted }} className="text-lg md:text-xl leading-relaxed mb-8">
              A static class assignment turned into a shareable, interactive music tool — built with vanilla web and a clear product vision.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {tools.map(t => <Pill key={t}>{t}</Pill>)}
              <Pill>2026</Pill>
            </div>
            <a
              href="https://wanyuntsai.github.io/yunjam/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-mono transition-opacity hover:opacity-80"
              style={{ background: C.accent, color: '#fff' }}
            >
              Live Demo ↗
            </a>
          </div>
        </header>

        <Divider />

        {/* ── TOC + Body layout ──────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-5 md:px-16 xl:px-20 lg:flex lg:gap-16">

          {/* TOC */}
          <aside className="hidden lg:block w-56 shrink-0 pt-16">
            <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: C.muted }}>Contents</p>
            <div className={`sticky top-24 transition-opacity duration-500 ${showToc ? 'opacity-100' : 'opacity-0'}`}>
              <ul className="space-y-1">
                {tocItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-left text-sm py-1 pl-3 transition-all duration-200 font-mono"
                      style={{
                        color: activeId === item.id ? C.accent : C.muted,
                        borderLeft: `2px solid ${activeId === item.id ? C.accent : 'transparent'}`,
                      }}
                    >
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-10 p-4 rounded-xl" style={{ background: C.pillBg, border: `1px solid ${C.border}` }}>
                <p className="text-sm font-medium mb-1" style={{ color: C.text }}>More Work</p>
                <p className="text-xs mb-3" style={{ color: C.muted }}>Explore other case studies.</p>
                <Link to="/work" className="text-xs font-mono hover:underline" style={{ color: C.accent }}>
                  View all work →
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 py-16 space-y-0">

            {/* ══ 2. Overview ════════════════════════════════════════════ */}
            <section className="pb-14">
              <SectionLabel>Overview</SectionLabel>
              <Heading>What is Yun Jam?</Heading>
              <div className="max-w-2xl space-y-4">
                <Body>
                  Yun Jam started as a class assignment — a simple HTML playlist page with four songs I liked. It ended up becoming a fully interactive music tool that lets anyone build and share their own curated playlist in minutes, no account required.
                </Body>
                <Body>
                  The core question throughout the project: <em style={{ color: C.text }}>how do I make this useful for someone who isn't me?</em> That question drove every design and product decision.
                </Body>
              </div>
            </section>

            <Divider />

            {/* ══ 3. The Problem ═════════════════════════════════════════ */}
            <section className="py-14">
              <SectionLabel>The Problem</SectionLabel>
              <Heading>What was wrong with V1</Heading>
              <div className="max-w-2xl">
                <Body className="mb-6">
                  The original assignment was a static webpage: four song cards, a background image, some hover effects. It worked, but it felt like a template. I wanted it to feel like <em style={{ color: C.text }}>mine</em> — and eventually, like everyone else's too.
                </Body>
                <ul className="space-y-3">
                  {[
                    'Cards linked out to Spotify — broke the in-page experience',
                    'No actual music playback on the page',
                    'Only my four songs, hardcoded — no one else could use it',
                  ].map((p, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0 font-mono"
                        style={{ border: `1px solid #e09090`, color: '#c06060', background: '#fdf0f0' }}>✕</span>
                      <span style={{ color: C.muted, fontFamily: '"DM Sans", sans-serif' }} className="text-base">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <Divider />

            {/* ══ 4. Design Decisions ════════════════════════════════════ */}
            <section className="py-14">
              <SectionLabel>Design Decisions</SectionLabel>
              <Heading>Three calls that shaped the project</Heading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
                {decisions.map(d => (
                  <div key={d.num} className="rounded-2xl p-6" style={{ background: C.white, border: `1px solid ${C.border}` }}>
                    <p className="font-mono text-2xl mb-3" style={{ color: C.border }}>{d.num}</p>
                    <p style={{ fontFamily: '"DM Serif Display", serif', color: C.text }} className="text-lg leading-snug mb-3">
                      {d.title}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{d.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ══ 5. AI Collaboration ════════════════════════════════════ */}
            <section className="py-14">
              <SectionLabel>Process</SectionLabel>
              <Heading>How I worked with Claude</Heading>
              <div className="max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* My decisions */}
                  <div className="rounded-2xl p-6" style={{ background: C.white, border: `1px solid ${C.border}` }}>
                    <p className="font-mono text-xs tracking-[0.15em] uppercase mb-4" style={{ color: C.accent }}>My decisions</p>
                    <ul className="space-y-2">
                      {myDecisions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.muted }}>
                          <span className="mt-1 shrink-0" style={{ color: C.accent }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Claude */}
                  <div className="rounded-2xl p-6" style={{ background: C.white, border: `1px solid ${C.border}` }}>
                    <p className="font-mono text-xs tracking-[0.15em] uppercase mb-4" style={{ color: C.muted }}>Claude's contributions</p>
                    <ul className="space-y-2">
                      {claudeContributions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.muted }}>
                          <span className="mt-1 shrink-0" style={{ color: C.border }}>◆</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="text-sm italic" style={{ color: C.muted }}>
                  I treat this like a designer working with a developer — I set direction, Claude executed. Neither part works without the other.
                </p>
              </div>
            </section>

            <Divider />

            {/* ══ 6. Features ════════════════════════════════════════════ */}
            <section className="py-14">
              <SectionLabel>Features</SectionLabel>
              <Heading>What it does</Heading>
              <div className="max-w-2xl space-y-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-4 py-3" style={{ borderBottom: `1px solid ${C.border}` }}>
                    <span className="text-lg w-6 text-center shrink-0 mt-0.5" style={{ color: C.accent }}>{f.icon}</span>
                    <div>
                      <p className="text-sm font-medium mb-0.5" style={{ color: C.text, fontFamily: '"DM Sans", sans-serif' }}>{f.label}</p>
                      <p className="text-sm" style={{ color: C.muted }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ══ 7. What I Learned ══════════════════════════════════════ */}
            <section className="py-14">
              <SectionLabel>Takeaways</SectionLabel>
              <Heading>What I learned</Heading>
              <div className="max-w-2xl space-y-5">
                {learned.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="font-mono text-xs mt-1 shrink-0 w-5" style={{ color: C.accent }}>0{i + 1}</span>
                    <p className="text-base leading-relaxed" style={{ color: C.muted }}>{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ══ 8. Reflection ══════════════════════════════════════════ */}
            <section className="py-14">
              <SectionLabel>Reflection</SectionLabel>
              <div className="max-w-2xl space-y-5">
                <Body>
                  There's a version of this project where I hand-wrote every line of code myself, and it probably would have looked much simpler and taken much longer. Using AI as a collaborator let me focus on the parts I actually care about — the concept, the feel, the user experience — and ship something I'm proud of.
                </Body>
                <p style={{ fontFamily: '"DM Serif Display", serif', color: C.text }}
                  className="text-xl md:text-2xl leading-snug">
                  "The question isn't really 'did you write the code?' It's 'did you make the thing?' I made this."
                </p>
                <div className="pt-2">
                  <a
                    href="https://wanyuntsai.github.io/yunjam/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-mono transition-opacity hover:opacity-80"
                    style={{ background: C.accent, color: '#fff' }}
                  >
                    Try Yun Jam ↗
                  </a>
                </div>
              </div>
            </section>

            <Divider />

            {/* ══ 9. Footer note ═════════════════════════════════════════ */}
            <footer className="py-10">
              <p className="font-mono text-xs" style={{ color: C.border }}>
                Built by Yun, with Claude · 2026
              </p>
            </footer>

          </div>
        </div>
      </div>
      </PageTransition>
    </>
  );
}

export default YunJam;
