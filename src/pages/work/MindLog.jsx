import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FadeInSection, PageTransition } from "../../components/AnimatedSection";
import { useLanguage } from '../../context/LanguageContext';
import {
    Heart, Brain, BarChart2, RefreshCw, Search, Lightbulb,
    Pencil, FlaskConical, ShieldCheck, Sparkles, CalendarDays,
    Users, AlertCircle, Type, Palette, Grid,
} from 'lucide-react';

function MindLog() {
    const { t } = useLanguage();
    const [lightboxImg, setLightboxImg] = useState(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [tocItems, setTocItems] = useState([]);
    const [activeId, setActiveId] = useState('');
    const [showToc, setShowToc] = useState(false);
    const [dsTab, setDsTab] = useState('colors');

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

    // TOC: delay slightly so FadeInSection content is in DOM
    useEffect(() => {
        const timer = setTimeout(() => {
            const headings = Array.from(document.querySelectorAll('h2'));
            const items = headings.map((h, i) => {
                const id = `toc-${i}`;
                h.id = id;
                h.style.scrollMarginTop = '100px';
                return { id, text: h.textContent.trim() };
            });
            setTocItems(items);
        }, 300);
        return () => clearTimeout(timer);
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
            { rootMargin: '0% 0% -50% 0%', threshold: 0.1 }
        );
        tocItems.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [tocItems]);

    // ── Design System data ──────────────────────────────
    const colorGroups = [
        {
            label: t('Backgrounds', '背景色'),
            note: t('Rotate per screen for visual variety', '每個畫面輪替使用'),
            colors: [
                { name: 'Cream Yellow', hex: '#FDFCE8', role: 'Primary BG' },
                { name: 'Soft Peach',   hex: '#F9E8E0', role: 'Secondary BG' },
                { name: 'Mint Green',   hex: '#DFF0E8', role: 'Tertiary BG' },
                { name: 'Sky Blue',     hex: '#F5EEE8', role: 'Quaternary BG' },
                { name: 'Light Rose',   hex: '#FFEFED', role: 'Safety BG' },
            ]
        },
        {
            label: t('Text', '文字色'),
            note: t('Charcoal Brown hierarchy', '暖棕色層次'),
            colors: [
                { name: 'Charcoal Dark',     hex: '#2E2318', role: 'Text Primary' },
                { name: 'Charcoal Mid',      hex: '#5C4033', role: 'Text Secondary' },
                { name: 'Warm Gray', hex: '#8A7A72', role: 'Text Tertiary' },
                { name: 'Mid Warm Gray',      hex: '#6B5C55', role: 'Disabled' },
                { name: 'Light Warm Gray',    hex: '#C4B5B0', role: 'Placeholder' },
            ]
        },
        {
            label: t('Accent', '強調色'),
            note: t('Salmon = CTA only · Each mood maps to its own hue', 'Salmon 專用於 CTA · 每種情緒對應專屬色'),
            colors: [
                { name: 'Salmon',       hex: '#E07A65', role: 'CTA · AI Accent' },
                { name: 'Sage Green',   hex: '#6DB38A', role: 'Calm · Success' },
                { name: 'Golden Amber', hex: '#E8C86A', role: 'Happy · Highlight' },
                { name: 'Sage Light',   hex: '#B7E4C7', role: 'Mint Accent' },
                { name: 'Green Tint',   hex: '#E8F5EC', role: 'Illustration BG' },
            ]
        },
        {
            label: t('Surface', '介面色'),
            note: t('White surfaces with subtle borders', '白色介面搭配細緻邊框'),
            colors: [
                { name: 'White',        hex: '#FFFFFF', role: 'Card Surface', border: true },
                { name: 'Off White',    hex: '#F5F5F5', role: 'Input BG' },
                { name: 'Border',       hex: '#E8E6F0', role: 'Divider · Stroke' },
                { name: 'Neutral Gray', hex: '#D9D9D9', role: 'Ghost UI' },
            ]
        },
    ];

    const typeScale = [
        { style: 'Display',  family: 'Montserrat', weight: 'Bold',    size: '32px', lh: '1.2', usage: t('Onboarding headings', '引導頁大標題') },
        { style: 'H1',       family: 'Montserrat', weight: 'Bold',    size: '26px', lh: '1.3', usage: t('Page titles', '頁面標題') },
        { style: 'H2',       family: 'Montserrat', weight: 'Bold',    size: '22px', lh: '1.3', usage: t('Section headers', '區塊標題') },
        { style: 'H3',       family: 'Montserrat', weight: 'Medium',  size: '18px', lh: '1.4', usage: t('Card titles', '卡片標題') },
        { style: 'H4',       family: 'Montserrat', weight: 'Medium',  size: '15px', lh: '1.4', usage: t('Sub-headers', '次要標題') },
        { style: 'Body L',   family: 'Albert Sans', weight: 'Regular', size: '16px', lh: '1.6', usage: t('Primary body', '主要內文') },
        { style: 'Body M',   family: 'Albert Sans', weight: 'Regular', size: '14px', lh: '1.6', usage: t('Secondary body', '次要內文') },
        { style: 'Body S',   family: 'Albert Sans', weight: 'Regular', size: '13px', lh: '1.5', usage: t('Captions, hints', '說明、提示') },
        { style: 'Label',    family: 'Albert Sans', weight: 'Medium',  size: '12px', lh: '1.4', usage: t('Chips, badges', 'Chip、Badge') },
        { style: 'Caption',  family: 'Albert Sans', weight: 'Regular', size: '11px', lh: '1.4', usage: t('Timestamps', '時間戳') },
        { style: 'Overline', family: 'Albert Sans', weight: 'Medium',  size: '10px', lh: '1.4', usage: t('Section labels UPPER', '區塊標籤大寫') },
    ];

    return (
        <>
            {/* Progress Bar */}
            <div
                className="fixed top-0 left-0 z-60 h-0.5 bg-[#E07A65] transition-all duration-100"
                style={{ width: `${scrollProgress}%` }}
            />

            {/* Back to Top */}
            {showBackToTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 z-50 w-10 h-10 bg-[#2E2318] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#2E2318]/80 transition-colors"
                    aria-label="Back to top"
                >↑</button>
            )}

            {/* Lightbox */}
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
                    <nav className="px-5 md:px-20 pt-3 md:pt-6">
                        <div className="flex items-center gap-2 text-sm md:text-sm font-mono">
                            <Link to="/work" className="text-brand-green hover:underline">{t('Work', '作品')}</Link>
                            <span className="text-text-secondary">{'>'}</span>
                            <span className="text-text-primary">MindLog</span>
                        </div>
                    </nav>

                    {/* ===== Header ===== */}
                    <section className="px-5 md:px-20 py-4 md:py-10">
                        <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-12">
                            <div className="md:w-1/2 flex flex-col">
                                <div className="flex flex-col gap-y-1 min-h-[120px] md:min-h-[160px]">
                                    <h1 className="font-serif text-3xl md:text-5xl text-text-primary">MindLog</h1>
                                    <p className="font-serif text-lg md:text-2xl text-text-secondary">
                                        {t('AI-Powered Mental Wellness App', 'AI 心理健康追蹤 App')}
                                    </p>
                                </div>
                                <p className="flex-grow pt-4 md:pt-6 text-base text-text-secondary leading-relaxed">
                                    {t(
                                        'A mental wellness mobile app designed for the Canadian market — bridging everyday emotional self-care with professional support. Users track moods, journal their thoughts, and receive AI-powered insights, with a clear pathway to counselors when needed.',
                                        '一款專為加拿大市場設計的心理健康行動 App，架起日常情緒自我照顧與專業支援之間的橋樑。用戶可追蹤情緒、記錄日記，獲得 AI 洞察分析，在需要時直接連結諮商師。'
                                    )}
                                </p>
                                <div className="flex gap-8 md:gap-16 pt-4 md:pt-6">
                                    {[
                                        { label: t('Tools', '工具'),     value: 'Figma' },
                                        { label: t('My Role', '職位'),   value: 'UX/UI Designer' },
                                        { label: t('Timeline', '時間軸'), value: '1 Week' },
                                    ].map(({ label, value }) => (
                                        <div key={label}>
                                            <p className="font-serif text-sm md:text-lg text-text-primary mb-1">{label}</p>
                                            <p className="font-mono text-sm text-text-secondary">{value}</p>
                                        </div>
                                    ))}
                                </div>
                                <a
                                    href="https://www.figma.com/design/ibPQgpJozWbZf2eXgcN8Kd/MindLog"
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
                                <img src="/images/MindLog/MindLog_mkup.png" alt="MindLog Preview" className="w-full h-auto" />
                            </div>
                        </div>
                    </section>

                    <div className="lg:flex lg:gap-16 px-5 md:px-20">

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
                                                        ? 'border-l-2 border-[#E07A65] pl-3 font-medium text-neutral-900'
                                                        : 'pl-3 text-neutral-400 hover:text-neutral-600'
                                                }`}
                                            >
                                                <span className="mr-1.5 text-neutral-400">-</span>
                                                <span className="font-sans">{item.text}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="bg-neutral-100 rounded-xl p-4 mt-8 mb-5">
                                    <p className="text-base font-medium text-neutral-800 mb-1">{t('More Work', '更多作品')}</p>
                                    <p className="text-sm text-neutral-500 mb-3">{t('View other case studies.', '瀏覽其他作品。')}</p>
                                    <Link to="/work" className="inline-flex items-center gap-1 text-xs font-mono text-[#E07A65] hover:underline">
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
                                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-4">
                                            {t('The Problem', '問題定義')}
                                        </h2>
                                        <p className="text-base text-text-secondary leading-relaxed mb-6">
                                            {t(
                                                "In Canada, mental health professional wait times stretch 16–28 weeks. People experience stress and low mood but lack tools to track patterns over time — and don't know when those patterns become serious enough to seek help. Existing apps offer mood logging and charts, but leave users to interpret data alone with no bridge to professional support.",
                                                '在加拿大，心理健康等待時間長達 16–28 週。許多人長期承受壓力，卻缺乏追蹤情緒模式的工具，也不知道何時該求助。現有 App 雖有圖表，卻讓使用者自行解讀，沒有連結專業支援的途徑。'
                                            )}
                                        </p>
                                        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
                                            {[
                                                { icon: <Brain className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-[#2E2318]" />, label: t('Long wait times', '漫長等待時間') },
                                                { icon: <BarChart2 className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-[#2E2318]" />, label: t('Data without insight', '有數據無洞察') },
                                                { icon: <AlertCircle className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-[#2E2318]" />, label: t('No support pathway', '缺乏支援途徑') },
                                            ].map(({ icon, label }) => (
                                                <div key={label} className="p-3 md:p-4 text-center">
                                                    {icon}
                                                    <p className="text-sm md:text-sm text-text-primary font-medium">{label}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="border-l-4 border-[#E07A65] pl-5 mt-8">
                                            <p className="text-sm text-[#E07A65] font-mono uppercase tracking-widest mb-2">
                                                {t('Design Goal', '設計目標')}
                                            </p>
                                            <p className="font-serif text-xl md:text-2xl text-text-primary mb-6">
                                                {t(
                                                    'How might we bridge daily emotional self-care with professional mental health support?',
                                                    '我們如何將日常情緒自我照顧與專業心理健康支援銜接起來？'
                                                )}
                                            </p>
                                            <ul className="space-y-2">
                                                {[
                                                    { icon: <Heart className="w-4 h-4 text-[#E07A65] shrink-0" />, text: t('Private space for daily mood tracking and journaling', '日常情緒追蹤與日記的私密空間') },
                                                    { icon: <Sparkles className="w-4 h-4 text-[#E07A65] shrink-0" />, text: t('AI-powered emotional pattern analysis and weekly summaries', 'AI 情緒模式分析與每週摘要') },
                                                    { icon: <ShieldCheck className="w-4 h-4 text-[#E07A65] shrink-0" />, text: t('Safety layer that detects distress and connects users to counselors', '偵測情緒困擾並連結諮商師的安全層') },
                                                ].map(({ icon, text }) => (
                                                    <li key={text} className="flex items-center gap-3 text-sm md:text-base text-text-secondary">{icon}{text}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                            </FadeInSection>

                            {/* ===== Design Process ===== */}
                            <FadeInSection>
                                <section className="py-8 md:py-12">
                                    <div className="max-w-2xl mx-auto">
                                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-6">
                                            {t('Design Process', '設計流程')}
                                        </h2>
                                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                            {[
                                                { icon: <Search className="w-5 h-5 text-[#2E2318]" />, label: t('Research', '研究') },
                                                { icon: <Lightbulb className="w-5 h-5 text-[#2E2318]" />, label: t('Define', '定義') },
                                                { icon: <Pencil className="w-5 h-5 text-[#2E2318]" />, label: t('Design', '設計') },
                                                { icon: <FlaskConical className="w-5 h-5 text-[#2E2318]" />, label: t('Test', '測試') },
                                                { icon: <RefreshCw className="w-5 h-5 text-[#2E2318]" />, label: t('Iterate', '迭代') },
                                            ].map((step, i, arr) => (
                                                <div key={i} className="flex items-center gap-4">
                                                    <div className="flex flex-col items-center text-center">
                                                        <div className="w-12 h-12 bg-[#FDFCE8] rounded-full flex items-center justify-center mb-2">{step.icon}</div>
                                                        <p className="text-sm font-medium text-text-primary">{step.label}</p>
                                                    </div>
                                                    {i < arr.length - 1 && <div className="hidden md:block text-text-secondary">→</div>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </FadeInSection>

                            {/* ===== Target Users ===== */}
                            <FadeInSection>
                                <section className="py-8 md:py-12">
                                    <div className="max-w-2xl mx-auto">
                                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-4">
                                            {t('Target Users', '目標使用者')}
                                        </h2>
                                        <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
                                            {t(
                                                'Adults aged 18–40 in Canada experiencing daily stress from work, school, or life transitions. Emotionally reflective, interested in self-growth, wanting mental health support but not yet ready for regular therapy.',
                                                '18–40 歲在加拿大生活、承受工作、學業或生活轉變壓力的成年人，具有情感反思能力，希望獲得心理健康支援，但尚未準備好定期療程。'
                                            )}
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                            <div className="bg-[#FDFCE8] border border-[#E8C86A] rounded-xl p-5">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Users className="w-4 h-4 text-[#2E2318]" />
                                                    <p className="font-serif text-base text-text-primary font-medium">
                                                        {t('Emily, 28 — Overwhelmed Professional', 'Emily, 28 歲 — 過度承壓的職場人')}
                                                    </p>
                                                </div>
                                                <p className="text-sm text-text-secondary leading-relaxed">
                                                    {t("Marketing Manager in Toronto. Struggles to disconnect after work. Knows she's stressed but can't see patterns. Therapy wait times are too long.", '多倫多行銷經理。下班後難以放鬆，知道自己有壓力但看不出規律，治療等待時間太長。')}
                                                </p>
                                            </div>
                                            <div className="bg-[#F5EEE8] border border-[#A09080] rounded-xl p-5">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Users className="w-4 h-4 text-[#2E2318]" />
                                                    <p className="font-serif text-base text-text-primary font-medium">
                                                        {t('Kevin, 23 — International Student', 'Kevin, 23 歲 — 國際學生')}
                                                    </p>
                                                </div>
                                                <p className="text-sm text-text-secondary leading-relaxed">
                                                    {t('Studying at UBC. Far from family, navigating a new culture. Experiences loneliness and anxiety. Wants a private, non-judgmental space.', '就讀 UBC，遠離家人，適應新文化。時常孤獨與焦慮，希望有私密不被評判的空間。')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex justify-center gap-4 flex-wrap">
                                            {[
                                                { stat: '1 in 5', label: t('Canadians experience mental illness yearly', '加拿大人每年有心理健康問題') },
                                                { stat: '16–28',  label: t('Weeks avg. wait for mental health services', '週平均等待心理健康服務') },
                                                { stat: '75%',    label: t('Would use a unified wellness app', '願意使用整合式健康 App') },
                                            ].map(({ stat, label }) => (
                                                <div key={stat} className="bg-[#FDFCE8] rounded-lg p-4 text-center w-36">
                                                    <p className="font-serif text-2xl md:text-3xl text-[#E07A65] font-bold">{stat}</p>
                                                    <p className="text-sm text-text-secondary mt-1">{label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </FadeInSection>

                            {/* ===== Competitive Analysis ===== */}
                            <FadeInSection>
                                <section className="py-8 md:py-12 bg-gray-50">
                                    <div className="max-w-2xl mx-auto">
                                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-4">
                                            {t('Competitive Analysis', '競品分析')}
                                        </h2>
                                        <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
                                            {t('All three apps stop at self-reflection with no bridge to professional support — the core gap MindLog fills.', '三款 App 都止步於自我反思，缺少連結專業支援的橋樑，這正是 MindLog 所填補的核心缺口。')}
                                        </p>
                                        <div className="border border-border rounded-lg overflow-hidden">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="bg-[#2E2318] text-white">
                                                        {[t('App', 'App'), t('Strengths', '優點'), t('Gap vs MindLog', '與 MindLog 的差距')].map(h => (
                                                            <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {[
                                                        { app: 'Daylio',    s: t('Excellent mood tracking, clear charts', '情緒追蹤出色，圖表清晰'), g: t('No safety layer, no counselor access', '無安全機制，無諮商師連結') },
                                                        { app: 'DailyBean', s: t('Mindfulness exercises, breathing tools', '正念練習，呼吸工具'), g: t('Not journal-focused, complex interface', '非日記導向，介面複雜') },
                                                        { app: 'Headspace', s: t('Meditation, sleep, stress programs', '冥想、睡眠、壓力療程'), g: t('Content-driven, not a daily mood journal', '內容導向，非日常情緒日記') },
                                                    ].map((row, i) => (
                                                        <tr key={row.app} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                            <td className="px-4 py-3 font-medium text-text-primary">{row.app}</td>
                                                            <td className="px-4 py-3 text-text-secondary">{row.s}</td>
                                                            <td className="px-4 py-3 text-[#E07A65]">{row.g}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </section>
                            </FadeInSection>

                            {/* ===== Design Decisions ===== */}
                            <FadeInSection>
                                <section className="py-8 md:py-12">
                                    <div className="max-w-2xl mx-auto">
                                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-6">
                                            {t('Design Decisions', '設計決策')}
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                            {[
                                                { num: '01', icon: <Heart className="w-7 h-7 md:w-8 md:h-8 mx-auto mb-3 text-[#2E2318]" />, title: t('Warm Pastel Visual Language', '溫暖色調視覺語言'), desc: t('Rotating pastel backgrounds replace clinical aesthetics. Charcoal Brown + salmon accents create a human, approachable feel.', '輪替柔和色調背景取代冰冷醫療風格。暖棕色文字與鮭魚橘點綴呈現人文氣息。') },
                                                { num: '02', icon: <Sparkles className="w-7 h-7 md:w-8 md:h-8 mx-auto mb-3 text-[#2E2318]" />, title: t('AI as Supportive Layer', 'AI 作為支援層'), desc: t('AI solves specific UX problems — prompts help users start writing; weekly summaries translate data into plain language insights.', 'AI 解決具體 UX 問題：提示幫助用戶開始寫作，週報摘要將數據轉化為易讀語言。') },
                                                { num: '03', icon: <ShieldCheck className="w-7 h-7 md:w-8 md:h-8 mx-auto mb-3 text-[#2E2318]" />, title: t('The Safety Popup', '安全彈窗設計'), desc: t("Negative language triggers a warm modal. No close X — users must acknowledge. Copy: \"You don't have to go through this alone.\"", '負面語言觸發溫暖 Modal，無關閉 X。文案：「你不必獨自面對這一切。」') },
                                                { num: '04', icon: <CalendarDays className="w-7 h-7 md:w-8 md:h-8 mx-auto mb-3 text-[#2E2318]" />, title: t('Reduced Friction Navigation', '降低操作摩擦'), desc: t('3-tab structure + "Write Your Mood" CTA on Calendar cuts steps to the core action.', '三標籤結構加上 Calendar 頁的「Write Your Mood」CTA，大幅縮短進入核心功能的步驟。') },
                                            ].map((card) => (
                                                <div key={card.num} className="bg-[#FDFCE8] rounded-xl p-4 md:p-6 text-center">
                                                    {card.icon}
                                                    <p className="text-[#E07A65] font-mono text-sm mb-2">{card.num}</p>
                                                    <h3 className="font-serif text-base text-text-primary mb-2">{card.title}</h3>
                                                    <p className="text-sm text-text-secondary leading-relaxed">{card.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </FadeInSection>

                            {/* ===== DESIGN SYSTEM ===== */}
                            <FadeInSection>
                                <section className="py-8 md:py-12 bg-gray-50">
                                    <div className="max-w-2xl mx-auto">
                                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-1">
                                            {t('Design System', '設計系統')}
                                        </h2>
                                        <p className="text-sm text-text-secondary mb-6">
                                            {t('Sourced directly from Figma Styles', '直接對應 Figma Styles')}
                                        </p>

                                        {/* Tab switcher */}
                                        <div className="flex gap-1 bg-white border border-border rounded-xl p-1 mb-8 w-fit">
                                            {[
                                                { id: 'colors', label: t('Colors', '顏色'),       icon: <Palette className="w-4 h-4" /> },
                                                { id: 'type',   label: t('Typography', '字體'),   icon: <Type className="w-4 h-4" /> },
                                                { id: 'tokens', label: t('Tokens', '設計代號'),   icon: <Grid className="w-4 h-4" /> },
                                            ].map(tab => (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setDsTab(tab.id)}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                                                        dsTab === tab.id
                                                            ? 'bg-[#2E2318] text-white shadow-sm font-medium'
                                                            : 'text-text-secondary hover:text-text-primary'
                                                    }`}
                                                >
                                                    {tab.icon}{tab.label}
                                                </button>
                                            ))}
                                        </div>

                                        {/* ── Colors ── */}
                                        {dsTab === 'colors' && (
                                            <div className="space-y-8">
                                                {colorGroups.map((group) => (
                                                    <div key={group.label}>
                                                        <div className="flex items-baseline gap-3 mb-4">
                                                            <p className="font-serif text-sm font-semibold text-text-primary">{group.label}</p>
                                                            <p className="text-xs text-text-secondary">{group.note}</p>
                                                        </div>
                                                        <div className="flex flex-wrap gap-3">
                                                            {group.colors.map((c) => (
                                                                <div key={c.hex} className="flex flex-col items-center gap-1.5 w-20">
                                                                    <div
                                                                        className="w-20 h-14 rounded-xl"
                                                                        style={{ background: c.hex, border: c.border ? '1px solid #E8E6F0' : 'none' }}
                                                                    />
                                                                    <p className="text-[10px] font-mono text-text-secondary text-center">{c.hex}</p>
                                                                    <p className="text-[10px] font-medium text-text-primary text-center leading-tight">{c.name}</p>
                                                                    <p className="text-[9px] text-text-secondary text-center leading-tight">{c.role}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* ── Typography ── */}
                                        {dsTab === 'type' && (
                                            <div>
                                                {/* Font families */}
                                                <div className="grid grid-cols-2 gap-4 mb-8">
                                                    {[
                                                        { name: 'Montserrat', role: t('Headings · Display · Buttons', '標題 · 展示 · 按鈕'), weights: ['Bold', 'Medium', 'Regular'] },
                                                        { name: 'Albert Sans', role: t('Body · Caption · Labels · UI', '內文 · 說明 · 標籤 · 介面'), weights: ['Bold', 'Medium', 'Regular'] },
                                                    ].map((f) => (
                                                        <div key={f.name} className="bg-[#FDFCE8] rounded-xl p-5">
                                                            <p className="text-xl font-bold text-text-primary mb-1" style={{ fontFamily: `'${f.name}', sans-serif` }}>{f.name}</p>
                                                            <p className="text-xs text-text-secondary mb-4">{f.role}</p>
                                                            <div className="space-y-1.5">
                                                                {f.weights.map(w => (
                                                                    <p key={w} className="text-sm text-text-primary" style={{ fontFamily: `'${f.name}', sans-serif`, fontWeight: w === 'Bold' ? 700 : w === 'Medium' ? 500 : 400 }}>{w}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Type scale table */}
                                                <div className="border border-border rounded-lg overflow-hidden mb-8">
                                                    <table className="w-full text-xs">
                                                        <thead>
                                                            <tr className="bg-[#2E2318] text-white">
                                                                {[t('Style', '樣式'), t('Family', '字體'), t('Size', '大小'), t('Weight', '字重'), t('Line Ht', '行高'), t('Usage', '用途')].map(h => (
                                                                    <th key={h} className="px-3 py-2.5 text-left font-medium">{h}</th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {typeScale.map((row, i) => (
                                                                <tr key={row.style} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                                    <td className="px-3 py-2 font-medium text-text-primary">{row.style}</td>
                                                                    <td className="px-3 py-2 text-text-secondary">{row.family}</td>
                                                                    <td className="px-3 py-2 font-bold text-[#E07A65] font-mono">{row.size}</td>
                                                                    <td className="px-3 py-2 text-text-secondary">{row.weight}</td>
                                                                    <td className="px-3 py-2 text-text-secondary font-mono">{row.lh}</td>
                                                                    <td className="px-3 py-2 text-text-secondary">{row.usage}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                {/* Live preview */}
                                                <div className="bg-white border border-border rounded-xl p-6 space-y-3">
                                                    <p className="text-xs text-text-secondary uppercase tracking-widest mb-4">{t('Live Preview', '字體預覽')}</p>
                                                    <p className="font-serif text-3xl text-text-primary" style={{ lineHeight: 1.2 }}>Show your mind some love.</p>
                                                    <p className="font-serif text-xl text-text-primary">Today's Journal</p>
                                                    <p className="font-serif text-lg text-text-secondary">How are you feeling today?</p>
                                                    <p className="text-sm text-text-secondary leading-relaxed">It sounds like today was really hard. That's okay — you showed up anyway.</p>
                                                    <p className="text-xs text-text-secondary">June 7, 2025 · Mood: Stressed</p>
                                                    <p className="font-mono text-xs text-text-secondary uppercase tracking-wider">This week you felt</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* ── Tokens ── */}
                                        {dsTab === 'tokens' && (
                                            <div className="space-y-10">
                                                {/* Spacing */}
                                                <div>
                                                    <p className="font-serif text-sm font-semibold text-text-primary mb-1">{t('Spacing — 8pt Grid', '間距 — 8pt 格線')}</p>
                                                    <p className="text-xs text-text-secondary mb-5 font-mono">space-1 → space-9</p>
                                                    <div className="flex items-end gap-3 flex-wrap">
                                                        {[
                                                            { val: 4,  token: 'space-1', use: t('Micro', '微間距') },
                                                            { val: 8,  token: 'space-2', use: t('Component', '元件內') },
                                                            { val: 12, token: 'space-3', use: t('Chip', 'Chip 邊距') },
                                                            { val: 16, token: 'space-4', use: t('Card', '卡片邊距') },
                                                            { val: 20, token: 'space-5', use: t('Screen', '頁面邊距') },
                                                            { val: 24, token: 'space-6', use: t('Section', '區塊間距') },
                                                            { val: 32, token: 'space-7', use: t('Large', '大間距') },
                                                            { val: 40, token: 'space-8', use: t('Safe top', '安全區上') },
                                                            { val: 48, token: 'space-9', use: t('Tab bar', '標籤列高') },
                                                        ].map(sp => (
                                                            <div key={sp.token} className="flex flex-col items-center gap-1">
                                                                <div className="bg-[#F9E8E0] border-2 border-[#E07A65] rounded" style={{ width: Math.max(sp.val * 2.5, 16), height: 24 }} />
                                                                <span className="text-[10px] font-bold text-[#E07A65] font-mono">{sp.val}px</span>
                                                                <span className="text-[9px] text-text-secondary">{sp.use}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Border Radius */}
                                                <div>
                                                    <p className="font-serif text-sm font-semibold text-text-primary mb-5">{t('Border Radius', '圓角')}</p>
                                                    <div className="flex flex-wrap gap-4">
                                                        {[
                                                            { r: 12,  label: 'r-12',  sub: t('Tags', '標籤') },
                                                            { r: 16,  label: 'r-16',  sub: t('Buttons', '按鈕') },
                                                            { r: 20,  label: 'r-20',  sub: t('Cards', '卡片') },
                                                            { r: 24,  label: 'r-24',  sub: t('Large card', '大卡片') },
                                                            { r: 28,  label: 'r-28',  sub: t('Modal', '彈窗') },
                                                            { r: 999, label: 'r-999', sub: t('Pills', '膠囊') },
                                                        ].map(item => (
                                                            <div key={item.label} className="flex flex-col items-center gap-2">
                                                                <div className="w-20 h-12 bg-[#FDFCE8] border-2 border-[#2E2318]" style={{ borderRadius: Math.min(item.r, 28) }} />
                                                                <p className="text-[11px] font-bold text-[#2E2318] font-mono">{item.label}</p>
                                                                <p className="text-[9px] text-text-secondary">{item.sub}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Grid */}
                                                <div>
                                                    <p className="font-serif text-sm font-semibold text-text-primary mb-1">{t('Layout Grid — iPhone 16 Pro', '版面格線 — iPhone 16 Pro')}</p>
                                                    <p className="text-xs text-text-secondary mb-4 font-mono">393 × 852px · 4 col · 20px margin · 16px gutter · ~76px col</p>
                                                    <div className="border border-border rounded-xl overflow-hidden">
                                                        <table className="w-full text-xs">
                                                            <tbody>
                                                                {[
                                                                    [t('Canvas', '畫布'),          '393 × 852px',  'iPhone 16 Pro'],
                                                                    [t('Screen margin', '頁面邊距'), '20px',         t('Left & right', '左右各 20px')],
                                                                    [t('Columns', '欄數'),          '4 col',        t('Primary grid', '主要格線')],
                                                                    [t('Gutter', '間格'),           '16px',         t('Between columns', '欄間距')],
                                                                    [t('Column width', '欄寬'),     '~76px',        '(393−40−48)÷4'],
                                                                    [t('Touch target', '觸控目標'),  '44×44px min',  'Apple HIG / WCAG 2.1'],
                                                                    [t('Status bar', '狀態列'),     '59px',         t('Incl. Dynamic Island', '含動態島')],
                                                                    [t('Tab bar', '標籤列'),        '82px',         t('Icons + labels', '圖示加標籤')],
                                                                ].map(([label, value, note], i) => (
                                                                    <tr key={label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                                        <td className="px-4 py-2.5 font-medium text-text-primary">{label}</td>
                                                                        <td className="px-4 py-2.5 font-bold text-[#E07A65] font-mono">{value}</td>
                                                                        <td className="px-4 py-2.5 text-text-secondary">{note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </FadeInSection>

                            {/* ===== Key Screens ===== */}
                            <FadeInSection>
                                <section className="py-8 md:py-12">
                                    <div className="max-w-2xl mx-auto">
                                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-2">
                                            {t('Key Screens', '主要畫面')}
                                        </h2>
                                        <p className="text-sm md:text-base text-text-secondary mb-10">
                                            {t('Each screen designed around a specific user need — from daily logging to crisis support.', '每個畫面皆圍繞特定用戶需求設計，從日常記錄到危機支援。')}
                                        </p>
                                        <div className="space-y-12">
                                            {[
                                                {
                                                    icon: <Heart className="w-4 h-4 text-[#E07A65]" />,
                                                    label: t('Onboarding & Mood Log', '引導與情緒記錄'),
                                                    desc: t('Landing sets an emotional tone with warm illustration. Mood Log offers 6 colour-coded emotion buttons with an AI journaling prompt.', '首頁透過溫暖插圖建立情感基調。情緒記錄提供 6 個色彩編碼情緒按鈕，並附有 AI 日記引導提示。'),
                                                    screens: [
                                                        { src: '/images/MindLog/Landing.png',  label: t('Landing', '首頁') },
                                                        { src: '/images/MindLog/MoodLog.png',  label: t('Mood Log', '情緒記錄') },
                                                    ],
                                                },
                                                {
                                                    icon: <CalendarDays className="w-4 h-4 text-[#E07A65]" />,
                                                    label: t('Calendar & Journal', '月曆與日記'),
                                                    desc: t('Calendar shows a full month of mood emojis at a glance. Tapping a date opens Journal Detail with AI reflection.', '月曆一眼呈現整月情緒 emoji，點擊日期開啟含 AI 反思的日記詳情。'),
                                                    screens: [
                                                        { src: '/images/MindLog/Calendar.png',      label: t('Calendar', '月曆') },
                                                        { src: '/images/MindLog/JournalDetail.png', label: t('Journal Detail', '日記詳情') },
                                                    ],
                                                },
                                                {
                                                    icon: <BarChart2 className="w-4 h-4 text-[#E07A65]" />,
                                                    label: t('Status & Support', '狀態分析與支援'),
                                                    desc: t('Status leads with AI weekly summary above charts. Distress detection triggers a warm Safety Popup that connects users to matched counselors.', 'Status 頁以 AI 週報摘要置頂，圖表在下。偵測到困擾時，安全彈窗引導用戶連結適配諮商師。'),
                                                    screens: [
                                                        { src: '/images/MindLog/Status.png',      label: t('Status', '狀態分析') },
                                                        { src: '/images/MindLog/SafetyPopup.png', label: t('Safety Popup', '安全彈窗') },
                                                    ],
                                                },
                                            ].map((group, gi) => (
                                                <div key={gi}>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        {group.icon}
                                                        <span className="text-sm font-mono text-[#E07A65]">{group.label}</span>
                                                    </div>
                                                    <p className="text-sm text-text-secondary mb-6">{group.desc}</p>
                                                    <div className="grid grid-cols-2 gap-6 md:gap-10">
                                                        {group.screens.map((item, i) => (
                                                            <div key={i} className="flex flex-col items-center">
                                                                <div className="relative w-fit mx-auto max-w-[48%] bg-gray-900 rounded-[2.2rem] p-1.25 shadow-xl">
                                                                    <div className="relative rounded-[1.9rem] overflow-hidden bg-black">
                                                                        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-4.5 bg-black rounded-full z-10 pointer-events-none" />
                                                                        <img src={item.src} alt={item.label} className="block max-w-full cursor-zoom-in" onClick={() => setLightboxImg(item.src)} />
                                                                        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full pointer-events-none" />
                                                                    </div>
                                                                </div>
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

                            {/* ===== AI Features ===== */}
                            <FadeInSection>
                                <section className="py-8 md:py-12 bg-gray-50">
                                    <div className="max-w-2xl mx-auto">
                                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-4">
                                            {t('AI Feature Design', 'AI 功能設計')}
                                        </h2>
                                        <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
                                            {t('AI integrated at three specific touchpoints, each solving a distinct UX problem — not added for novelty.', 'AI 整合於三個特定接觸點，每個都解決具體的 UX 問題，而非噱頭。')}
                                        </p>
                                        <div className="border border-border rounded-lg overflow-hidden">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="bg-[#2E2318] text-white">
                                                        {[t('Feature', '功能'), t('Problem It Solves', '解決的問題'), t('UI Implementation', 'UI 實作')].map(h => (
                                                            <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {[
                                                        { f: t('AI Journal Prompt', 'AI 日記引導'),    p: t("Users don't know how to start writing", '用戶不知從何寫起'),    i: t('Cream card + salmon accent after mood selection', '情緒選擇後出現鮭魚橘點綴奶油色卡片') },
                                                        { f: t('AI Weekly Summary', 'AI 週報摘要'),    p: t('Charts show data but not meaning', '圖表只顯示數據不給解釋'), i: t('Plain language card at top of Status page', 'Status 頁頂部易讀語言摘要卡') },
                                                        { f: t('AI Safety Detection', 'AI 安全偵測'), p: t("Users don't know when to seek help", '不知何時該求助'),        i: t('Warm modal triggered by negative language', '負面語言觸發溫暖確認彈窗') },
                                                        { f: t('AI Counselor Match', 'AI 諮商師配對'), p: t('Hard to know which counselor to choose', '不知道選哪位諮商師'), i: t('Recommendation based on recent journal entries', '根據近期日記內容給出推薦') },
                                                    ].map((row, i) => (
                                                        <tr key={row.f} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                            <td className="px-4 py-3 font-medium text-text-primary">{row.f}</td>
                                                            <td className="px-4 py-3 text-text-secondary">{row.p}</td>
                                                            <td className="px-4 py-3 text-[#2E2318]">{row.i}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="border-l-4 border-[#F5EEE8] pl-4 mt-6">
                                            <p className="text-sm text-text-secondary italic">
                                                {t("Note: All AI features are represented as UX design decisions in the prototype — focus is on how AI should feel from the user's perspective.", '備註：所有 AI 功能皆以 UX 設計決策呈現於原型中，重點在於從用戶視角出發，AI 應給予什麼樣的感受。')}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </FadeInSection>

                            {/* ===== Reflection ===== */}
                            <FadeInSection>
                                <section className="py-8 md:py-12">
                                    <div className="max-w-2xl mx-auto">
                                        <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-6">
                                            {t('Reflection', '反思與學習')}
                                        </h2>
                                        <div className="space-y-4 max-w-5xl">
                                            {[
                                                t('Mental health design requires balancing warmth with clarity. Rotating backgrounds per screen was simple but effective — creating visual variety without losing system cohesion.', '心理健康 App 設計需要在溫暖與清晰之間取得平衡。每個畫面輪替背景色是個簡單但有效的技巧，在維持系統一致性的同時創造視覺變化。'),
                                                t("The Safety Popup required the most careful thought — the copy, interaction model, and removing the close button were all deliberate to ensure users feel supported, not alarmed.", '安全彈窗需要最審慎的考量，文案、互動模式以及刻意省略關閉按鈕，都是為了確保用戶感到被支持而非驚嚇。'),
                                                t("With more time I'd run usability testing with the target demographic, design a personalised onboarding flow, and conduct an accessibility audit for colour contrast and VoiceOver compatibility.", '若有更多時間，我會對目標族群進行可用性測試、設計個人化引導流程，並針對色彩對比和 VoiceOver 進行無障礙稽核。'),
                                            ].map((text, i) => (
                                                <p key={i} className="text-sm md:text-base text-text-secondary leading-relaxed">{text}</p>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </FadeInSection>

                            {/* ===== Navigation ===== */}
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

                        </div>{/* end main content */}
                    </div>{/* end lg:flex */}
                </div>
            </PageTransition>
        </>
    );
}

export default MindLog;