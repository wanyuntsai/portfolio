import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { FadeInSection, PageTransition } from '../components/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';
import HeroRings from '../components/HeroRings';

import 'swiper/css';
import 'swiper/css/pagination';

// ─── Home ─────────────────────────────────────────────────────────────────────
function Home() {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [marqueeHovered, setMarqueeHovered] = useState(false);

  useEffect(() => { document.title = "Yun Tsai | Portfolio"; });

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

  const projects = [
    {
      id: "VanLink",
      title: "VANLINK",
      subtitle: t('Transit app', '大溫地區統一通勤 App'),
      description: t('Unified fragmented transit services into one mobile app, achieving 100% task success rate across 13 tested users.', '將碎片化的交通服務整合為單一行動 App，13 位測試者達成 100% 任務成功率。'),
      image: "/images/Vanlink/Vanlink_mkup.png",
      tags: ["UX/UI", "Figma", "Usability Testing"],
      link: "/work/Vanlink"
    },
    {
      id: "learnnow",
      title: "LEARNNOW",
      subtitle: t('E-learning platform', '線上學習平台'),
      description: t('Redesigned the save-for-later flow for an e-learning platform, achieving 100% task success rate with 5 tested users.', '重新設計線上學習平台的收藏流程，5 位測試者達成 100% 任務成功率。'),
      image: "/images/learnnow_mkup1.png",
      tags: ["UX/UI", "Figma", "Usability Testing"],
      link: "/work/learnnow"
    },
    // {
    //   id: "youtubemusic",
    //   title: "YOUTUBE MUSIC",
    //   subtitle: t('YouTube Music App Redesign', '重新設計YouTube Music App'),
    //   description: t('Redesigned the YouTube Music app to enhance user experience and streamline music discovery.', '重新設計YouTube Music App，以提升使用者體驗並簡化音樂探索。'),
    //   image: "/images/YouTubeMusic/youtubemkup.png",
    //   tags: ["UX/UI", "Figma", "User Research"],
    //   link: "/work/youtubemusic",
    //   // comingSoon: true
    // },
  ];

  const tools = [
    'UX Research', 'Usability Testing', 'Interaction Design',
    'Wireframing', 'Prototyping', 'Visual Design',
    'Responsive UI', 'Design Systems',
  ];

  const renderProjectCard = (project) => (
    <Link
      to={project.comingSoon ? '#' : project.link}
      onClick={project.comingSoon ? e => e.preventDefault() : undefined}
      className={`bg-white rounded-lg p-6 block transition-all group h-full ${project.comingSoon ? 'cursor-default opacity-70' : 'hover:shadow-lg cursor-pointer'}`}
    >
      <div className="rounded-lg p-4 mb-4 overflow-hidden flex justify-center items-center">
        {project.comingSoon ? (
          <div className="w-90 h-60 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-text-secondary font-mono text-base opacity-40">{t('Coming Soon', '即將推出')}</span>
          </div>
        ) : (
          <img src={project.image} alt={project.title} className="w-90 h-60 object-cover transition-transform duration-300 group-hover:scale-105" />
        )}
      </div>
      <div className="flex items-center gap-3 mb-1">
        <h3 className="font-serif text-xl md:text-2xl text-text-primary">{project.title}</h3>
        {project.comingSoon && (
          <span className="text-base font-mono px-2 py-0.5 rounded-full border border-text-secondary text-text-secondary opacity-60">
            {t('Coming Soon', '即將推出')}
          </span>
        )}
      </div>
      <p className="text-text-secondary text-base mb-3 font-serif">{project.subtitle}</p>
      <p className="hidden md:block text-base text-text-secondary mb-3 font-funnel leading-relaxed line-clamp-2">{project.description}</p>
      <div className="flex gap-1.5 flex-wrap mb-4">
        {project.tags?.map((tag, index) => (
          <span key={index} className="rounded-full px-2 py-0.5 text-xs font-mono" style={{ border: "1px solid #C5DFA0", background: "#F0F5E8", color: "#4A7A2A" }}>
            {tag}
          </span>
        ))}
      </div>
      {!project.comingSoon && (
        <span className="text-brand-green text-base font-mono inline-flex items-center gap-1 group-hover:gap-2 transition-all">
          {t('Case Study →', '案例研究 →')}
        </span>
      )}
    </Link>
  );

  return (
    <PageTransition>
      <div id="home-main-container">

        {/* ===== RINGS HERO ===== */}
        <HeroRings />


        {/* ===== TOOLS MARQUEE ===== */}
        <section
          className="py-4 border-y border-border overflow-hidden relative z-20 bg-[#FAF7F2]"
          onMouseEnter={() => setMarqueeHovered(true)}
          onMouseLeave={() => setMarqueeHovered(false)}
        >
          <div
            className="flex gap-8 text-text-secondary animate-marquee"
            style={{ animationPlayState: marqueeHovered ? 'paused' : 'running' }}
          >
            {tools.map((tool, index) => (
              <span key={index} className="whitespace-nowrap flex items-center gap-8">{tool}<span className="text-text-secondary">·</span></span>
            ))}
            {tools.map((tool, index) => (
              <span key={`repeat-${index}`} className="whitespace-nowrap flex items-center gap-8">{tool}<span className="text-text-secondary">·</span></span>
            ))}
          </div>
        </section>


        {/* ===== PROJECTS ===== */}
        <FadeInSection>
          <section id="projects" className="px-5 md:px-20 py-12">
            <div className="md:hidden">
              <Swiper modules={[Pagination]} pagination={{ clickable: true }} spaceBetween={20} slidesPerView={1} className="pb-12">
                {projects.map(project => (
                  <SwiperSlide key={project.id}>{renderProjectCard(project)}</SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-6">
              {projects.map(project => (
                <div key={project.id} className="h-full">{renderProjectCard(project)}</div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/work" className="border border-text-primary px-6 py-3 rounded-full hover:bg-gray-50 transition-colors font-mono text-sm">
                {t('View All Work →', '查看所有作品 → ')}
              </Link>
            </div>
          </section>
        </FadeInSection>


        {/* ===== CONTACT ===== */}
        <FadeInSection>
          <section className="px-5 md:px-20 py-20 md:py-28">
            <h2 className="text-4xl font-bold text-text-primary text-center font-serif">{t("Let's Connect!", '歡迎聯繫！')}</h2>
            <p className="mt-4 text-text-secondary text-center font-mono">
              {t("I'm always open to new opportunities, conversations, or simply exchanging ideas. Feel free to reach out!", '歡迎任何合作、交流或想法分享！')}
            </p>
            <div className="mt-8 flex flex-col gap-3 max-w-sm mx-auto">
              <a
                href="https://linkedin.com/in/yun-tsai"
                target="_blank"
                rel="noopener noreferrer"
                className="fill-btn group flex items-center gap-4 bg-transparent border border-[#C8C4BC] rounded-xl py-4 px-5"
                onMouseEnter={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.dataset.from = (e.clientX - r.left) < r.width / 2 ? 'left' : 'right'; }}
                onMouseLeave={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.dataset.from = (e.clientX - r.left) < r.width / 2 ? 'left' : 'right'; }}
              >
                <svg className="w-6 h-6 shrink-0 fill-text-primary group-hover:fill-white transition-colors duration-300" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span className="font-mono text-sm text-text-primary group-hover:text-white flex-1 transition-colors duration-300">linkedin.com/yun-tsai</span>
                <svg className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 stroke-white transition-opacity duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25"/>
                </svg>
              </a>
              <a
                href="mailto:yuntsaica@gmail.com"
                className="fill-btn group flex items-center gap-4 bg-transparent border border-[#C8C4BC] rounded-xl py-4 px-5"
                onMouseEnter={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.dataset.from = (e.clientX - r.left) < r.width / 2 ? 'left' : 'right'; }}
                onMouseLeave={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.dataset.from = (e.clientX - r.left) < r.width / 2 ? 'left' : 'right'; }}
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
  );
}

export default Home;