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

        // ── 1. 初始狀態設定 ──────────────────────────────────────────────
        gsap.set(glow,                   { opacity: 1, scale: 1, x: 0, y: 0 });
        gsap.set([innerRing, outerRing], { opacity: 1, scale: 1, x: 0, y: 0 });
        gsap.set(scrollHint,             { opacity: 1, y: 0 });
        gsap.set(welcome,                { opacity: 0, x: isDesktop ? -150 : 0, y: isDesktop ? 0 : 20 });
        gsap.set(photo,                  { opacity: 0, x: isDesktop ? 150 : 0, y: isDesktop ? 0 : -20 });
        gsap.set(subtitle,               { opacity: 0, y: 20 });
        gsap.set(leftCol,                { opacity: 0, x: isDesktop ? -30 : 0, y: isDesktop ? 0 : 20 });

        // ── 2. 主要滾動時間軸 ────────────────────────────────────────────
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
          // Stage 1: Scroll hint 消失
          .to(scrollHint, { opacity: 0, duration: 0.08 }, 0.00)

          // Stage 1 → 2: 圓環徹底消失 (清空背景)
          .to([innerRing, outerRing, glow], {
            opacity: 0, scale: 0.5, duration: 0.17, ease: 'power2.inOut',
          }, 0.05)

          // Stage 2: Welcome 內容登場
          .to(photo,    { opacity: 1, x: 0, y: 0, scale: isDesktop ? 1 : 0.85, duration: 0.20, ease: 'power2.out' }, 0.25)
          .to(welcome,  { opacity: 1, x: 0, y: 0, duration: 0.22, ease: 'power2.out' }, 0.30)
          .to(subtitle, { opacity: 1, y: 0, duration: 0.14, ease: 'power2.out' }, 0.52)

          // Stage 2 → 3: 所有元素同時退出 (頭像不留殘影)
          .to([welcome, subtitle, photo], {
            opacity: 0, y: -40, duration: 0.08, ease: 'power2.in',
          }, 0.68)

          // Stage 3: 圓環在右側重現 (響應式座標)
          .to([innerRing, outerRing], {
            opacity: isDesktop ? 0.55 : 0.4, 
            scale: isDesktop ? 0.75 : 0.45, 
            x: isDesktop ? '25vw' : '0',
            y: isDesktop ? '0' : '-20vh', 
            duration: 0.14, 
            ease: 'power2.out',
          }, 0.76)
          .to(glow, {
            opacity: isDesktop ? 0.25 : 0.15, 
            scale: isDesktop ? 0.65 : 0.4, 
            x: isDesktop ? '25vw' : '0',
            y: isDesktop ? '0' : '-20vh', 
            duration: 0.14,
          }, 0.76)

          // Stage 3: 左側內容 (Yun Tsai) 登場
          .to(leftCol, { 
            opacity: 1, 
            x: 0, 
            y: isDesktop ? 0 : '10vh', 
            duration: 0.12, 
            ease: 'power2.out' 
          }, 0.84);
      });

      // ── 3. 背景常駐旋轉動畫 ──────────────────────────────────────────
      innerTween.current = gsap.to(innerRing, {
        rotation: 360, duration: 25, ease: 'none', repeat: -1,
        transformOrigin: '50% 50%',
      });
      outerTween.current = gsap.to(outerRing, {
        rotation: -360, duration: 40, ease: 'none', repeat: -1,
        transformOrigin: '50% 50%',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .stage2-container { flex-direction: column-reverse !important; gap: 2rem !important; }
          .hero-name-container { text-align: center !important; }
        }
        @keyframes scrollBreath {
          0%, 100% { opacity: 0.2;  transform: translateY(0); }
          50%       { opacity: 0.8;  transform: translateY(6px); }
        }
      `}</style>

      <section ref={sectionRef} className="relative h-screen w-full overflow-hidden" style={{ zIndex: 10 }}>
        
        {/* Stage 3: Left Column Content */}
        <div
          ref={leftColRef}
          className="absolute inset-0 flex flex-col justify-center items-center md:items-start px-5 md:px-20 z-10 w-full"
          style={{ paddingTop: '10vh', pointerEvents: 'none' }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm self-center md:self-start mb-6">
            <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: '#7BE849' }} />
            <span className="font-mono text-[#555555] tracking-wide text-[12px] md:text-[13px]">
              {t('Open to internships · May 2026', '尋找 2026/5 實習機會')}
            </span>
          </div>

          <h1 className="font-serif text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] text-center md:text-left" style={{ fontWeight: 300 }}>Yun Tsai</h1>

          <div className="mt-4 flex flex-col items-center md:items-start gap-2">
            <span className="font-serif text-base md:text-lg uppercase text-[#999] tracking-[0.1em]">UX / UI Designer</span>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="font-mono text-[12px] md:text-[13px]">Vancouver, CA</span>
            </div>
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

        {/* Rings & Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div ref={glowRef} className="absolute rounded-full" style={{ width: 300, height: 300, background: 'radial-gradient(circle, #E2FFAD 0%, #9CAF6C 40%, transparent 70%)', filter: 'blur(55px)', zIndex: 1, willChange: 'transform, opacity' }} />
          <img ref={innerRingRef} src="/images/InnerRing.svg" alt="" className="absolute w-[min(320px,82vw)] z-[2] will-change-transform" />
          <img ref={outerRingRef} src="/images/OuterRing.svg" alt="" className="absolute w-[min(420px,95vw)] z-[3] will-change-transform" />
        </div>

        {/* Stage 2: Welcome Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-8 md:px-20" style={{ zIndex: 5 }}>
          <div className="stage2-container flex items-center gap-12 md:gap-16 w-full max-w-4xl">
            <div ref={welcomeRef} style={{ opacity: 0 }}>
              <p className="font-mono text-[clamp(28px,5vw,60px)] font-bold leading-[1.1] text-transparent" style={{ WebkitTextStroke: '1.5px #555' }}>
                WELCOME TO<br />MY WEBSITE
              </p>
              <p ref={subtitleRef} className="font-mono text-[14px] md:text-[16px] text-[#666] mt-6 md:mt-9 opacity-0">
                Designed in Vancouver, built for everywhere.
              </p>
            </div>
            <img ref={photoRef} src="/images/Wanyun_Tsai.png" alt="" className="grayscale brightness-[1.15] contrast-[0.9] rounded-full w-[min(200px,40vw)] h-[min(200px,40vw)] object-cover opacity-0 pointer-events-auto" />
          </div>
        </div>

        {/* Scroll Hint */}
        <div ref={scrollHintRef} className="absolute bottom-[9%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-[7] pointer-events-none">
          <div className="w-[1px] h-9 bg-gradient-to-b from-transparent to-[#888] animate-[scrollBreath_2.2s_ease-in-out_infinite]" />
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#999] animate-[scrollBreath_2.2s_ease-in-out_infinite_0.4s]">SCROLL</span>
        </div>
      </section>
    </>
  );
}

export default HeroRings;