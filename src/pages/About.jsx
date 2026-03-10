import { useState, useRef, useEffect } from 'react';
import { FadeInSection, PageTransition } from '../components/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';


function About() {
    const { t } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);
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

    // Photo strip drag-to-scroll + auto-scroll
    const scrollRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const startScrollLeft = useRef(0);
    const isPausedByUser = useRef(false);
    const animFrameRef = useRef(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const tick = () => {
            if (!isPausedByUser.current) {
                el.scrollLeft += 0.6;
                if (el.scrollLeft >= el.scrollWidth / 2) {
                    el.scrollLeft = 0;
                }
            }
            animFrameRef.current = requestAnimationFrame(tick);
        };
        animFrameRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animFrameRef.current);
    }, []);

    const onDragStart = (clientX) => {
        isDragging.current = true;
        isPausedByUser.current = true;
        startX.current = clientX;
        startScrollLeft.current = scrollRef.current.scrollLeft;
    };
    const onDragMove = (clientX) => {
        if (!isDragging.current) return;
        scrollRef.current.scrollLeft = startScrollLeft.current - (clientX - startX.current);
    };
    const onDragEnd = () => {
        isDragging.current = false;
        isPausedByUser.current = false;
    };

    return (
        <PageTransition>
        <div className="bg-brand-cream flex-1">

            {/* h1 */}
            <section className='px-5 md:px-20 py-12 md:py-16'>
                <div className='relative flex flex-col justify-center items-center'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <h1 className='font-serif text-4xl text-text-primary cursor-default'>{t("Hi! I'm Yun", '嗨！我是 Yun')}</h1>

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
                                {t('you will get to know me more here :)', '在這裡，你可以更認識我 :)')}
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
            <section className="px-5 md:px-20 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    <p className="font-mono text-xs text-brand-green tracking-widest uppercase mb-8">{t('Core Values', '核心價值')}</p>
                    <div className="divide-y divide-border">

                        {/* Empathetic */}
                        <div className="py-6 md:py-8 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
                            <h3 className="font-serif text-3xl md:text-4xl text-text-primary shrink-0 w-48">{t('Empathetic', '同理心')}</h3>
                            <p className="text-text-secondary leading-relaxed">
                                {t("I tune into others' perspectives and notice subtle cues. I listen deeply, offer support, and adjust my approach as needed.", '我善於理解他人的觀點，細心察覺細微的線索，深入聆聽並適時調整自己的方式。')}
                            </p>
                        </div>

                        {/* Adaptive */}
                        <div className="py-6 md:py-8 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
                            <h3 className="font-serif text-3xl md:text-4xl text-text-primary shrink-0 w-48">{t('Adaptive', '適應力')}</h3>
                            <p className="text-text-secondary leading-relaxed">
                                {t('Moving across different places and environments has shaped who I am. I embrace each change with curiosity and openness.', '在不同地方與環境中生活，塑造了現在的我。我以好奇與開放的心態迎接每一次變化。')}
                            </p>
                        </div>

                        {/* Reflective */}
                        <div className="py-6 md:py-8 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
                            <h3 className="font-serif text-3xl md:text-4xl text-text-primary shrink-0 w-48">{t('Reflective', '反思力')}</h3>
                            <p className="text-text-secondary leading-relaxed">
                                {t('I learn from every experience and refine my thinking. Life is a constant opportunity to gain new perspectives from people with different backgrounds.', '我從每一次經驗中學習，不斷精進自己的思維。生活中，每個人都能帶來新的觀點與啟發，每個人都是值得學習的對象。')}
                            </p>
                        </div>

                    </div>
                </div>
            </section>
            </FadeInSection>


            {/* Outside Design Chat */}
            <FadeInSection>
            <section className="pt-16 md:pt-24 px-5 md:px-20 py-8 md:py-12">
                {/* Q. - align left */}
                <div className="flex justify-start mb-6 max-w-3xl">
                    <div
                        className="bg-white border border-border px-5 py-3 shadow-sm"
                        style={{ borderRadius: '20px 20px 20px 4px' }}
                    >
                        <p className="text-text-primary font-mono text-sm">{t('Who is Yun, outside design?', '設計之外的 Yun')}</p>
                    </div>
                </div>

                {/* A. - align right */}
                <div className="flex justify-end mb-6 font-mono text-sm">
                    <div
                        className="bg-brand-green px-5 py-4 max-w-[85%]"
                        style={{ borderRadius: '20px 20px 4px 20px' }}
                    >
                        <p className="text-white leading-relaxed">
                            {t("I'm someone who finds balance between quiet moments and a good dose of adventure.", '我享受寧靜，也熱愛冒險，喜歡兩者並存的生活。')}
                        </p>
                        <p className="text-white leading-relaxed mt-4">
                            {t("In my downtime, you'll find me watching the skies, going for a walk, vibing to indie folk, or diving into creative content online.", '休閒時，我喜歡看看天空、散散步、聽獨立民謠，或探索網路上的各種創意內容。')}
                        </p>
                        <p className="text-white leading-relaxed mt-4">
                            {t("I'm all about staying curious, keeping things interesting, and never stopping the learning process. Life's a journey, and I'm just trying to enjoy the ride.", '我熱衷於保持好奇心、讓生活充滿趣味，並持續學習。人生是一段旅程，我只想盡情享受沿途風景。')}
                        </p>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* photo */}
            <FadeInSection>
            <section className="py-4 pt-16 md:pt-24 pb-12">
                <div
                    ref={scrollRef}
                    className="flex gap-3 md:gap-6 overflow-x-auto cursor-grab active:cursor-grabbing select-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onMouseDown={(e) => onDragStart(e.clientX)}
                    onMouseMove={(e) => onDragMove(e.clientX)}
                    onMouseUp={onDragEnd}
                    onMouseLeave={onDragEnd}
                    onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
                    onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
                    onTouchEnd={onDragEnd}
                >
                    {[...photos, ...photos].map((photo, index) => (
                        <div
                            key={index}
                            className="relative group shrink-0"
                        >
                            <img
                                src={photo.src}
                                alt={photo.desc}
                                loading='lazy'
                                decoding='async'
                                draggable={false}
                                className="w-[168px] h-[285px] md:w-[268px] md:h-[456px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            {/* Hover text box */}
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <p className="font-hand text-sm text-text-primary">{photo.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            </FadeInSection>
        </div>
    </PageTransition>
    )
}

export default About;
