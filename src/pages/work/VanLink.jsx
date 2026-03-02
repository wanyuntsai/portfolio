import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// ─── Simple fade-in hook ──────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100", "translate-y-0");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Section wrapper with fade ───────────────────────────────────
function FadeSection({ children, className = "", delay = 0 }) {
  const ref = useFadeIn();
  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-6 transition-all duration-700 ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Stat card ───────────────────────────────────────────────────
function StatCard({ number, label, accent = false }) {
  return (
    <div className={`border px-6 py-5 ${accent ? "border-[#0A2A5A] bg-[#0A2A5A]" : "border-gray-200"}`}>
      <p className={`font-mono text-3xl font-bold tracking-tight ${accent ? "text-white" : "text-[#0A2A5A]"}`}>
        {number}
      </p>
      <p className={`font-mono text-xs mt-1 ${accent ? "text-[#00AEEF]" : "text-gray-500"}`}>
        {label}
      </p>
    </div>
  );
}

// ─── Tag pill ────────────────────────────────────────────────────
function Tag({ children, variant = "outline" }) {
  const styles = {
    outline: "border border-[#0A2A5A] text-[#0A2A5A]",
    filled: "bg-[#0A2A5A] text-white",
    blue: "bg-[#00AEEF] text-white",
    gold: "bg-[#FFB400] text-[#0A2A5A]",
  };
  return (
    <span className={`font-mono text-xs px-3 py-1 rounded-full ${styles[variant]}`}>
      {children}
    </span>
  );
}

// ─── Section label ───────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p className="font-mono text-xs text-[#00AEEF] uppercase tracking-widest mb-3">
      {children}
    </p>
  );
}

// ─── Divider ─────────────────────────────────────────────────────
function Divider() {
  return <div className="w-full h-px bg-gray-200 my-16" />;
}

// ─── Iteration row ───────────────────────────────────────────────
function IterationRow({ issue, solution, before, after }) {
  return (
    <div className="border border-gray-200 overflow-hidden">
      <div className="grid md:grid-cols-2">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200 bg-[#FAFAFA]">
          <p className="font-mono text-xs text-[#FFB400] uppercase tracking-widest mb-2">Issue</p>
          <p className="text-sm text-gray-700 leading-relaxed">{issue}</p>
          {before && (
            <div className="mt-4 bg-white border border-gray-200 rounded p-3">
              <p className="font-mono text-xs text-gray-400 mb-2">Before</p>
              <p className="text-xs text-gray-600 leading-relaxed">{before}</p>
            </div>
          )}
        </div>
        <div className="p-6 bg-white">
          <p className="font-mono text-xs text-[#2D9E5F] uppercase tracking-widest mb-2">Solution</p>
          <p className="text-sm text-gray-700 leading-relaxed">{solution}</p>
          {after && (
            <div className="mt-4 bg-[#F0FAF5] border border-[#C3E6D3] rounded p-3">
              <p className="font-mono text-xs text-[#2D9E5F] mb-2">After</p>
              <p className="text-xs text-gray-600 leading-relaxed">{after}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Bar chart row ───────────────────────────────────────────────
function BarRow({ label, value, max = 20, accent = false }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-3 group">
      <p className="font-mono text-xs text-gray-500 w-48 shrink-0 truncate group-hover:text-[#0A2A5A] transition-colors">
        {label}
      </p>
      <div className="flex-1 h-5 bg-gray-100 relative overflow-hidden rounded-sm">
        <div
          className={`h-full transition-all duration-1000 ${accent ? "bg-[#0A2A5A]" : "bg-[#00AEEF]"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-xs text-gray-500 w-6 text-right">{value}</span>
    </div>
  );
}

// ─── Journey stage ───────────────────────────────────────────────
function JourneyStage({ stage, action, thought, opportunity, mood }) {
  const moodColor = mood === "frustrated" ? "bg-red-100 text-red-600" : mood === "neutral" ? "bg-gray-100 text-gray-500" : "bg-green-100 text-green-600";
  return (
    <div className="border border-gray-200 flex flex-col">
      <div className="bg-[#0A2A5A] px-4 py-3">
        <p className="font-mono text-xs text-[#00AEEF] uppercase tracking-widest">{stage}</p>
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="font-mono text-[10px] text-gray-400 uppercase mb-1">Action</p>
          <p className="text-xs text-gray-700 leading-relaxed">{action}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] text-gray-400 uppercase mb-1">Thought</p>
          <p className="text-xs text-gray-500 italic leading-relaxed">"{thought}"</p>
        </div>
        <div className="mt-auto">
          <p className="font-mono text-[10px] text-[#00AEEF] uppercase mb-1">Opportunity</p>
          <p className="text-xs text-[#0A2A5A] leading-relaxed font-medium">{opportunity}</p>
        </div>
      </div>
      <div className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-center ${moodColor}`}>
        {mood}
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────
export default function VanLink() {
  const [activeTab, setActiveTab] = useState("stored-value");

  const journeyStages = [
    {
      stage: "Leaving Class",
      action: "Opens Google Maps to find fastest bus route to library shift",
      thought: "If I take this bus, I should make it on time… I hope there are no delays.",
      opportunity: "Integrate real-time transit data & alternative route suggestions",
      mood: "neutral",
    },
    {
      stage: "Getting on Bus",
      action: "Realizes the new month started — monthly pass still not activated",
      thought: "Not again… Why can't this just be automatic?",
      opportunity: "Auto-activate monthly student pass at start of each month",
      mood: "frustrated",
    },
    {
      stage: "Checking Balance",
      action: "Opens Compass Card website, manually copies card number — $1.40 left",
      thought: "I shouldn't have to do this manually every single time.",
      opportunity: "Save card details securely; show live balance in-app",
      mood: "frustrated",
    },
    {
      stage: "Getting Off Early",
      action: "Exits 2 stops early to reach a kiosk before next commute",
      thought: "My regular stop has no machine. I just hope I get to work on time.",
      opportunity: "Mobile top-up with instant sync; show nearby kiosks on map",
      mood: "frustrated",
    },
    {
      stage: "Planning to Practice",
      action: "Checks Google Maps again — a delay forces him to run for his connection",
      thought: "This day is already complicated enough.",
      opportunity: "Push delay notifications + predictive Plan B routing",
      mood: "frustrated",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── Back nav ─────────────────────────────────────────── */}
      <div className="px-6 md:px-16 pt-8">
        <Link
          to="/work"
          className="font-mono text-xs text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-2"
        >
          ← Back to Work
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 pt-12 pb-16">
        <FadeSection>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Tag variant="filled">Transit · Navigation</Tag>
            <Tag variant="blue">UX Research</Tag>
            <Tag variant="blue">UI Design</Tag>
            <Tag variant="blue">Usability Testing</Tag>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#0A2A5A] leading-tight tracking-tight max-w-4xl">
            VanLink
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
            Unified Transit Navigation & Fare Management for Metro Vancouver — one app to replace the fragmented mess of Google Maps, the Compass Card website, and physical kiosks.
          </p>
        </FadeSection>

        {/* Hero meta strip */}
        <FadeSection delay={100} className="mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
            {[
              { label: "Role", value: "UX Research · UI Design · Prototyping · Testing" },
              { label: "Team", value: "Yun, Bruno, Luisa, Mohamed" },
              { label: "Tools", value: "Figma · Maze · Google Forms" },
              { label: "Course", value: "UI/UX Strategy 2 · BCIT" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white px-5 py-4">
                <p className="font-mono text-[10px] text-[#00AEEF] uppercase tracking-widest mb-1">{label}</p>
                <p className="text-xs text-gray-700 leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* Prototype CTA */}
        <FadeSection delay={160} className="mt-6 flex flex-wrap gap-3 items-center">
          <a
            href="https://www.figma.com/design/kPGga8an4mCsdYCad6qXuy/VanLink_refined?node-id=0-1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0A2A5A] text-white font-mono text-xs px-5 py-3 rounded-full hover:bg-[#00AEEF] transition-colors"
          >
            View Figma Prototype →
          </a>
        </FadeSection>
      </section>

      <Divider />

      {/* ── 01 Problem & Opportunity ─────────────────────────── */}
      <section className="px-6 md:px-16 pb-16">
        <FadeSection>
          <SectionLabel>01 — Problem & Opportunity</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A2A5A] mb-8">
            The Fragmented Transit Experience
          </h2>
        </FadeSection>
        <div className="grid md:grid-cols-2 gap-6">
          <FadeSection delay={60}>
            <div className="border border-gray-200 p-6 h-full">
              <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">Problem</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Public transit users in Metro Vancouver juggle multiple disconnected tools — Google Maps for navigation, the Compass Card website for balance checks, and physical kiosks to reload or renew passes. This fragmentation creates confusion, delays, and unnecessary cognitive load during daily commutes.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 italic">"I just want to relax on my way home. Managing my commute shouldn't be this complicated." — Ryan, our persona</p>
              </div>
            </div>
          </FadeSection>
          <FadeSection delay={120}>
            <div className="border border-[#0A2A5A] bg-[#0A2A5A] p-6 h-full">
              <p className="font-mono text-xs text-[#00AEEF] uppercase tracking-widest mb-3">Opportunity</p>
              <p className="text-sm text-white leading-relaxed">
                Design a unified mobile experience — VanLink — that combines real-time transit navigation, Compass Card wallet management, and in-app top-up or pass renewal into one seamless interface.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Real-time tracking", "Wallet integration", "Auto-renewal", "Smart routing"].map(f => (
                  <span key={f} className="font-mono text-[10px] px-3 py-1 border border-[#00AEEF] text-[#00AEEF] rounded-full">{f}</span>
                ))}
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      <Divider />

      {/* ── 02 User Research ─────────────────────────────────── */}
      <section className="px-6 md:px-16 pb-16">
        <FadeSection>
          <SectionLabel>02 — User Research</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A2A5A] mb-2">
            20-Participant Survey
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mb-8">
            An anonymous 10-question Google Forms survey targeting student transit users in Metro Vancouver — the highest-frequency rider group. Mixed format: multiple choice, rating scales, and open text.
          </p>
        </FadeSection>

        {/* Stats row */}
        <FadeSection delay={60} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard number="20" label="Survey Participants" accent />
          <StatCard number="55%" label="Use Transit Daily" />
          <StatCard number="80%" label="Primary Purpose: School" accent />
          <StatCard number="75%" label="Want a Unified App" />
        </FadeSection>

        <div className="grid md:grid-cols-2 gap-10">
          <FadeSection delay={80}>
            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">Top Frustrations</p>
            <div className="flex flex-col gap-3">
              <BarRow label="Manual student pass activation" value={14} accent />
              <BarRow label="Data not updated in real time" value={7} />
              <BarRow label="Too many apps/websites needed" value={4} />
              <BarRow label="Hard to find transfer info" value={4} />
              <BarRow label="Balance not syncing quickly" value={4} />
              <BarRow label="Payment / reload too complex" value={3} />
            </div>
          </FadeSection>
          <FadeSection delay={120}>
            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">Most Wanted Features</p>
            <div className="flex flex-col gap-3">
              <BarRow label="Real-time bus/SkyTrain tracking" value={15} accent />
              <BarRow label="Auto-activation for student pass" value={14} accent />
              <BarRow label="Compass Card balance display" value={12} />
              <BarRow label="In-app top-up / pass renewal" value={10} />
              <BarRow label="Low-balance reminders" value={10} />
              <BarRow label="Smart route suggestions" value={7} />
            </div>
          </FadeSection>
        </div>

        <FadeSection delay={160} className="mt-8 border-l-2 border-[#00AEEF] pl-5">
          <p className="font-mono text-xs text-[#00AEEF] uppercase tracking-widest mb-2">Key Insight</p>
          <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
            The single largest pain point — manually activating the monthly student pass — affected 14 of 20 respondents. Automation of this one feature alone could meaningfully reduce daily friction for the core user group.
          </p>
        </FadeSection>
      </section>

      <Divider />

      {/* ── 03 UX Artifacts ──────────────────────────────────── */}
      <section className="px-6 md:px-16 pb-16">
        <FadeSection>
          <SectionLabel>03 — UX Artifacts</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A2A5A] mb-8">
            Persona & Journey Map
          </h2>
        </FadeSection>

        {/* Persona card */}
        <FadeSection delay={60}>
          <div className="border border-gray-200 mb-10 overflow-hidden">
            <div className="bg-[#0A2A5A] px-6 py-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="font-mono text-xs text-[#00AEEF] uppercase tracking-widest mb-1">User Persona</p>
                <h3 className="text-white font-bold text-lg">Ryan Wong, 21</h3>
                <p className="text-[#8BBCD4] text-sm">Student & Library Assistant · Metro Vancouver · Daily transit user</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["Ambitious", "Organized", "Tech-Savvy", "Social"].map(t => (
                  <span key={t} className="font-mono text-[10px] px-3 py-1 border border-[#00AEEF] text-[#00AEEF] rounded-full">{t}</span>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-px bg-gray-200">
              <div className="bg-white p-5">
                <p className="font-mono text-[10px] text-[#00AEEF] uppercase tracking-widest mb-3">Goals</p>
                <ul className="text-xs text-gray-600 leading-relaxed space-y-2">
                  <li>→ Get to school, work & football practice on time</li>
                  <li>→ Have all transit info in one place</li>
                  <li>→ Avoid unexpected empty-balance situations</li>
                </ul>
              </div>
              <div className="bg-white p-5">
                <p className="font-mono text-[10px] text-red-400 uppercase tracking-widest mb-3">Frustrations</p>
                <ul className="text-xs text-gray-600 leading-relaxed space-y-2">
                  <li>→ Late arrivals from unreliable transit info</li>
                  <li>→ Juggling Google Maps + Compass website + kiosks</li>
                  <li>→ Monthly student pass activation — every single month</li>
                  <li>→ Balance not syncing after reload</li>
                </ul>
              </div>
              <div className="bg-white p-5">
                <p className="font-mono text-[10px] text-[#2D9E5F] uppercase tracking-widest mb-3">Needs</p>
                <ul className="text-xs text-gray-600 leading-relaxed space-y-2">
                  <li>→ Single app for navigation + card management</li>
                  <li>→ Automatic pass activation + low-balance alerts</li>
                  <li>→ Real-time bus / SkyTrain updates</li>
                  <li>→ Reliable delay notifications</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* Journey map — horizontal scroll on mobile */}
        <FadeSection delay={100}>
          <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">Journey Map — Ryan's Worst Commute</p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {journeyStages.map((s) => (
              <JourneyStage key={s.stage} {...s} />
            ))}
          </div>
        </FadeSection>
      </section>

      <Divider />

      {/* ── 04 Design Process ────────────────────────────────── */}
      <section className="px-6 md:px-16 pb-16">
        <FadeSection>
          <SectionLabel>04 — Design Process</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A2A5A] mb-8">
            Think → Make → Check
          </h2>
        </FadeSection>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <FadeSection delay={60}>
            <div className="border border-gray-200 p-6">
              <p className="font-mono text-xs text-[#00AEEF] uppercase tracking-widest mb-3">Design System</p>
              <div className="flex gap-3 mb-4">
                {[["#0A2A5A", "Navy"], ["#00AEEF", "Blue"], ["#FFB400", "Gold"], ["#F2F4F8", "Light"]].map(([hex, name]) => (
                  <div key={hex} className="text-center">
                    <div className="w-8 h-8 rounded-full border border-gray-200 mb-1" style={{ background: hex }} />
                    <p className="font-mono text-[9px] text-gray-400">{name}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Palette mirrors TransLink's official branding — navy, sky blue, and gold — for immediate recognizability among Vancouver transit users.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Typography: <span className="font-mono">SF Pro</span> (headings) + <span className="font-mono">Inter</span> (body)
              </p>
            </div>
          </FadeSection>
          <FadeSection delay={100}>
            <div className="border border-gray-200 p-6">
              <p className="font-mono text-xs text-[#00AEEF] uppercase tracking-widest mb-3">App Structure</p>
              <div className="grid grid-cols-5 gap-1">
                {[
                  { tab: "Home", desc: "Balance, Smart Route shortcuts, U-Pass alert" },
                  { tab: "Trip", desc: "Live map, search bar, saved destinations" },
                  { tab: "Wallet", desc: "In-app top-up, pass renewal, payment methods" },
                  { tab: "Code", desc: "QR code to replace physical card tap" },
                  { tab: "Profile", desc: "Trips, transactions, settings" },
                ].map(({ tab, desc }) => (
                  <div key={tab} className="text-center">
                    <div className="bg-[#0A2A5A] text-white font-mono text-[10px] px-1 py-2 mb-1">{tab}</div>
                    <p className="text-[9px] text-gray-400 leading-snug">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>
        </div>

        {/* Prototype embed teaser */}
        <FadeSection delay={140}>
          <div className="border border-[#0A2A5A] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-[#00AEEF] uppercase tracking-widest mb-1">Figma Prototype</p>
              <p className="text-sm text-[#0A2A5A] font-semibold">VanLink_refined — Full hi-fi with 3 complete usability testing flows</p>
              <p className="font-mono text-xs text-gray-400 mt-1">Onboarding · Wallet · Trip Planning</p>
            </div>
            <a
              href="https://www.figma.com/design/kPGga8an4mCsdYCad6qXuy/VanLink_refined?node-id=0-1"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#0A2A5A] text-[#0A2A5A] font-mono text-xs px-5 py-3 rounded-full hover:bg-[#0A2A5A] hover:text-white transition-colors whitespace-nowrap"
            >
              Open in Figma →
            </a>
          </div>
        </FadeSection>
      </section>

      <Divider />

      {/* ── 05 Usability Testing ──────────────────────────────── */}
      <section className="px-6 md:px-16 pb-16">
        <FadeSection>
          <SectionLabel>05 — Usability Testing & Iteration</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A2A5A] mb-2">
            12 Participants · Maze Testing
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mb-8">
            Goal: Verify whether users could independently top up their card, renew their U-Pass, and plan a trip — entirely within VanLink.
          </p>
        </FadeSection>

        <FadeSection delay={60} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200 mb-10">
          {[
            { label: "Total Participants", value: "12" },
            { label: "Moderated", value: "5" },
            { label: "Unmoderated", value: "7" },
            { label: "Core Flows Tested", value: "3" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white px-5 py-4">
              <p className="font-mono text-2xl font-bold text-[#0A2A5A]">{value}</p>
              <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </FadeSection>

        <FadeSection delay={80} className="mb-10">
          <div className="border-l-2 border-[#2D9E5F] pl-5 mb-6">
            <p className="font-mono text-xs text-[#2D9E5F] uppercase tracking-widest mb-1">Overall</p>
            <p className="text-sm text-gray-700">Participants felt VanLink was noticeably quicker and more convenient than the current Compass Card website. Three distinct usability issues were identified and iterated on.</p>
          </div>
        </FadeSection>

        <FadeSection delay={100} className="flex flex-col gap-4">
          <IterationRow
            issue="CTA buttons (Reload, Renew) were small and easy to miss on the Home and U-Pass screens. Some participants weren't sure where to tap to top up."
            solution="Increased button size and switched the button color to the gold accent (#FFB400) to make primary actions visually prominent against the blue card background."
            before="Small, low-contrast 'Reload' button blended into the card UI — looked decorative, not actionable"
            after="Full-width gold button clearly signals the primary action; color contrast now meets accessibility standards"
          />
          <IterationRow
            issue="Route option filter buttons (ECO / Fastest / Cheapest / Least Walking) looked like static labels — participants didn't realize they were tappable filters."
            solution="Enlarged the filter buttons with higher contrast, filled backgrounds, and distinct selected/unselected states to communicate interactivity."
            before="Small pill tags with similar styling to regular text labels"
            after="Larger, styled toggle buttons with clear active state — ECO highlighted in green"
          />
          <IterationRow
            issue="Smart Route cards on the Home screen created a misleading expectation: users tapped expecting to land directly on the final route, but were taken to an extra intermediate planner step instead."
            solution="Redesigned into two explicit paths: (1) Smart Route cards now skip directly to route details in one tap. (2) The Search Bar retains the full multi-step planner for custom destinations."
            before="4-step flow: tap card → map with 'start' icon → route options → route details"
            after="Path 1 (Smart Route): 2 steps — tap card → route details. Path 2 (Search Bar): full planner preserved"
          />
        </FadeSection>
      </section>

      <Divider />

      {/* ── 06 Reflection ────────────────────────────────────── */}
      <section className="px-6 md:px-16 pb-16">
        <FadeSection>
          <SectionLabel>06 — Reflection</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A2A5A] mb-8">
            What I Learned
          </h2>
        </FadeSection>
        <div className="grid md:grid-cols-2 gap-6">
          <FadeSection delay={60} className="flex flex-col gap-6">
            <div className="border border-gray-200 p-6">
              <p className="font-mono text-xs text-[#00AEEF] uppercase tracking-widest mb-3">Navigation Design Mental Models</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Designing for map and navigation contexts taught me something concrete: even when a logical entry point exists (recent routes via the Search Bar), no participant used it. Users under time pressure gravitate toward the most visually prominent shortcut — not the most "efficient" path on paper.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mt-3">
                Good wayfinding design means placing affordances where the eye lands first, not where the information architecture says they belong.
              </p>
            </div>
            <div className="border border-gray-200 p-6">
              <p className="font-mono text-xs text-[#00AEEF] uppercase tracking-widest mb-3">Testing Changes Everything</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                The Smart Route iteration was the most impactful design decision of the project — and it only emerged from testing. Without Maze data showing where participants hesitated, we would have shipped a 4-step flow that felt like a dead end. Usability data turned what seemed like a minor inconsistency into a fundamental flow restructure.
              </p>
            </div>
          </FadeSection>
          <FadeSection delay={100} className="flex flex-col gap-6">
            <div className="border border-gray-200 p-6">
              <p className="font-mono text-xs text-red-400 uppercase tracking-widest mb-3">What I'd Do Differently</p>
              <ul className="text-sm text-gray-600 leading-relaxed space-y-3">
                <li className="flex gap-2"><span className="text-red-400 shrink-0">→</span> Test earlier — even on mid-fi screens — to catch flow confusion before full hi-fi polish</li>
                <li className="flex gap-2"><span className="text-red-400 shrink-0">→</span> Explicitly probe the Smart Route mental model: ask what participants expected to happen before they tapped</li>
                <li className="flex gap-2"><span className="text-red-400 shrink-0">→</span> Recruit a broader participant range beyond students to validate whether automation features resonate equally with occasional riders</li>
              </ul>
            </div>
            <div className="border border-[#2D9E5F] p-6">
              <p className="font-mono text-xs text-[#2D9E5F] uppercase tracking-widest mb-3">What Went Well</p>
              <ul className="text-sm text-gray-600 leading-relaxed space-y-3">
                <li className="flex gap-2"><span className="text-[#2D9E5F] shrink-0">→</span> Survey data directly shaped every design decision — research and design stayed tightly connected throughout</li>
                <li className="flex gap-2"><span className="text-[#2D9E5F] shrink-0">→</span> Two distinct navigation paths (shortcut vs. custom search) resolved the core usability failure cleanly</li>
                <li className="flex gap-2"><span className="text-[#2D9E5F] shrink-0">→</span> Using TransLink's actual brand colors created instant familiarity — participants during testing recognized the palette immediately</li>
              </ul>
            </div>
          </FadeSection>
        </div>
      </section>

      <Divider />

      {/* ── Footer CTA ───────────────────────────────────────── */}
      <section className="px-6 md:px-16 pb-20">
        <FadeSection className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">Next Steps</p>
            <p className="text-sm text-gray-600 max-w-md">
              A second iteration round would focus on earlier-stage testing, broader participant recruitment, and accessibility refinement for the QR Code screen.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.figma.com/design/kPGga8an4mCsdYCad6qXuy/VanLink_refined?node-id=0-1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0A2A5A] text-white font-mono text-xs px-5 py-3 rounded-full hover:bg-[#00AEEF] transition-colors"
            >
              View Prototype →
            </a>
            <Link
              to="/work"
              className="border border-text-primary px-5 py-3 rounded-full hover:bg-gray-50 transition-colors font-mono text-xs"
            >
              → View All Work
            </Link>
          </div>
        </FadeSection>
      </section>

    </div>
  );
}
