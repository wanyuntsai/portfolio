import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeInSection, PageTransition } from '../components/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';



function Projects() {
    useEffect(() => {
        document.title = 'Work | Yun Tsai'
    
})
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState("All");

    const filters = [
        { value: "All", label: t("All", "全部") },
        { value: "UX/UI Design", label: t("UX/UI Design", "UX/UI 設計") },
        { value: "Web Development", label: t("Web Development", "網頁開發") },
    ];

    const projects = [
        {
            id: "VanLink",
            title: "VANLINK",
            subtitle: t('Transit app', '交通應用程式'),
            description: t('Unified fragmented transit services into one mobile app, achieving 100% task success rate across 13 tested users.', '將碎片化的交通服務整合為單一行動 App，13 位測試者達成 100% 任務成功率。'),
            image: "/images/Vanlink/Vanlink_mkup.png",
            tags: ["UX/UI", "Figma", "Usability Testing"],
            link: "/work/vanlink",
            category: "UX/UI Design"
        },
                {
            id: "learn-now",
            title: "LEARNNOW",
            subtitle: t('E-learning platform', '線上學習平台'),
            description: t('Redesigned the save-for-later flow for an e-learning platform, achieving 100% task success rate with 5 tested users.', '重新設計線上學習平台的收藏流程，5 位測試者達成 100% 任務成功率。'),
            image: "/images/learnnow_mkup1.png",
            tags: ["UX/UI", "Figma", "Usability Testing"],
            link: "/work/learnnow",
            category: "UX/UI Design"
        },
        {
            id: "youtubemusic",
            title: "YOUTUBE MUSIC",
            subtitle: t('YouTube Music App Redesign', '重新設計 YouTube Music App'),
            description: t('Redesigned 3 key UX pain points across YouTube Music\'s homepage, player, and Samples flow to reduce friction and improve clarity.','針對 YouTube Music 的 3 個核心體驗痛點進行重新設計，涵蓋首頁編排、播放頁 Action Bar 與 Samples 流程，降低操作摩擦並提升導覽清晰度。'),
            image: "/images/YouTubeMusic/youtubemkup.png",
            tags: ["UX/UI", "Figma", "User Research"],
            link: "/work/youtubemusic",
            category: "UX/UI Design",
        },
        {
            id: "MindLog",
            title: "MINDLOG",
            subtitle: t('Mental health app', '心理健康應用程式'),
            description: t('Designed a 0-to-1 mental wellness app for the Canadian market, bridging the gap between daily journaling and accessible mental health resources.',
  '為加拿大市場從零設計心理健康 App，填補日記記錄與心理諮詢資訊管道之間的市場缺口。'),

            tags: ["UX/UI", "Figma", "User Research"],
            link: "/work/MindLog",
            category: "UX/UI Design",
            image: "/images/MindLog/MindLog_mkup.png",
        },
    ]

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(project => project.category === activeFilter)

    return (
        <PageTransition>
        <div className="px-5 md:px-20 pt-24 pb-8 bg-brand-cream min-h-screen">

            {/* Page Title */}
            <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">{t('My Work', '作品')}</h1>
            <p className="text-text-secondary font-mono mb-6">2025-2026</p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
                {filters.map(filter => (
                    <button
                        key={filter.value}
                        onClick={() => setActiveFilter(filter.value)}
                        className={`px-4 py-2 rounded-full text-base font-mono transition-colors ${
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
                        to={project.comingSoon ? '#' : project.link}
                        onClick={project.comingSoon ? e => e.preventDefault() : undefined}
                        className={`bg-white rounded-lg p-6 block transition-all duration-300 group h-full ${project.comingSoon ? 'cursor-default' : 'hover:shadow-lg cursor-pointer'}`}
                    >
                        {/* img */}
                        <div className="rounded-lg p-4 mb-4 overflow-hidden flex justify-center items-center">
                            {project.comingSoon ? (
                                <div className="w-full h-48 md:h-60 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <span className="text-text-secondary font-mono text-base opacity-40">Coming Soon</span>
                                </div>
                            ) : (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 md:h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            )}
                        </div>

                        {/* title */}
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-serif text-xl md:text-2xl text-text-primary">{project.title}</h3>
                            {project.comingSoon && (
                                <span className="text-base font-mono px-2 py-0.5 rounded-full border border-text-secondary text-text-secondary opacity-60">
                                    {t('Coming Soon', '即將推出')}
                                </span>
                            )}
                        </div>
                        <p className="text-text-secondary text-base mb-3 font-serif">{project.subtitle}</p>

                        {/* description - display only on desktop */}
                        <p className="hidden md:block text-base text-text-secondary mb-3 font-funnel leading-relaxed line-clamp-2">
                            {project.description}
                        </p>

                        {/* tags */}
                        <div className="flex gap-1.5 flex-wrap mb-4">
                            {project.tags?.map((tag, index) => (
                                <span
                                    key={index}
                                    className="rounded-full px-2 py-0.5 text-xs font-mono"
                                    style={{
                                        border: "1px solid #C5DFA0",
                                        background: "#F0F5E8",
                                        color: "#4A7A2A"
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* link */}
                        {!project.comingSoon && (
                            <span className="relative text-brand-green text-base font-mono inline-flex items-center gap-1 w-fit
                                transition-colors duration-300 group-hover:text-brand-green-light
                                after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-brand-green
                                after:transition-[width,background-color] after:duration-300 after:ease-out
                                group-hover:after:w-[calc(100%+4px)] group-hover:after:bg-brand-green-light">
                                {t('Case Study', '查看案例')}
                                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
                            </span>
                        )}
                    </Link>
                </FadeInSection>
                ))}
            </div>
        </div>
    </PageTransition>
    )
}

export default Projects;
