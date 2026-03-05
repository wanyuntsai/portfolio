import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeInSection, PageTransition } from '../components/AnimatedSection';

function Projects() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filters = ["All", "UX/UI Design", "Web Development"];
    
    const projects = [
        {
            id: "learn-now",
            title: "LEARNNOW",
            subtitle: "E-learning platform",
            description: "An online learning platform designed to help users discover, save, and book courses while managing their learning progress in a clear and intuitive experience.",
            image: "/images/learnnow_mkup1.png",
            tags: ["UX/UI", "Figma", "Maze"],
            link: "/work/learnnow",
            category: "UX/UI Design"
        },
        {
            id: "cloudair",
            title: "CLOUDAIR",
            subtitle: "Airline app",
            description: "AI-powered travel inspiration app that helps users discover and plan their perfect trips.",
            image: "/images/cloudair-hero.png",
            tags: ["UX/UI", "Illustrator"],
            link: "/work/cloudair",
            category: "UX/UI Design"
        },
        {
            id: "VanLink",
            title: "VANLINK",
            subtitle: "Transit app",
            description: "A transit app designed to help Vancouver commuters plan their journeys, top up balances, and activate monthly passes with ease.",
            image: "/images/Vanlink_mkup.png",
            tags: ["UX/UI", "Figma", "Maze"],
            link: "/work/vanlink",
            category: "UX/UI Design"
        },
        {
            id: "missbean",
            title: "MISSBEAN",
            subtitle: "Cafe website",
            description: "A coffee shop website showcasing modern web development techniques with JavaScript libraries.",
            image: "/images/missbean-hero.png",
            tags: ["Web Development", "JavaScript", "HTML", "CSS", "Figma"],
            link: "/work/missbean",
            category: "Web Development"
        }
    ]

    const filteredProjects = activeFilter === "All" 
        ? projects 
        : projects.filter(project => project.category === activeFilter)

    return (
        <PageTransition>
        <div className="px-5 md:px-20 py-8 bg-brand-cream min-h-screen">

            {/* Page Title */}
            <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">My Work</h1>
            <p className="text-text-secondary font-mono mb-6">2025-2026</p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
                {filters.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-2 rounded-full text-sm font-mono transition-colors ${
                            activeFilter === filter 
                            ? 'bg-brand-green text-white'
                            : 'border border-text-primary text-text-primary hover:bg-brand-green-light'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Projects Cards - 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map(project => (
                    <FadeInSection>
                    <Link 
                        key={project.id}
                        to={project.link}
                        className="bg-white rounded-lg p-6 block hover:shadow-lg transition-all cursor-pointer group"
                    >
                        {/* img */}
                        <div className="rounded-lg p-4 mb-4 overflow-hidden  flex justify-center items-center">
                            <img 
                                src={project.image}
                                alt={project.title}
                                className="w-90 h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        {/* title */}
                        <h3 className="font-serif text-xl md:text-2xl text-text-primary">{project.title}</h3>
                        <p className="text-text-secondary text-sm mb-3 font-serif">{project.subtitle}</p>

                        {/* tags */}
                        <div className="flex gap-2 flex-wrap mb-4">
                            {project.tags?.map((tag, index) => (
                                <span 
                                    key={index}
                                    className="rounded-full px-3 py-1 text-xs font-mono"
                                    style={{
                                        border: "1px solid #9BBF6A",
                                        background: "#F0F5E8",
                                        color: "#2B4A1A"
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* description - display only on desktop */}
                        <p className="hidden md:block text-sm text-text-secondary mb-4 font-mono leading-relaxed line-clamp-2">
                            {project.description}
                        </p>

                        {/* link */}
                        <span className="text-brand-green text-sm font-mono inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            View Project →
                        </span>
                    </Link>
                </FadeInSection>
                ))}
            </div>
        </div>
    </PageTransition>
    )
}

export default Projects;