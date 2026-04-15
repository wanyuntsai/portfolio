import { useEffect, useState } from 'react';
import { FadeInSection, PageTransition } from '../components/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';
import ProjectCard from '../components/ProjectCard';



function Projects() {
    useEffect(() => {
        document.title = 'Work | Yun Tsai'
    
})
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState("All");

    const filters = [
        { value: "All", label: t("All", "全部") },
        { value: "UX/UI Design", label: t("UX/UI Design", "UX/UI 設計") },
        // { value: "AI Implementation", label: t("AI Implementation", "AI 實作") },
        { value: "Creative Coding", label: t("Creative Coding", "創意開發") },
    ];

    const projects = [
        {
            id: "VanLink",
            title: "VANLINK",
            subtitle: t('Vancouver transit app', '交通應用程式'),
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
            subtitle: t('YouTube music app redesign', '重新設計 YouTube Music App'),
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
        {
            id: "yunjam",
            title: "YUN JAM",
            subtitle: t('Interactive music playlist tool', '互動式音樂播放清單工具'),
            description: t('A turntable-style playlist builder — drop in any Spotify track, and share your entire playlist with a single URL.', '黑膠唱盤風格的播放清單工具 — 加入任意 Spotify 歌曲，用一個連結分享你的完整播放清單。'),
            image: "/images/YunJam/yunjam_mkup.png",
            tags: ["HTML", "CSS", "JavaScript", "Spotify API","Claude"],
            liveUrl: "https://wanyuntsai.github.io/yunjam/",
            category: "Creative Coding",
        },
    ]

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(project => project.category === activeFilter)

    return (
        <PageTransition>
        <div className="max-w-7xl mx-auto px-5 md:px-20 pt-24 pb-8 bg-brand-cream min-h-screen">

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
                    <FadeInSection key={project.id}>
                        <ProjectCard project={project} />
                    </FadeInSection>
                ))}
            </div>
        </div>
    </PageTransition>
    )
}

export default Projects;
