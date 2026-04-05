import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FadeInSection, PageTransition } from "../../components/AnimatedSection";
import { useLanguage } from '../../context/LanguageContext';
import { CheckCircle, XCircle, AlertCircle, ChevronRight } from 'lucide-react';

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
            <nav className="px-5 md:px-20 pt-3 md:pt-6">
                <div className="flex items-center gap-2 text-xs md:text-base font-mono">
                    <Link to="/work" className="text-brand-green hover:underline">{t('Work', '作品')}</Link>
                    <span className="text-text-secondary">{'>'}</span>
                    <span className="text-text-primary">YouTube Music Redesign</span>
                </div>
            </nav>

            {/* Header */}
            <section className="px-5 md:px-20 py-4 md:py-10">
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
                        <p className="pt-4 md:pt-6 text-base text-text-secondary leading-relaxed">
                            {t(
                                "5 interviews. 3 friction points. Home reduced from 20+ sections to 4. A scrolling action bar fixed to 5 stable controls. Samples' abrupt autoplay replaced with an explicit Play button, putting control back in the user's hands.",
                                '5 次訪談，3 個摩擦點。將主頁從 20 多個區塊減少到 4 個。播放頁 Action Bar 固定 5 個核心按鈕。Samples 的自動播放改為先瀏覽再播放。'
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

            <div className="lg:flex lg:gap-16 px-5 md:px-20">

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
                            {t('View all projects', '查看所有作品')} →
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
                                'YouTube Music blends music and video, which can create friction in the interface. I redesigned YouTube Music’s interface to fix 3 key pain points found from 5 user interviews, guided by UX principles.',
                                'YouTube Music 結合了音樂與影片，這可能在介面上造成摩擦。我根據 5 個使用者訪談發現 3 個主要痛點，並以 UX 原則重新設計了 YouTube Music 的介面。'
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
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-2">{t('The Problem', '問題定義')}</h2>
                        <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-8">
                            {t(
                                'Research included 5 user interviews (ages 20–28), supplemented by Reddit discussions and tech coverage. Three issues emerged consistently across all sources.',
                                '研究包含 5 位使用者訪談（20-28 歲），輔以 Reddit 討論串與科技媒體報導。三個問題在所有來源中反覆出現。'
                            )}
                        </p>

                        <div className="flex justify-center gap-4 mb-10">
                            {[
                                { stat: '4 / 5', label: t('skip Home', '跳過 Home') },
                                { stat: '3 / 5', label: t('accidental taps', '誤觸回報') },
                                { stat: '5 / 5', label: t('startled by Samples', '被 Samples 嚇到') },
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
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-6">{t('Competitive Analysis', '競品分析')}</h2>
                        <p className="font-mono text-sm text-text-secondary mb-3">{t('Action Bar · Music Apps', 'Action Bar · 音樂 App 比較')}</p>

                        {/* Table */}
                        <div className="w-full border border-gray-200 rounded-lg overflow-hidden mb-4">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="text-left px-4 py-3 font-mono text-xs text-text-secondary font-normal">{t('App', 'App')}</th>
                                        <th className="text-left px-4 py-3 font-mono text-xs text-text-secondary font-normal">{t('Action Bar Approach', 'Action Bar 設計')}</th>
                                        <th className="text-left px-4 py-3 font-mono text-xs text-text-secondary font-normal">{t('Assessment', '評估')}</th>
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
                                            <td className="px-4 py-3 text-xs md:text-base text-text-secondary">{c.logic}</td>
                                            <td className="px-4 py-3 text-xs md:text-base text-text-secondary">{c.eval}</td>
                                        </tr>
                                    ))}
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
                    <div className="max-w-5xl mx-auto">
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
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-8">{t('Final Design', '最終設計')}</h2>
                        <div className="space-y-16">
                            {issues.map((issue, idx) => (
                                <div key={issue.id} className={idx > 0 ? 'pt-12 border-t border-gray-200' : ''}>
                                    <span className="font-mono text-xs font-bold tracking-widest text-text-secondary">ISSUE {issue.id}</span>
                                    <h3 className="font-serif text-base md:text-lg font-semibold text-text-primary mt-1 mb-6">{issue.title}</h3>
                                    <div className="grid grid-cols-2 gap-4 md:gap-8">
                                        <div>
                                            <p className="font-mono text-xs text-text-secondary mb-3">Before</p>
                                            <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-200 aspect-3/4 flex items-center justify-center cursor-zoom-in"
                                                 onClick={() => issue.beforeImg && setLightboxImg(issue.beforeImg)}>
                                                {issue.beforeImg
                                                    ? <img src={issue.beforeImg} alt="Before" className="w-20 h-full object-cover" />
                                                    : <p className="text-xs text-text-secondary font-mono text-center px-4">{t('Add Before screenshot', '加入 Before 截圖')}</p>
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

                {/* ===== Future Improvement ===== */}
                <FadeInSection>
                <section className="py-8 md:py-12">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-6">{t('Future Improvement', '未來改善方向')}</h2>
                        <div className="space-y-3">
                            {[
                                t('A/B test the simplified Home — track session duration and Library redirect rate', 'A/B 測試精簡版 Home，追蹤 Session Duration 和 Library 跳轉率'),
                                t('Recruit heavy Samples users to validate whether the transition screen fits their flow', '招募重度 Samples 使用者，驗證過渡頁是否符合其使用習慣'),
                                t('Run usability testing to confirm no new friction was introduced', '進行可用性測試，確認沒有引入新的摩擦點'),
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                                    <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" style={{ color: RED }} />
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                </FadeInSection>

                {/* ===== Reflection ===== */}
                <FadeInSection>
                <section className="py-8 md:py-12">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-8">Reflection</h2>

                        <div className="space-y-6 mb-10">
                            {[
                                {
                                    label: t('Heuristics as diagnostic tools', '啟發式法則作為診斷工具'),
                                    body: t(
                                        "Naming the specific heuristic behind each issue changed how I communicated design decisions — from 'this feels wrong' to 'this violates X, here's why it matters.'",
                                        '為每個問題對應具體的啟發式法則，讓我的設計決策溝通從「這感覺不對」變成「這違反了 X 原則，原因如下」。'
                                    ),
                                },
                                {
                                    label: t('Structure before surface', '先解決結構，再處理表面'),
                                    body: t(
                                        "The Home screen problem was architectural. No amount of visual polish would fix a layout with no hierarchy — IA decisions had to come first.",
                                        'Home 的問題在架構層。沒有層次的版面無論如何視覺優化都無效——必須先確立 IA 決策。'
                                    ),
                                },
                                {
                                    label: t('Designing within platform constraints', '在平台限制內設計'),
                                    body: t(
                                        "Samples exists for business reasons — removing it was never realistic. The more useful question was how to give users control without dismantling the feature.",
                                        'Samples 的存在有商業原因，移除從來不是選項。更有用的問題是：如何在不破壞功能的前提下給予使用者控制感。'
                                    ),
                                },
                            ].map(({ label, body }) => (
                                <div key={label} className="flex gap-4">
                                    <div className="w-1 shrink-0 rounded-full mt-1" style={{ backgroundColor: 'rgba(204,0,0,0.2)' }} />
                                    <div>
                                        <p className="font-mono text-xs text-text-secondary mb-1">{label}</p>
                                        <p className="text-sm md:text-base text-text-secondary leading-relaxed">{body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-lg p-4 border border-gray-200">
                            <p className="font-mono text-xs text-text-secondary mb-3">{t('Limitations', '侷限性')}</p>
                            <div className="space-y-2">
                                {[
                                    t('n=5, ages 20–28 — findings may not generalise across demographics', '樣本數 5 人（20–28 歲），結果難以推論至其他族群'),
                                    t('Designs were not validated through usability testing', '設計未經可用性測試驗證'),
                                    t("Platform constraints (recommendation model, content licensing) were out of scope", '平台層級的限制（推薦模型、內容授權）未納入設計範疇'),
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-yellow-500" /> {item}
                                    </div>
                                ))}
                            </div>
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
                        <Link to="/work/vanlink" className="text-brand-green font-mono text-sm hover:underline">
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
