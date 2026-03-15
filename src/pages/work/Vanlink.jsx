import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    Navigation,
    Smartphone,
    Layers,
    Shapes,
    XCircle,
    RotateCcw,
    Frown

} from 'lucide-react';


function Vanlink() {
    const { t } = useLanguage();
    const [flowView, setFlowView] = useState('before');
    const [lightboxImg, setLightboxImg] = useState(null);

    useEffect(() => {
        if (!lightboxImg) return;
        const handleKey = (e) => { if (e.key === 'Escape') setLightboxImg(null); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [lightboxImg]);


    return (
        <>
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
        <div className="bg-white">

            {/* ===== Breadcrumb ===== */}
            <nav className="px-5 md:px-20 pt-3 md:pt-6">
                <div className="flex items-center gap-2 text-xs md:text-sm font-mono">
                    <Link to="/work" className="text-brand-green hover:underline">{t('Work', '作品')}</Link>
                    <span className="text-text-secondary">{'>'}</span>
                    <span className="text-text-primary">VanLink</span>
                </div>
            </nav>

            {/* ===== Header ===== */}
            <section className="px-5 md:px-20 py-4 md:py-10">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">

                    <div className="md:w-1/2">
                        <h1 className="font-serif text-3xl md:text-5xl text-text-primary">VanLink</h1>
                        <p className="font-serif text-lg md:text-2xl text-text-secondary mt-1">
                            {t('Unified Transit App for Metro Vancouver', '大溫地區統一通勤 App')}
                        </p>
                        <p className="text-sm md:text-base text-text-secondary mt-3 md:mt-6 leading-relaxed">
                            {t('A transit app that integrates Compass Card management, real-time transit tracking, and U-Pass renewal into one seamless mobile experience — eliminating the need to switch between multiple platforms.', '將Compass Card管理、地圖導航與學生月票（U-Pass） 更新等多功能整合於單一行動平台的通勤 App，消除在多個平台間切換的需求，以增加通勤族的便利性。')}
                        </p>

                        <div className="flex gap-8 md:gap-16 mt-4 md:mt-8">
                            <div>
                                <p className="font-serif text-sm md:text-lg text-text-primary mb-1">{t('Tools', '工具')}</p>
                                <p className="font-mono text-xs md:text-sm text-text-secondary">Figma, Maze</p>
                            </div>
                            <div>
                                <p className="font-serif text-sm md:text-lg text-text-primary mb-1">{t('My Role', '職位')}</p>
                                <p className="font-mono text-xs md:text-sm text-text-secondary">UX/UI Designer</p>
                            </div>
                        </div>

                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 md:mt-8 inline-flex items-center gap-2 bg-brand-green text-white px-4 py-2 rounded-lg text-sm font-mono hover:bg-brand-green/90 transition-colors"
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
                        <img
                            src="/images/Vanlink/Vanlink_mkup.png"
                            alt="VanLink Preview"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </section>

            {/* ===== The Problem ===== */}
            <FadeInSection>
            <section className="px-5 md:px-20 py-8 md:py-12 mt-7">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">{t('The Problem', '問題定義')}</h2>

                    <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
                        {t('There is currently no official mobile app for transit services in Metro Vancouver, so users must switch between multiple platforms to complete everyday commuting tasks. Checking Compass Card balances or purchasing passes requires visiting a physical ticket machine. Students must renew their U-Pass monthly through a website, while route planning and transit schedules are typically accessed through apps like Google Maps.This fragmented experience adds extra effort to everyday commuting and creates unnecessary friction for users.', '目前 VanLink 沒有官方行動 App，使用者必須在不同平台之間切換才能完成日常通勤操作。查詢 Compass Card 餘額或購買月票需要前往實體售票機；學生的 U-Pass 需要每月到官網手動更新；而查看時刻表與規劃路線則要使用 Google Maps 等其他 App。這些未整合的服務增加了使用者的操作負擔，也讓日常通勤流程變得更繁瑣。')}
                    </p>

                    <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
                        <div className="p-3 md:p-4 text-center">
                            <Shapes className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-[#1a4a8a]" />
                            <p className="text-xs md:text-sm text-text-primary font-medium">{t('Multiple platforms', '無統一App')}</p>
                        </div>
                        <div className="p-3 md:p-4 text-center">
                            <XCircle className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-[#1a4a8a]" />
                            <p className="text-xs md:text-sm text-text-primary font-medium">{t('No mobile App Management', '無法手機加值餘額')}</p>
                        </div>
                        <div className="p-3 md:p-4 text-center">
                            <Frown className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-[#1a4a8a]" />
                            <p className="text-xs md:text-sm text-text-primary font-medium">{t('Manual U-Pass renewal', '每月手動更新 U-Pass')}</p>
                        </div>
                    </div>

                    {/* Design Goal */}
                    <div className="bg-[#c5dff5]/20 rounded-lg p-4 md:p-6 mt-8">
                        <p className="font-mono text-xs md:text-sm text-[#1a4a8a] mb-4">{t('Design Goal', '設計目標')}</p>
                        <p className="text-sm md:text-base text-text-secondary mb-6">
                            {t('Consolidate essential transit tasks into one unified mobile experience.', '將核心通勤任務整合為單一統一的行動體驗。')}
                        </p>
                        <div className="space-y-3">
                            {/* Row 1 */}
                            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4">
                                <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 flex-1">
                                    <span className="text-[#1a4a8a]/50 text-sm">✗</span>
                                    <span className="text-xs md:text-sm text-text-primary">{t('Multiple platforms to check', '需切換多個平台')}</span>
                                </div>
                                <span className="text-[#1a4a8a] text-center md:text-left"><span className="md:hidden">↓</span><span className="hidden md:inline">→</span></span>
                                <div className="flex items-center gap-2 bg-[#c5dff5]/20 border border-[#c5dff5] rounded-lg px-3 py-2 flex-1">
                                    <MapPin className="w-4 h-4 text-[#1a4a8a] shrink-0" />
                                    <span className="text-xs md:text-sm text-text-primary">{t('Plan trips in one app', '在單一 App 規劃路線')}</span>
                                </div>
                            </div>
                            {/* Row 2 */}
                            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4">
                                <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 flex-1">
                                    <span className="text-[#1a4a8a]/50 text-sm">✗</span>
                                    <span className="text-xs md:text-sm text-text-primary">{t('No mobile card management', '無法行動端管理卡片')}</span>
                                </div>
                                <span className="text-[#1a4a8a] text-center md:text-left"><span className="md:hidden">↓</span><span className="hidden md:inline">→</span></span>
                                <div className="flex items-center gap-2 bg-[#c5dff5]/20 border border-[#c5dff5] rounded-lg px-3 py-2 flex-1">
                                    <CreditCard className="w-4 h-4 text-[#1a4a8a] shrink-0" />
                                    <span className="text-xs md:text-sm text-text-primary">{t('Manage & top up on mobile', '行動端管理與充值')}</span>
                                </div>
                            </div>
                            {/* Row 3 */}
                            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4">
                                <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 flex-1">
                                    <span className="text-[#1a4a8a]/50 text-sm">✗</span>
                                    <span className="text-xs md:text-sm text-text-primary">{t('Manual U-Pass renewal', '每月手動更新 U-Pass')}</span>
                                </div>
                                <span className="text-[#1a4a8a] text-center md:text-left"><span className="md:hidden">↓</span><span className="hidden md:inline">→</span></span>
                                <div className="flex items-center gap-2 bg-[#c5dff5]/20 border border-[#c5dff5] rounded-lg px-3 py-2 flex-1">
                                    <RefreshCw className="w-4 h-4 text-[#1a4a8a] shrink-0" />
                                    <span className="text-xs md:text-sm text-text-primary">{t('Renew pass seamlessly', '無縫更新通行證')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* ===== Design Process ===== */}
            <FadeInSection>
            <section className="px-5 md:px-20 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-6">{t('Design Process', '設計流程')}</h2>
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
            <section className="px-5 md:px-20 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">{t('User Research', '使用者研究')}</h2>
                    <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
                        {t('Conducted a 10-question survey via Google Forms with 20 student participants, using multiple-choice, rating scales, and open-ended questions.', '透過 Google Forms 進行 10 題問卷調查，共 20 位學生參與，問題形式包含多選、評分與開放式問題。')}
                    </p>

                    {/* Key stats */}
                    <div className="flex justify-center gap-4 mb-8">
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 text-center w-36">
                            <p className="font-serif text-2xl md:text-3xl text-[#1a4a8a] font-bold">20</p>
                            <p className="text-xs md:text-sm text-text-secondary mt-1">{t('Students surveyed', '受訪學生人數')}</p>
                        </div>
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 text-center w-36">
                            <p className="font-serif text-2xl md:text-3xl text-[#1a4a8a] font-bold">75%</p>
                            <p className="text-xs md:text-sm text-text-secondary mt-1">{t('Would use a unified app', '願意使用整合 App')}</p>
                        </div>
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 text-center w-36">
                            <p className="font-serif text-2xl md:text-3xl text-[#1a4a8a] font-bold">70%</p>
                            <p className="text-xs md:text-sm text-text-secondary mt-1">{t('Frustrated by manual pass renewal', '手動更新月票困擾')}</p>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Top Frustrations */}
                        <div className="border border-border rounded-lg overflow-hidden">
                            <div className="bg-[#c5dff5]/30 px-4 py-3 border-b border-border">
                                <h3 className="font-serif text-base md:text-lg text-text-primary">{t('Top Frustrations', '主要痛點')}</h3>
                                <p className="text-xs text-text-secondary mt-0.5">{t('Q6 – What frustrates you most?', 'Q6 — 最讓你困擾的是？')}</p>
                            </div>
                            <div className="p-4 space-y-3">
                                {[
                                    { label: t('Manual monthly pass activation', '手動啟用月票'), count: 14 },
                                    { label: t('Data not real-time', '資料未即時更新'), count: 7 },
                                    { label: t('Too many apps needed', '需要太多 App'), count: 4 },
                                    { label: t('Balance not synced', '餘額未同步'), count: 4 },
                                    { label: t('Hard to find transfers', '轉乘資訊難找'), count: 4 },
                                    { label: t('Reload too complicated', '充值流程複雜'), count: 3 },
                                ].map(({ label, count }) => (
                                    <div key={label} className="flex items-center gap-2">
                                        <span className="text-xs text-text-secondary w-32 shrink-0 text-right leading-tight">{label}</span>
                                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                                            <div className="bg-[#1a4a8a] h-2 rounded-full transition-all" style={{ width: `${(count / 14) * 100}%` }} />
                                        </div>
                                        <span className="text-xs font-mono text-[#1a4a8a] w-4 shrink-0 text-right">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Desired Features */}
                        <div className="border border-border rounded-lg overflow-hidden">
                            <div className="bg-[#c5dff5]/30 px-4 py-3 border-b border-border">
                                <h3 className="font-serif text-base md:text-lg text-text-primary">{t('Most Wanted Features', '最期望的功能')}</h3>
                                <p className="text-xs text-text-secondary mt-0.5">{t("Q9 – Features you'd want most", 'Q9 — 你最想要的功能')}</p>
                            </div>
                            <div className="p-4 space-y-3">
                                {[
                                    { label: t('Real-time transit tracking', '即時交通追蹤'), count: 15 },
                                    { label: t('Auto monthly pass activation', '自動啟用月票'), count: 14 },
                                    { label: t('Card balance display', '顯示卡片餘額'), count: 12 },
                                    { label: t('In-app top-up / renewal', 'App 內充值／更新'), count: 10 },
                                    { label: t('Low-balance reminders', '低餘額提醒'), count: 10 },
                                    { label: t('Smart route suggestions', '智慧路線建議'), count: 7 },
                                ].map(({ label, count }) => (
                                    <div key={label} className="flex items-center gap-2">
                                        <span className="text-xs text-text-secondary w-32 shrink-0 text-right leading-tight">{label}</span>
                                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                                            <div className="bg-[#1a4a8a] h-2 rounded-full transition-all" style={{ width: `${(count / 15) * 100}%` }} />
                                        </div>
                                        <span className="text-xs font-mono text-[#1a4a8a] w-4 shrink-0 text-right">{count}</span>
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
            <section className="px-5 md:px-20 py-8 md:py-12 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">{t('UX Artifacts', 'UX 產出物')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="bg-white rounded-lg border border-border overflow-hidden">
                            <img src="/images/Vanlink/Vanlink_persona.png" alt="User Persona" className="w-full h-auto border-b border-gray-200 cursor-zoom-in" onClick={() => setLightboxImg('/images/Vanlink/Vanlink_persona.png')} />
                            <div className="p-3 md:p-4">
                                <p className="font-serif text-sm md:text-base text-text-primary font-medium">{t('User Persona', '使用者角色')}</p>
                                <p className="text-xs md:text-sm text-text-secondary mt-1">{t('Student commuter profile, pain points, and goals', '學生通勤族的痛點、目標與需求')}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-border overflow-hidden">
                            <img src="/images/Vanlink/Vanlink_journeymap.png" alt="Journey Map" className="w-full h-auto border-b border-gray-200 cursor-zoom-in" onClick={() => setLightboxImg('/images/Vanlink/Vanlink_journeymap.png')} />
                            <div className="p-3 md:p-4">
                                <p className="font-serif text-sm md:text-base text-text-primary font-medium">{t('Journey Map', '旅程地圖')}</p>
                                <p className="text-xs md:text-sm text-text-secondary mt-1">{t('Pain points: Card reload only available at physical machines; U-Pass requires manual monthly renewal.', '痛點：需到實體機器充值卡片、每月手動更新通行證')}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-border overflow-hidden flex flex-col">
                            <img src="/images/Vanlink/Vanlink_userflow.png" alt="User Flow" className="w-full h-auto border-b border-gray-200 cursor-zoom-in flex-1 object-cover" onClick={() => setLightboxImg('/images/Vanlink/Vanlink_userflow.png')} />
                            <div className="p-3 md:p-4">
                                <p className="font-serif text-sm md:text-base text-text-primary font-medium">{t('User Flow', '使用者流程')}</p>
                                <p className="text-xs md:text-sm text-text-secondary mt-1">{t('Balance check, pass renewal, and trip planning flows', '查餘額、更新通行證、規劃行程的流程')}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-border overflow-hidden flex flex-col">
                            <div className="flex-1 flex justify-center border-b border-gray-200 cursor-zoom-in" onClick={() => setLightboxImg('/images/Vanlink/Vanlink_sitemap.png')}>
                                <img src="/images/Vanlink/Vanlink_sitemap.png" alt="Site Map" className="h-auto max-w-full" />
                            </div>
                            <div className="p-3 md:p-4">
                                <p className="font-serif text-sm md:text-base text-text-primary font-medium">{t('Site Map', '網站地圖')}</p>
                                <p className="text-xs md:text-sm text-text-secondary mt-1">{t('Information architecture and navigation structure', '資訊架構與導覽結構')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* ===== Research Insights ===== */}
            <FadeInSection>
            <section className="px-5 md:px-20 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-6">{t('Research Insights', '研究洞察')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 md:p-6">
                            <MapPin className="w-7 h-7 text-[#1a4a8a] mb-3" />
                            <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">{t('Fragmented Experience', '碎片化體驗')}</h3>
                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{t('Multiple platforms create unnecessary friction for routine commuting tasks.', '多個平台為日常通勤任務製造不必要的摩擦。')}</p>
                        </div>
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 md:p-6">
                            <Smartphone className="w-7 h-7 text-[#1a4a8a] mb-3" />
                            <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">{t('Lack of Mobile Management', '缺乏行動端管理')}</h3>
                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{t('No unified solution for card balance, top-up, or pass renewal on mobile.', '行動端沒有統一的解決方案來查餘額、充值或更新通行證。')}</p>
                        </div>
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 md:p-6">
                            <RefreshCw className="w-7 h-7 text-[#1a4a8a] mb-3" />
                            <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">{t('Renewal Friction', '更新摩擦')}</h3>
                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{t('Monthly U-Pass renewal is tedious and easy to forget.', '每月手動更新 U-Pass 既繁瑣又容易忘記。')}</p>
                        </div>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* ===== Design Decisions ===== */}
            <FadeInSection>
            <section className="px-5 md:px-20 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-6">{t('Design Decisions', '設計決策')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 md:p-6 text-center">
                            <Layers className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 text-[#1a4a8a]" />
                            <p className="text-[#1a4a8a] font-mono text-xs mb-2">01</p>
                            <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">{t('Unified Platform', '統一整合平台')}</h3>
                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{t('Single app combining navigation, card management, and pass renewal — eliminating platform switching.', '單一 App 整合導航、卡片管理與通行證更新，消除多平台切換。')}</p>
                        </div>
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 md:p-6 text-center">
                            <CreditCard className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 text-[#1a4a8a]" />
                            <p className="text-[#1a4a8a] font-mono text-xs mb-2">02</p>
                            <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">{t('Visible Balance', '即時餘額顯示')}</h3>
                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{t('Card balance prominently displayed on the home screen — no digging required.', '卡片餘額顯眼地呈現在主頁，無需多餘操作即可查閱。')}</p>
                        </div>
                        <div className="bg-[#c5dff5]/30 rounded-lg p-4 md:p-6 text-center">
                            <Navigation className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 text-[#1a4a8a]" />
                            <p className="text-[#1a4a8a] font-mono text-xs mb-2">03</p>
                            <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">{t('Smart Route', '智慧路線')}</h3>
                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{t('Dual-path trip planning — quick shortcut for frequent routes and full search for custom journeys.', '雙路徑行程規劃，常用路線快速捷徑 + 自訂搜尋完整流程。')}</p>
                        </div>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* Design System */}
            <FadeInSection>
<section className="px-5 md:px-20 py-8 md:py-12 bg-gray-200">
    <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-6">Design System</h2>
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

            {/* ===== Final Screens ===== */}
            <FadeInSection>
            <section className="px-5 md:px-20 py-4 md:py-6 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">{t('Final Screens', 'UI畫面')}</h2>
                    <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-8">
                        {t('Integrated transit navigation, Compass Card management, and pass renewal — with clear hierarchy and simplified interactions.', '整合通勤導航、Compass Card 管理與學生月票更新，清晰的層級與簡化的互動。')}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {[
                            { src: '/images/Vanlink/Launch.png',    label: t('Launch Screen', '啟動畫面') },
                            { src: '/images/Vanlink/Dashboard1.png', label: t('Dashboard', '主頁') },
                            { src: '/images/Vanlink/Refill.png',    label: t('Card Refill', '儲值') },
                            { src: '/images/Vanlink/Renew.png',     label: t('Pass Renewal', '月票更新') },
                            { src: '/images/Vanlink/Planner-1.png', label: t('Trip Planner', '行程規劃') },
                            { src: '/images/Vanlink/Planner-2.jpg', label: t('Route Details', '路線詳情') },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                                <img
                                    src={item.src}
                                    alt={item.label}
                                    className="w-full h-80 object-contain bg-gray-50 cursor-zoom-in"
                                    onClick={() => setLightboxImg(item.src)}
                                />
                                <p className="text-center text-xs text-text-secondary py-2.5 font-mono">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* ===== Usability Testing ===== */}
            <FadeInSection>
            <section className="px-5 md:px-20 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">{t('Usability Testing', '可用性測試')}</h2>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                            <span className="font-medium text-text-primary">{t('Testing Scope: ', '測試範圍：')}</span>
                            {t('Conducted moderated & unmoderated usability testing with 13 participants using Maze, focusing on three core tasks.', '使用 Maze 進行 13 位使用者的有主持與無主持可用性測試，聚焦於三個核心任務。')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {/* Task 1 */}
                        <div className="border border-border rounded-lg overflow-hidden">
                            <div className="bg-[#c5dff5]/30 px-4 py-3 border-b border-border">
                                <h3 className="font-serif text-sm md:text-base text-text-primary">{t('Task 1: Reload Card', '任務一：充值')}</h3>
                                <p className="text-xs text-text-secondary mt-0.5">{t('Add $10 to your card', '將卡片充值 $10')}</p>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between mb-4">
                                    <div className="text-center">
                                        <p className="text-xl md:text-2xl font-bold text-brand-green">100%</p>
                                        <p className="text-xs text-text-secondary">{t('Success', '成功率')}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl md:text-2xl font-bold text-[#1a4a8a]/60">34%</p>
                                        <p className="text-xs text-text-secondary">{t('Misclick', '誤點率')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 text-xs text-text-secondary">
                                    <span className="text-[#1a4a8a]/60 mt-0.5 shrink-0">•</span>
                                    <p>{t('Buttons felt small → resized from 95×40px to 112×47px', '按鈕偏小 → 從 95×40px 調整為 112×47px')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Task 2 */}
                        <div className="border border-border rounded-lg overflow-hidden">
                            <div className="bg-[#c5dff5]/30 px-4 py-3 border-b border-border">
                                <h3 className="font-serif text-sm md:text-base text-text-primary">{t('Task 2: Activate U-Pass', '任務二：啟用學生月票')}</h3>
                                <p className="text-xs text-text-secondary mt-0.5">{t("Activate next month's U-Pass", '啟用下個月的月票')}</p>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between mb-4">
                                    <div className="text-center">
                                        <p className="text-xl md:text-2xl font-bold text-brand-green">100%</p>
                                        <p className="text-xs text-text-secondary">{t('Success', '成功率')}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl md:text-2xl font-bold text-[#1a4a8a]/60">20%</p>
                                        <p className="text-xs text-text-secondary">{t('Misclick', '誤點率')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 text-xs text-text-secondary">
                                    <span className="text-[#1a4a8a]/60 mt-0.5 shrink-0">•</span>
                                    <p>{t('Button resize improved overall tap accuracy', '按鈕尺寸調整改善整體觸控精準度')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Task 3 */}
                        <div className="border border-border rounded-lg overflow-hidden">
                            <div className="bg-[#c5dff5]/30 px-4 py-3 border-b border-border">
                                <h3 className="font-serif text-sm md:text-base text-text-primary">{t('Task 3: Plan a Route', '任務三：規劃路線')}</h3>
                                <p className="text-xs text-text-secondary mt-0.5">{t('Route to BCIT Downtown Campus', '前往 BCIT 市中心校區的路線')}</p>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between mb-4">
                                    <div className="text-center">
                                        <p className="text-xl md:text-2xl font-bold text-brand-green">100%</p>
                                        <p className="text-xs text-text-secondary">{t('Success', '成功率')}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl md:text-2xl font-bold text-red-400">62%</p>
                                        <p className="text-xs text-text-secondary">{t('Misclick', '誤點率')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 text-xs text-text-secondary">
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
            <section className="px-5 md:px-20 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-2">{t('Iterations', '設計迭代')}</h2>
                    <p className="text-sm text-text-secondary mb-8">{t('Changes made based on usability testing findings.', '根據可用性測試發現所進行的設計調整。')}</p>

                    {/* ── Iteration 1: Button Resize ── */}
                    <div className="mb-10">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-7 h-7 bg-[#1a4a8a] rounded-full flex items-center justify-center text-white text-sm shrink-0 mt-0.5">1</div>
                            <div>
                                <p className="text-sm md:text-base text-text-primary font-medium">{t('Button Resize: Reload & Renew', '按鈕尺寸調整：Reload & Renew')}</p>
                                <p className="text-xs md:text-sm text-text-secondary mt-1">{t('Users reported buttons felt too small. Resized from 95×40px to 400×48px to meet Apple HIG touch targets.', '使用者反映按鈕過小。從 95×40px 調整為 400×48px，符合 Apple HIG 最小觸控目標。')}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-xl overflow-hidden border border-border">
                                <div className="bg-blue-50 py-2 text-center border-b border-border">
                                    <span className="text-xs font-mono">CTA Buttons on Home</span>
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
                                    <span className="text-xs font-mono font-medium">CTA Buttons on Reload / Renew Screens </span>
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
                                <p className="text-xs md:text-sm text-text-secondary mt-1">{t('The single Smart Route flow confused users (62% misclick). Split into two distinct paths with visual cues.', '單一的 Smart Route 流程讓使用者感到困惑（誤點率 62%），分拆為兩條獨立路徑並加入視覺提示。')}</p>
                            </div>
                        </div>

                        <div className="rounded-xl overflow-hidden border border-border">
                            {/* Toggle */}
                            <div className="flex border-b border-border">
                                <button
                                    onClick={() => setFlowView('before')}
                                    className={`flex-1 py-2.5 text-xs md:text-sm font-mono transition-colors ${flowView === 'before' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    Before
                                </button>
                                <div className="w-px bg-border" />
                                <button
                                    onClick={() => setFlowView('after')}
                                    className={`flex-1 py-2.5 text-xs md:text-sm font-mono transition-colors ${flowView === 'after' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
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
                                                <span className="text-xs font-mono  font-medium">Path 1: Start with Smart Route Shortcut</span>
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
                                                <span className="text-xs font-mono  font-medium">Path 2: Start with Search Bar</span>
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
                                <p className="text-xs md:text-sm text-text-secondary text-center">
                                    {t('Shortcut path directly shows route details; search bar retains the full multi-step flow — reducing friction.', 'Shortcut 路徑直接顯示路線細節，搜尋欄保留完整多步流程，降低使用摩擦。')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* ===== Reflection ===== */}
            <FadeInSection>
            <section className="px-5 md:px-20 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-6">{t('Reflection', 'Reflection')}</h2>
                    <div className="space-y-4 max-w-5xl">
                        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                            {t(
                                'Through this project, I gained a deeper understanding of how map navigation flows and information architecture work in practice. Designing for multiple entry points showed me that users may begin their journey in different ways, which can lead to very different interaction flows.',
                                '在這個專案中，我更深入理解了地圖導航流程與資訊架構在實際產品中的運作方式。當設計需要支援多個進入點時，我發現使用者可能會從不同方式開始操作，而這些不同的起點會導致完全不同的互動流程。'
                            )}
                        </p>
                        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                            {t(
                                'One of the biggest lessons was learning how to scope the project realistically. Our team initially considered building a fully functional app, but we realized the scope was too large for the timeline. Focusing on key user pain points and defining an MVP helped us stay focused on the most meaningful problems.',
                                '這個專案最大的學習之一是如何更實際地設定專案範圍。團隊一開始曾考慮開發一個完整功能的 app，但很快發現這樣的範圍超出了專案時間。將重點放在核心使用者痛點並定義 MVP，讓我們能更專注於最重要的問題。'
                            )}
                        </p>
                        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                            {t(
                                'This project also helped me strengthen my wireframing and prototyping skills. If I had more time, I would run A/B tests and continue refining the experience through additional rounds of user feedback.',
                                '這個專案也讓我加強了 wireframing 和 prototyping 的能力。如果有更多時間，我會進行 A/B testing，並透過更多使用者回饋持續優化整體體驗。'
                            )}
                        </p>
                    </div>
                </div>
            </section>
            </FadeInSection>

            {/* ===== Navigation ===== */}
            <FadeInSection>
            <section className="px-5 md:px-20 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-center">
                        <Link to="/work" className="text-brand-green font-mono text-xs md:text-sm hover:underline">
                            {t('← Back to Projects', '← 返回作品集')}
                        </Link>
                        <Link to="/work/missbean" className="text-brand-green font-mono text-xs md:text-sm hover:underline">
                            {t('Next Project →', '下一個專案 →')}
                        </Link>
                    </div>
                </div>
            </section>
            </FadeInSection>

        </div>
        </PageTransition>
        </>
    );
}

export default Vanlink;
