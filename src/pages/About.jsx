import { useState } from 'react';
import { FadeInSection, PageTransition } from '../components/AnimatedSection';


function About() {
    const [isHovered, setIsHovered] = useState(false);
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

    // photo with descriptions
    const photos = [
        { src: 'images/about1.webp', desc: 'Morning coffee ritual' },
        { src: 'images/star.webp', desc: '' },
        { src: 'images/about2.webp', desc: 'Exploring new places' },
        { src: 'images/about3.webp', desc: 'Chasing golden hour' },
        { src: 'images/about4.webp', desc: 'Finding calm in nature' },
        { src: 'images/sunset.webp', desc: 'Music & late nights' },
    ]

    const handleEnvelopeClick = () => {
        setIsEnvelopeOpen(!isEnvelopeOpen)
    }

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

                    {/* 手機版 - 預設顯示 */}
                    <div className="md:hidden absolute -bottom-12 flex gap-3">
                        <span className="font-hand text-sm text-brand-green">coffee</span>
                        <span className="text-brand-green">•</span>
                        <span className="font-hand text-sm text-brand-green">music</span>
                        <span className="text-brand-green">•</span>
                        <span className="font-hand text-sm text-brand-green">design</span>
                    </div>
                </div>
            </section>

            {/* Profile Photo */}
            <FadeInSection>
            <section className="px-5 md:px-20 py-6 flex justify-center">
                <div className="w-48 h-60 md:w-64 md:h-80 rounded-lg overflow-hidden ">
                    <img 
                    // placeholder
                        src="https://picsum.photos/400/400?random=profile" 
                        alt="Yun working"
                        className="w-full h-full object-cover"
                    />
                </div>
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


            {/* Outside Design 對話框 */}
            <FadeInSection>
            <section className="px-5 md:px-20 py-8 md:py-12">
                {/* 問題 - 靠左 */}
                <div className="flex justify-start mb-6 max-w-3xl">
                    <div 
                        className="bg-white border border-border px-5 py-3 shadow-sm"
                        style={{ borderRadius: '20px 20px 20px 4px' }}
                    >
                        <p className="text-text-primary font-mono text-sm">Who is Yun, outside design?</p>
                    </div>
                </div>
                
                {/* 回答 - 靠右 */}
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
            <section className="overflow-hidden py-4">
                <div className="flex gap-3 md:gap-6 animate-marquee-photos">
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
                                className="w-[168px] h-[285px] md:w-[268px] md:h-[456px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            {/* Hover 文字框 */}
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