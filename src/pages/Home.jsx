import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FadeInSection, PageTransition } from '../components/AnimatedSection';

import 'swiper/css';
import 'swiper/css/pagination';

function Home() {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setMousePosition({ x, y });
        }
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        document.body.style.background = `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #E8EDD8 0%, transparent 30%),
            radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, #F5E6C8 0%, transparent 25%),
            radial-gradient(circle at 78% 60%, #E8EDD8 0%, transparent 45%),
            #FAF7F2
        `;
        document.body.style.backgroundAttachment = 'fixed';
        return () => {
            document.body.style.background = '';
            document.body.style.backgroundAttachment = '';
        };
    }, [mousePosition]);

    // project
    const projects = [
        {
            id: "learnnow",
            title: "LEARNNOW",
            subtitle: "E-learning platform",
            description: "An online learning platform designed to help users discover, save, and book courses while managing their learning progress in a clear and intuitive experience.",
            image: "/images/learnnow_mkup1.png",
            imgFit: "object-contain",
            imgPosition: "object-center",
            tags: ["UX/UI", "Figma", "Maze"],
            link: "/work/learnnow"
        },
        {
            id: "cloudair",
            title: "CLOUDAIR",
            subtitle: "Airline app",
            description: "AI-powered travel inspiration app that helps users discover and plan their perfect trips.",
            image: "/cloudair.png",
            tags: ["UX/UI", "Illustrator"],
            link: "/projects/cloudair"
        },
        {
            id: "VanLink",
            title: "VANLINK",
            subtitle: "Transit app",
            description: "A transit app designed to help Vancouver commuters plan their journeys,top up balances, and activate monthly passes with ease.",
            image: "/vanlink.png",
            tags: ["UX/UI", "Figma", "Maze"],
            link: "/projects/vanlink"
        },
        {
            id: "missbean",
            title: "MISSBEAN",
            subtitle: "Cafe website",
            description: "A coffee shop website showcasing modern web development techniques with JavaScript libraries.",
            image: "/missbean.png",
            tags: ["Web Development", "JavaScript", "HTML", "CSS", "Figma"],
            link: "/projects/missbean"
        }
    ]

    // tools
    const tools = [
        'Figma',
        'HTML',
        'CSS',
        'JavaScript',
        'React',
        'Adobe Illustrator',
        'Adobe Photoshop',
        'Adobe InDesign',
        'Adobe After Effects',
        'Adobe Premiere Pro',
        ]
        
// project function
const renderProjectCard = (project) => (
    <div className="rounded overflow-hidden h-full flex flex-col group">
        <div className="rounded-lg p-4 mb-4 overflow-hidden flex justify-center items-center">
            <img src={project.image} alt={project.title} className="w-90 h-60 object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        <div className="bg-white p-8 flex flex-col flex-1">
            <h3 className="font-serif font-bold text-2xl text-text-primary">{project.title}</h3>
            <p className="text-text-secondary mb-3 font-serif">{project.subtitle}</p>

            {/* tags */}
            <div className="flex gap-2 flex-wrap mb-4">
                {project.tags?.map((tag, index) => (
                <span key={index}
                    className="rounded-full px-5 py-2 text-xs font-mono" style={{
                    border: "1px solid #9BBF6A",
                    background: "#F0F5E8",
                    color: "#2B4A1A"
                }}>
                    {tag}
                </span>
                ))}
            </div>

            <p className="text-sm text-text-secondary mb-6 font-mono">{project.description}</p>

            <Link to={project.link} className="text-text-primary text-sm font-medium inline-flex items-center gap-1 mb-2 hover:gap-2 transition-all mt-auto font-mono">
                → View Case Study
            </Link>
        </div>
    </div>
  )

    return (
      <PageTransition>
        <div>
            {/* hero title */}
        <section className="min-h-screen px-5 md:px-10 flex flex-col justify-center relative pt-24">
      <motion.h1
        initial={{opacity:0, y:30}}
        animate={{opacity:1, y:0}}
        transition={{duration: 0.8, ease: "easeOut"}}
        className="font-serif text-4xl lg:text-6xl text-text-primary leading-tight text-left lg:max-w-2xl">
          Creating digital experiences where users feel understood and interactions feel{' '}
          <span className="underline decoration-brand-green decoration-2 underline-offset-4">natural</span>.
        </motion.h1>

       <motion.div
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.8, delay:0.3, ease:"easeOut"}}
        className='mt-6 flex flex-col items-start'>
        <p className="text-text-secondary font-serif text-2xl italic">UX/UI Designer</p>

        {/* hero CTA btn */}
        <Link to="/work" className="mt-6 text-white bg-brand-green-button rounded-full px-4 py-3 text-sm md:px-6 md:py-3 md:text-lg hover:opacity-90 hover:-translate-y-1 active:scale-95 font-mono shadow-lg transition-all">Explore My Work</Link>
        </motion.div>

        {/* Arrow - centered at bottom */}
        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{duration:0.8, delay:0.6}}
          className="absolute bottom-10 inset-x-0 text-center">
            <button
             onClick={() => {
              document.getElementById('projects')?.scrollIntoView({
                behavior:'smooth'
              });
             }}
              className="text-2xl text-text-secondary animate-bounce-slow hover:text-brand-green transition-colors cursor-pointer"
             >↓
             </button>
        </motion.div>
    </section>

{/* location */}
        <motion.div
          initial={{opacity:0, y:20}}
          animate={{opacity:1, y:0}}
          transition={{duration:0.8, delay:0.5, ease:"easeOut"}}
          className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-text-primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
            <span className='font-serif'>Vancouver, CA</span>
          </div>

<span className="px-5 py-3 bg-white text-brand-green rounded-full text-sm flex items-center gap-2 font-mono border border-brand-green/30 shadow-sm">
  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#7BE849' }}></span>
  Open to internships, May 2026
</span>
</motion.div>

       {/* ===== TOOLS MARQUEE ===== */}
      <section className="py-4 border-y border-border overflow-hidden mt-16">
        <div className="flex gap-8 text-text-secondary animate-marquee">
          {tools.map((tool, index) => (
            <span key={index} className="whitespace-nowrap">{tool}</span>
          ))}
          {/* repeate the animation */}
          {tools.map((tool, index) => (
            <span key={`repeat-${index}`} className="whitespace-nowrap">{tool}</span>
          ))}
        </div>
      </section>

       {/* ===== PROJECTS SECTION ===== */}
      <FadeInSection>
      <section id="projects" className="px-5 md:px-28 py-12">
        
        {/* mobile：Carousel */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className="pb-12"
          >
            {projects.map(project => (
              <SwiperSlide key={project.id}>
                {renderProjectCard(project)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

{/* desktop：2x2 Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {projects.map(project => (
            <div key={project.id}>
              {renderProjectCard(project)}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/work" className="border border-text-primary px-6 py-3 rounded-full hover:bg-gray-50 transition-colors font-mono text-sm">
            → View All Work
          </Link>
        </div>
      </section>
    </FadeInSection>


 {/* ===== CONTACT SECTION ===== */}
    <FadeInSection> 
      <section className="px-5 md:px-20 py-20 md:py-28">
        <h2 className="text-4xl font-bold text-text-primary text-center font-serif">Let's Connect!</h2>
        <p className="mt-4 text-text-secondary text-center font-mono">
          I'm always open to new opportunities, conversations, or simply exchanging ideas. Feel free to reach out!
        </p>
        
        <div className="mt-8 flex flex-col gap-3 max-w-sm mx-auto">
          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/yun-tsai"
            target="_blank"
            rel="noopener noreferrer"
            className="fill-btn group flex items-center gap-4 bg-gray-100 rounded-xl py-4 px-5"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.dataset.from = (e.clientX - rect.left) < rect.width / 2 ? 'left' : 'right';
            }}
            onMouseLeave={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.dataset.from = (e.clientX - rect.left) < rect.width / 2 ? 'left' : 'right';
            }}
          >
            <svg className="w-6 h-6 shrink-0 fill-text-primary group-hover:fill-white transition-colors duration-300" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span className="font-mono text-sm text-text-primary group-hover:text-white flex-1 transition-colors duration-300">linkedin.com/yun-tsai</span>
            <svg className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 stroke-white transition-opacity duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25"/>
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:yuntsaica@gmail.com"
            className="fill-btn group flex items-center gap-4 bg-gray-100 rounded-xl py-4 px-5"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.dataset.from = (e.clientX - rect.left) < rect.width / 2 ? 'left' : 'right';
            }}
            onMouseLeave={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.dataset.from = (e.clientX - rect.left) < rect.width / 2 ? 'left' : 'right';
            }}
          >
            <svg className="w-6 h-6 shrink-0 stroke-text-primary group-hover:stroke-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
            </svg>
            <span className="font-mono text-sm text-text-primary group-hover:text-white flex-1 transition-colors duration-300">yuntsaica@gmail.com</span>
            <svg className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 stroke-white transition-opacity duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25"/>
            </svg>
          </a>
        </div>
      </section>
    </FadeInSection> 
    </div>
  </PageTransition>
  )
}

export default Home;