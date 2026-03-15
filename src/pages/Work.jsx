import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeInSection, PageTransition } from '../components/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

function Projects() {
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState("All");

    const filters = [
        { value: "All", label: t("All", "全部") },
        { value: "UX/UI Design", label: t("UX/UI Design", "UX/UI 設計") },
        { value: "Web Development", label: t("Web Development", "網頁開發") },
    ];

    const projects = [
        {
            id: "learn-now",
            title: "LEARNNOW",
            subtitle: t('E-learning platform', '線上學習平台'),
            description: t('An online learning platform designed to help users discover, save, and book courses while managing their learning progress in a clear and intuitive experience.', '一個線上學習平台，協助使用者探索、收藏及預約課程，並以清晰直覺的介面管理學習進度。'),
            image: "/images/learnnow_mkup1.png",
            tags: ["UX/UI", "Figma", "Maze"],
            link: "/work/learnnow",
            category: "UX/UI Design"
        },
        {
            id: "cloudair",
            title: "CLOUDAIR",
            subtitle: t('Airline app', '航空應用程式'),
            description: t('AI-powered travel inspiration app that helps users discover and plan their perfect trips.', 'AI 驅動的旅遊靈感 App，協助使用者探索並規劃理想旅程。'),
            image: "/images/cloudair-hero.png",
            tags: ["UX/UI", "Illustrator"],
            link: "/work/cloudair",
            category: "UX/UI Design"
        },
        {
            id: "VanLink",
            title: "VANLINK",
            subtitle: t('Transit app', '交通應用程式'),
            description: t('A transit app designed to help Vancouver commuters plan their journeys, top up balances, and activate monthly passes with ease.', '專為大溫地區通勤者設計的交通 App，輕鬆規劃路線、儲值及啟用月票。'),
            image: "/images/Vanlink/Vanlink_mkup.png",
            tags: ["UX/UI", "Figma", "Maze"],
            link: "/work/vanlink",
            category: "UX/UI Design"
        },
        {
            id: "missbean",
            title: "MISSBEAN",
            subtitle: t('Cafe website', '咖啡廳網站'),
            description: t('A coffee shop website showcasing modern web development techniques with JavaScript libraries.', '一個咖啡廳網站，展示現代網頁開發技術與 JavaScript 套件的應用。'),
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
            <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">{t('My Work', '作品')}</h1>
            <p className="text-text-secondary font-mono mb-6">2025-2026</p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
                {filters.map(filter => (
                    <button
                        key={filter.value}
                        onClick={() => setActiveFilter(filter.value)}
                        className={`px-4 py-2 rounded-full text-sm font-mono transition-colors ${
                            activeFilter === filter.value
                            ? 'bg-brand-green text-white'
                            : 'border border-text-primary text-text-primary hover:bg-brand-green-light'
                        }`}
                    >
                        {filter.label}
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
                            {t('View Project →', '查看專案 →')}
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
