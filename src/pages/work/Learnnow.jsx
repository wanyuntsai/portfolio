import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectNav from '../../components/ProjectNav';
import { FadeInSection, PageTransition } from "../../components/AnimatedSection";
import { useLanguage } from '../../context/LanguageContext';
import {
    Scale,
    Smartphone,
} from 'lucide-react';

function Learnnow() {
  const { t } = useLanguage();
  const [lightboxImage, setLightboxImage] = useState(null);
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
        { rootMargin: '0% 0% -50% 0%', threshold: 0.1 }
    );
    tocItems.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
    return () => observer.disconnect();
}, [tocItems]);

  const finalDesigns = [
    { src: "/images/LEARNNOW/JP Courses Page.png", alt: "JP Courses Page" },
    { src: "/images/CourseCard.png", alt: "Course Card" },
    { src: "/images/ExploreCourses.png", alt: "Explore" },
    { src: "/images/Saved.png", alt: "Saved" },
    { src: "/images/learnnow_dashboard.png", alt: "Dashboard" },
  ];

  const comparisonData = [
    {
      criteria: t('Save / Wishlist', '收藏 / 願望清單'),
      learnnow: { type: 'check' },
      coursera: { type: 'x' },
      udemy: { type: 'check' },
    },
    {
      criteria: t('Certificate', '證書'),
      learnnow: { type: 'check' },
      coursera: { type: 'check' },
      udemy: { type: 'check' },
    },
    {
      criteria: t('Category Navigation', '分類導航'),
      learnnow: { type: 'check', text: t('3-tier filter', '三層篩選') },
      coursera: { type: 'x', 
      text: t('Hard to discover via Explore', ' 難以透過 Explore 找到課程') },
      udemy: { type: 'x', text: t('3-tier filter, but cluttered', '三層篩選，但分類混亂') },
    },
    {
      criteria: t('Pricing', '定價'),
      learnnow: { type: 'neutral', text: t('Pay-per-course', '單課購買') },
      coursera: { type: 'neutral', text: t('Per-course + subscription', '單課 + 訂閱') },
      udemy: { type: 'neutral', text: t('Pay-per-course + subscription', '單課 + 訂閱') },
    },
    {
      criteria: t('Course Card Info', '課程卡片資訊'),
      learnnow: { type: 'neutral', text: t('Primary info visible; hover for details', '主要資訊直接可見，懸停顯示次要資訊') },
      coursera: { type: 'neutral', text: t('Requires click', '需點擊') },
      udemy: { type: 'neutral', text: t('Partially visible', '部分可見') },
    },
    {
      criteria: t('Relevant Results Only', '只顯示相關課程'),
      learnnow: { type: 'check', text: t('Only shows courses within selected category', '只顯示所選分類內的課程') },
      coursera: { type: 'x', text: t('May show unrelated content', '可能出現非相關課程') },
      udemy: { type: 'check', text: t('Only shows courses within selected category', '只顯示所選分類內的課程') },
    },
  ];

  const renderCell = (cell) => {
    if (cell.type === 'check') return (
      <div className="flex flex-col items-center gap-1">
        <span className="text-green-500 text-lg">✓</span>
        {cell.text && <span className="text-xs text-text-secondary text-center leading-tight">{cell.text}</span>}
      </div>
    );
    if (cell.type === 'x') return (
      <div className="flex flex-col items-center gap-1">
        <span className="text-red-400 text-lg">✗</span>
        {cell.text && <span className="text-xs text-text-secondary text-center leading-tight">{cell.text}</span>}
      </div>
    );
    if (cell.type === 'warn') return (
      <span className="text-xs text-amber-600 text-center leading-tight block">{cell.text}</span>
    );
    if (cell.type === 'partial') return (
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-text-secondary text-center leading-tight">{cell.text || 'Partial'}</span>
      </div>
    );
    return <span className="text-xs text-text-secondary text-center leading-tight block">{cell.text}</span>;
  };

  return (
    <>
      {/* ===== Progress Bar ===== */}
      <div className="fixed top-0 left-0 z-60 h-0.5 bg-[#305E9A] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }} />

      {/* ===== Back to Top ===== */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-10 h-10 bg-[#305E9A] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#305E9A]/80 transition-colors"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}

    <PageTransition>
    <div className="bg-brand-white pt-20">
      {/* ===== Breadcrumb ===== */}
      <nav className="max-w-7xl mx-auto px-5 md:px-16 xl:px-20 pt-8 md:pt-14">
        <div className="flex items-center gap-2 text-sm md:text-sm font-mono">
          <Link to="/work" className="text-brand-green hover:underline">
            {t('Work', '作品')}
          </Link>
          <span className="text-text-secondary">{'>'}</span>
          <span className="text-text-primary">LearnNow</span>
        </div>
      </nav>

      {/* ===== Header Section ===== */}
      <section className="max-w-7xl mx-auto px-5 md:px-16 xl:px-20 py-4 md:py-10">
        <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-12">

          {/* left：title & overview */}
          <div className="md:w-1/2 flex flex-col">
            <div className="flex flex-col gap-y-2">
              <h1 className="font-serif text-3xl md:text-5xl text-text-primary">LearnNow</h1>
              <p className="font-serif text-lg md:text-2xl text-text-secondary">
                {t('Designing a Save-for-Later Flow to Support Thoughtful Learning Decisions', '透過「收藏」流程設計，支持使用者進行更謹慎的學習決策。')}
              </p>
              <p className="pt-2 text-base text-text-secondary leading-relaxed">
              {t(
                `LearnNow is an e-learning platform offering a wide range of courses for users with diverse learning goals. This project focuses on simplifying the explore → save → return → enroll journey to reduce cognitive load and support flexible decision-making.`,
                `LearnNow 是一個線上學習平台，提供多元領域的課程內容。本專案聚焦於簡化「探索 → 收藏 → 回訪 → 報名」的學習決策流程，以降低認知負擔並支援使用者以自己的節奏做出決策。`
              )}
            </p>
            </div>

            {/* Tools & Role */}
            <div className="flex gap-8 md:gap-16 pt-4 md:pt-6">
              <div>
                <p className="font-serif text-sm md:text-lg text-text-primary mb-1">{t('Tools', '工具')}</p>
                <p className="font-mono text-sm text-text-secondary">Figma, Figma Make, Maze</p>
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

            {/* Figma */}
            <a
              href="https://www.figma.com/proto/lcpUzALs58TW5oWySQcRAj/Learnnow?node-id=1-3079&t=3M4AMwIGaUKTma75-1&scaling=min-zoom&content-scaling=fixed&page-id=1%3A2966&starting-point-node-id=1%3A3468"
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

          {/* right：img */}
          <div className="md:w-1/2 mt-2 md:mt-0">
            <img
              src="/images/learnnow_mkup1.png"
              alt="LearnNow Preview"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ===== Header / Body divider ===== */}
      <div className="max-w-7xl mx-auto px-5 md:px-16 xl:px-20">
        <hr className="border-t border-border" />
      </div>

      <div className="lg:flex lg:gap-16 max-w-7xl mx-auto px-5 md:px-16 xl:px-20">

      {/* ===== Table of Contents ===== */}
      <aside className="hidden lg:block w-70 shrink-0 mt-19">
        <p className="text-sm tracking-widest text-neutral-400 uppercase mb-3">Case Study</p>
        <div className={`sticky top-24 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto transition-opacity duration-500 ${showToc ? 'opacity-100' : 'opacity-0'}`}>
          <ul className="space-y-0.5">
            {tocItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-start w-full text-left py-1.5 transition-all duration-200 text-base leading-snug ${
                    activeId === item.id
                      ? 'border-l-2 border-[#305E9A] pl-3 font-medium text-neutral-900'
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
            <p className="text-sm font-medium text-neutral-800 mb-1">{t('More Work', '更多作品')}</p>
            <p className="text-sm text-neutral-500 mb-3">{t('Explore other case studies.', '瀏覽其他作品。')}</p>
            <Link to="/work" className="inline-flex items-center gap-1 text-sm font-mono text-[#305E9A] hover:underline">
              {t('View all work', '查看所有作品')} →
            </Link>
          </div>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <div className="flex-1 min-w-0">

      {/* ===== The Problem ===== */}
      <FadeInSection>
      <section className="py-8 md:py-12">
        <div className="max-w-2xl mx-auto md:mt-7">
          <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-6">{t('The Problem', '問題定義')}</h2>
          <div className="space-y-4 max-w-5xl">
            <p className="text-base text-text-secondary leading-relaxed">
              {t(
                'User drop-off in e-learning platforms is not only influenced by course quality, but also by the exploration experience. Excessive information and complex navigation increase the time and cognitive effort required to browse courses.',
                'E-learning 平台的使用者流失，除了課程本身的吸引力外，也與探索過程的使用體驗密切相關。過多的資訊與複雜的導覽結構，讓使用者在瀏覽課程時需要投入較高的時間與認知成本。'
              )}
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              {t(
                'At the same time, users often prefer to save and compare options before committing to a course. However, some platforms lack intuitive save and revisit mechanisms, forcing users to repeatedly search for courses or misuse the cart as a temporary storage tool.',
                '同時，使用者在選課時通常傾向先收藏與比較，再進一步做出報名決策。然而，部分平台缺乏直觀的收藏與回訪機制，迫使使用者反覆搜尋課程，或將課程加入購物車作為替代方案。'
              )}
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              {t(
                'Overall, current designs fail to support the natural progression from exploration to decision-making, creating unnecessary friction and negatively impacting user experience and conversion.',
                '整體而言，現有設計未能有效支援使用者從探索到決策的自然流程，導致決策過程中產生額外摩擦，進而影響使用體驗與轉換表現。'
              )}
            </p>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Solution ===== */}
      <FadeInSection>
      <section className="py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-6">{t('Solution', 'Solution')}</h2>
          <div className="space-y-4 max-w-5xl">
            <p className="text-base text-text-secondary leading-relaxed">
              {t(
                'I identified that users experience high cognitive load due to complex navigation during course exploration.',
                '我發現使用者在探索課程的過程中，因導覽系統複雜而產生較高的認知負擔。'
              )}
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              {t(
                `To address this, I simplified the navigation system to make browsing more intuitive and structured. I also introduced a flexible "browse → save → return → enroll" flow, allowing users to make decisions at their own pace rather than feeling pressured to commit during their first visit.`,
                `因此，我優先簡化整體導覽結構，使瀏覽過程更加直覺且有脈絡；同時設計「瀏覽 → 收藏 → 回來報名」的彈性流程，讓使用者可以依照自己的節奏做決定，而非在第一次瀏覽時就被迫立即報名。`
              )}
            </p>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Competitive Analysis ===== */}
      <FadeInSection>
      <section className="py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-4">{t('Competitive Analysis', '競品分析')}</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 pr-6 w-36"></th>
                  <th className="py-3 px-4 text-center align-middle">
                    <span className="font-serif text-base md:text-lg text-text-primary">LEARNOW</span>
                  </th>
                  <th className="py-3 px-4 text-center align-middle">
                    <img src="/images/coursera-logo.jpg" alt="Coursera" className="h-10 mx-auto object-contain" />
                  </th>
                  <th className="py-3 px-4 text-center align-middle">
                    <img src="/images/udemy-logo.png" alt="Udemy" className="h-12 mx-auto object-contain" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className={`border-b border-border ${i % 2 === 0 ? 'bg-gray-50/60' : 'bg-white'}`}>
                    <td className="py-4 pr-6 text-xs md:text-sm text-text-secondary font-medium align-middle">{row.criteria}</td>
                    <td className="py-4 px-4 text-center align-middle">{renderCell(row.learnnow)}</td>
                    <td className="py-4 px-4 text-center align-middle">{renderCell(row.coursera)}</td>
                    <td className="py-4 px-4 text-center align-middle">{renderCell(row.udemy)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== User Flow ===== */}
      <FadeInSection>
      <section className="py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-4">{t('User Flow', '使用者流程')}</h2>
          <div
            className="bg-[#f5f5f5] rounded-lg p-4 md:p-6 cursor-zoom-in"
            onClick={() => setLightboxImage({ src: '/images/Learnnow_UserFlow.png', alt: 'LearnNow User Flow', scroll: true })}
          >
            <img
              src="/images/Learnnow_UserFlow.png"
              alt="LearnNow User Flow"
              className="w-full max-h-125 object-contain hover:opacity-90 transition-opacity"
            />
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Wireframes ===== */}
      <FadeInSection>
      <section className="py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-2">{t('Wireframes', '低保真線框圖')}</h2>
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
            {[
              { src: '/images/LEARNNOW/Home.png', alt: 'Home' },
              { src: '/images/LEARNNOW/3-tiers Menu.png', alt: '3-tiers Menu' },
              { src: '/images/LEARNNOW/Japanese Language Course.png', alt: 'Japanese Language Course' },
              { src: '/images/LEARNNOW/Japanese Email Course-Detail Page.png', alt: 'Course Detail Page' },
              { src: '/images/LEARNNOW/Business Japanese Course.png', alt: 'Business Japanese Course' },
              { src: '/images/LEARNNOW/Saved Course.png', alt: 'Saved Course' },
              { src: '/images/LEARNNOW/My Learning.png', alt: 'My Learning' },
              { src: '/images/LEARNNOW/Checkout.png', alt: 'Checkout' },
              { src: '/images/LEARNNOW/Payment Success.png', alt: 'Payment Success' },
            ].map((img, i) => (
              <div
                key={i}
                className="snap-start shrink-0 cursor-zoom-in"
                onClick={() => setLightboxImage({ src: img.src, alt: img.alt })}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-64 w-auto rounded-lg border border-border object-cover hover:opacity-90 transition-opacity"
                />
                <p className="text-xs text-text-secondary mt-1 text-center font-mono">{img.alt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Design System ===== */}
      <FadeInSection>
      <section className="py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-6">{t('Design System', '設計系統')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="cursor-zoom-in"
              onClick={() => setLightboxImage({ src: '/images/LEARNNOW/Learnnow_Color.png', alt: 'Color System' })}
            >
              <img
                src="/images/LEARNNOW/Learnnow_Color.png"
                alt="Color System"
                className="w-full rounded-lg border border-border hover:opacity-90 transition-opacity"
              />
              <p className="text-xs text-text-secondary mt-2 text-center font-mono">{t('Color', '色彩系統')}</p>
            </div>
            <div
              className="cursor-zoom-in"
              onClick={() => setLightboxImage({ src: '/images/LEARNNOW/Learnnow_Typography.png', alt: 'Typography' })}
            >
              <img
                src="/images/LEARNNOW/Learnnow_Typography.png"
                alt="Typography"
                className="w-full rounded-lg border border-border hover:opacity-90 transition-opacity"
              />
              <p className="text-xs text-text-secondary mt-2 text-center font-mono">{t('Typography', '字體系統')}</p>
            </div>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Final Design ===== */}
      <FadeInSection>
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-4">{t('Final Design', '主要畫面')}</h2>
          <p className="text-base text-text-secondary leading-relaxed mb-8">
            {t('Key screens from the LearnNow platform.', 'LearnNow 平台的主要畫面。')}
          </p>

    <FadeInSection>
        {/* mobile：scroll */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 md:hidden">
          {finalDesigns.map((img, i) => (
            <div
              key={i}
              onClick={() => setLightboxImage(img)}
              className="snap-center shrink-0 w-64 cursor-pointer group"
            >
              <div className="overflow-hidden rounded-lg shadow-md bg-white border border-border">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-44 object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-xs text-center text-text-secondary mt-2">{img.alt}</p>
            </div>
          ))}
        </div>

        {/* desktop：Bento Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-4">
          <div onClick={() => setLightboxImage(finalDesigns[0])} className="col-span-2 group cursor-pointer">
            <div className="overflow-hidden rounded-lg shadow-md bg-white border border-border h-72">
              <img src="/images/LEARNNOW/JP Courses Page.png" alt="JP Courses Page" className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" />
            </div>
          </div>
          <div onClick={() => setLightboxImage(finalDesigns[1])} className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg shadow-md bg-white border border-border h-72">
              <img src="/images/CourseCard.png" alt="Course Card" className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" />
            </div>
          </div>
          <div onClick={() => setLightboxImage(finalDesigns[2])} className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg shadow-md bg-white border border-border h-44">
              <img src="/images/ExploreCourses.png" alt="Explore Courses" className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" />
            </div>
          </div>
          <div onClick={() => setLightboxImage(finalDesigns[3])} className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg shadow-md bg-white border border-border h-44">
              <img src="/images/Saved.png" alt="Saved" className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" />
            </div>
          </div>
          <div onClick={() => setLightboxImage(finalDesigns[4])} className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg shadow-md bg-white border border-border h-44">
              <img src="/images/learnnow_dashboard.png" alt="Dashboard" className="w-full h-90 object-cover object-top transition-transform duration-300 group-hover:scale-105" />
            </div>
          </div>
        </div>
    </FadeInSection>

        </div>
      </section>
      </FadeInSection>

      {/* ===== Usability Testing ===== */}
      <FadeInSection>
      <section className="py-8 md:py-12 ">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-2">{t('Usability Testing', '可用性測試')}</h2>
          <p className="text-base text-text-secondary mb-6">
            {t('Remote testing via Maze · 5 participants · 2 core tasks', 'Maze 遠端測試・5 位受測者・2 項核心任務')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <div className="border border-border rounded-xl p-5 bg-white">
              <p className="font-serif text-base md:text-lg text-text-primary mb-4">
                {t('Task 1 · Save a Course', '任務一　收藏課程')}
              </p>
              <div className="flex gap-6">
                <div>
                  <p className="font-serif text-2xl md:text-3xl font-bold text-[#305E9A] leading-none">100%</p>
                  <p className="text-xs font-mono text-text-secondary mt-1">{t('Success', '成功率')}</p>
                </div>
                <div>
                  <p className="text-3xl font-medium text-red-500 leading-none">31.9%</p>
                  <p className="text-xs font-mono text-text-secondary mt-1">{t('Misclick', '誤點率')}</p>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-xl p-5 bg-white">
              <p className="font-serif text-base md:text-lg text-text-primary mb-4">
                {t('Task 2 · Enroll in Saved Course', '任務二　報名已收藏課程')}
              </p>
              <div className="flex gap-6">
                <div>
                  <p className="font-serif text-2xl md:text-3xl font-bold text-[#305E9A] leading-none">100%</p>
                  <p className="text-xs font-mono text-text-secondary mt-1">{t('Success', '成功率')}</p>
                </div>
                <div>
                  <p className="text-3xl font-medium text-text-secondary leading-none">0%</p>
                  <p className="text-xs font-mono text-text-secondary mt-1">{t('Misclick', '誤點率')}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-base text-text-secondary leading-relaxed mb-4">
            {t(
              'Both tasks achieved a 100% success rate, but several design issues surfaced along the way. In Task 2, the grey menu color was misread as a disabled state, and some users defaulted to re-exploring from scratch rather than using the saved course entry point.',
              '兩項任務的成功率均為 100%，但過程中發現數個設計問題。任務二中，灰色選單色彩被誤認為停用狀態，部分使用者也因慣性操作模式而選擇重新探索，而非使用預設的收藏入口。'
            )}
          </p>
          <p className="text-base text-text-secondary leading-relaxed">
            {t(
              'The high misclick rate in Task 1 was largely driven by three participants who expected the homepage "Get Started!" CTA to lead to a course list. This page was not designed in the original scope — the 3-tier navigation was treated as the platform\'s primary discovery feature, and the need for an "All Courses" entry point was underestimated. During iteration, a static All Courses page was added, providing an additional path to the target course (Japanese Email Etiquette).',
              '任務一的誤點率偏高，主要來自三位測試者預期點擊主頁「Get Started!」CTA 後，會出現課程列表頁面。這個頁面在原始設計範圍內並未規劃，當時將三層篩選導航視為平台的主要探索功能，低估了「所有課程」入口的重要性。在迭代階段，我設計了一個靜態的 All Courses 頁面，提供另一條通往目標課程（Japanese Email Etiquette）的路徑。'
            )}
          </p>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Iterations ===== */}
      <FadeInSection>
      <section className="py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-2">{t('Iterations', '設計迭代')}</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-4 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white text-sm shrink-0">1</div>
                <div>
                  <p className="text-sm md:text-base text-text-primary font-medium">{t('Made important course info visible without hovering', '讓課程主要資訊不需懸停即可看見')}</p>
                  <p className="text-xs md:text-sm text-text-secondary mt-1">{t('Duration, rating, and price moved to always visible on the card. Hover now reveals secondary info only.', '課程簡介改為直接顯示在卡片上，懸停後才顯示次要資訊。')}</p>
                </div>
              </div>
              <div
                className="cursor-zoom-in"
                onClick={() => setLightboxImage({ src: '/images/LEARNNOW/Learnnow_iteration1.png', alt: 'Iteration 1' })}
              >
                <img
                  src="/images/LEARNNOW/Learnnow_iteration1.png"
                  alt="Iteration 1"
                  className="w-full rounded-lg border border-border hover:opacity-90 transition-opacity"
                />
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white text-sm shrink-0">2</div>
                <div>
                  <p className="text-sm md:text-base text-text-primary font-medium">{t('Revised "My Learning" menu colors', '修改「我的學習」選單顏色')}</p>
                  <p className="text-xs md:text-sm text-text-secondary mt-1">{t('Changed from grey to active color to signal interactivity', '從灰色字改為黑色字以表示可互動')}</p>
                </div>
              </div>
              <div
                className="cursor-zoom-in"
                onClick={() => setLightboxImage({ src: '/images/LEARNNOW/Learnnow_iteration2.png', alt: 'Iteration 2' })}
              >
                <img
                  src="/images/LEARNNOW/Learnnow_iteration2.png"
                  alt="Iteration 2"
                  className="w-full rounded-lg border border-border hover:opacity-90 transition-opacity"
                />
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white text-sm shrink-0">3</div>
                <div>
                  <p className="text-sm md:text-base text-text-primary font-medium">{t('Designed a static All Courses page', '新增靜態 All Courses 頁面')}</p>
                  <p className="text-xs md:text-sm text-text-secondary mt-1">{t('Added an entry point from the homepage CTA, providing an alternative path to reach the target course beyond the 3-tier navigation. Rapidly prototyped using Figma Make.', '新增從首頁 CTA 導入的入口，提供三層篩選導航以外的另一條路徑，讓使用者能更直覺地進入目標課程。使用 Figma Make 快速生成原型。')}</p>
                </div>
              </div>
              <div
                className="cursor-zoom-in"
                onClick={() => setLightboxImage({ src: '/images/LEARNNOW/Learnnow_iteration3.png', alt: 'Iteration 3' })}
              >
                <img
                  src="/images/LEARNNOW/Learnnow_iteration3.png"
                  alt="Iteration 3"
                  className="w-full rounded-lg border border-border hover:opacity-90 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Future Improvements ===== */}
      <FadeInSection>
      <section className="py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-2">{t('Future Improvements', '未來改善方向')}</h2>
          <p className="text-sm text-text-secondary mb-6">{t('Features identified through testing and analysis for future development.', '透過易用性測試與分析定義未來的設計功能。')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-dashed border-brand-green rounded-lg p-4 md:p-6">
              <Smartphone className="w-6 h-6 md:w-8 md:h-8 mb-3 text-[#1e3a5f]" />
              <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">{t('Mobile App', '行動應用程式')}</h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                {t('Track progress, manage schedules, and receive reminders on the go.', '隨時追蹤進度、管理課程並接收提醒。')}
              </p>
            </div>
            <div className="border border-dashed border-brand-green rounded-lg p-4 md:p-6">
              <Scale className="w-6 h-6 md:w-8 md:h-8 mb-3 text-[#1e3a5f]" />
              <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">{t('Compare Courses', '課程比較')}</h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                {t('Side-by-side comparison of saved courses — duration, price, ratings, and syllabus at a glance.', '並排比較已收藏的課程，一目了然地查看時長、價格、評分與課綱。')}
              </p>
            </div>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Reflection ===== */}
      <FadeInSection>
      <section className="py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-xl md:text-2xl text-text-primary mb-6">{t('Reflection', '反思')}</h2>
          <div className="space-y-4 max-w-5xl">
            <p className="text-base text-text-secondary leading-relaxed">
              {t(
                `During usability testing, I noticed that most users went straight for the "Get Started" CTA instead of Explore. Upon analysis, I realized this was because "Get Started" was more visually prominent than the Explore flow entry, and users naturally followed the visuals rather than the intended flow. Based on this insight, I added an All Courses page as the next step after "Get Started," aligning the flow with user expectations. This taught me that even a well-designed flow must consider visual hierarchy to match user behavior.`,
                `在可用性測試中，我發現大多數使用者直接點了首頁的「Get Started」CTA，跳過 Explore。分析後我意識到，這是因為「Get Started」比 Explore 流程入口更顯眼，使用者自然跟著視覺走，而非按我原先設計的流程。基於這個洞察，我新增了「所有課程」列表頁作為「Get Started」的下一步，讓流程更符合使用者心理預期。這讓我明白，即使流程設計正確，也必須確保視覺層級與使用者行為一致。`
              )}
            </p>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Navigation ===== */}
      <FadeInSection>
          <ProjectNav
            prev={{ href: '/work/vanlink', name: 'VanLink', subtitle: t('Vancouver transit app', '交通應用程式'), image: '/images/Vanlink/Vanlink_mkup.png' }}
            next={{ href: '/work/youtubemusic', name: 'YouTube Music', subtitle: t('App redesign', 'App 重新設計'), image: '/images/YouTubeMusic/youtubemkup.png' }}
          />
      </FadeInSection>

      </div>{/* end main content */}
      </div>{/* end lg:grid */}
    </div>
    </PageTransition>

      {/* ===== Lightbox Modal ===== */}
      {lightboxImage && (
        lightboxImage.scroll ? (
          <div
            className="fixed inset-0 bg-black/75 z-50 overflow-y-auto cursor-zoom-out"
            onClick={() => setLightboxImage(null)}
          >
            <div className="flex justify-center py-12.5">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="w-[90%] max-w-250 h-auto rounded-xl shadow-2xl bg-white"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        ) : (
          <div
            className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-8"
            onClick={() => setLightboxImage(null)}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        )
      )}
    </>
  )
}

export default Learnnow;
