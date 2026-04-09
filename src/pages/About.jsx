import { useState, useRef, useEffect } from 'react';
import { FadeInSection, PageTransition } from '../components/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

// ── Language flip cell (mobile tap + desktop hover) ────────────────────────
function LangFlipCell({ front, greeting }) {
    const [flipped, setFlipped] = useState(false);
    return (
        <div
            style={{ perspective: '600px', width: '148px', height: '64px', cursor: 'pointer' }}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
            onClick={() => setFlipped(f => !f)}
        >
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.42s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                willChange: 'transform',
            }}>
                {/* Front */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '0.5px solid #ccc', borderRadius: '10px',
                    background: 'transparent',
                }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '16px', color: '#666' }}>
                        {front}
                    </span>
                </div>
                {/* Back */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '0.5px solid #9CAF6C', borderRadius: '10px',
                    background: '#FAFAFA',
                }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 400, color: '#3a5f1a' }}>
                        {greeting}
                    </span>
                </div>
            </div>
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

    // photo with descriptions
    const photos = [
        { src: 'images/about1.webp', desc: 'Grampians National Park, Australia — 2024' },
        { src: 'images/star.webp', desc: 'Great Ocean Rd, Australia — 2024' },
        { src: 'images/about2.webp', desc: 'Joffre Lakes, Canada — 2023' },
        { src: 'images/about4.webp', desc: 'Krimml Waterfalls, Austria — 2024' },
        { src: 'images/sunset.webp', desc: 'White Rock, Canada — 2025' },

    ]

    const [activeCaptionIndex, setActiveCaptionIndex] = useState(null);

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

            {/* h1 */}
            <section className='px-5 md:px-20 py-12 md:py-16'>
                <div className='relative flex flex-col justify-center items-center'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <h1 className='font-serif text-4xl text-text-primary cursor-default' style={language === 'zh' ? { fontFamily: '"Noto Serif TC", serif' } : undefined}>{t("Hi! I'm Yun", '嗨！我是 Yun')}</h1>

                    {/* desktop - hover me message */}
                    <span className={`hidden md:block text-xs font-mono text-brand-green/50 mt-3 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                        {t('✨ hover me ✨', '✨ hover me ✨')}
                    </span>

                    {/* desktop: appear when hover */}
                    <span
                        className={`hidden md:block absolute font-hand text-lg text-brand-green transition-all duration-500 ease-out
                            ${isHovered
                                ? 'opacity-100 -top-6 left-[35%] -rotate-12'
                                : 'opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0'
                            }`}
                    >
                        coffee
                    </span>

                    <span
                        className={`hidden md:block absolute font-hand text-lg text-brand-green transition-all duration-500 ease-out delay-75
                            ${isHovered
                                ? 'opacity-100 -top-4 right-[35%] rotate-6'
                                : 'opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0'
                            }`}
                    >
                        music
                    </span>

                    <span
                        className={`hidden md:block absolute font-hand text-lg text-brand-green transition-all duration-500 ease-out delay-100
                            ${isHovered
                                ? 'opacity-100 top-1/2 left-[30%] -translate-y-1/2 -rotate-6'
                                : 'opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0'
                            }`}
                    >
                        design
                    </span>

                    <span
                        className={`hidden md:block absolute font-hand text-lg text-brand-green transition-all duration-500 ease-out delay-150
                            ${isHovered
                                ? 'opacity-100 top-1/2 right-[30%] -translate-y-1/2 rotate-12'
                                : 'opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0'
                            }`}
                    >
                        nature
                    </span>

                    <span
                        className={`hidden md:block absolute font-hand text-lg text-brand-green transition-all duration-500 ease-out delay-200
                            ${isHovered
                                ? 'opacity-100 -bottom-4 left-1/2 -translate-x-1/2 rotate-3'
                                : 'opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0'
                            }`}
                    >
                        language
                    </span>

                    {/* mobile - default display */}
                    <div className="md:hidden absolute -bottom-12 flex gap-3">
                        <span className="font-hand text-sm text-brand-green">design</span>
                        <span className="text-brand-green">•</span>
                        <span className="font-hand text-sm text-brand-green">music</span>
                        <span className="text-brand-green">•</span>
                        <span className="font-hand text-sm text-brand-green">nature</span>
                    </div>
                </div>
            </section>

            {/* Profile Photo */}
            <FadeInSection>
            <section className="relative px-5 md:px-20 py-6 flex flex-col items-center gap-3">
                <div className="relative">
                    {/* Pulsing ring — disappears after first click */}
                    {!hasClickedPhoto && (
                        <span className="absolute -inset-1 rounded-xl border-2 border-brand-green/40 animate-pulse pointer-events-none" />
                    )}
                    <div
                        className="relative w-48 h-60 md:w-64 md:h-80 rounded-lg overflow-hidden cursor-pointer group"
                        onClick={() => {
                            setIsPhotoRevealed(v => !v);
                            setHasClickedPhoto(true);
                        }}
                    >
                        <img
                            src="images/about3.webp"
                            alt="Yun"
                            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${isPhotoRevealed ? 'brightness-40 scale-105' : 'brightness-100'}`}
                        />
                        <div className={`absolute inset-0 flex flex-col items-center justify-center px-5 text-center transition-all duration-500 ${isPhotoRevealed ? 'opacity-100' : 'opacity-0'}`}>
                            <p className="font-hand text-white text-lg md:text-xl leading-relaxed">
                                {t('thanks for stopping by!', '謝謝你來逛逛！')}
                            </p>
                            <p className="font-hand text-white/80 text-base md:text-lg mt-2 leading-relaxed">
                                {t('you will get to know me more here :)', '在這裡，你可以更認識我一點 :)')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Hint text — desktop: click me / mobile: tap me — disappears after first click */}
                <span className={`text-xs font-mono text-brand-green/50 transition-opacity duration-500 ${hasClickedPhoto ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <span className="hidden md:inline">{t('✨ click me ✨', '✨ 點我 ✨')}</span>
                    <span className="md:hidden">{t('✨ tap me ✨', '✨ 點我 ✨')}</span>
                </span>
            </section>
            </FadeInSection>

            {/* h2 */}
            <FadeInSection delay={0.1}>
            <section className='px-5 md:px-20 py-8 md:py-12 text-center'>
                <h2 className='text-xl text-text-secondary font-mono'>{t('UX/UI Designer | Vancouver', 'UX/UI 設計師 | 溫哥華')}</h2>
            </section>
            </FadeInSection>

            {/* Core Values */}
            <FadeInSection>
            <section className="px-5 md:px-20 pt-8 pb-16 md:pt-10 md:pb-20 min-h-[45vh] md:min-h-[55vh] flex flex-col">
                <div className="max-w-5xl mx-auto w-full flex flex-col flex-1">
                    <p className="font-mono text-xs text-brand-green tracking-widest uppercase">{t('Core Values', '核心價值')}</p>
                    <div className="flex-1" />
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
            <section className="px-5 md:px-20 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    <p className="font-mono text-xs text-brand-green tracking-widest uppercase mb-10">{t('Toolkits', '工具包')}</p>

                    {/* Design & Prototyping */}
                    <div className="mb-10">
                        <p className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-5">{t('Design & Prototyping', '設計與原型')}</p>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { src: '/images/icons/figma.svg',        name: 'Figma' },
                                { src: '/images/icons/photoshop.svg',    name: 'Photoshop' },
                                { src: '/images/icons/illustrator.svg',  name: 'Illustrator' },
                                { src: '/images/icons/indesign.svg',     name: 'InDesign' },
                                { src: '/images/icons/premiere.svg',     name: 'Premiere Pro' },
                                { src: '/images/icons/aftereffects.svg', name: 'After Effects' },
                                { src: '/images/dimension.png',          name: 'Adobe Dimension' },
                                { src: '/images/Canva.png',              name: 'Canva' },
                                { src: '/images/icons/wordpress.svg',    name: 'WordPress' },
                            ].map(({ src, name }) => (
                                <img
                                    key={name}
                                    src={src}
                                    alt={name}
                                    title={name}
                                    className="w-15 h-9 object-contain transition-all duration-200 cursor-default hover:-translate-y-0.75"
                                    style={{ filter: 'saturate(80%)' }}
                                    onMouseEnter={e => e.currentTarget.style.filter = 'saturate(100%) brightness(1.05)'}
                                    onMouseLeave={e => e.currentTarget.style.filter = 'saturate(80%)'}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Technical Familiarity */}
                    <div className="mb-10">
                        <p className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-5">{t('Technical Familiarity', '技術工具')}</p>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { src: '/images/icons/html.svg',        name: 'HTML5' },
                                { src: '/images/icons/css.svg',         name: 'CSS3' },
                                { src: '/images/icons/javascript.svg',  name: 'JavaScript' },
                                { src: '/images/icons/react.svg',       name: 'React.js' },
                                { src: '/images/icons/tailwind.svg',    name: 'Tailwind CSS' },
                            ].map(({ src, name }) => (
                                <img
                                    key={name}
                                    src={src}
                                    alt={name}
                                    title={name}
                                    className="w-9 h-9 transition-all duration-200 cursor-default hover:-translate-y-0.75"
                                    style={{ filter: 'saturate(80%)' }}
                                    onMouseEnter={e => e.currentTarget.style.filter = 'saturate(100%) brightness(1.05)'}
                                    onMouseLeave={e => e.currentTarget.style.filter = 'saturate(80%)'}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Languages — 3D greeting flip cells */}
                    <div>
                        <p className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-5">{t('Languages', '語言')}</p>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { front: 'English',  greeting: 'Hi!'       },
                                { front: 'Japanese', greeting: 'こんにちは！' },
                                { front: 'Mandarin', greeting: '嗨！'       },
                            ].map(({ front, greeting }) => (
                                <LangFlipCell key={front} front={front} greeting={greeting} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* Outside Design Chat */}
            <section ref={chatRef} className="pt-16 md:pt-24 px-5 md:px-20 py-8 md:py-12">
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