import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectNav from '../../components/ProjectNav';
import { FadeInSection, PageTransition } from "../../components/AnimatedSection";
import { useLanguage } from '../../context/LanguageContext';
import {
    Search,
    MapPin,
    CreditCard,
    RefreshCw,
    Lightbulb,
    Pencil,
    FlaskConical,
    Smartphone,
    Layers,
    Shapes,
    XCircle,
    Frown

} from 'lucide-react';


function Vanlink() {
    const { t } = useLanguage();
    const [flowView, setFlowView] = useState('before');
    const [lightboxImg, setLightboxImg] = useState(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [tocItems, setTocItems] = useState([]);
    const [activeId, setActiveId] = useState('');
    const [showToc, setShowToc] = useState(false);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
            setShowBackToTop(scrolled > 400);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!lightboxImg) return;
        const handleKey = (e) => { if (e.key === 'Escape') setLightboxImg(null); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [lightboxImg]);


    // TOC: assign IDs to h2s and build items list
    useEffect(() => {
        const headings = Array.from(document.querySelectorAll('h2'));
        const items = headings.map((h, i) => {
            const id = `toc-${i}`;
            h.id = id;
            h.style.scrollMarginTop = '100px';
            return { id, text: h.textContent.trim() };
        });
        setTimeout(() => setTocItems(items), 0);
    }, []);

    // TOC: highlight active section
    useEffect(() => {
        if (!tocItems.length) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                        setShowToc(true);
            }
                });
            },
            { rootMargin: '0% 0% -50% 0%', threshold:0.1 }
        );
        tocItems.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [tocItems]);


    return (
        <>
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 z-60 h-0.5 bg-[#1a4a8a] transition-all duration-100"
            style={{ width: `${scrollProgress}%` }} />

        {/* Back to Top */}
        {showBackToTop && (
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 z-50 w-10 h-10 bg-[#1a4a8a] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#1a4a8a]/80 transition-colors"
                aria-label="Back to top"
            >↑</button>
        )}

        {lightboxImg && (
            <div
                className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
                onClick={() => setLightboxImg(null)}
            >
                <img
                    src={lightboxImg}
                    alt=""
                    className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        )}
        <PageTransition>
        <div className="bg-neutral-50 pt-20">
            {/* ===== Breadcrumb ===== */}
            <nav className="max-w-7xl mx-auto px-5 md:px-16 xl:px-20 pt-8 md:pt-14">
                <div className="flex items-center gap-2 text-sm md:text-sm font-mono">
                    <Link to="/work" className="text-brand-green hover:underline">{t('Work', '作品')}</Link>
                    <span className="text-text-secondary">{'>'}</span>
                    <span className="text-text-primary">VanLink</span>
                </div>
            </nav>

            {/* ===== Header ===== */}
            <section className="max-w-7xl mx-auto px-5 md:px-16 xl:px-20 py-4 md:py-10">
                <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-12">

                    <div className="md:w-1/2 flex flex-col">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="font-serif text-3xl md:text-5xl text-text-primary">VanLink</h1>
                            <p className="font-serif text-lg md:text-2xl text-text-secondary">
                                {t('Unified Transit App for Metro Vancouver', '大溫地區統一通勤 App')}
                            </p>
                            <p className="pt-2 text-base text-text-secondary leading-relaxed">
                                {t('A transit app that integrates Compass Card management, real-time transit tracking, and U-Pass renewal into one seamless mobile experience — eliminating the need to switch between multiple platforms.', '將Compass Card管理、地圖導航與學生月票（U-Pass） 更新等多功能整合於單一行動平台的通勤 App，消除在多個平台間切換的需求，以增加通勤族的便利性。')}
                            </p>
                        </div>
                        <div className="flex gap-8 md:gap-16 pt-4 md:pt-6">
                            <div>
                                <p className="font-serif text-sm md:text-lg text-text-primary mb-1">{t('Tools', '工具')}</p>
                                <p className="font-mono text-sm text-text-secondary">Figma, Maze</p>
                            </div>
                            <div>
                                <p className="font-serif text-sm md:text-lg text-text-primary mb-1">{t('My Role', '職位')}</p>
                                <p className="font-mono text-sm text-text-secondary">UX/UI Designer</p>
                            </div>
                            <div>
                                <p className="font-serif text-sm md:text-lg text-text-primary mb-1">{t('Timeline', '時間軸')}</p>
                                <p className="font-mono text-sm text-text-secondary">7 Weeks</p>
                            </div>
                        </div>
                        <a
                            href="https://www.figma.com/proto/kPGga8an4mCsdYCad6qXuy/VanLink_refined?page-id=0%3A1&node-id=1-8&viewport=8%2C147%2C0.25&t=CPZa3FzAfNq8g3o9-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A8&show-proto-sidebar=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-2 bg-brand-green text-white px-4 py-2 rounded-full text-sm font-mono hover:bg-brand-green/90 transition-colors w-fit"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
                                <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
                                <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/>
                                <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/>
                                <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
                            </svg>
                            {t('Figma Demo', 'Figma 原型')}
                        </a>
                    </div>

                    <div className="md:w-1/2 mt-2 md:mt-0">
                        <img src="/images/Vanlink/Vanlink_mkup.png" alt="VanLink Preview" className="w-full h-auto" />
                    </div>
                </div>
            </section>

            {/* ===== Header / Body divider ===== */}
            <div className="max-w-7xl mx-auto px-5 md:px-16 xl:px-20">
                <hr className="border-t border-border" />
            </div>

          <div className="lg:flex lg:gap-16 max-w-7xl mx-auto px-5 md:px-16 xl:px-20">

          {/* ===== Table of Contents ===== */}
          <aside className="hidden lg:block w-70 shrink-0 mt-15">
            <p className="text-sm tracking-widest text-neutral-400 uppercase mb-3">Case Study</p>
            <div className={`sticky top-24 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto transition-opacity duration-500 ${showToc ? 'opacity-100' : 'opacity-0'}`}>
              <ul className="space-y-0.5">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-start w-full text-left py-1.5 transition-all duration-200 text-base leading-snug ${
                        activeId === item.id
                          ? 'border-l-2 border-[#1a4a8a] pl-3 font-medium text-neutral-900'
                          : 'pl-3 text-neutral-400 hover:text-neutral-600'
                      }`}
                    >
                      <span className="mr-1.5 text-neutral-400">-</span>
                      <span className="font-sans">{item.text}</span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* CTA card */}
              <div className="bg-neutral-100 rounded-xl p-4 mt-8 mb-5">
                <p className="text-base font-medium text-neutral-800 mb-1">{t('More Work', '更多作品')}</p>
                <p className="text-sm text-neutral-500 mb-3">{t('View other case studies.', '瀏覽其他作品。')}</p>
                <Link to="/work" className="inline-flex items-center gap-1 text-xs font-mono text-[#1a4a8a] hover:underline">
                  {t('View all work', '查看所有作品')} →
                </Link>
              </div>
            </div>
          </aside>

          {/* ===== Main Content ===== */}
          <div className="flex-1 min-w-0">

            {/* ===== The Problem ===== */}
            <FadeInSection>
            <section className="py-8 md:py-12 mt-7">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-4">{t('The Problem', '問題定義')}</h2>

                    <p className="text-base text-text-secondary leading-relaxed mb-6">
                        {t('TransLink currently has no official integrated mobile app, so users must switch between multiple platforms to complete everyday commuting tasks. Checking Compass Card balances or purchasing passes requires visiting a physical ticket machine. Students must renew their U-Pass monthly through a website, while route planning and transit schedules are typically accessed through apps like Google Maps.This fragmented experience adds extra effort to everyday commuting and creates unnecessary friction for users.', 'TransLink 目前沒有官方整合行動 App，使用者必須在不同平台之間切換才能完成日常通勤操作。查詢 Compass Card 餘額或購買月票需要前往實體售票機；學生的 U-Pass 需要每月到官網手動更新；而查看時刻表與規劃路線則要使用 Google Maps 等其他 App。這些未整合的服務增加了使用者的操作負擔，也讓日常通勤流程變得更繁瑣。')}
                    </p>

                    <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
                        <div className="p-3 md:p-4 text-center">
                            <Shapes className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-[#1a4a8a]" />
                            <p className="text-sm md:text-sm text-text-primary font-medium">{t('Multiple platforms', '無統一App')}</p>
                        </div>
                        <div className="p-3 md:p-4 text-center">
                            <XCircle className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-[#1a4a8a]" />
                            <p className="text-sm md:text-sm text-text-primary font-medium">{t('No mobile App Management', '無法手機加值餘額')}</p>
                        </div>
                        <div className="p-3 md:p-4 text-center">
                            <Frown className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-[#1a4a8a]" />
                            <p className="text-sm md:text-sm text-text-primary font-medium">{t('Manual U-Pass renewal', '每月手動更新 U-Pass')}</p>
                        </div>
                    </div>

                    {/* Design Goal */}
                    <div className="border-l-4 border-[#1a4a8a] pl-5 mt-8">
                        <p className="text-sm text-[#1a4a8a] font-mono uppercase tracking-widest mb-2">{t('Design Goal', '設計目標')}</p>
                        <p className="font-serif text-base md:text-lg text-text-primary mb-6">
                            {t(
                                'How might we consolidate essential transit tasks into one seamless mobile experience?',
                                '我們如何將核心通勤任務整合為一個流暢的行動端體驗？'
                            )}
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3 text-sm md:text-base text-text-secondary">
                                <MapPin className="w-4 h-4 text-[#1a4a8a] shrink-0" />
                                {t('Unified route planning across all transit modes', '跨運具的統一路線規劃')}
                            </li>
                            <li className="flex items-center gap-3 text-sm md:text-base text-text-secondary">
                                <CreditCard className="w-4 h-4 text-[#1a4a8a] shrink-0" />
                                {t('Mobile Compass Card management & top-up', '行動端 Compass Card 管理與儲值')}
                            </li>
                            <li className="flex items-center gap-3 text-sm md:text-base text-text-secondary">
                                <RefreshCw className="w-4 h-4 text-[#1a4a8a] shrink-0" />
                                {t('In-app U-Pass activation', 'App 內啟用 U-Pass')}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* ===== Design Process ===== */}
            <FadeInSection>
            <section className="py-8 md:py-12">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-6">{t('Design Process', '設計流程')}</h2>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-[#c5dff5]/40 rounded-full flex items-center justify-center mb-2">
                                <Search className="w-5 h-5 text-[#1a4a8a]" />
                            </div>
                            <p className="text-sm font-medium text-text-primary">{t('Research', '研究')}</p>
                        </div>
                        <div className="hidden md:block text-text-secondary">→</div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-[#c5dff5]/40 rounded-full flex items-center justify-center mb-2">
                                <Lightbulb className="w-5 h-5 text-[#1a4a8a]" />
                            </div>
                            <p className="text-sm font-medium text-text-primary">{t('Define', '定義')}</p>
                        </div>
                        <div className="hidden md:block text-text-secondary">→</div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-[#c5dff5]/40 rounded-full flex items-center justify-center mb-2">
                                <Pencil className="w-5 h-5 text-[#1a4a8a]" />
                            </div>
                            <p className="text-sm font-medium text-text-primary">{t('Design', '設計')}</p>
                        </div>
                        <div className="hidden md:block text-text-secondary">→</div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-[#c5dff5]/40 rounded-full flex items-center justify-center mb-2">
                                <FlaskConical className="w-5 h-5 text-[#1a4a8a]" />
                            </div>
                            <p className="text-sm font-medium text-text-primary">{t('Test', '測試')}</p>
                        </div>
                        <div className="hidden md:block text-text-secondary">→</div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-[#c5dff5]/40 rounded-full flex items-center justify-center mb-2">
                                <RefreshCw className="w-5 h-5 text-[#1a4a8a]" />
                            </div>
                            <p className="text-sm font-medium text-text-primary">{t('Iterate', '迭代')}</p>
                        </div>
                    </div>
                </div>
            </section>
            </FadeInSection>


            {/* ===== User Research ===== */}
            <FadeInSection>
            <section className="py-8 md:py-12">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-4">{t('User Research', '使用者研究')}</h2>
                    <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
                        {t('Conducted a 10-question survey via Google Forms with 20 student participants, using multiple-choice, rating scales, and open-ended questions.', '透過 Google Forms 進行 10 題問卷調查，共 20 位學生參與，問題形式包含多選、評分與開放式問題。')}
                    </p>

                    {/* Key stats */}
                    <div className="flex justify-center gap-4 mb-8">
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 text-center w-36">
                            <p className="font-serif text-2xl md:text-3xl text-[#1a4a8a] font-bold">20</p>
                            <p className="text-sm md:text-sm text-text-secondary mt-1">{t('Students surveyed', '受訪學生人數')}</p>
                        </div>
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 text-center w-36">
                            <p className="font-serif text-2xl md:text-3xl text-[#1a4a8a] font-bold">75%</p>
                            <p className="text-sm md:text-sm text-text-secondary mt-1">{t('Would use a unified app', '願意使用整合 App')}</p>
                        </div>
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 text-center w-36">
                            <p className="font-serif text-2xl md:text-3xl text-[#1a4a8a] font-bold">70%</p>
                            <p className="text-sm md:text-sm text-text-secondary mt-1">{t('Frustrated by manual pass renewal', '手動更新月票困擾')}</p>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Top Frustrations */}
                        <div className="border border-border rounded-lg overflow-hidden">
                            <div className="bg-[#c5dff5]/30 px-4 py-3 border-b border-border">
                                <h3 className="font-serif text-base md:text-lg text-text-primary">{t('Top Frustrations', '主要痛點')}</h3>
                                <p className="text-sm md:text-base text-text-secondary mt-0.5">{t('Q6 – What frustrates you most?', 'Q6 — 最讓你困擾的是？')}</p>
                            </div>
                            <div className="p-4 space-y-3">
                                {[
                                    { label: t('Manual pass activation on website', '需至官網手動啟用月票'), count: 14, highlight: true },
                                    { label: t('Data not real-time', '資料未即時更新'), count: 7 },
                                    { label: t('Too many apps needed', '需要太多 App'), count: 4 },
                                    { label: t('Balance not synced', '餘額未同步'), count: 4 },
                                    { label: t('Hard to find transfers', '轉乘資訊難找'), count: 4 },
                                    { label: t('Reload too complicated', '充值流程複雜'), count: 3 },
                                ].map(({ label, count, highlight }) => (
                                    <div key={label} className="flex items-center gap-2">
                                        <span className={`text-sm w-32 shrink-0 text-right leading-tight ${highlight ? 'text-[#1a4a8a] font-medium' : 'text-text-secondary'}`}>{label}</span>
                                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                                            <div className={`h-2 rounded-full transition-all ${highlight ? 'bg-[#1a4a8a]' : 'bg-[#1a4a8a]/35'}`} style={{ width: `${(count / 14) * 100}%` }} />
                                        </div>
                                        <span className={`text-sm font-mono w-4 shrink-0 text-right ${highlight ? 'text-[#1a4a8a] font-semibold' : 'text-[#1a4a8a]/50'}`}>{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Desired Features */}
                        <div className="border border-border rounded-lg overflow-hidden">
                            <div className="bg-[#c5dff5]/30 px-4 py-3 border-b border-border">
                                <h3 className="font-serif text-base md:text-lg text-text-primary">{t('Most Wanted Features', '最期望的功能')}</h3>
                                <p className="text-sm md:text-base text-text-secondary mt-0.5">{t("Q9 – Features you'd want most", 'Q9 — 你最想要的功能')}</p>
                            </div>
                            <div className="p-4 space-y-3">
                                {[
                                    { label: t('Real-time transit tracking', '即時交通追蹤'), count: 15, highlight: true },
                                    { label: t('In-app pass activation', 'App 內啟用月票'), count: 14, highlight: true },
                                    { label: t('Card balance display', '顯示卡片餘額'), count: 12 },
                                    { label: t('In-app top-up / renewal', 'App 內充值／更新'), count: 10 },
                                    { label: t('Low-balance reminders', '低餘額提醒'), count: 10 },
                                    { label: t('Smart route suggestions', '智慧路線建議'), count: 7 },
                                ].map(({ label, count, highlight }) => (
                                    <div key={label} className="flex items-center gap-2">
                                        <span className={`text-sm w-32 shrink-0 text-right leading-tight ${highlight ? 'text-[#1a4a8a] font-medium' : 'text-text-secondary'}`}>{label}</span>
                                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                                            <div className={`h-2 rounded-full transition-all ${highlight ? 'bg-[#1a4a8a]' : 'bg-[#1a4a8a]/35'}`} style={{ width: `${(count / 15) * 100}%` }} />
                                        </div>
                                        <span className={`text-sm font-mono w-4 shrink-0 text-right ${highlight ? 'text-[#1a4a8a] font-semibold' : 'text-[#1a4a8a]/50'}`}>{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* ===== UX Artifacts ===== */}
            <FadeInSection>
            <section className="py-8 md:py-12">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-4">{t('UX Artifacts', 'UX 產出物')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="bg-white rounded-lg border border-border overflow-hidden">
                            <img src="/images/Vanlink/Vanlink_persona.png" alt="User Persona" className="w-full h-auto border-b border-gray-200 cursor-zoom-in" onClick={() => setLightboxImg('/images/Vanlink/Vanlink_persona.png')} />
                            <div className="p-3 md:p-4">
                                <p className="font-serif text-sm md:text-base text-text-primary font-medium">{t('User Persona', '使用者角色')}</p>
                                <p className="text-sm md:text-sm text-text-secondary mt-1">{t('Student commuter profile, pain points, and goals', '學生通勤族的痛點、目標與需求')}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-border overflow-hidden">
                            <img src="/images/Vanlink/Vanlink_journeymap.png" alt="Journey Map" className="w-full h-auto border-b border-gray-200 cursor-zoom-in" onClick={() => setLightboxImg('/images/Vanlink/Vanlink_journeymap.png')} />
                            <div className="p-3 md:p-4">
                                <p className="font-serif text-sm md:text-base text-text-primary font-medium">{t('Journey Map', '旅程地圖')}</p>
                                <p className="text-sm md:text-sm text-text-secondary mt-1">{t('Pain points: Card reload only available at physical machines; U-Pass requires manual monthly renewal.', '痛點：需到實體機器充值卡片、每月手動更新通行證')}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-border overflow-hidden flex flex-col">
                            <img src="/images/Vanlink/Vanlink_userflow.png" alt="User Flow" className="w-full h-auto border-b border-gray-200 cursor-zoom-in flex-1 object-cover" onClick={() => setLightboxImg('/images/Vanlink/Vanlink_userflow.png')} />
                            <div className="p-3 md:p-4">
                                <p className="font-serif text-sm md:text-base text-text-primary font-medium">{t('User Flow', '使用者流程')}</p>
                                <p className="text-sm md:text-sm text-text-secondary mt-1">{t('Balance check, pass renewal, and trip planning flows', '查餘額、更新通行證、規劃行程的流程')}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-border overflow-hidden flex flex-col">
                            <div className="flex-1 flex justify-center border-b border-gray-200 cursor-zoom-in" onClick={() => setLightboxImg('/images/Vanlink/Vanlink_sitemap.png')}>
                                <img src="/images/Vanlink/Vanlink_sitemap.png" alt="Site Map" className="h-auto max-w-full" />
                            </div>
                            <div className="p-3 md:p-4">
                                <p className="font-serif text-sm md:text-base text-text-primary font-medium">{t('Site Map', '網站地圖')}</p>
                                <p className="text-sm md:text-sm text-text-secondary mt-1">{t('Information architecture and navigation structure', '資訊架構與導覽結構')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* ===== Research Insights ===== */}
            <FadeInSection>
            <section className="py-8 md:py-12">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-6">{t('Research Insights', '研究洞察')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 md:p-6 text-center">
                            <MapPin className="text-[#1a4a8a] w-7 h-7 md:w-8 md:h-8 mx-auto mb-3" />
                            <h3 className="font-serif text-sm md:text-sm text-text-primary mb-2">{t('Fragmented Experience', '碎片化體驗')}</h3>
                            <p className="text-sm md:text-sm text-text-secondary leading-relaxed">{t('Multiple platforms create unnecessary friction for routine commuting tasks.', '多個平台為日常通勤任務製造不必要的摩擦。')}</p>
                        </div>
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 md:p-6 text-center">
                            <Smartphone className="text-[#1a4a8a] w-7 h-7 md:w-8 md:h-8 mx-auto mb-3" />
                            <h3 className="font-serif text-sm md:text-sm text-text-primary mb-2">{t('No Mobile Card Management', '缺乏行動端票卡管理')}</h3>
                            <p className="text-sm md:text-sm text-text-secondary leading-relaxed">{t('Users can only check balance or top up at physical ticket machines — no mobile option exists.', '使用者只能到實體售票機查詢餘額或加值，行動端完全無法操作。')}</p>
                        </div>
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 md:p-6 text-center">
                            <RefreshCw className="text-[#1a4a8a] w-7 h-7 md:w-8 md:h-8 mx-auto mb-3" />
                            <h3 className="font-serif text-sm md:text-sm text-text-primary mb-2">{t('Manual Pass Renewal', '手動月票更新')}</h3>
                            <p className="text-sm md:text-sm text-text-secondary leading-relaxed">{t('Students must log into a website every month to activate their U-Pass — a separate, forgettable step.', '學生每月需登入官網手動啟用 U-Pass，流程獨立且容易忘記。')}</p>
                        </div>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* ===== Research → Design bridge ===== */}
            <div className="max-w-2xl mx-auto px-5 md:px-0 flex flex-col items-center gap-1 py-2">
                <div className="w-px h-6 bg-border" />
                <span className="font-mono text-xs text-text-secondary tracking-widest uppercase px-3 py-1 border border-border rounded-full bg-white">
                    {t('led to design decisions', '導出設計決策')}
                </span>
                <div className="w-px h-6 bg-border" />
                <span className="text-text-secondary text-sm">↓</span>
            </div>

            {/* ===== Design Decisions ===== */}
            <FadeInSection>
            <section className="py-8 md:py-12">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-6">{t('Design Decisions', '設計決策')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 md:p-6 text-center">
                            <Layers className="w-7 h-7 md:w-8 md:h-8 mx-auto mb-3 text-[#1a4a8a]" />
                            <p className="text-[#1a4a8a] font-mono text-sm mb-2">01</p>
                            <h3 className="font-serif text-base md:text-sm text-text-primary mb-2">{t('Unified Platform', '統一整合平台')}</h3>
                            <p className="text-sm md:text-sm text-text-secondary leading-relaxed">{t('Single app combining navigation, card management, and pass renewal — eliminating platform switching.', '單一 App 整合導航、卡片管理與通行證更新，消除多平台切換。')}</p>
                        </div>
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 md:p-6 text-center">
                            <CreditCard className="w-7 h-7 md:w-8 md:h-8 mx-auto mb-3 text-[#1a4a8a]" />
                            <p className="text-[#1a4a8a] font-mono text-sm mb-2">02</p>
                            <h3 className="font-serif text-base md:text-sm text-text-primary mb-2">{t('Visible Balance & Top-up', '主頁餘額顯示與加值')}</h3>
                            <p className="text-sm md:text-sm text-text-secondary leading-relaxed">{t('Card balance prominently displayed on the home screen with in-app top-up — no machines needed.', '卡片餘額顯眼呈現於主頁，並支援 App 內直接加值，無需前往實體機器。')}</p>
                        </div>
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 md:p-6 text-center">
                            <RefreshCw className="w-7 h-7 md:w-8 md:h-8 mx-auto mb-3 text-[#1a4a8a]" />
                            <p className="text-[#1a4a8a] font-mono text-sm mb-2">03</p>
                            <h3 className="font-serif text-base md:text-sm text-text-primary mb-2">{t('In-app U-Pass Activation', 'App 內啟用 U-Pass')}</h3>
                            <p className="text-sm md:text-sm text-text-secondary leading-relaxed">{t('Activate your monthly U-Pass directly in the app — no website login, no forgotten renewals.', '直接在 App 內啟用當月 U-Pass，無需登入官網，告別忘記更新的困擾。')}</p>
                        </div>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* Design System */}
            <FadeInSection>
<section className="py-8 md:py-12 bg-neutral-100">
    <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-6">Design System</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img
                src="/images/Vanlink/Colors.png"
                alt="VanLink Design System - Color Palette"
                className="w-full rounded-lg"
            />
            <img
                src="/images/Vanlink/Typography.png"
                alt="VanLink Design System - Typography"
                className="w-full rounded-lg"
            />
            <img
                src="/images/Vanlink/Logo.png"
                alt="VanLink Design System - Logo"
                className="w-full rounded-lg"
            />
        </div>

    </div>
</section>
</FadeInSection>

            {/* ===== Usability Testing ===== */}
            <FadeInSection>
            <section className="py-8 md:py-12">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-4">{t('Usability Testing', '可用性測試')}</h2>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-sm md:text-sm text-text-secondary leading-relaxed">
                            <span className="font-medium text-text-primary">{t('Testing Scope: ', '測試範圍：')}</span>
                            {t('Conducted moderated & unmoderated usability testing with 13 participants using Maze, focusing on three core tasks.', '使用 Maze 進行 13 位使用者的有主持與無主持可用性測試，聚焦於三個核心任務。')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
                        {/* Task 1 */}
                        <div className="border border-border rounded-lg overflow-hidden flex flex-col">
<div className="bg-[#c5dff5]/30 px-4 py-3 border-b border-border md:min-h-[5rem] md:flex md:flex-col md:justify-center">
                                <h3 className="font-serif text-sm md:text-base text-text-primary">{t('Reload Card', '充值卡片')}</h3>
                                <p className="text-sm text-text-secondary mt-0.5">{t('Add $10 to your card', '將卡片充值 $10')}</p>
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div className="flex justify-between mb-4">
                                    <div className="text-center">
                                        <p className="text-xl md:text-2xl font-bold text-brand-green">100%</p>
                                        <p className="text-sm text-text-secondary">{t('Success', '成功率')}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl md:text-2xl font-bold text-[#1a4a8a]/60">34%</p>
                                        <p className="text-sm text-text-secondary">{t('Misclick', '誤點率')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 text-sm text-text-secondary">
                                    <span className="text-[#1a4a8a]/60 mt-0.5 shrink-0">•</span>
                                    <p>{t('Buttons felt small → resized from 95×40px to 400×48px', '按鈕偏小 → 從 95×40px 調整為 400×48px')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Task 2 */}
                        <div className="border border-border rounded-lg overflow-hidden flex flex-col">
                            <div className="bg-[#c5dff5]/30 px-4 py-3 border-b border-border md:min-h-[5rem] md:flex md:flex-col md:justify-center">
                                <h3 className="font-serif text-sm md:text-base text-text-primary">{t('Activate U-Pass', '啟用學生月票')}</h3>
                                <p className="text-sm text-text-secondary mt-0.5">{t("Activate U-Pass", '啟用學生月票')}</p>
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div className="flex justify-between mb-4">
                                    <div className="text-center">
                                        <p className="text-xl md:text-2xl font-bold text-brand-green">100%</p>
                                        <p className="text-sm text-text-secondary">{t('Success', '成功率')}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl md:text-2xl font-bold text-[#1a4a8a]/60">20%</p>
                                        <p className="text-sm text-text-secondary">{t('Misclick', '誤點率')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 text-sm text-text-secondary">
                                    <span className="text-[#1a4a8a]/60 mt-0.5 shrink-0">•</span>
                                    <p>{t('Button resize improved overall tap accuracy', '按鈕尺寸調整改善整體觸控精準度')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Task 3 */}
                        <div className="border border-border rounded-lg overflow-hidden flex flex-col">
                            <div className="bg-[#c5dff5]/30 px-4 py-3 border-b border-border md:min-h-[5rem] md:flex md:flex-col md:justify-center">
                                <h3 className="font-serif text-sm md:text-base text-text-primary">{t('Plan a Route', '規劃路線')}</h3>
                                <p className="text-sm text-text-secondary mt-0.5">{t('Route to BCIT', '前往 BCIT 的路線')}</p>
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div className="flex justify-between mb-4">
                                    <div className="text-center">
                                        <p className="text-xl md:text-2xl font-bold text-brand-green">100%</p>
                                        <p className="text-sm text-text-secondary">{t('Success', '成功率')}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl md:text-2xl font-bold text-red-400">62%</p>
                                        <p className="text-sm text-text-secondary">{t('Misclick', '誤點率')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 text-sm text-text-secondary">
                                    <span className="text-red-400 mt-0.5 shrink-0">•</span>
                                    <p>{t('Smart Route flow was confusing → redesigned into two separate paths', 'Smart Route 流程混亂 → 重新設計為兩條獨立路徑')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* ===== Iterations ===== */}
            <FadeInSection>
            <section className="py-8 md:py-12">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-2">{t('Iterations', '設計迭代')}</h2>
                    <p className="text-sm text-text-secondary mb-8">{t('Changes made based on usability testing findings.', '根據可用性測試發現所進行的設計調整。')}</p>

                    {/* ── Iteration 1: Button Resize ── */}
                    <div className="mb-10">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-7 h-7 bg-[#1a4a8a] rounded-full flex items-center justify-center text-white text-sm shrink-0 mt-0.5">1</div>
                            <div>
                                <p className="text-sm md:text-base text-text-primary font-medium">{t('Button Resize: Reload & Renew', '按鈕尺寸調整：Reload & Renew')}</p>
                                <p className="text-sm md:text-sm text-text-secondary mt-1">{t('Users reported buttons felt too small. Resized from 95×40px to 400×48px to meet Apple HIG touch targets.', '使用者反映按鈕過小。從 95×40px 調整為 400×48px，符合 Apple HIG 最小觸控目標。')}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-xl overflow-hidden border border-border">
                                <div className="bg-blue-50 py-2 text-center border-b border-border">
                                    <span className="text-sm font-mono">CTA Buttons on Home</span>
                                </div>
                                <img
                                    src="/images/Vanlink/iteration1.png"
                                    alt="Before - button resize"
                                    className="w-full h-auto cursor-zoom-in"
                                    onClick={() => setLightboxImg('/images/Vanlink/iteration1.png')}
                                />
                            </div>
                            <div className="rounded-xl overflow-hidden border border-border">
                                <div className="bg-blue-50 py-2 text-center border-b border-border">
                                    <span className="text-sm font-mono font-medium">CTA Buttons on Reload / Renew Screens </span>
                                </div>
                                <img
                                    src="/images/Vanlink/iteration2.png"
                                    alt="After - button resize"
                                    className="w-full h-auto cursor-zoom-in"
                                    onClick={() => setLightboxImg('/images/Vanlink/iteration2.png')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ── Iteration 2: Smart Route Flow ── */}
                    <div>
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-7 h-7 bg-[#1a4a8a] rounded-full flex items-center justify-center text-white text-sm shrink-0 mt-0.5">2</div>
                            <div>
                                <p className="text-sm md:text-base text-text-primary font-medium">{t('Smart Route Flow Redesign', 'Smart Route 流程重新設計')}</p>
                                <p className="text-sm md:text-sm text-text-secondary mt-1">{t('The single Smart Route flow confused users (62% misclick). Split into two distinct paths with visual cues.', '單一的 Smart Route 流程讓使用者感到困惑（誤點率 62%），分拆為兩條獨立路徑並加入視覺提示。')}</p>
                            </div>
                        </div>

                        <div className="rounded-xl overflow-hidden border border-border">
                            {/* Toggle */}
                            <div className="flex border-b border-border">
                                <button
                                    onClick={() => setFlowView('before')}
                                    className={`flex-1 py-2.5 text-sm md:text-sm font-mono transition-colors ${flowView === 'before' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    Before
                                </button>
                                <div className="w-px bg-border" />
                                <button
                                    onClick={() => setFlowView('after')}
                                    className={`flex-1 py-2.5 text-sm md:text-sm font-mono transition-colors ${flowView === 'after' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    After
                                </button>
                            </div>

                            {/* Flow diagram */}
                            <div className="p-4 bg-gray-50">
                                {flowView === 'before' ? (
                                    <img
                                        src="/images/Vanlink/iteration3.png"
                                        alt="Before - Smart Route Flow"
                                        className="w-full h-auto cursor-zoom-in rounded-lg"
                                        onClick={() => setLightboxImg('/images/Vanlink/iteration3.png')}
                                    />
                                ) : (
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="overflow-hidden">
                                            <div className=" py-2 text-center">
                                                <span className="text-sm font-mono  font-medium">Path 1: Start with Smart Route Shortcut</span>
                                            </div>
                                            <img
                                                src="/images/Vanlink/iteration4.png"
                                                alt="After - Smart Route Path 1"
                                                className="w-full h-auto cursor-zoom-in"
                                                onClick={() => setLightboxImg('/images/Vanlink/iteration4.png')}
                                            />
                                        </div>
                                        <div className=" overflow-hidden">
                                            <div className="py-2 text-center ">
                                                <span className="text-sm font-mono  font-medium">Path 2: Start with Search Bar</span>
                                            </div>
                                            <img
                                                src="/images/Vanlink/iteration5.png"
                                                alt="After - Smart Route Path 2"
                                                className="w-full h-auto cursor-zoom-in"
                                                onClick={() => setLightboxImg('/images/Vanlink/iteration5.png')}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="px-4 md:px-6 py-3 bg-white border-t border-border">
                                <p className="text-sm md:text-sm text-text-secondary text-center">
                                    {t('Shortcut path directly shows route details; search bar retains the full multi-step flow — reducing friction.', 'Shortcut 路徑直接顯示路線細節，搜尋欄保留完整多步流程，降低使用摩擦。')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* ===== Final Screens ===== */}
            <FadeInSection>
            <section className="py-8 md:py-12 bg-gray-50">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-2">{t('Final Screens', 'UI 畫面')}</h2>
                    <p className="text-sm md:text-base text-text-secondary mb-10">
                        {t('Each design goal shaped a core feature — unified, iterative, and validated through testing.', '每個設計目標對應一項核心功能，整合一致、經過迭代與測試驗證。')}
                    </p>

                    <div className="space-y-12">
                        {[
                            {
                                icon: <MapPin className="w-4 h-4 text-[#1a4a8a]" />,
                                label: t('Trip Planning', '行程規劃'),
                                desc: t('Unified route planning across all transit modes in a single flow.', '跨運具路線規劃整合於單一操作流程。'),
                                screens: [
                                    { src: '/images/Vanlink/Planner-1.png', label: t('Trip Planner', '行程規劃') },
                                    { src: '/images/Vanlink/Planner-2.jpg', label: t('Route Details', '路線詳情') },
                                ],
                            },
                            {
                                icon: <CreditCard className="w-4 h-4 text-[#1a4a8a]" />,
                                label: t('Card Management & U-Pass', '卡片管理與 U-Pass'),
                                desc: t('Mobile Compass Card top-up, balance overview, and in-app U-Pass activation — all accessible from the dashboard.', '行動端 Compass Card 儲值、餘額總覽與 App 內 U-Pass 啟用，從主頁直接進入。'),
                                screens: [
                                    { src: '/images/Vanlink/Dashboard1.png', label: t('Dashboard', '主頁') },
                                    { src: '/images/Vanlink/Refill.png',     label: t('Card Refill', '儲值') },
                                    { src: '/images/Vanlink/Renew.png',      label: t('U-Pass Activation', 'U-Pass 啟用') },
                                ],
                            },
                        ].map((group, gi) => (
                            <div key={gi}>
                                <div className="flex items-center gap-2 mb-1">
                                    {group.icon}
                                    <span className="text-sm font-mono text-[#1a4a8a]">{group.label}</span>
                                </div>
                                <p className="text-sm text-text-secondary mb-6">{group.desc}</p>
                                <div className={`grid gap-6 md:gap-8 ${group.screens.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                                    {group.screens.map((item, i) => (
                                        <div key={i} className="flex flex-col items-center">

<img
    src={item.src}
    alt={item.label}
    className="w-50 rounded-2xl cursor-zoom-in border border-border"
    onClick={() => setLightboxImg(item.src)}
/>
                                            <p className="text-center text-sm text-text-secondary mt-3 font-mono">{item.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* ===== Reflection ===== */}
            <FadeInSection>
            <section className="py-8 md:py-12">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-6">{t('Reflection', 'Reflection')}</h2>
                    <div className="space-y-4 max-w-5xl">
                        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                            {t(
                                'Through this project, I gained a deeper understanding of how map navigation flows and information architecture work in practice. Designing for multiple entry points showed me that users may begin their journey in different ways, which can lead to very different interaction flows.',
                                '在這個專案中，我更深入理解了地圖導航流程與資訊架構在實際產品中的運作方式。當設計需要支援多個進入點時，我發現使用者可能會從不同方式開始操作，而這些不同的起點會導致完全不同的互動流程。'
                            )}
                        </p>
                        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                            {t(
                                'If I were to continue this project, I would run more rounds of usability testing with a broader range of users — not just students — to see how the app holds up for other commuter types. I would also explore adding low-balance notifications and testing whether the dual-path route flow actually reduces confusion, or if one path could be simplified further.',
                                '如果有機會繼續這個專案，我會針對更多元的使用者群體（不只是學生）進行更多輪的可用性測試，看看 App 對其他通勤族的適用程度。我也想加入低餘額通知功能，並進一步測試雙路徑路線流程是否真的能降低使用困惑，或者其中一條路徑是否可以再簡化。'
                            )}
                        </p>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* ===== Navigation ===== */}
            <FadeInSection>
                <ProjectNav
                    prev={{ href: '/work/MindLog', name: 'MindLog', subtitle: t('Mental health app', '心理健康應用程式'), image: '/images/MindLog/MindLog_mkup.png' }}
                    next={{ href: '/work/learnnow', name: 'LearnNow', subtitle: t('E-learning platform', '線上學習平台'), image: '/images/learnnow_mkup1.png', imageClass: 'object-cover object-center' }}
                />
            </FadeInSection>

          </div>{/* end main content */}
          </div>{/* end lg:grid */}
        </div>
        </PageTransition>
        </>
    );
}

export default Vanlink;
