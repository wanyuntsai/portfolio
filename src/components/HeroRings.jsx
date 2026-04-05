import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
//  SCROLL TIMELINE MAP  (progress 0 → 1)
//
//  0.00 – 0.08   scroll hint fades out
//  0.05 – 0.22   rings + glow FULLY disappear   ← Stage 2 needs clean slate
//
//  0.25 – 0.45   photo + welcome slide in
//  0.50 – 0.60   subtitle fades up
//  0.60 – 0.68   HOLD Stage 2
//
//  0.68 – 0.76   ALL Stage-2 elements exit together (welcome + subtitle + photo)
//  0.68 – 0.78   empty screen pause
//
//  0.76 – 0.88   rings reappear on RIGHT + glow reappears
//  0.84 – 0.94   left column slides in
//
//  0.94+         Stage 3 HOLDS FOREVER — no exit animation
// ─────────────────────────────────────────────────────────────────────────────

function HeroRings() {
  const { t } = useLanguage();
  const sectionRef    = useRef(null);
  const leftColRef    = useRef(null);
  const innerRingRef  = useRef(null);
  const outerRingRef  = useRef(null);
  const glowRef       = useRef(null);
  const photoRef      = useRef(null);
  const welcomeRef    = useRef(null);
  const subtitleRef   = useRef(null);
  const scrollHintRef = useRef(null);
  const innerTween    = useRef(null);
  const outerTween    = useRef(null);
  const boostResetRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const glow       = glowRef.current;
      const innerRing  = innerRingRef.current;
      const outerRing  = outerRingRef.current;
      const photo      = photoRef.current;
      const welcome    = welcomeRef.current;
      const subtitle   = subtitleRef.current;
      const scrollHint = scrollHintRef.current;
      const leftCol    = leftColRef.current;

      // ── 1. Initial states ────────────────────────────────────────────────
      gsap.set(glow,                   { opacity: 1, scale: 1, x: 0 });
      gsap.set([innerRing, outerRing], { opacity: 1, scale: 1, x: 0 });
      gsap.set(scrollHint,             { opacity: 1, y: 0 });
      gsap.set(welcome,                { opacity: 0, x: -150 });
      gsap.set(photo,                  { opacity: 0, x: 150 });
      gsap.set(subtitle,               { opacity: 0, y: 20 });
      gsap.set(leftCol,                { opacity: 0, x: -30 });

      // Page-load glow breathe
      gsap.fromTo(glow, { scale: 0.6 }, {
        scale: 1, duration: 1.8, ease: 'power2.out', delay: 0.2,
      });

      // ── 2. Ambient ring rotation ─────────────────────────────────────────
      innerTween.current = gsap.to(innerRing, {
        rotation: 360, duration: 25, ease: 'none', repeat: -1,
        transformOrigin: '50% 50%',
      });
      outerTween.current = gsap.to(outerRing, {
        rotation: -360, duration: 40, ease: 'none', repeat: -1,
        transformOrigin: '50% 50%',
      });

      // ── 3. Scroll timeline ───────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=500%',   // longer total = more breathing room between stages
          scrub: 1.5,      // slightly higher = smoother scrub feel
          pin: true,
          onUpdate: (self) => {
            const boost = Math.min(1 + Math.abs(self.getVelocity()) / 500, 10);
            innerTween.current?.timeScale(boost);
            outerTween.current?.timeScale(boost);
            // kill stale reset before scheduling a new one
            if (boostResetRef.current) boostResetRef.current.kill();
            boostResetRef.current = gsap.delayedCall(0.4, () => {
              gsap.to(innerTween.current, { timeScale: 1, duration: 1.5, ease: 'power2.out' });
              gsap.to(outerTween.current, { timeScale: 1, duration: 1.5, ease: 'power2.out' });
            });
          },
        },
      });

      tl
        // ── Stage 1: scroll hint fades ───────────────────────────────────
        .to(scrollHint, { opacity: 0, duration: 0.08 }, 0.00)

        // ── Stage 1 → 2: rings + glow FULLY gone before welcome arrives ──
        .to([innerRing, outerRing], {
          opacity: 0, scale: 0.55, duration: 0.17, ease: 'power2.inOut',
        }, 0.05)
        .to(glow, {
          opacity: 0, scale: 0.45, duration: 0.15, ease: 'power2.inOut',
        }, 0.05)

        // ── Stage 2: welcome content enters ──────────────────────────────
        .to(photo,    { opacity: 1, x: 0, duration: 0.20, ease: 'power2.out' }, 0.25)
        .to(welcome,  { opacity: 1, x: 0, duration: 0.22, ease: 'power2.out' }, 0.30)
        .to(subtitle, { opacity: 1, y: 0, duration: 0.14, ease: 'power2.out' }, 0.52)
        // holds until 0.68

        // ── Stage 2 → 3: ALL elements exit at the same time ──────────────
        // photo leaves with welcome — no straggler on screen
        .to([welcome, subtitle, photo], {
          opacity: 0, y: -40, duration: 0.10, ease: 'power2.in',
        }, 0.68)
        // empty screen pause: 0.68 → 0.76

        // ── Stage 3: rings reappear on right side ─────────────────────────
        .to([innerRing, outerRing], {
          opacity: 0.55, scale: 0.75, x: '25vw', duration: 0.14, ease: 'power2.out',
        }, 0.76)
        .to(glow, {
          opacity: 0.25, scale: 0.65, x: '25vw', duration: 0.14, ease: 'power2.out',
        }, 0.76)

        // ── Stage 3: left column fades in after rings are visible ─────────
        .to(leftCol, { opacity: 1, x: 0, duration: 0.12, ease: 'power2.out' }, 0.84);

        // ── Stage 3 is the FINAL state — intentionally no exit animation ──

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes scrollBreath {
          0%, 100% { opacity: 0.2;  transform: translateY(0); }
          50%       { opacity: 0.8;  transform: translateY(6px); }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden"
        style={{ zIndex: 10 }}
        aria-hidden="true"
      >
        {/* ── Stage 3: Left column ── */}
        <div
          ref={leftColRef}
          className="absolute inset-y-0 left-0 flex flex-col justify-center px-5 md:px-20 z-10 w-full md:w-[55%]"
          style={{ paddingTop: '10vh', pointerEvents: 'none' }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm self-start mb-6">
            <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: '#7BE849' }} />
            <span className="font-mono text-[#555555] tracking-wide text-[12px] md:text-[13px]">
              {t('Open to internships · May 2026', '尋找 2026/5 實習機會')}
            </span>
          </div>

          <h1 className="font-serif hero-name leading-[0.95]" style={{ fontWeight: 300 }}>Yun Tsai</h1>

          <div className="mt-4 flex flex-col gap-2">
            <span
              className="font-serif text-base md:text-lg uppercase"
              style={{ fontWeight: 300, color: '#999', letterSpacing: '0.1em' }}
            >
              UX / UI Designer
            </span>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-mono text-[12px] md:text-[13px]">Vancouver, CA</span>
            </div>
          </div>

          <p className="font-mono text-[14px] md:text-[15px] mt-6" style={{ color: '#555', lineHeight: '1.8' }}>
            {t('Research-driven design that solves real problems.', '以研究驅動設計，解決真實問題。')}
          </p>

          <div className="flex items-center gap-3 flex-wrap mt-8" style={{ pointerEvents: 'auto' }}>
            <Link
              to="/work"
              className="inline-flex items-center text-white bg-brand-green-button rounded-full px-5 py-2.5 font-mono shadow-md hover:opacity-90 hover:-translate-y-0.5 active:scale-95 transition-all text-[13px] md:text-[14px]"
            >
              {t('Explore My Work', '探索作品集')}
            </Link>
            <a
              href="/YunTsai_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-ghost-btn group inline-flex items-center gap-1.5 border border-text-primary rounded-full px-5 py-2.5 font-mono hover:bg-text-primary hover:text-white transition-all duration-300 text-[13px] md:text-[14px]"
            >
              {t('Resume', '履歷')}
              <span className="resume-arrow">↗</span>
            </a>
          </div>
        </div>

        {/* ── Rings ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            ref={glowRef}
            className="absolute rounded-full"
            style={{
              width: 300, height: 300,
              background: 'radial-gradient(circle, #E2FFAD 0%, #9CAF6C 40%, transparent 70%)',
              filter: 'blur(55px)',
              zIndex: 1,
              willChange: 'transform, opacity',
            }}
          />
          <img
            ref={innerRingRef}
            src="/images/InnerRing.svg"
            alt=""
            draggable="false"
            style={{
              position: 'absolute',
              width: 'min(320px, 82vw)',
              zIndex: 2,
              userSelect: 'none', pointerEvents: 'none',
              willChange: 'transform, opacity',
            }}
          />
          <img
            ref={outerRingRef}
            src="/images/OuterRing.svg"
            alt=""
            draggable="false"
            style={{
              position: 'absolute',
              width: 'min(420px, 95vw)',
              zIndex: 3,
              userSelect: 'none', pointerEvents: 'none',
              willChange: 'transform, opacity',
            }}
          />
        </div>

        {/* ── Stage 2: Welcome content ── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none px-8 md:px-20"
          style={{ zIndex: 5 }}
        >
          <div className="flex items-center gap-12 md:gap-16 w-full max-w-4xl">
            <div
              ref={welcomeRef}
              style={{ opacity: 0, flexShrink: 0, willChange: 'transform, opacity' }}
            >
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 'clamp(32px, 5vw, 60px)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'transparent',
                WebkitTextStroke: '1.5px #555',
                letterSpacing: '-0.02em',
                userSelect: 'none',
              }}>
                WELCOME TO<br />MY WEBSITE
              </p>

              <p
                ref={subtitleRef}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '16px',
                  color: '#666',
                  marginTop: '36px',
                  opacity: 0,
                  willChange: 'transform, opacity',
                  userSelect: 'none',
                  lineHeight: 1.7,
                  whiteSpace: 'nowrap',
                }}
              >
                Designed in Vancouver, built for everywhere.
              </p>
            </div>

            <img
              ref={photoRef}
              src="/images/Wanyun_Tsai.png"
              alt=""
              draggable="false"
              className="grayscale brightness-[1.15] contrast-[0.9] hover:grayscale-0 hover:brightness-100 hover:contrast-100 transition-all duration-700 ease-in-out"
              style={{
                width: 'min(220px, 36vw)',
                height: 'min(220px, 36vw)',
                objectFit: 'cover',
                borderRadius: '50%',
                opacity: 0,
                flexShrink: 0,
                willChange: 'transform, opacity',
                pointerEvents: 'auto',
              }}
            />
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div
          ref={scrollHintRef}
          style={{
            position: 'absolute',
            bottom: '9%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            zIndex: 7,
            pointerEvents: 'none',
          }}
        >
          <div style={{
            width: '1px', height: '36px',
            background: 'linear-gradient(to bottom, transparent, #888)',
            animation: 'scrollBreath 2.2s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'monospace',
            fontSize: '9px',
            letterSpacing: '0.25em',
            color: '#999',
            animation: 'scrollBreath 2.2s ease-in-out infinite 0.4s',
          }}>SCROLL</span>
        </div>
      </section>
    </>
  );
}

export default HeroRings;