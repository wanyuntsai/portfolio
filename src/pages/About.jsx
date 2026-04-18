import { useState, useRef, useEffect } from 'react';
import { FadeInSection, PageTransition } from '../components/AnimatedSection';
import Typewriter from '../components/Typewriter';
import { useLanguage } from '../context/LanguageContext';

// ── Language flip card ─────────────────────────────────────────────────────
function LangFlipCell({ front, greeting }) {
    const [flipped, setFlipped] = useState(false);
    return (
        <div className="cursor-pointer w-full" style={{ perspective: '600px', height: '52px' }}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
            onClick={() => setFlipped(f => !f)}>
            <div style={{
                position: 'relative', width: '100%', height: '100%',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.42s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}>
                <div style={{
                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                    display: 'flex', alignItems: 'center',
                    border: '0.5px solid #ccc', borderRadius: '10px', background: 'transparent',
                    paddingLeft: 14,
                }}>
                    <span className="font-mono text-sm text-text-secondary">{front}</span>
                </div>
                <div style={{
                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    display: 'flex', alignItems: 'center',
                    border: '0.5px solid #9CAF6C', borderRadius: '10px', background: '#FAFAFA',
                    paddingLeft: 14,
                }}>
                    <span className="font-mono text-base text-brand-green">{greeting}</span>
                </div>
            </div>
        </div>
    );
}

// ── Icon + label ───────────────────────────────────────────────────────────
function ToolIcon({ src, name, extraScale = 1 }) {
    return (
        <div className="flex flex-col items-center gap-1.5 cursor-default group">
            <div className="transition-transform duration-200 group-hover:-translate-y-1">
                <img src={src} alt={name} title={name}
                    className="w-8 h-8 object-contain"
                    style={extraScale !== 1 ? { transform: `scale(${extraScale})` } : undefined} />
            </div>
            <span className="text-[11px] text-text-secondary text-center leading-tight">{name}</span>
        </div>
    );
}


// ── Mini pill music player ─────────────────────────────────────────────────
function MiniPlayer({ src, title, artist }) {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);

    const toggle = () => {
        if (!audioRef.current) return;
        if (playing) { audioRef.current.pause(); }
        else { audioRef.current.play(); }
        setPlaying(p => !p);
    };

    const bars = [0.0, 0.15, 0.3, 0.1, 0.25];

    return (
        <div className="flex items-center gap-2.5 bg-white rounded-full px-3 py-2 border border-border shadow-sm w-full">
            <button
                onClick={toggle}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-brand-green text-white shrink-0 transition-transform active:scale-90"
            >
                {playing ? (
                    <svg width="8" height="9" viewBox="0 0 8 9" fill="currentColor">
                        <rect x="0" y="0" width="3" height="9" rx="1"/>
                        <rect x="5" y="0" width="3" height="9" rx="1"/>
                    </svg>
                ) : (
                    <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
                        <path d="M1 0.5 L7.5 5 L1 9.5 Z"/>
                    </svg>
                )}
            </button>

            {/* Waveform bars */}
            <div className="flex items-center gap-[2.5px]" style={{ height: '16px' }}>
                {bars.map((delay, i) => (
                    <div key={i} style={{
                        width: '2px',
                        height: playing ? undefined : '3px',
                        borderRadius: '1px',
                        backgroundColor: '#3F6B2A',
                        animation: playing ? `waveform 0.75s ease-in-out ${delay}s infinite` : 'none',
                    }} />
                ))}
            </div>

            {/* Title + Artist */}
            <div className="flex flex-col min-w-0 flex-1">
                <span className="font-mono text-[10px] text-text-primary truncate font-medium">{title}</span>
                {artist && <span className="font-mono text-[9px] text-text-secondary/60 truncate">{artist}</span>}
            </div>

            <audio ref={audioRef} src={src} onEnded={() => setPlaying(false)} />
        </div>
    );
}

function About() {
    useEffect(() => {
        document.title = "About | Yun Tsai";
    }, []);
    const { t, language } = useLanguage();
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth)  * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        document.body.style.background = `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #FFF5D6 0%, transparent 30%),
            radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(255,212,160,0.45) 0%, transparent 35%),
            #FAF7F2
        `;
        document.body.style.backgroundAttachment = 'fixed';
        return () => {
            document.body.style.background = '';
            document.body.style.backgroundAttachment = '';
        };
    }, [mousePosition]);
    const [isPhotoRevealed, setIsPhotoRevealed] = useState(false);
    const [hasClickedPhoto, setHasClickedPhoto] = useState(false);
    const [revealed, setRevealed] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setRevealed(true), 150);
        return () => clearTimeout(timer);
    }, []);



    // toolkit data
    const aiTools = [
        { src: '/images/icons/claude.svg',   name: 'Claude' },
        { src: '/images/icons/chatgpt.png',  name: 'ChatGPT' },
        { src: '/images/icons/gemini.svg',   name: 'Gemini' },
        { src: '/images/icons/copilot.svg',  name: 'GitHub Copilot' },
    ];
    const designTools = [
        { src: '/images/icons/figma.svg',        name: 'Figma' },
        { src: '/images/Canva.png',              name: 'Canva',         extraScale: 1.5 },
        { src: '/images/icons/wordpress.svg',    name: 'WordPress' },
        { src: '/images/icons/miro.svg',         name: 'Miro' },
        { src: '/images/icons/photoshop.svg',    name: 'Photoshop' },
        { src: '/images/icons/illustrator.svg',  name: 'Illustrator' },
        { src: '/images/icons/indesign.svg',     name: 'InDesign' },
        { src: '/images/icons/premiere.svg',     name: 'Premiere Pro' },
        { src: '/images/icons/aftereffects.svg', name: 'After Effects' },
        { src: '/images/dimension.png',          name: 'Dimension' },
    ];
    const technicalSkills = [
        { src: '/images/icons/html.svg',        name: 'HTML5' },
        { src: '/images/icons/css.svg',         name: 'CSS3' },
        { src: '/images/icons/javascript.svg',  name: 'JavaScript' },
        { src: '/images/icons/react.svg',       name: 'React.js' },
        { src: '/images/icons/tailwind.svg',    name: 'Tailwind' },
    ];

    // photo with descriptions
    const photos = [
        { src: 'images/about2.webp', desc: 'Joffre Lakes, Canada — 2023' },
        { src: 'images/star.webp', desc: 'Great Ocean Rd, Australia — 2024' },
        { src: 'images/about1.webp', desc: 'Grampians National Park, Australia — 2024' },
        { src: 'images/about4.webp', desc: 'Krimml Waterfalls, Austria — 2024' },
        { src: 'images/sunset.webp', desc: 'White Rock, Canada — 2025' },
        { src: 'images/nanaimo.png', desc: 'Nanaimo, Canada — 2025' },
        { src: 'images/Chilliwack.JPG', desc: 'Chilliwack, Canada — 2025' },
        { src: 'images/hollowcoves.jpg', desc: 'Hollow Coves Concert, Canada — 2025' },
        { src: 'images/mountain.jpg', desc: 'Mount Aso, Japan — 2025' },
 
    ]

    const [activeCaptionIndex, setActiveCaptionIndex] = useState(null);
    const [bioExpanded, setBioExpanded] = useState(false);

    // Chat messages
    const chatRef = useRef(null);
    const [chatVisible, setChatVisible] = useState(false);
    const [visibleCount, setVisibleCount] = useState(0);
    const [showTyping, setShowTyping] = useState(false);

    const messages = [
        t("I enjoy observing the world, discovering new ideas, and exploring creativity in everyday life.", '我喜歡觀察世界、發掘新想法，並在日常生活中探索創意。'),
        t("In my downtime, you'll find me in nature, vibing to indie folk, or diving into creative content online.", '休閒時，我喜歡觀察大自然的變化、聽獨立民謠，或探索網路上的各種創意內容。'),
        t("I'm driven by curiosity and continuous learning. Life, to me, is an ongoing process of iteration, where each experience refines how I think and understand the world.", '我充滿好奇心並享受持續學習的樂趣，對我來說，生活是一個不斷迭代的過程，每一次經驗都在精進我的思維與對世界的理解。'),
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setChatVisible(true); observer.disconnect(); }
        }, { threshold: 0.4 });
        if (chatRef.current) observer.observe(chatRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!chatVisible) return;
        const timers = [
            setTimeout(() => setShowTyping(true), 200),
            setTimeout(() => { setVisibleCount(1); setShowTyping(false); }, 700),
            setTimeout(() => setShowTyping(true), 950),
            setTimeout(() => { setVisibleCount(2); setShowTyping(false); }, 1450),
            setTimeout(() => setShowTyping(true), 1700),
            setTimeout(() => { setVisibleCount(3); setShowTyping(false); }, 2200),
        ];
        return () => timers.forEach(clearTimeout);
    }, [chatVisible]);

    return (
        <PageTransition>
        <div className="flex-1 pt-20">

            {/* Hero */}
            <FadeInSection>
            <section className="max-w-7xl mx-auto px-5 md:px-20 pt-12 md:pt-16 pb-8">

                {/* h1 */}
                <div className="relative w-fit mb-8 md:mb-10 mx-auto md:mx-0"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <h1 className="font-serif text-4xl text-text-primary cursor-default" style={language === 'zh' ? { fontFamily: '"Noto Serif TC", serif' } : undefined}>
                        {t("Hi! I'm Yun", '嗨！我是 Yun')}
                    </h1>
                    <span className={`hidden md:block text-xs font-mono text-brand-green/50 mt-1 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                        {t('✨ hover me ✨', '✨ hover me ✨')}
                    </span>
                    <span className={`hidden md:block absolute font-hand text-lg text-brand-green transition-all duration-500 ease-out
                        ${isHovered ? 'opacity-100 -top-6 left-1/4 -rotate-12' : 'opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0'}`}>coffee</span>
                    <span className={`hidden md:block absolute font-hand text-lg text-brand-green transition-all duration-500 ease-out delay-75
                        ${isHovered ? 'opacity-100 -top-4 right-0 rotate-6' : 'opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0'}`}>music</span>
                    <span className={`hidden md:block absolute font-hand text-lg text-brand-green transition-all duration-500 ease-out delay-100
                        ${isHovered ? 'opacity-100 top-1/2 -left-16 -translate-y-1/2 -rotate-6' : 'opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0'}`}>design</span>
                    <span className={`hidden md:block absolute font-hand text-lg text-brand-green transition-all duration-500 ease-out delay-150
                        ${isHovered ? 'opacity-100 top-1/2 -right-16 -translate-y-1/2 rotate-12' : 'opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0'}`}>nature</span>
                    <span className={`hidden md:block absolute font-hand text-lg text-brand-green transition-all duration-500 ease-out delay-200
                        ${isHovered ? 'opacity-100 -bottom-6 left-1/2 -translate-x-1/2 rotate-3' : 'opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0'}`}>language</span>
                </div>

                {/* ── Upper: Photo | Bio ── */}
                <div
                    className="flex flex-col md:flex-row items-center md:items-stretch mb-8 md:mb-10"
                    style={{ gap: 'clamp(24px, 4vw, 56px)' }}
                >
                    {/* Left: Photo */}
                    <div
                        className={`md:h-full transition-all duration-700 ease-out ${revealed ? 'opacity-100 translate-x-0' : 'opacity-0 md:-translate-x-10'}`}
                        style={{ flex: '0 0 auto', width: 'clamp(200px, 28%, 320px)' }}
                    >
                        <div className="flex flex-col gap-2 md:h-full">
                            <div className="relative md:flex-1">
                                {!hasClickedPhoto && (
                                    <span className="absolute -inset-1 rounded-xl border-2 border-brand-green/40 animate-pulse pointer-events-none" />
                                )}
                                <div
                                    className="relative w-full aspect-4/5 md:aspect-auto md:h-full rounded-lg overflow-hidden cursor-pointer group"
                                    onClick={() => { setIsPhotoRevealed(v => !v); setHasClickedPhoto(true); }}
                                >
                                    <img src="images/about3.webp" alt="Yun"
                                        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${isPhotoRevealed ? 'brightness-40 scale-105' : 'brightness-100'}`}
                                    />
                                    <div className={`absolute inset-0 flex flex-col items-center justify-center px-5 text-center transition-all duration-500 ${isPhotoRevealed ? 'opacity-100' : 'opacity-0'}`}>
                                        <p className="font-hand text-white text-lg leading-relaxed">{t('thanks for stopping by!', '謝謝你來逛逛！')}</p>
                                        <p className="font-hand text-white/80 text-base mt-2 leading-relaxed">{t('you will get to know me more here :)', '在這裡，你可以更認識我一點 :)')}</p>
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs font-mono text-brand-green/50 text-center md:text-left">
                                <span className="hidden md:inline">{t('✨ click me ✨', '✨ 點我 ✨')}</span>
                                <span className="md:hidden">{t('✨ tap me ✨', '✨ 點我 ✨')}</span>
                            </span>
                            <div className="inline-flex self-center md:self-start items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm">
                                <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: '#7BE849' }} />
                                <span className="font-mono text-[#555555] tracking-wide text-[11px] whitespace-nowrap">
                                    {t('Available for Internships', '尋找實習機會')}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Bio */}
                    <div
                        className={`flex-1 flex flex-col items-center md:items-start gap-4 transition-all duration-700 ease-out delay-100
                        ${revealed ? 'opacity-100 translate-x-0' : 'opacity-0 md:translate-x-10'}`}
                    >
                        <div className="flex flex-col gap-1 items-center md:items-start">
                            <Typewriter
                                phrases={language === 'zh'
                                    ? ['UX/UI 設計師', '使用者研究員']
                                    : ['UX/UI Designer', 'Design Researcher']}
                                speed={80}
                                deleteSpeed={40}
                                delay={2200}
                                className="font-mono text-sm text-brand-green tracking-widest uppercase"
                            />
                            <span className="font-mono text-sm text-text-secondary/60 flex items-center gap-1">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                {t('Vancouver, BC', '溫哥華，加拿大')}
                            </span>
                        </div>

                        <div className="w-full" style={{
                            maxHeight: bioExpanded ? '1200px' : '10rem',
                            overflow: 'hidden',
                            transition: 'max-height 0.4s ease-in-out',
                        }}>
                            <div className="flex flex-col gap-4 text-base text-text-secondary" style={{ lineHeight: '1.6' }}>
                                <p>{t(
                                    "My perspective on human behavior is deeply shaped by my experience living in Japan, where I observed how intentional details can elevate everyday experiences and make interactions feel seamless. Japanese design principles—particularly minimalism and the purposeful use of negative space—have taught me to prioritize clarity and intentionality in every decision.",
                                    "過去在日本生活的經驗，讓我學會觀察那些『看不見的細節』是如何讓生活更流暢。這份對細節的執著，也延續到了我的設計理念中。"
                                )}</p>
                                <p>{t(
                                    "I see UX/UI as a way to understand the deeper context behind human experience. It's where empathy becomes tangible and how a product feels is as vital as how it functions.",
                                    "我偏好簡潔、有呼吸感的設計風格，並相信好的設計應該是直覺且溫暖的。不只要好用，更要讓人用起來感覺很自然順暢。"
                                )}</p>
                                <p>{t(
                                    "As AI continues to change how fast everything moves, I find myself even more certain that keeping people at the center of design decisions is exactly where I want to be.",
                                    "雖然 AI 加速一切並改變設計的方式，但我始終相信設計的核心是「人」。"
                                )}</p>
                                <p>{t(
                                    "I'm looking forward to joining a team where design meaningfully shapes the product, alongside people who believe there's always more to learn.",
                                    "我很期待能加入一個重視設計、並讓設計真正發揮影響力的團隊，和一群願意持續學習的夥伴一起合作。"
                                )}</p>
                            </div>
                        </div>
                        {!bioExpanded && (
                            <div style={{ borderBottom: '1px dashed rgba(92, 92, 92, 0.3)', width: '100%' }} />
                        )}
                        <button
                            onClick={() => setBioExpanded(e => !e)}
                            className="font-mono text-xs text-text-secondary/70 flex items-center gap-1 transition-colors hover:text-text-secondary"
                            style={{
                                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                            }}
                        >
                            <span style={{
                                backgroundColor: 'rgba(123, 232, 73, 0.35)',
                                borderRadius: '3px',
                                padding: '12px 24px',
                            }}>
                                {bioExpanded ? 'Read less ↑' : 'Read more ↓'}
                            </span>
                        </button>

                        {/* Currently — vertical, full width of right column */}
                        <div className="w-full mt-6">
                            <p className="font-mono text-xs text-brand-green tracking-widest uppercase mb-2">Currently</p>
                            <div className="flex flex-col md:flex-row" style={{ gap: 'clamp(8px, 1.5vw, 16px)' }}>

                                <div className="flex-1 rounded-2xl border border-white/50 bg-white/20 backdrop-blur-xl p-3.5"
                                    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)' }}>
                                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-secondary/40 block md:text-[11px] md:tracking-[0.12em] md:text-text-secondary/60 mb-4">designing</span>
                                    <p className="font-mono text-[11px] text-text-secondary leading-snug">
                                        {t('a client project — rebranding & web design for a local coffee shop ☕️', '客戶專案 — 在地咖啡廳品牌重塑與網頁設計')}
                                    </p>
                                </div>

                                <div className="flex-1 rounded-2xl border border-white/50 bg-white/20 backdrop-blur-xl p-3.5 flex gap-3 items-center"
                                    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)' }}>
                                    <img
                                        src="/images/determined.jpg"
                                        alt="Determined"
                                        className="w-10 h-14 object-cover rounded-md shadow-sm shrink-0"
                                    />
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-secondary/40 block mb-1 md:text-[11px] md:tracking-[0.12em] md:text-text-secondary/60">slowly reading</span>
                                        <span className="font-mono text-[11px] text-text-secondary font-medium leading-snug">Determined</span>
                                        <span className="font-mono text-[10px] text-text-secondary/60 leading-snug">— Robert M. Sapolsky</span>
                                    </div>
                                </div>

                                <div className="flex-1 rounded-2xl border border-white/50 bg-white/20 backdrop-blur-xl p-3.5"
                                    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)' }}>
                                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-secondary/40 block mb-2 md:text-[11px] md:tracking-[0.12em] md:text-text-secondary/60">listening to</span>
                                    <MiniPlayer
                                        src="/audio/Hollow Coves - Purple.mp3"
                                        title="Purple"
                                        artist="Hollow Coves"
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="md:hidden flex gap-3">
                        </div>
                    </div>
                </div>

            </section>
            </FadeInSection>

            {/* Core Values */}
            <FadeInSection>
            <section className="max-w-7xl mx-auto px-5 md:px-20 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    <p className="font-mono text-xs text-brand-green tracking-widest uppercase mb-8">{t('Core Values', '核心價值')}</p>
                    <div className="divide-y divide-border">

                        {/* Empathetic */}
                        <div className="py-6 md:py-8 flex flex-col md:flex-row md:items-start gap-3 md:gap-16">
                            <h3 className="font-serif text-xl md:text-2xl text-text-primary shrink-0 md:w-44" style={language === 'zh' ? { fontFamily: '"Noto Serif TC", serif' } : undefined}>{t('Empathetic', '同理心')}</h3>
                            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                                {t("My strength lies in understanding diverse perspectives and identifying subtle behavioral cues. I translate genuine user needs into meaningful digital experiences through deep listening and observation.", '我善於理解多元觀點，捕捉細微的行為線索。透過深入的傾聽與觀察，我將真實的使用者需求轉化為有意義的數位體驗。')}
                            </p>
                        </div>

                        {/* Adaptive */}
                        <div className="py-6 md:py-8 flex flex-col md:flex-row md:items-start gap-3 md:gap-16">
                            <h3 className="font-serif text-xl md:text-2xl text-text-primary shrink-0 md:w-44" style={language === 'zh' ? { fontFamily: '"Noto Serif TC", serif' } : undefined}>{t('Adaptive', '適應力')}</h3>
                            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                                {t('I embrace new challenges with an open mind, continuously adapting to dynamic design environments and evolving best practices.', '我以開放的心態迎接設計環境中的新挑戰，持續適應變化並探索最佳實踐。')}
                            </p>
                        </div>

                        {/* Reflective */}
                        <div className="py-6 md:py-8 flex flex-col md:flex-row md:items-start gap-3 md:gap-16">
                            <h3 className="font-serif text-xl md:text-2xl text-text-primary shrink-0 md:w-44" style={language === 'zh' ? { fontFamily: '"Noto Serif TC", serif' } : undefined}>{t('Reflective', '反思力')}</h3>
                            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                                {t('I reflect on experience and continuously refine my approach, ensuring that every design decision is supported by clear, well-reasoned logic.', '我會反思經驗並持續優化我的設計方法，確保每個設計決策都有清晰、合理的邏輯支持。')}
                            </p>
                        </div>

                    </div>
                </div>
            </section>
            </FadeInSection>


            {/* Toolkits */}
            <FadeInSection>
            <section className="max-w-7xl mx-auto px-5 md:px-20 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    <p className="font-mono text-xs text-brand-green tracking-widest uppercase mb-8">
                        {t('Toolkits', '工具包')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Design & Prototyping */}
                        <div className="rounded-2xl border border-white/50 bg-white/20 backdrop-blur-xl p-5"
                            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)' }}>
                            <p className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-5">
                                {t('Design & Prototyping', '設計與原型')}
                            </p>
                            <div className="grid grid-cols-5 gap-x-2 gap-y-4">
                                {designTools.map(({ src, name, extraScale = 1 }) => (
                                    <ToolIcon key={name} src={src} name={name} extraScale={extraScale} />
                                ))}
                            </div>
                        </div>

                        {/* Technical Familiarity */}
                        <div className="rounded-2xl border border-white/50 bg-white/20 backdrop-blur-xl p-5"
                            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)' }}>
                            <p className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-5">
                                {t('Technical Familiarity', '技術工具')}
                            </p>
                            <div className="flex flex-wrap gap-x-3 gap-y-4">
                                {technicalSkills.map(({ src, name }) => (
                                    <ToolIcon key={name} src={src} name={name} />
                                ))}
                            </div>
                        </div>

                        {/* AI Tools */}
                        <div className="rounded-2xl border border-white/50 bg-white/20 backdrop-blur-xl p-5"
                            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)' }}>
                            <p className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-5">
                                {t('AI Tools', 'AI 工具')}
                            </p>
                            <div className="flex flex-wrap gap-x-3 gap-y-4">
                                {aiTools.map(({ src, name }) => (
                                    <ToolIcon key={name} src={src} name={name} />
                                ))}
                            </div>
                        </div>

                        {/* Languages */}
                        <div className="rounded-2xl border border-white/50 bg-white/20 backdrop-blur-xl p-5 flex flex-col"
                            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)' }}>
                            <p className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-4">
                                {t('Languages', '語言')}
                            </p>
                            <div className="flex-1 flex flex-col justify-around gap-3">
                                {[
                                    { front: 'English',  greeting: 'Hi!' },
                                    { front: 'Japanese', greeting: 'こんにちは！' },
                                    { front: 'Mandarin', greeting: '嗨！' },
                                ].map(({ front, greeting }) => (
                                    <LangFlipCell key={front} front={front} greeting={greeting} />
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </section>
            </FadeInSection>

            {/* Outside Design Chat */}
            <section ref={chatRef} className="max-w-7xl mx-auto pt-16 md:pt-24 px-5 md:px-20 py-8 md:py-12">
                {/* Q. - align left */}
                <div className={`flex justify-start mb-6 max-w-3xl transition-all duration-500 ${chatVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="bg-white border border-border px-5 py-3 shadow-sm" style={{ borderRadius: '20px 20px 20px 4px' }}>
                        <p className="text-text-primary font-mono text-sm">{t('Who is Yun, outside design?', '設計之外的 Yun 是怎麼樣的？')}</p>
                    </div>
                </div>

                {/* A. - three separate bubbles */}
                <div className="flex flex-col items-end gap-3">
                    {messages.map((msg, i) => visibleCount > i && (
                        <div key={i} className="chat-bubble-in max-w-[85%]">
                            <div className="bg-brand-green px-5 py-4 font-mono text-sm text-white leading-relaxed" style={{ borderRadius: '20px 20px 4px 20px' }}>
                                {msg}
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {showTyping && (
                        <div className="chat-bubble-in">
                            <div className="bg-brand-green px-5 py-4 flex gap-1.5 items-center" style={{ borderRadius: '20px 20px 4px 20px' }}>
                                <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* photo marquee */}
            <FadeInSection>
            <section className="py-4 pt-16 md:pt-24 pb-12 overflow-hidden">
                <style>{`
                    @keyframes marquee {
                        0%   { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .marquee-track {
                        display: flex;
                        gap: 12px;
                        width: max-content;
                        animation: marquee 30s linear infinite;
                    }
                    @media (min-width: 768px) {
                        .marquee-track { gap: 24px; }
                    }
                    .marquee-track:hover {
                        animation-play-state: paused;
                    }
                `}</style>
                <div className="marquee-track">
                    {[...photos, ...photos].map((photo, index) => {
                        const isActive = activeCaptionIndex === index;
                        return (
                            <div
                                key={index}
                                className="relative group shrink-0"
                                onTouchStart={() => setActiveCaptionIndex(isActive ? null : index)}
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.desc}
                                    loading='lazy'
                                    decoding='async'
                                    draggable={false}
                                    className="w-[168px] h-[285px] md:w-[268px] md:h-[456px] object-cover rounded-lg"
                                />
                                {/* Caption: hover on desktop, tap on mobile */}
                                <div className={`absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md transition-all duration-300
                                    md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0
                                    ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                    <p className="font-hand text-sm text-text-primary">{photo.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            </FadeInSection>
        </div>

    </PageTransition>
    )
}

export default About;