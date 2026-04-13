import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import Typewriter from './Typewriter';

gsap.registerPlugin(ScrollTrigger);

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
  const bubbleRef     = useRef(null);
  const stage2BgRef   = useRef(null);

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

      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 769px)",
        isMobile:  "(max-width: 768px)"
      }, (context) => {
        let { isDesktop } = context.conditions;

        gsap.set(glow,                   { opacity: 1, scale: 1, x: 0, y: 0 });
        gsap.set([innerRing, outerRing], { opacity: 1, scale: 1, x: 0, y: 0 });
        gsap.set(welcome,                { opacity: 0, x: isDesktop ? -150 : 0, y: isDesktop ? 0 : 20 });
        gsap.set(photo,                  { opacity: 0, x: isDesktop ? 150 : 0, y: isDesktop ? 0 : -20 });
        gsap.set(leftCol,                { opacity: 0, x: isDesktop ? -30 : 0, y: isDesktop ? 0 : 20 });
        gsap.set(bubbleRef.current,      { opacity: 0, x: -10, scale: 0.85, transformOrigin: 'left center' });
        gsap.set(stage2BgRef.current,    { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: isDesktop ? '+=500%' : '+=350%',
            scrub: 1,
            pin: true,
            snap: {
              snapTo: [0, 0.65, 1],
              duration: { min: 0.3, max: 0.7 },
              delay: 0.15,
              ease: 'power2.inOut',
            },
            onUpdate: (self) => {
              const boost = Math.min(1 + Math.abs(self.getVelocity()) / 500, 10);
              innerTween.current?.timeScale(boost);
              outerTween.current?.timeScale(boost);
              if (boostResetRef.current) boostResetRef.current.kill();
              boostResetRef.current = gsap.delayedCall(0.4, () => {
                gsap.to(innerTween.current, { timeScale: 1, duration: 1.5, ease: 'power2.out' });
                gsap.to(outerTween.current, { timeScale: 1, duration: 1.5, ease: 'power2.out' });
              });
            },
          },
        });

        tl
          .to(scrollHint, { opacity: 0, duration: 0.08 }, 0.00)
          .to([innerRing, outerRing, glow], { opacity: 0, scale: 0.5, duration: 0.17, ease: 'power2.inOut' }, 0.05)
          .to(stage2BgRef.current, { opacity: 1, duration: 0.20, ease: 'power2.out' }, 0.22)
          .to(photo,    { opacity: 1, x: 0, y: 0, scale: isDesktop ? 1 : 0.85, duration: 0.20, ease: 'power2.out' }, 0.25)
          .to(welcome,  { opacity: 1, x: 0, y: 0, duration: 0.22, ease: 'power2.out' }, 0.30)
          .to(subtitle, { opacity: 1, y: 0, duration: 0.14, ease: 'power2.out' }, 0.52)
          .to(bubbleRef.current, { opacity: 1, x: 0, scale: 1, duration: 0.14, ease: 'back.out(1.4)' }, 0.58)
          .to([welcome, subtitle, photo, bubbleRef.current, stage2BgRef.current], { opacity: 0, y: -40, duration: 0.10, ease: 'power2.in' }, 0.72)
          .to([innerRing, outerRing], {
            opacity: isDesktop ? 0.55 : 0.4,
            scale: isDesktop ? 0.75 : 0.45,
            x: isDesktop ? '360px' : '0',
            y: isDesktop ? '0' : '-20vh',
            duration: 0.14,
            ease: 'power2.out',
          }, 0.80)
          .to(glow, {
            opacity: isDesktop ? 0.55 : 0.15,
            scale: isDesktop ? 0.65 : 0.4,
            x: isDesktop ? '360px' : '0',
            y: isDesktop ? '0' : '-20vh',
            duration: 0.14,
          }, 0.80)
          .to(leftCol, { opacity: 1, x: 0, y: isDesktop ? 0 : '10vh', duration: 0.12, ease: 'power2.out' }, 0.88);
      });

      innerTween.current = gsap.to(innerRing, { rotation: 360,  duration: 25, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
      outerTween.current = gsap.to(outerRing, { rotation: -360, duration: 40, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`

        /* ── Glow: 手機版預設（不在任何 media query 裡）── */
        .hero-glow {
          width: min(280px, 75vw, 35vh);
          height: min(280px, 75vw, 35vh);
        }

        /* ── 桌機版覆蓋 ── */
        @media (min-width: 769px) {
          .hero-glow {
            width: min(460px, 32vw, 52vh) !important;
            height: min(460px, 32vw, 52vh) !important;
          }
          .photo-filter {
            transition: transform 0.4s ease;
          }
          .photo-filter:hover {
            transform: scale(1.02);
          }
          .stage2-bubble-img {
            width: 420px !important;
          }
        }

        /* ── 手機版其他樣式 ── */
        @media (max-width: 768px) {
          .stage2-container {
            flex-direction: column-reverse !important;
            gap: 2rem !important;
          }
          .mobile-photo-color {
            filter: sepia(15%) saturate(95%) brightness(1.02) !important;
            transition: filter 0.7s ease-in-out;
          }
        }

        /* ── Keyframes（最外層，不在任何 media query 裡）── */
        @keyframes scrollBreath {
          0%, 100% { opacity: 0.55; transform: translateY(0); }
          50%       { opacity: 1;   transform: translateY(6px); }
        }
        @keyframes floatA {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(-18px, 22px) scale(1.05); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(20px, -16px) scale(1.04); }
        }
      `}</style>

      <section ref={sectionRef} className="relative h-screen w-full overflow-hidden" style={{ zIndex: 10 }}>

        {/* 1440px inner container — Stage 1 rings + Stage 3 content 都相對於此定位 */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', height: '100%', position: 'relative' }}>

            {/* Stage 3: Content */}
            <div
              ref={leftColRef}
              className="absolute inset-0 flex flex-col justify-center items-center md:items-start px-5 md:px-16 z-10 w-full"
              style={{ paddingTop: '10vh', pointerEvents: 'none' }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm self-center md:self-start mb-6">
                <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: '#7BE849' }} />
                <span className="font-mono text-[#555555] tracking-wide text-[12px] md:text-[13px]">
                  {t('Open to internships · May 2026', '尋找 2026/5 實習機會')}
                </span>
              </div>
              <h1 className="font-serif leading-none mt-2 text-center md:text-left" style={{ fontSize: 'clamp(64px, 10vw, 140px)' }}>
                {t('Yun\nTsai', 'Yun\nTsai').split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h1>
              <div className="mt-4 flex flex-col items-center md:items-start gap-2">
                <span className="font-mono text-base md:text-xl uppercase text-[#999] tracking-widest">UX / UI Designer</span>
              </div>
              <p
                className="font-mono text-[14px] md:text-[17px] mt-6 text-center md:text-left max-w-[320px] md:max-w-lg"
                style={{ color: '#555', lineHeight: '1.8' }}
              >
                {t('Research-driven design that solves real problems.', '以研究驅動設計，解決真實問題。')}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap mt-8" style={{ pointerEvents: 'auto' }}>
                <Link
                  to="/work"
                  className="inline-flex items-center text-white bg-brand-green-button rounded-full px-6 py-3 font-mono shadow-md hover:opacity-90 transition-all text-[13px] md:text-[15px]"
                >
                  {t('Explore My Work', '探索作品集')}
                </Link>
                <a
                  href="/YunTsai_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-text-primary rounded-full px-6 py-3 font-mono hover:bg-text-primary hover:text-white transition-all text-[13px] md:text-[15px]"
                >
                  {t('Resume', '履歷')} ↗
                </a>
              </div>
            </div>

            {/* Stage 1: Rings — centered within 1440px container */}
            <div className="absolute inset-0 flex items-center justify-center pt-18 pb-16">
              <div
                ref={glowRef}
                className="absolute rounded-full cursor-pointer hero-glow"
                style={{
                  background: 'radial-gradient(circle, #E2FFAD 0%, #9CAF6C 40%, transparent 70%)',
                  filter: 'blur(55px)',
                  zIndex: 1,
                  willChange: 'transform, opacity',
                  pointerEvents: 'auto',
                  transition: 'transform 0.08s ease-out',
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(1.28)'}
                onMouseUp={e => { e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)'; e.currentTarget.style.transform = 'scale(1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)'; e.currentTarget.style.transform = 'scale(1)'; }}
                onTouchStart={e => e.currentTarget.style.transform = 'scale(1.28)'}
                onTouchEnd={e => { e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)'; e.currentTarget.style.transform = 'scale(1)'; }}
              />
              <img
                ref={innerRingRef}
                src="/images/InnerRing.svg"
                alt=""
                className="absolute w-[min(320px,82vw)] md:w-[min(480px,33vw,55vh)] z-2 will-change-transform"
              />
              <img
                ref={outerRingRef}
                src="/images/OuterRing.svg"
                alt=""
                className="absolute w-[min(420px,95vw)] md:w-[min(620px,43vw,68vh)] z-3 will-change-transform"
              />
            </div>

          </div>
        </div>

        {/* Stage 2: Background */}
        <div
          ref={stage2BgRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 4, backgroundColor: '#FBF9F1', opacity: 0 }}
        >
          <div style={{ position: 'absolute', top: '-10%', right: '-8%', width: '55%', height: '60%', borderRadius: '50%', background: 'rgba(186,230,253,0.40)', filter: 'blur(90px)', animation: 'floatA 10s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '-8%', left: '-5%', width: '50%', height: '55%', borderRadius: '50%', background: 'rgba(254,243,199,0.60)', filter: 'blur(80px)', animation: 'floatB 13s ease-in-out infinite' }} />
        </div>

        {/* Stage 2: Welcome Content */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none px-8 md:px-20 xl:px-32 2xl:px-48"
          style={{ zIndex: 5 }}
        >
          <div className="stage2-container flex items-center w-full max-w-7xl mx-auto">
            {/* Left: WELCOME text */}
            <div ref={welcomeRef} style={{ opacity: 0, flex: 1 }}>
              <p
                className="font-mono text-[clamp(28px,5vw,80px)] font-bold leading-[1.1] text-transparent"
                style={{ WebkitTextStroke: '1.5px #555' }}
              >
                WELCOME<br /> TO MY <br />WEBSITE
              </p>
              <p
                ref={subtitleRef}
                className="font-mono text-[14px] md:text-[20px] text-[#666] mt-6 md:mt-9 opacity-0"
              >
                Designed in Vancouver,<br /> built for everywhere.
              </p>
            </div>

            {/* Centre: Photo + Typewriter */}
            <div
              ref={photoRef}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                flexShrink: 0,
                opacity: 0
              }}
            >
              <div className="photo-filter w-45 h-65 md:w-60 md:h-85 rounded-[36px] overflow-hidden shadow-xl">
                <img
                  src="/images/Wanyun_Tsai.png"
                  alt=""
                  className="w-full h-full object-cover pointer-events-auto"
                />
              </div>
              <Typewriter
                phrases={["Hi! I'm Yun.", 'こんにちは！ユンです。', '嗨！我是蔡宛芸。']}
                speed={90}
                deleteSpeed={45}
                delay={1800}
              />
            </div>

            {/* Right: Speech bubble */}
            <div
              ref={bubbleRef}
              style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignSelf: 'center', willChange: 'transform, opacity' }}
            >
              <img
                src="/images/speechbubble.svg"
                alt="language bubble"
                style={{ width: '340px', height: 'auto', display: 'block' }}
                className="stage2-bubble-img"
              />
            </div>
          </div>
        </div>

        {/* ── CHANGED: bottom-4 緊貼底部，不和圓圈重疊 ── */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[7] pointer-events-none"
        >
          <div className="w-[1.5px] h-12 bg-gradient-to-b from-[#1a1a1a] to-transparent animate-[scrollBreath_2.2s_ease-in-out_infinite_0.4s]" />
          <span className="font-mono text-[13px] tracking-[0.3em] text-[#1a1a1a] font-semibold animate-[scrollBreath_2.2s_ease-in-out_infinite]">SCROLL</span>
        </div>

      </section>
    </>
  );
}

export default HeroRings;