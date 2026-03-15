import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FadeInSection, PageTransition } from "../../components/AnimatedSection";
import { useLanguage } from '../../context/LanguageContext';
import {
    Search,
    Lightbulb,
    Pencil,
    FlaskConical,
    RefreshCw,
    Scale,
    Smartphone,
    Globe,
    ArrowRight,
} from 'lucide-react';

function Learnnow() {
  const { t } = useLanguage();
  const [lightboxImage, setLightboxImage] = useState(null);
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

  const finalDesigns = [
    { src: "/images/CourseDetailed Page.png", alt: "Course Detail" },
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
      coursera: { type: 'neutral', text: t('Hard to discover via Explore', ' 難以透過 Explore 找到課程') },
      udemy: { type: 'neutral', text: t('3-tier filter, but cluttered', '三層篩選，但分類混亂') },
    },
    {
      criteria: t('Pricing', '定價'),
      learnnow: { type: 'neutral', text: t('Pay-per-course', '單課購買') },
      coursera: { type: 'neutral', text: t('Per-course + subscription', '單課 + 訂閱') },
      udemy: { type: 'neutral', text: t('Pay-per-course + subscription', '單課 + 訂閱') },
    },
    {
      criteria: t('Course Card Info', '課程卡片資訊'),
      learnnow: { type: 'check', text: t('Primary info visible; hover for details', '主要資訊直接可見，懸停顯示次要資訊') },
      coursera: { type: 'neutral', text: t('Requires hover / click', '需點擊') },
      udemy: { type: 'check', text: t('Partially visible', '部分可見') },
    },
    {
      criteria: t('Relevant Results Only', '只顯示相關課程'),
      learnnow: { type: 'check', text: t('Only shows courses within selected category', '只顯示所選分類內的課程') },
      coursera: { type: 'neutral', text: t('May show unrelated content', '可能出現非相關課程') },
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
    if (cell.type === 'x') return <span className="text-red-400 text-lg">✗</span>;
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
      <div className="fixed top-0 left-0 z-50 h-0.5 bg-[#8aacda] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }} />

      {/* ===== Back to Top ===== */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-10 h-10 bg-[#1e3a5f] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#1e3a5f]/80 transition-colors"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}

    <PageTransition>
    <div className="bg-white">

      {/* ===== Breadcrumb ===== */}
      <nav className="px-5 md:px-20 pt-3 md:pt-6">
        <div className="flex items-center gap-2 text-xs md:text-sm font-mono">
          <Link to="/work" className="text-brand-green hover:underline">
            {t('Work', '作品')}
          </Link>
          <span className="text-text-secondary">{'>'}</span>
          <span className="text-text-primary">LearnNow</span>
        </div>
      </nav>

      {/* ===== Header Section ===== */}
      <section className="px-5 md:px-20 py-4 md:py-10">
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">

          {/* left：title & overview */}
          <div className="md:w-1/2">
            <h1 className="font-serif text-3xl md:text-5xl text-text-primary">
              LearnNow
            </h1>
            <p className="font-serif text-md md:text-xl text-text-secondary mt-1">
              {t('Designing a Save-for-Later Flow to Support Thoughtful Learning Decisions', '透過「收藏」流程設計，支持使用者進行更謹慎的學習決策。')}
            </p>

            <p className="text-sm md:text-base text-text-secondary mt-3 md:mt-6 leading-relaxed">
              {t(
                'Learning decisions often require time and reflection. A Save-for-Later feature allows users to bookmark courses and return when they are ready to commit, reducing decision pressure while preserving purchase intent.',
                '學習決策往往需要時間與思考。課程的「收藏（Save）」功能讓使用者可以先收藏課程，並在準備好時再回來做出選擇，既能降低決策壓力，也能保留購買意圖。'
              )}
            </p>

            {/* Tools & Role */}
            <div className="flex gap-8 md:gap-16 mt-4 md:mt-8">
              <div>
                <p className="font-serif text-sm md:text-lg text-text-primary mb-1">{t('Tools', '工具')}</p>
                <p className="font-mono text-xs md:text-sm text-text-secondary">Figma, Maze</p>
              </div>
              <div>
                <p className="font-serif text-sm md:text-lg text-text-primary mb-1">{t('My Role', '職位')}</p>
                <p className="font-mono text-xs md:text-sm text-text-secondary">UX/UI Designer</p>
              </div>
              <div>
                <p className="font-serif text-sm md:text-lg text-text-primary mb-1">{t('Timeline', '時間軸')}</p>
                <p className="font-mono text-xs md:text-sm text-text-secondary">BCIT · {t('Term Project', '學期專案')}</p>
              </div>
            </div>

            {/* Figma CTA */}
            <a
              href="https://www.figma.com/design/lcpUzALs58TW5oWySQcRAj/Learnnow?node-id=1-5556&t=6reYDruvB9yHZS0z-1"
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

      {/* ===== Design Constraints & Trade-offs ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-5xl mx-auto md:mt-35">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-6">{t('Design Constraints & Trade-offs', '設計限制與取捨')}</h2>
          <div className="space-y-4 max-w-5xl">
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              {t(
                'Given the limited scope and timeline of this school project, I intentionally scoped the work to focus on the save-and-return workflow for a single course — a Japanese Business Email course — rather than designing the full platform experience, including views like "All Courses" or personalized recommendations.',
                '由於這個學校專案的時間與範圍有限，我將設計聚焦於單一課程（日文商業書信）的「收藏並回訪（save-and-return）」流程，而沒有設計完整平台的所有課程頁面，或個人化推薦功能（personalized recommendations）。'
              )}
            </p>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              {t(
                'This allowed me to spend more time on what mattered most: validating content hierarchy, ensuring interaction clarity, and making sure users felt confident and supported at key decision points.',
                '這樣做讓我能將時間投入在最重要的部分：驗證內容層級（content hierarchy）、確保互動清晰度（interaction clarity），並讓使用者在關鍵決策點上感到自信與支持。'
              )}
            </p>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              {t(
                'By narrowing the focus, I was able to deeply explore the core behavior this platform was built around, while still acknowledging the broader features that a complete e-learning platform would include.',
                '透過縮小專注範圍，我能深入探索這個平台核心行為的設計價值，同時也保留對完整平台功能的認知與考量。'
              )}
            </p>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Problem Definition ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">{t('Problem Definition', '問題定義')}</h2>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
            {t('Early exploration revealed two core issues:', '早期的研究揭示了兩個核心問題：')}
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-white rounded-lg p-4 md:p-6 border border-border">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <div className="flex items-start gap-3 md:flex-1">
                  <span className="text-[#1e3a5f] font-mono text-sm shrink-0 mt-0.5">01</span>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                    {t(
                      <span>Some e-learning platforms present <strong className="text-text-primary">dense, complex interfaces</strong> that overwhelm users during course discovery — adding unnecessary pressure and forcing learners to spend excessive time navigating back and forth before finding what they need.</span>,
                      <span>市面上的 e-learning platform 有些<strong className="text-text-primary">介面複雜</strong>，資訊量龐大看了眼花撩亂，可能造成使用者在探索課程時有多餘的壓力和必須花費大量時間來回探索課程。</span>
                    )}
                  </p>
                </div>
                <div
                  className="md:w-56 shrink-0 cursor-zoom-in"
                  onClick={() => setLightboxImage({ src: '/images/coursera_menu.png', alt: 'Coursera navigation' })}
                >
                  <img
                    src="/images/coursera_menu.png"
                    alt="Coursera navigation example"
                    className="w-full rounded-lg border border-border object-cover"
                  />
                  <p className="text-xs text-text-secondary mt-1 text-center font-mono">Complicated Menu</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-6 border border-border">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <div className="flex items-start gap-3 md:flex-1">
                  <span className="text-[#1e3a5f] font-mono text-sm shrink-0 mt-0.5">02</span>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                    {t(
                      <span>Learners typically browse and compare across platforms before committing to enrollment. Yet most competitors offer <strong className="text-text-primary">no save functionality</strong> — only a direct purchase path — leaving no room for this natural, deliberate decision-making process.</span>,
                      <span>消費者通常傾向於大方向探索並比較不同平台，深思熟慮後才會決定報名課程，而競品中存在<strong className="text-text-primary">沒有 save 功能</strong>、只有直接購買課程的選項，無法支援這個自然的決策過程。</span>
                    )}
                  </p>
                </div>
                <div
                  className="md:w-56 shrink-0 cursor-zoom-in"
                  onClick={() => setLightboxImage({ src: '/images/coursera_enroll.png', alt: 'Coursera enroll flow' })}
                >
                  <img
                    src="/images/coursera_enroll.png"
                    alt="Coursera enroll flow example"
                    className="w-full rounded-lg border border-border object-cover"
                  />
                  <p className="text-xs text-text-secondary mt-1 text-center font-mono">Without Save</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm md:text-base text-text-secondary leading-relaxed">
            {t(
              'The problem was not a missing feature — it was a mismatch between what the interface communicated and what users were trying to do.',
              '問題不在於缺少功能，而是介面傳達的訊息與使用者想做的事之間出現了落差。'
            )}
          </p>
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
              <div className="w-12 h-12 bg-[#8aacda]/20 rounded-full flex items-center justify-center mb-2">
                <Search className="w-5 h-5 text-[#1e3a5f]" />
              </div>
              <p className="text-sm font-medium text-text-primary">{t('Research', '研究')}</p>
            </div>
            <div className="hidden md:block text-text-secondary">→</div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#8aacda]/20 rounded-full flex items-center justify-center mb-2">
                <Lightbulb className="w-5 h-5 text-[#1e3a5f]" />
              </div>
              <p className="text-sm font-medium text-text-primary">{t('Define', '定義')}</p>
            </div>
            <div className="hidden md:block text-text-secondary">→</div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#8aacda]/20 rounded-full flex items-center justify-center mb-2">
                <Pencil className="w-5 h-5 text-[#1e3a5f]" />
              </div>
              <p className="text-sm font-medium text-text-primary">{t('Design', '設計')}</p>
            </div>
            <div className="hidden md:block text-text-secondary">→</div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#8aacda]/20 rounded-full flex items-center justify-center mb-2">
                <FlaskConical className="w-5 h-5 text-[#1e3a5f]" />
              </div>
              <p className="text-sm font-medium text-text-primary">{t('Test', '測試')}</p>
            </div>
            <div className="hidden md:block text-text-secondary">→</div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#8aacda]/20 rounded-full flex items-center justify-center mb-2">
                <RefreshCw className="w-5 h-5 text-[#1e3a5f]" />
              </div>
              <p className="text-sm font-medium text-text-primary">{t('Iterate', '迭代')}</p>
            </div>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Research & Key Insights ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-6">{t('Research & Key Insights', '研究與關鍵洞察')}</h2>
          <div className="bg-white rounded-lg p-4 md:p-6 border border-border max-w-5xl">
            <p className="font-mono text-xs text-[#1e3a5f] mb-2">01</p>
            <h3 className="font-serif text-base md:text-lg text-text-primary mb-3">{t('Desk Research', '桌面研究')}</h3>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              {t(
                'I reviewed platforms such as Coursera and Udemy to understand how course cards, saving behaviors, and browsing structures are commonly implemented.',
                '我研究了 Coursera 和 Udemy，以了解課程卡片、收藏行為和瀏覽結構的常見實作方式。'
              )}
            </p>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Key Insight ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-4 md:py-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#f0f5fb] rounded-lg p-4 md:p-6 border-l-4 border-[#1e3a5f]">
            <p className="font-mono text-xs text-[#1e3a5f] mb-2">{t('Key Insight', '關鍵洞察')}</p>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              {t(
                'Many learners report that these platforms display too much content or unrelated courses, making exploration overwhelming and decision-making harder.',
                '使用者反映，平台資訊量過大或出現非相關課程時，會在探索課程的過程中造成壓力與認知負荷。'
              )}
            </p>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Competitive Analysis ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">{t('Competitive Analysis', '競品分析')}</h2>

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

      {/* ===== Design Action ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-6">{t(' Design Action', '設計執行')}</h2>

          <div className="space-y-4">
            {[
              {
                insight: t('Existing platforms overwhelm users with irrelevant content, making course discovery stressful.', '現有平台常出現非相關課程或資訊過載，導致使用者在探索階段感到壓力與挫折。'),
                action: t('Designed a 3-tier filter that only surfaces courses within the selected category, keeping results focused.', '設計三層篩選器，確保搜尋結果僅顯示相關課程，減少冗餘資訊，維持介面簡潔。'),
              },
              {
                insight: t('Key course info on platforms like Coursera requires hover or extra clicks, slowing down comparison.', '在 Coursera 等平台上，課程卡片的關鍵資訊需要點擊或懸停才能看到，增加了使用者反覆導覽的時間成本。'),
                action: t('Made core details (duration, price, rating) visible directly on the card; hover reveals secondary info only.', '將核心資訊（時長、價格、評分）設定為直接可見，懸停僅顯示次要資訊，讓使用者能更快速進行初步篩選。'),
              },
              {
                insight: t('Platforms like Coursera lack a clear save flow, pushing users to enroll before they\'re ready.', '部分平台（如 Coursera）缺乏直觀的收藏功能，迫使使用者在尚未準備好時就進入報名流程。'),
                action: t('Positioned Save as a primary action throughout, enabling a "save now, decide later" browsing pattern.', '將「收藏」設為全流程的核心行為，讓使用者能安心「先儲存、後決定」，符合反覆比較的瀏覽習慣。'),
              },
            ].map((item, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-6 items-center bg-white rounded-lg p-4 md:p-6 border border-border">
                <div>
                  <p className="font-mono text-xs text-amber-600 mb-2">{t('Insight', '洞察')}</p>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{item.insight}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#1e3a5f] hidden md:block shrink-0" />
                <div>
                  <p className="font-mono text-xs text-[#1e3a5f] mb-2">{t('Design Action', '設計行動')}</p>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Core Flow & IA ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">{t('Core Flow & IA', '核心流程與資訊架構')}</h2>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-3">
            {t('The primary flow was designed as:', '主要流程設計如下：')}
          </p>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {[t('Home', '首頁'), t('Browse', '瀏覽'), t('Course Detail', '課程詳情'), t('Save', '收藏'), t('Enroll', '報名'), t('Dashboard', '儀表板')].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-2">
                <span className="bg-[#8aacda]/20 text-[#1e3a5f] text-xs md:text-sm font-mono px-3 py-1.5 rounded-lg">{step}</span>
                {i < arr.length - 1 && <span className="text-[#1e3a5f] text-sm">→</span>}
              </div>
            ))}
          </div>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-5 italic">
            {t(
              'Users can also enter from the Dashboard — returning to a saved course and enrolling directly.',
              '使用者也可以從儀表板進入，直接回到已收藏的課程並報名。'
            )}
          </p>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
            {t(
              'The goal was to make it easy to pause and come back — not to rush users toward enrollment.',
              '目標是讓使用者可以隨時暫停並返回，而不是急著推動他們報名。'
            )}
          </p>
          <div className="bg-[#f5f5f5] rounded-lg p-4 md:p-6">
            <img
              src="/images/Learnnow_UserFlow.png"
              alt="LearnNow User Flow"
              className="w-full max-h-80 object-contain"
            />
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Wireframes ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-2">{t('Wireframes', '低保真線框圖')}</h2>
          <p className="text-sm text-text-secondary mb-6 font-mono">{t('Click to enlarge', '點擊放大')}</p>
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

      {/* ===== Design System & Consistency ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-6">{t('Design System & Consistency', '設計系統與一致性')}</h2>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-4">
            {t('The visual style was kept simple and consistent:', '視覺風格保持簡單一致：')}
          </p>
          <ul className="space-y-2 mb-6">
            {[
              t('Soft blue tones to keep the browsing experience low-pressure', '柔和的藍色調，讓瀏覽體驗不帶壓力'),
              t('High contrast for primary actions so users know what to click', '主要操作使用高對比，讓使用者清楚知道可以點哪裡'),
              t('Consistent spacing and type sizing to make content easy to scan', '一致的間距與字級，讓內容容易快速掃讀'),
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm md:text-base text-text-secondary">
                <span className="text-[#1e3a5f] mt-1 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed">
            {t(
              'Components like buttons, course cards, and filters were designed to be reused across pages, making it easier to extend the platform later.',
              '按鈕、課程卡片和篩選器等元件都設計為可跨頁重複使用，方便日後擴展平台。'
            )}
          </p>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Final Design ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">{t('Final Design', '主要畫面')}</h2>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-8">
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
              <div className="overflow-hidden rounded-lg shadow-md bg-white">
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
            <div className="overflow-hidden rounded-lg shadow-md bg-white h-72">
              <img src="/images/CourseDetailed Page.png" alt="Course Detail" className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" />
            </div>
          </div>
          <div onClick={() => setLightboxImage(finalDesigns[1])} className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg shadow-md bg-white h-72">
              <img src="/images/CourseCard.png" alt="Course Card" className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" />
            </div>
          </div>
          <div onClick={() => setLightboxImage(finalDesigns[2])} className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg shadow-md bg-white h-44">
              <img src="/images/ExploreCourses.png" alt="Explore Courses" className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" />
            </div>
          </div>
          <div onClick={() => setLightboxImage(finalDesigns[3])} className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg shadow-md bg-white h-44">
              <img src="/images/Saved.png" alt="Saved" className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" />
            </div>
          </div>
          <div onClick={() => setLightboxImage(finalDesigns[4])} className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg shadow-md bg-white h-44">
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
      <section className="px-5 md:px-20 py-8 md:py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">{t('Usability Testing', '可用性測試')}</h2>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              <span className="font-medium text-text-primary">{t('Testing Scope: ', '測試範圍：')}</span>
              {t('This test focused on validating two core tasks within the Japanese language course flow. Broader features like course catalog and search were outside the scope for this phase.', '本次測試專注於驗證日語課程流程中的兩個核心任務。課程目錄和搜尋等更廣泛的功能不在本階段的測試範圍內。')}
            </p>
          </div>

          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
            {t('Tested with 5 participants on Maze.', '使用 Maze 進行，共 5 位受測者。')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Task 1 */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-[#8aacda]/20 px-4 py-3 border-b border-border">
                <h3 className="font-serif text-base md:text-lg text-text-primary">{t('Task 1: Save a Course', '任務一：收藏課程')}</h3>
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-4">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-brand-green">100%</p>
                    <p className="text-xs text-text-secondary">{t('Success', '成功率')}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-brand-green">0%</p>
                    <p className="text-xs text-text-secondary">{t('Drop-off', '放棄率')}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-amber-500">31.9%</p>
                    <p className="text-xs text-text-secondary">{t('Misclick', '誤點率')}</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs md:text-sm text-text-secondary leading-relaxed">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <p>{t('Course card only showed name, price, rating, and duration — ', '課程卡片僅顯示名稱、價格、評分與時長 — ')}<span className="font-medium text-text-primary">{t('course description and other details required hover', '課程描述等資訊需懸停才能看見')}</span>{t(', leaving users wanting more context upfront', '，測試者希望一開始就能看到更多資訊')}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <p>{t('Most participants first clicked the homepage "Get Started" CTA — but with ', '多數測試者第一步點擊首頁「Get Started」CTA — 但由於')}<span className="font-medium text-text-primary">{t('no All Courses page in the prototype', '原型中未設計對應的課程列表頁')}</span>{t(', they were redirected unexpectedly and felt disoriented', '，點擊後未被導向預期頁面，感到困惑')}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <p>{t('Some participants clicked into the ', '部分測試者直接點擊進入')}<span className="font-medium text-text-primary">{t('enrollment and checkout flow', '報名與結帳流程')}</span>{t(' instead of saving — and only realized the task was incomplete midway through', '，而非收藏課程，直到流程中途才發現任務尚未完成')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Task 2 */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-[#8aacda]/20 px-4 py-3 border-b border-border">
                <h3 className="font-serif text-base md:text-lg text-text-primary">{t('Task 2: Enroll in Saved Course', '任務二：報名已收藏課程')}</h3>
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-4">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-brand-green">100%</p>
                    <p className="text-xs text-text-secondary">{t('Success', '成功率')}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-brand-green">0%</p>
                    <p className="text-xs text-text-secondary">{t('Drop-off', '放棄率')}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-brand-green">0%</p>
                    <p className="text-xs text-text-secondary">{t('Misclick', '誤點率')}</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs md:text-sm text-text-secondary leading-relaxed">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <p>{t('Grey menu color was perceived as ', '灰色選單顏色被視為')}<span className="font-medium text-text-primary">{t('disabled/inactive', '停用/不可互動')}</span></p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <p>{t('One user navigated via "Explore" instead of "My Learning" — ', '一位使用者透過「探索」而非「我的學習」進行導航 — ')}<span className="font-medium text-text-primary">{t('familiar patterns overrode new shortcuts', '熟悉的操作模式覆蓋了新的捷徑')}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-red-200 bg-red-50 rounded-lg p-4">
              <h4 className="font-serif text-sm md:text-base text-text-primary mb-3 flex items-center gap-2">
                <span className="text-red-400">✗</span> {t('Design Issues', '設計問題')}
              </h4>
              <ul className="space-y-2 text-xs md:text-sm text-text-secondary">
                <li>• {t('Course description and secondary info hidden behind hover — users wanted more context visible upfront without extra interaction', '課程描述與次要資訊藏於 hover 之後 — 測試者希望在不需額外操作的情況下，第一時間看到更多資訊')}</li>
                <li>• {t('Grey menu color read as "disabled"', '灰色選單顏色被解讀為「停用」')}</li>
              </ul>
            </div>
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <h4 className="font-serif text-sm md:text-base text-text-primary mb-3 flex items-center gap-2">
                <span className="text-blue-400">○</span> {t('Scope Gaps', '範圍缺口')}
              </h4>
              <ul className="space-y-2 text-xs md:text-sm text-text-secondary">
                <li>• {t('Homepage "Get Started" CTA had no destination — no All Courses page was designed within the project scope', '首頁「Get Started」CTA 無對應頁面 — 所有課程列表頁不在此次專案範圍內')}</li>
                <li>• {t('Some users entered enrollment / checkout flow instead of saving — indicating "Save" action needed stronger visual distinction from "Enroll"', '部分測試者進入報名 / 結帳流程而非收藏 — 顯示「收藏」需與「報名」有更清晰的視覺區隔')}</li>
              </ul>
              <p className="text-xs text-text-secondary mt-3 italic">
                {t('These validate user expectations and inform future roadmap.', '這些發現驗證了使用者的期望，並為未來的路線圖提供參考。')}
              </p>
            </div>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Iterations & Impact ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-2">{t('Iterations & Impact', '設計迭代與成效')}</h2>
          <p className="text-sm text-text-secondary mb-6">{t('Changes made based on design issues identified in testing.', '根據測試中發現的設計問題所做的修改。')}</p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 bg-white rounded-lg p-4 border border-border">
              <div className="w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white text-sm shrink-0">1</div>
              <div>
                <p className="text-sm md:text-base text-text-primary font-medium">{t('Made course card info visible without hovering', '讓課程卡片資訊不需懸停即可看見')}</p>
                <p className="text-xs md:text-sm text-text-secondary mt-1">{t('Duration, rating, and price moved to always visible on the card. Hover now reveals secondary info only.', '時長、評分與價格改為直接顯示在卡片上；懸停後才顯示次要資訊。')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white rounded-lg p-4 border border-border">
              <div className="w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white text-sm shrink-0">2</div>
              <div>
                <p className="text-sm md:text-base text-text-primary font-medium">{t('Revised "My Learning" menu colors', '修改「我的學習」選單顏色')}</p>
                <p className="text-xs md:text-sm text-text-secondary mt-1">{t('Changed from grey to active color to signal interactivity', '從灰色改為活躍色彩以表示可互動')}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1e3a5f]/5 rounded-lg p-4 md:p-6 border border-[#1e3a5f]/10">
            <p className="font-mono text-xs text-[#1e3a5f] mb-3">{t('After Iterations', '迭代後')}</p>
            <ul className="space-y-2">
              {[
                t('Course cards became easier to scan — key info visible without hovering', '課程卡片更容易瀏覽，關鍵資訊不需懸停即可看見'),
                t('The menu felt interactive, reducing navigation hesitation', '選單感覺可互動，減少導航時的猶豫'),
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-text-secondary">
                  <span className="text-brand-green mt-0.5 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed mt-4 italic">
              {t('Small UI adjustments, grounded in testing insights, resulted in clearer decision-making and a more predictable experience.', '基於測試洞察的小型 UI 調整，帶來了更清晰的決策和更可預測的體驗。')}
            </p>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Future Improvements ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-2">{t('Future Improvements', '未來改善方向')}</h2>
          <p className="text-sm text-text-secondary mb-6">{t('Features identified through testing and analysis for future development.', '透過測試與分析所識別的未來開發功能。')}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-dashed border-brand-green rounded-lg p-4 md:p-6">
              <Scale className="w-6 h-6 md:w-8 md:h-8 mb-3 text-[#1e3a5f]" />
              <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">{t('Compare Courses', '課程比較')}</h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                {t('Side-by-side comparison of saved courses — duration, price, ratings, and syllabus at a glance.', '並排比較已收藏的課程，一目了然地查看時長、價格、評分與課綱。')}
              </p>
            </div>
            <div className="border border-dashed border-brand-green rounded-lg p-4 md:p-6">
              <Smartphone className="w-6 h-6 md:w-8 md:h-8 mb-3 text-[#1e3a5f]" />
              <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">{t('Mobile App', '行動應用程式')}</h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                {t('Track progress, manage schedules, and receive reminders on the go.', '隨時追蹤進度、管理時程並接收提醒。')}
              </p>
            </div>
            <div className="border border-dashed border-brand-green rounded-lg p-4 md:p-6">
              <Globe className="w-6 h-6 md:w-8 md:h-8 mb-3 text-[#1e3a5f]" />
              <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">{t('Course Catalog', '課程目錄')}</h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                {t('Full browsable catalog with search and filters — addressing the homepage CTA expectation.', '完整可瀏覽的目錄，含搜尋和篩選功能，回應首頁 CTA 的使用者期望。')}
              </p>
            </div>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Reflection ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-6">{t('Reflection', '反思')}</h2>
          <div className="space-y-4 max-w-5xl">
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              {t(
                'This project showed me how much visual hierarchy shapes what users do — even when the logical flow is correct. If the interface draws attention to the wrong thing, users follow the visual cue, not the intended path.',
                '這個專案讓我看到視覺層級對使用者行為的影響有多深——即使邏輯流程是對的，如果介面把注意力引導到錯誤的地方，使用者就會跟著視覺走，而不是預設的路徑。'
              )}
            </p>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              {t(
                'I also learned to make design decisions based on what I actually observed, not what I assumed — and to work honestly within project constraints rather than designing for an ideal scenario.',
                '我也學到要根據實際觀察到的行為做設計決策，而不是憑假設，並且在專案限制內誠實地設計，而不是為理想情境設計。'
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
            <Link to="/work/cloudair" className="text-brand-green font-mono text-xs md:text-sm hover:underline">
              {t('Next Project →', '下一個專案 →')}
            </Link>
          </div>
        </div>
      </section>
      </FadeInSection>

    </div>
    </PageTransition>

      {/* ===== Lightbox Modal ===== */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-8"
          onClick={() => setLightboxImage(null)}
        >
          <div className="max-w-2xl w-full max-h-[70vh] rounded-xl overflow-hidden shadow-2xl">
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Learnnow;
