import { useState, useRef, useEffect } from 'react';
import { FadeInSection, PageTransition } from '../components/AnimatedSection';


function About() {
    const [isHovered, setIsHovered] = useState(false);
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
    const [isPhotoRevealed, setIsPhotoRevealed] = useState(false);
    const [hasClickedPhoto, setHasClickedPhoto] = useState(false);

    // photo with descriptions
    const photos = [
        { src: 'images/about1.webp', desc: 'Morning coffee ritual' },
        { src: 'images/star.webp', desc: '' },
        { src: 'images/about2.webp', desc: 'Exploring new places' },
        { src: 'images/about4.webp', desc: 'Finding calm in nature' },
        { src: 'images/sunset.webp', desc: 'Music & late nights' },
    ]

    const handleEnvelopeClick = () => {
        setIsEnvelopeOpen(!isEnvelopeOpen)
    }

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
                    <h1 className='font-serif text-4xl text-text-primary cursor-default'>Hi! I'm Yun</h1>

                    {/* desktop - hover me message */}
                    <span className={`hidden md:block text-xs font-mono text-brand-green/50 mt-3 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                        ✨ hover me ✨
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
                                thanks for stopping by!
                            </p>
                            <p className="font-hand text-white/80 text-base md:text-lg mt-2 leading-relaxed">
                                you will get to know me more here :)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Hint text — desktop: click me / mobile: tap me — disappears after first click */}
                <span className={`text-xs font-mono text-brand-green/50 transition-opacity duration-500 ${hasClickedPhoto ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <span className="hidden md:inline">✨ click me ✨</span>
                    <span className="md:hidden">✨ tap me ✨</span>
                </span>
            </section>
            </FadeInSection>

            {/* h2 */}
            <FadeInSection delay={0.1}>
            <section className='px-5 md:px-20 py-8 md:py-12 text-center'>
                <h2 className='text-xl text-text-secondary font-mono'>UX/UI Designer | Vancouver</h2> 
            </section>
            </FadeInSection>

            {/* intro */}
            <FadeInSection delay={0.1}>
            <section className="px-5 md:px-20 py-8 justify-center">
                <div className="space-y-6 max-w-5xl mx-auto">
                    {/* 1. */}
                    <div className="border border-border rounded-lg p-6 font-mono text-sm bg-brand-white">
                        <p className="text-brand-green font-mono text-sm mb-2">1.</p>
                        <p className="text-text-primary leading-relaxed">I approach design through deep user understanding, transforming needs and motivations into meaningful digital experiences.</p>
                    </div>

                    {/* 2. */}
                    <div className="border border-border rounded-lg p-6 font-mono text-sm bg-brand-white">
                        <p className="text-brand-green font-mono text-sm mb-2">2.</p>
                        <p className="text-text-primary leading-relaxed">Living across cultures taught me to stay curious and see things from different angles. I bring this perspective to every design decision I make.</p>
                    </div>

                    {/* 3. */}
                    <div className="border border-border rounded-lg p-6 font-mono text-sm bg-brand-white">
                        <p className="text-brand-green font-mono text-sm mb-2">3.</p>
                        <p className="text-text-primary leading-relaxed">I'm drawn to thoughtful design that prioritizes clarity and usability. My goal is to create products that feel effortless to use and genuinely make people's everyday experiences a little easier.</p>
                    </div>
                </div>
            </section>
            </FadeInSection>


            {/* Core Values */}
            <FadeInSection>
            <section className="px-5 md:px-20 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    <p className="font-mono text-xs text-brand-green tracking-widest uppercase mb-8">Core Values</p>
                    <div className="divide-y divide-border">

                        {/* Empathetic */}
                        <div className="py-6 md:py-8 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
                            <h3 className="font-serif text-3xl md:text-4xl text-text-primary shrink-0 w-48">Empathetic</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Living in Japan introduced me to <em>kuuki wo yomu</em> — literally,
                                "reading the air." It's the practice of sensing what's unspoken in a room:
                                the mood, the hesitation, what someone means beneath what they actually say.
                                That cultural training sharpened something I already felt naturally.
                                In design, it means I don't wait for users to articulate a problem —
                                I'm already paying attention to where they pause, hesitate, or quietly give up.
                            </p>
                        </div>

                        {/* Adaptive */}
                        <div className="py-6 md:py-8 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
                            <h3 className="font-serif text-3xl md:text-4xl text-text-primary shrink-0 w-48">Adaptive</h3>
                            <p className="text-text-secondary leading-relaxed">
                                I left home in high school, spent time living in Japan, and eventually chose
                                Vancouver as the place to build something new. Each move brought a different
                                way of seeing the world — and I found I was genuinely excited by that, not
                                unsettled. Encountering different perspectives doesn't feel like friction to me.
                                It feels like information.
                            </p>
                        </div>

                        {/* Reflective */}
                        <div className="py-6 md:py-8 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
                            <h3 className="font-serif text-3xl md:text-4xl text-text-primary shrink-0 w-48">Reflective</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Friends often come to me when they need someone who will genuinely sit with
                                all sides of a situation before weighing in. I naturally think about the
                                <em> why</em> behind things — what someone really means, what a decision
                                is actually solving for. In design, this shows up as a habit of questioning
                                assumptions, including my own, and returning to earlier choices not to
                                second-guess, but to understand more deeply.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
            </FadeInSection>


            {/* Outside Design Chat */}
            <FadeInSection>
            <section className="px-5 md:px-20 py-8 md:py-12">
                {/* Q. - align left */}
                <div className="flex justify-start mb-6 max-w-3xl">
                    <div 
                        className="bg-white border border-border px-5 py-3 shadow-sm"
                        style={{ borderRadius: '20px 20px 20px 4px' }}
                    >
                        <p className="text-text-primary font-mono text-sm">Who is Yun, outside design?</p>
                    </div>
                </div>
                
                {/* A. - align right */}
                <div className="flex justify-end mb-6 font-mono text-sm">
                    <div 
                        className="bg-brand-green px-5 py-4 max-w-[85%]"
                        style={{ borderRadius: '20px 20px 4px 20px' }}
                    >
                        <p className="text-white leading-relaxed">
                            I'm someone who finds balance between quiet moments 
                            and a good dose of adventure.
                        </p>
                        <p className="text-white leading-relaxed mt-4">
                            In my downtime, you'll find me watching the skies, 
                            going for a walk, vibing to indie folk, or diving into 
                            creative content online.
                        </p>
                        <p className="text-white leading-relaxed mt-4">
                            I'm all about staying curious, keeping things interesting, 
                            and never stopping the learning process. Life's a journey, 
                            and I'm just trying to enjoy the ride.
                        </p>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* photo */}
            <FadeInSection>
            <section className="py-4">
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