import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

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
  const bubbleRef = useRef(null);
  const stage2BgRef = useRef(null);

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

        // ── 1. 初始狀態 ──────────────────────────────────────────────
        gsap.set(glow,                   { opacity: 1, scale: 1, x: 0, y: 0 });
        gsap.set([innerRing, outerRing], { opacity: 1, scale: 1, x: 0, y: 0 });
        gsap.set(welcome,                { opacity: 0, x: isDesktop ? -150 : 0, y: isDesktop ? 0 : 20 });
        gsap.set(photo,                  { opacity: 0, x: isDesktop ? 150 : 0, y: isDesktop ? 0 : -20 });
        gsap.set(leftCol,                { opacity: 0, x: isDesktop ? -30 : 0, y: isDesktop ? 0 : 20 });
        gsap.set(bubbleRef.current, { opacity: 0,x: -10, scale: 0.85, transformOrigin: 'left center' });
        gsap.set(stage2BgRef.current, { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: isDesktop ? '+=500%' : '+=350%', 
            scrub: 1.5,
            pin: true,
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
          .to([welcome, subtitle, photo, bubbleRef.current, stage2BgRef.current], { opacity: 0, y: -40, duration: 0.10, ease: 'power2.in' }, 0.68)
          .to([innerRing, outerRing], {
            opacity: isDesktop ? 0.55 : 0.4,
            scale: isDesktop ? 0.75 : 0.45,
            x: isDesktop ? '360px' : '0',
            y: isDesktop ? '0' : '-20vh',
            duration: 0.14,
            ease: 'power2.out',
          }, 0.76)
          .to(glow, {
            opacity: isDesktop ? 0.25 : 0.15,
            scale: isDesktop ? 0.65 : 0.4,
            x: isDesktop ? '360px' : '0',
            y: isDesktop ? '0' : '-20vh',
            duration: 0.14,
          }, 0.76)
          .to(leftCol, { opacity: 1, x: 0, y: isDesktop ? 0 : '10vh', duration: 0.12, ease: 'power2.out' }, 0.84);
      });

      innerTween.current = gsap.to(innerRing, { rotation: 360, duration: 25, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
      outerTween.current = gsap.to(outerRing, { rotation: -360, duration: 40, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .stage2-container { flex-direction: column-reverse !important; gap: 2rem !important; }
          /* 手機版預設彩色 + 環境適配濾鏡 */
          .mobile-photo-color {
            filter: sepia(15%) saturate(95%) brightness(1.02) !important;
            transition: filter 0.7s ease-in-out;
          }
        }

        @media (min-width: 769px) {
  .photo-filter {
    transition: transform 0.4s ease;
  }
  .photo-filter:hover {
    transform: scale(1.02);
  }
}

@keyframes scrollBreath {
  0%, 100% { opacity: 0.55;  transform: translateY(0); }
  50%       { opacity: 1;  transform: translateY(6px); }
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

        {/* Stage 2: Background — full-width, outside max-w wrapper */}
        <div ref={stage2BgRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 4, backgroundColor: '#FBF9F1', opacity: 0 }}>
          {/* 右上：薄荷藍 */}
          <div style={{ position: 'absolute', top: '-10%', right: '-8%', width: '55%', height: '60%', borderRadius: '50%', background: 'rgba(186,230,253,0.40)', filter: 'blur(90px)', animation: 'floatA 10s ease-in-out infinite' }} />
          {/* 左下：陽光黃 */}
          <div style={{ position: 'absolute', bottom: '-8%', left: '-5%', width: '50%', height: '55%', borderRadius: '50%', background: 'rgba(254,243,199,0.60)', filter: 'blur(80px)', animation: 'floatB 13s ease-in-out infinite' }} />
        </div>

        {/* All visual content constrained to 1440px — same layout on all screen sizes */}
        <div className="max-w-[1440px] mx-auto h-full relative">

          {/* Stage 3: Content */}
          <div ref={leftColRef} className="absolute inset-0 flex flex-col justify-center items-center md:items-start px-5 md:px-20 z-10 w-full" style={{ paddingTop: '10vh', pointerEvents: 'none' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm self-center md:self-start mb-6">
              <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: '#7BE849' }} />
              <span className="font-mono text-[#555555] tracking-wide text-[12px] md:text-[13px]">
                {t('Open to internships · May 2026', '尋找 2026/5 實習機會')}
              </span>
            </div>
            <h1 className="font-serif leading-none mt-2 text-center md:text-left" style={{ fontSize: 'clamp(64px, 10vw, 108px)' }}>
              {t('Yun\nTsai', 'Yun\nTsai').split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h1>
            <div className="mt-4 flex flex-col items-center md:items-start gap-2">
              <span className="font-mono text-base md:text-lg uppercase text-[#999] tracking-widest">UX / UI Designer</span>
            </div>
            <p className="font-mono text-[14px] md:text-[15px] mt-6 text-center md:text-left max-w-[320px] md:max-w-md" style={{ color: '#555', lineHeight: '1.8' }}>
              {t('Research-driven design that solves real problems.', '以研究驅動設計，解決真實問題。')}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap mt-8" style={{ pointerEvents: 'auto' }}>
              <Link to="/work" className="inline-flex items-center text-white bg-brand-green-button rounded-full px-5 py-2.5 font-mono shadow-md hover:opacity-90 transition-all text-[13px] md:text-[14px]">
                {t('Explore My Work', '探索作品集')}
              </Link>
              <a href="/YunTsai_Resume.pdf" target="_blank" rel="noopener noreferrer" className="border border-text-primary rounded-full px-5 py-2.5 font-mono hover:bg-text-primary hover:text-white transition-all text-[13px] md:text-[14px]">
                {t('Resume', '履歷')} ↗
              </a>
            </div>
          </div>

          {/* Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              ref={glowRef}
              className="absolute rounded-full cursor-pointer"
              style={{ width: 300, height: 300, background: 'radial-gradient(circle, #E2FFAD 0%, #9CAF6C 40%, transparent 70%)', filter: 'blur(55px)', zIndex: 1, willChange: 'transform, opacity', pointerEvents: 'auto', transition: 'transform 0.08s ease-out' }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(1.28)'}
              onMouseUp={e => { e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)'; e.currentTarget.style.transform = 'scale(1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)'; e.currentTarget.style.transform = 'scale(1)'; }}
              onTouchStart={e => e.currentTarget.style.transform = 'scale(1.28)'}
              onTouchEnd={e => { e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)'; e.currentTarget.style.transform = 'scale(1)'; }}
            />
            <img ref={innerRingRef} src="/images/InnerRing.svg" alt="" className="absolute w-[min(320px,82vw)] z-[2] will-change-transform" />
            <img ref={outerRingRef} src="/images/OuterRing.svg" alt="" className="absolute w-[min(420px,95vw)] z-[3] will-change-transform" />
          </div>

          {/* Stage 2: Welcome Content */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-8 md:px-20" style={{ zIndex: 5 }}>
            <div className="stage2-container flex items-center gap-12 md:gap-16 w-full max-w-5xl">
              <div ref={welcomeRef} style={{ opacity: 0 }}>
                <p className="font-mono text-[clamp(28px,5vw,60px)] font-bold leading-[1.1] text-transparent" style={{ WebkitTextStroke: '1.5px #555' }}>WELCOME TO<br />MY WEBSITE</p>
                <p ref={subtitleRef} className="font-mono text-[14px] md:text-[16px] text-[#666] mt-6 md:mt-9 opacity-0">Designed in Vancouver, built for everywhere.</p>
              </div>
              <img
                ref={photoRef}
                src="/images/Wanyun_Tsai.png"
                alt=""
                className="photo-filter rounded-full w-[min(200px,40vw)] h-[min(200px,40vw)] object-cover opacity-0 pointer-events-auto"
              />
              {/* Speech Bubble */}
              <div
                ref={bubbleRef}
                style={{ position: 'relative', alignSelf: 'center', flexShrink: 0, willChange: 'transform, opacity' }}
              >
                <img
                  src="/images/speechbubble.svg"
                  alt="language bubble"
                  style={{ width: '300px', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Scroll Hint */}
          <div ref={scrollHintRef} className="absolute bottom-[9%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[7] pointer-events-none">
            <div className="w-[1.5px] h-12 bg-gradient-to-b from-[#1a1a1a] to-transparent animate-[scrollBreath_2.2s_ease-in-out_infinite_0.4s]" />
            <span className="font-mono text-[13px] tracking-[0.3em] text-[#1a1a1a] font-semibold animate-[scrollBreath_2.2s_ease-in-out_infinite]">SCROLL</span>
          </div>

        </div>
      </section>
    </>
  );
}

export default HeroRings;