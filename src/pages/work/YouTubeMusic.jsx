import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FadeInSection, PageTransition } from "../../components/AnimatedSection";
import { useLanguage } from '../../context/LanguageContext';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

import { getIssues } from '../../data/youtubeMusicIssues';
import { useToc } from '../../hooks/useToc';
import Lightbox from '../../components/Lightbox';

const RED = '#CC0000';

function YouTubeMusic() {
    const { t } = useLanguage();
    const [lightboxImg, setLightboxImg] = useState(null);
    const { tocItems, activeId, showToc, scrollToSection } = useToc();
    const issues = getIssues(t);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [showTooltip, setShowTooltip] = useState(false);
    const [hoverImg, setHoverImg] = useState(null);

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

    return (
        <>
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 z-60 h-0.5 bg-[#CC0000] transition-all duration-100"
            style={{ width: `${scrollProgress}%` }} />

        {/* Back to Top */}
        {showBackToTop && (
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 z-50 w-10 h-10 bg-[#CC0000] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#CC0000]/80 transition-colors"
                aria-label="Back to top"
            >↑</button>
        )}

        <Lightbox src={lightboxImg} onClose={() => setLightboxImg(null)} />

        <PageTransition>
        <div className="bg-neutral-50 pt-20">

            {/* Breadcrumb */}
            <nav className="max-w-7xl mx-auto px-5 md:px-16 xl:px-20 pt-3 md:pt-6">
                <div className="flex items-center gap-2 text-xs md:text-base font-mono">
                    <Link to="/work" className="text-brand-green hover:underline">{t('Work', '作品')}</Link>
                    <span className="text-text-secondary">{'>'}</span>
                    <span className="text-text-primary">YouTube Music Redesign</span>
                </div>
            </nav>

            {/* Header */}
            <section className="max-w-7xl mx-auto px-5 md:px-16 xl:px-20 py-4 md:py-10">
                <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-12">
                    <div className="md:w-1/2 flex flex-col">
                        <div className="flex flex-col gap-y-1 min-h-30 md:min-h-40">
                            <h1 className="font-serif text-3xl md:text-5xl text-text-primary">
                                {t('YouTube Music Redesign', 'YouTube Music 重新設計')}
                            </h1>
                            <p className="font-serif text-lg md:text-2xl text-text-secondary">
                                {t('Reducing friction in browsing & discovery', '降低瀏覽與探索流程的操作摩擦')}
                            </p>
                        </div>
                        {/* ── hero description ── */}
<p className="pt-4 md:pt-6 text-base text-text-secondary leading-relaxed">
    {t(
        "Based on informal interviews with active YouTube Music users, I identified 3 key friction points. The Home was simplified from 20+ sections to 4, the action bar was redesigned into 5 fixed controls, and the Samples experience was redesigned to restore user control.",
        "本研究透過非正式使用者訪談（informal interviews），找出 3 個主要摩擦點。將首頁從 20 多個區塊簡化為 4 個，播放頁操作列固定為 5 個核心功能，並重新設計 Samples 體驗，讓使用者重新掌握控制權。"
    )}
</p>
                        <div className="flex justify-between pt-3 md:pt-4">
                            <div>
                                <p className="font-serif text-sm md:text-lg text-text-primary mb-1">{t('Tools', '工具')}</p>
                                <p className="font-mono text-sm text-text-secondary">Figma</p>
                            </div>
                            <div>
                                <p className="font-serif text-sm md:text-lg text-text-primary mb-1">{t('Role', '職位')}</p>
                                <p className="font-mono text-sm text-text-secondary">UI/UX Designer</p>
                            </div>
                            <div>
                                <p className="font-serif text-sm md:text-lg text-text-primary mb-1">{t('Timeline', '時間')}</p>
                                <p className="font-mono text-sm text-text-secondary">{t('3 weeks', '3 週')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-2 md:mt-0">
                        <img src="/images/YouTubeMusic/cover.png" alt="YouTube Music Redesign Preview"
                             className="w-full h-auto"
                             onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                        <div className="w-full aspect-video rounded-2xl items-center justify-center">
                            <img src="/images/YouTubeMusic/youtubemkup.png" alt="YouTubeMusic Mockup" className="w-full h-auto" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="lg:flex lg:gap-16 max-w-7xl mx-auto px-5 md:px-16 xl:px-20">

            {/* TOC */}
            <aside className="hidden lg:block w-70 shrink-0 mt-15">
                <p className="text-sm tracking-widest text-neutral-400 uppercase mb-3">Case Study</p>
                <div className={`sticky top-24 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto transition-opacity duration-500 ${showToc ? 'opacity-100' : 'opacity-0'}`}>
                    <ul className="space-y-0.5">
                        {tocItems.map((item) => (
                            <li key={item.id}>
                                <button onClick={() => scrollToSection(item.id)}
                                    className={`flex items-start w-full text-left py-1.5 transition-all duration-200 text-base leading-snug ${
                                        activeId === item.id
                                            ? 'border-l-2 border-[#CC0000] pl-3 font-medium text-neutral-900'
                                            : 'pl-3 text-neutral-400 hover:text-neutral-600'
                                    }`}>
                                    <span className="mr-1.5 text-neutral-400">-</span>
                                    <span className="font-sans">{item.text}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="bg-neutral-100 rounded-xl p-4 mt-8">
                        <p className="text-base font-medium text-neutral-800 mb-1">{t('More Work', '更多作品')}</p>
                        <p className="text-sm text-neutral-500 mb-3">{t('Explore other case studies.', '瀏覽其他作品。')}</p>
                        <Link to="/work" className="inline-flex items-center gap-1 text-sm font-mono text-[#CC0000] hover:underline">
                            {t('View all work', '查看所有作品')} →
                        </Link>
                    </div>
                </div>
            </aside>

            <div className="flex-1 min-w-0">

                {/* ===== Overview ===== */}
                <FadeInSection>
<section className="py-8 md:py-12">
  <div className="max-w-2xl mx-auto md:mt-7">
                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-3">{t('Overview', '概覽')}</h2>
 <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6 max-w-2xl">
    {t(
        "YouTube Music combines music streaming with video content, which introduces additional complexity to the user experience. This project redesigns the Home and Playback experience based on informal user interviews and UX principles, aiming to reduce friction and improve user control during browsing and listening.",
        "YouTube Music 結合音樂串流與影片內容，但這樣的整合也帶來操作上的複雜性。本專案透過非正式使用者訪談與 UX 原則，重新設計首頁與播放頁體驗，目標是降低操作摩擦，並提升使用者在瀏覽與播放過程中的控制感。"
    )}
</p>
                        <div className="grid grid-cols-3 gap-3 md:gap-4">
                            {issues.map((issue) => (
                                <div key={issue.id} className="p-3 md:p-4 border border-gray-200 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2" style={{ color: RED }}>
                                        {issue.icon}
                                        <span className="font-mono text-sm font-bold">ISSUE {issue.id}</span>
                                    </div>
                                    <p className="text-sm md:text-base text-text-primary font-medium mb-2">{issue.title}</p>
                                    <p className="text-sm text-text-secondary leading-relaxed">{issue.insight}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                </FadeInSection>

                {/* ===== The Problem ===== */}
                <FadeInSection>
                <section className="py-8 md:py-12">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-2">{t('The Problem', '問題定義')}</h2>
                       <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-8">
    {t(
        "Research was based on informal interviews with 5 users (ages 20–28), supported by Research and secondary sources. Three issues consistently emerged across all inputs.",
        "研究以 5 位使用者（20–28 歲）的非正式訪談為主，並輔以研究與次級資料。三個問題在不同來源中反覆出現。"
    )}
</p>

                        <div className="flex justify-center gap-4 mb-10">
                            {[
                                { stat: '4 / 5', label: t('skip Home', '跳過主頁') },
                                { stat: '3 / 5', label: t('buttons too small / unnoticed', '按鈕太小 / 不易察覺') },
                                { stat: '5 / 5', label: t('dislike Samples', '不喜歡 Samples 功能') },
                            ].map(({ stat, label }) => (
                                <div key={label} className="rounded-lg p-4 text-center w-36" style={{ backgroundColor: 'rgba(204,0,0,0.07)' }}>
                                    <p className="font-serif text-2xl md:text-3xl font-bold" style={{ color: RED }}>{stat}</p>
                                    <p className="text-sm md:text-base text-text-secondary mt-1">{label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-10">
                            {issues.map((issue, idx) => (
                                <div key={issue.id} className={idx > 0 ? 'pt-10 border-t border-gray-200' : ''}>
                                    {/* Issue label + title */}
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0" style={{ backgroundColor: RED }}>
                                            {issue.icon}
                                        </div>
                                        <span className="font-mono text-sm font-bold tracking-widest text-text-secondary">ISSUE {issue.id}</span>
                                    </div>
                                    <h3 className="font-serif text-base md:text-lg font-semibold text-text-primary mb-3">{issue.title}</h3>

                                    {/* Problem description */}
                                    <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-4">{issue.problem}</p>

                                    {/* HMW + badges */}
                                    <div className="border-l-2 pl-4" style={{ borderColor: 'rgba(204,0,0,0.25)' }}>
                                        <p className="font-mono text-sm mb-1" style={{ color: RED }}>How Might We</p>
                                        <p className="font-serif text-sm md:text-base text-text-primary leading-relaxed mb-3">"{issue.hmw}"</p>
                                        <div className="flex flex-wrap gap-2">
                                            {issue.badges.map((b) => (
                                                <span key={b} className="text-sm px-2.5 py-1 rounded-full border font-mono"
                                                      style={{ color: RED, borderColor: 'rgba(204,0,0,0.3)', backgroundColor: 'rgba(204,0,0,0.06)' }}>
                                                    {b}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                </FadeInSection>

                {/* ===== Competitive Analysis ===== */}
                <FadeInSection>
                <section className="py-8 md:py-12">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-6">{t('Competitive Analysis', '競品分析')}</h2>
                        <p className="font-mono text-sm text-text-secondary mb-3">{t('Playback Page · Action Visibility', '播放頁 · 操作可見性比較')}</p>

                        {/* Table */}
                        <div className="w-full border border-gray-200 rounded-lg overflow-hidden mb-4">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="text-left px-4 py-3 font-mono text-xs text-text-secondary font-normal">{t('App', 'App')}</th>
                                        <th className="text-left px-4 py-3 font-mono text-xs text-text-secondary font-normal">{t('Where is Save', 'Save 位置')}</th>
                                        <th className="text-left px-4 py-3 font-mono text-xs text-text-secondary font-normal">{t('Always Visible', '是否固定可見')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {issues[1].competitive.map((c) => (
                                        <tr key={c.app}
                                            className={`border-b border-gray-100 last:border-0 ${c.highlight ? 'bg-red-50' : ''}`}>
                                            <td className="px-4 py-3 font-medium text-sm md:text-base"
                                                style={c.highlight ? { color: RED } : { color: '#333' }}>
                                                {c.app}
                                            </td>
                                            <td className="px-4 py-3 text-xs md:text-base text-text-secondary relative">
  {c.hoverImg ? (
    <span
      className="underline decoration-dashed cursor-help"
      onMouseEnter={(e) => {
        const rect = e.target.getBoundingClientRect();
        setTooltipPos({ x: rect.right + 8, y: rect.top + rect.height / 2 });
        setHoverImg(c.hoverImg);
        setShowTooltip(true);
      }}
      onMouseLeave={() => { setShowTooltip(false); setHoverImg(null); }}
    >
      {c.logic}
    </span>
  ) : c.logic}
</td>
                                            <td className="px-4 py-3 text-xs md:text-base text-text-secondary">{c.eval}</td>
                                        </tr>
                                    ))}
                                    {showTooltip && (
  <div className="fixed z-[999] w-56 rounded-xl overflow-hidden shadow-xl border border-gray-200 pointer-events-none"
       style={{ left: tooltipPos.x, top: tooltipPos.y, transform: 'translateY(-50%)' }}>
    <img src={hoverImg} alt="screenshot" className="w-full h-auto" />
  </div>
)}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-sm md:text-base text-text-secondary leading-relaxed">{issues[1].competitiveSummary}</p>
                    </div>
                </section>
                </FadeInSection>

                {/* ===== Solution ===== */}
                <FadeInSection>
                <section className="py-8 md:py-12">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-8">{t('Solution', '解決方案')}</h2>
                        <div className="space-y-10">
                            {issues.map((issue, idx) => (
                                <div key={issue.id} className={idx > 0 ? 'pt-10 border-t border-gray-200' : ''}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-mono text-xs font-bold tracking-widest text-text-secondary">ISSUE {issue.id}</span>
                                    </div>
                                    <h3 className="font-serif text-base md:text-lg font-semibold text-text-primary mb-4">{issue.title}</h3>
                                    <div className="rounded-lg p-4 border border-gray-100">
                                        <p className="font-mono text-xs text-text-secondary mb-2">{t('Decision & Rationale', '決策與理由')}</p>
                                        <p className="text-sm md:text-base text-text-secondary leading-relaxed">{issue.outcome}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                </FadeInSection>

                {/* ===== Final Design ===== */}
                <FadeInSection>
                <section className="py-8 md:py-12">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-8">{t('Final Design', '最終設計')}</h2>
                        <div className="space-y-16">
                            {issues.map((issue, idx) => (
                                <div key={issue.id} className={idx > 0 ? 'pt-12 border-t border-gray-200' : ''}>
                                    <span className="font-mono text-xs font-bold tracking-widest text-text-secondary">ISSUE {issue.id}</span>
                                    <h3 className="font-serif text-base md:text-lg font-semibold text-text-primary mt-1 mb-6">{issue.title}</h3>
                                    <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                                        <div>
                                            <p className="font-mono text-xs text-text-secondary mb-3">Before</p>
                                            <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-200 aspect-9/19 flex items-center justify-center cursor-zoom-in"
                                                 onClick={() => issue.beforeImg && setLightboxImg(issue.beforeImg)}>
                                                {issue.beforeImg
                                                    ? <img src={issue.beforeImg} alt="Before" className="w-full h-full object-cover" />
                                                    : <p className="text-base md:text-base text-text-secondary font-mono text-center px-4">{t('Add Before screenshot', '加入 Before 截圖')}</p>
                                                }
                                            </div>
                                            <ul className="mt-3 space-y-1.5">
                                                {issue.beforePoints.map((p, i) => (
                                                    <li key={i} className="flex items-start gap-1.5 text-xs text-text-secondary">
                                                        <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: RED }} /> {p}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs mb-3" style={{ color: RED }}>After</p>
                                            <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-200 aspect-9/19 flex items-center justify-center cursor-zoom-in"
                                                 onClick={() => issue.afterImg && setLightboxImg(issue.afterImg)}>
                                                {issue.afterImg
                                                    ? <img src={issue.afterImg} alt="After" className="w-full h-full object-cover" />
                                                    : <p className="text-xs text-text-secondary font-mono text-center px-4">{t('Add Figma redesign screenshot', '加入 Figma 重設計截圖')}</p>
                                                }
                                            </div>
                                            <ul className="mt-3 space-y-1.5">
                                                {issue.afterPoints.map((p, i) => (
                                                    <li key={i} className="flex items-start gap-1.5 text-xs text-text-secondary">
                                                        <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-green-500" /> {p}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
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
                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-8">
                            {t('Reflection ', '反思')}
                        </h2>

                        <div className="space-y-6 text-text-secondary leading-relaxed">
                            <p>
                                {t(
                                    "This project shifted my focus from visual improvements to structural problem-solving. I realized that many usability issues were not caused by visual design, but by unclear information architecture and mixed interaction logic.",
                                    "這個專案讓我從視覺優化轉向結構性問題解決。我意識到許多使用性問題的根源不在視覺設計，而在於資訊架構不清晰與互動邏輯混雜。"
                                )}
                            </p>
                            <p>
                                {t(
                                    "Working with informal user interviews also changed how I approached research. Instead of focusing on statistical validation, I focused on identifying recurring patterns in user behavior and perception.",
                                    "透過非正式使用者訪談，我也改變了研究方式。我不再著重於統計驗證，而是聚焦於找出使用者行為與感受中反覆出現的模式。"
                                )}
                            </p>
                            <p>
                                {t(
                                    "Designing within constraints was another key learning. Features like Samples exist for business reasons, so the challenge was not removing them, but redesigning them in a way that restores user control.",
                                    "在限制條件下設計是另一個重要收穫。像 Samples 這類功能具有商業目的，挑戰不在於移除，而是重新設計以恢復使用者的控制感。"
                                )}
                            </p>
                            <p>
                                {t(
                                    "Moving forward, I would conduct usability testing to evaluate whether the redesigned interfaces effectively reduce friction. I would also explore A/B testing for the simplified Home and redesigned Samples flow to better understand their impact on user behavior and engagement.",
                                    "未來，我會進行可用性測試，評估重新設計的介面是否有效降低操作摩擦，並探索針對簡化首頁與重新設計的 Samples 流程進行 A/B 測試，以深入了解其對使用者行為與參與度的影響。"
                                )}
                            </p>
                        </div>
                    </div>
                </section>
                </FadeInSection>

                {/* Navigation */}
                <FadeInSection>
                <section className="py-8 md:py-12">
                    <div className="flex justify-between items-center w-full">
                        <Link to="/work" className="text-brand-green font-mono text-sm hover:underline">
                            {t('← Back to Projects', '← 返回作品集')}
                        </Link>
                        <Link to="/work/MindLog" className="text-brand-green font-mono text-sm hover:underline">
                            {t('Next Project →', '下一個專案 →')}
                        </Link>
                    </div>
                </section>
                </FadeInSection>

            </div>
            </div>
        </div>
        </PageTransition>
        </>
    );
}

export default YouTubeMusic;