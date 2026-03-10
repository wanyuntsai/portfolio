import { useState } from "react";
import { Link } from "react-router-dom";
import { FadeInSection, PageTransition } from "../../components/AnimatedSection";
import { useLanguage } from '../../context/LanguageContext';
import {
    Search,
    EyeOff,
    Bookmark,
    BookmarkX,
    BarChart3,
    TrendingDown,
    Lightbulb,
    Pencil,
    FlaskConical,
    RefreshCw,
    FolderTree,
    LayoutDashboard,
    Globe,
    Scale,
    Smartphone
} from 'lucide-react';

function Learnnow() {
  const { t } = useLanguage();
  const [lightboxImage, setLightboxImage] = useState(null);

  const finalDesigns = [
    { src: "/images/CourseDetailed Page.png", alt: "Course Detail" },
    { src: "/images/CourseCard.png", alt: "Course Card" },
    { src: "/images/ExploreCourses.png", alt: "Explore" },
    { src: "/images/Saved.png", alt: "Saved" },
    { src: "/images/MyLearning.png", alt: "My Learning" },
  ];

  return (
    <>
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

          {/* left：title & info */}
          <div className="md:w-1/2">
            <h1 className="font-serif text-3xl md:text-5xl text-text-primary">
              LearnNow
            </h1>
            <p className="font-serif text-lg md:text-2xl text-text-secondary mt-1">
              {t('Online Learning Platform', '線上學習平台')}
            </p>

            <p className="text-sm md:text-base text-text-secondary mt-3 md:mt-6 leading-relaxed">
              {t('An online learning platform that helps learners browse, save, and enroll in courses with clarity and confidence.', '一個線上學習平台，協助學習者以清晰自信的方式瀏覽、收藏並報名課程。')}
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

      {/* ===== The Problem ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">{t('The Problem', '問題定義')}</h2>

          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
            {t('Online learning platforms push for immediate conversion, but learners need time to explore and compare before committing.', '線上學習平台急於推動立即購買，但學習者在決策前需要時間探索與比較。')}
          </p>

          {/* pain points */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
            <div className="p-3 md:p-4 text-center">
              <EyeOff className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-amber-600" />
              <p className="text-xs md:text-sm text-text-primary font-medium">{t('Hard to discover', '難以發現')}</p>
            </div>
            <div className="p-3 md:p-4 text-center">
              <BookmarkX className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-amber-600" />
              <p className="text-xs md:text-sm text-text-primary font-medium">{t('No save feature', '沒有收藏功能')}</p>
            </div>
            <div className="p-3 md:p-4 text-center">
              <TrendingDown className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-amber-600" />
              <p className="text-xs md:text-sm text-text-primary font-medium">{t('Unclear progress', '進度不明確')}</p>
            </div>
          </div>

          {/* Design Goal */}
          <div className="bg-[#f5f5f5] rounded-lg p-4 md:p-6">
            <p className="font-mono text-xs md:text-sm text-[#1e3a5f] mb-3">{t('Design Goal', '設計目標')}</p>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 md:px-4 md:py-3 flex-1 justify-center">
                <Search className="w-5 h-5 md:w-6 md:h-6 text-[#1e3a5f]" />
                <span className="text-xs md:text-sm font-medium">{t('Browse with Ease', '輕鬆瀏覽')}</span>
              </div>
              <span className="text-[#1e3a5f] text-lg md:text-xl rotate-90 md:rotate-0">→</span>
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 md:px-4 md:py-3 flex-1 justify-center">
                <Bookmark className="w-5 h-5 md:w-6 md:h-6 text-[#1e3a5f]" />
                <span className="text-xs md:text-sm font-medium">{t('Save & Compare', '收藏與比較')}</span>
              </div>
              <span className="text-[#1e3a5f] text-lg md:text-xl rotate-90 md:rotate-0">→</span>
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 md:px-4 md:py-3 flex-1 justify-center">
                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-[#1e3a5f]" />
                <span className="text-xs md:text-sm font-medium">{t('Track Progress', '追蹤進度')}</span>
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

      {/* ===== Competitive Analysis ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">{t('Competitive Analysis', '競品分析')}</h2>

          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
            {t('I analyzed', '我分析了')}<img
        src="/images/coursera-logo.jpg"
        alt="Coursera"
        className="h-8 md:h-9 inline-block mx-2 hover:scale-110 transition-transform"
    />
           {t('and', '和')}
           <img
        src="/images/udemy-logo.png"
        alt="Udemy"
        className="h-10 md:h-14 inline-block mx-2 hover:scale-110 transition-transform"
    />

            {t('to understand how existing platforms handle course discovery and user retention.', '以了解現有平台如何處理課程發現與使用者留存。')}
        </p>


          {/* compare grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Coursera */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-white px-4 py-3 border-b border-border">
                <img
        src="/images/coursera-logo.jpg"
        alt="Coursera"
        className="h-10 md:h-14  scale-70 -ml-3"
    />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-lg">✗</span>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{t('No save feature', '沒有收藏功能')}</p>
                    <p className="text-xs text-text-secondary mt-1">{t("Users can't compare courses over time", '使用者無法長期比較課程')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-lg">✗</span>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{t('Complex navigation', '複雜的導航')}</p>
                    <p className="text-xs text-text-secondary mt-1">{t('Mixed organizing principles increase cognitive load', '混合的組織原則增加認知負擔')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Udemy */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-white px-4 py-3 border-b border-border">
           <img
        src="/images/udemy-logo.png"
        alt="Udemy"
        className="h-10 md:h-14 w-auto object-contain"
    />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-lg">✗</span>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{t('Inconsistent structure', '結構不一致')}</p>
                    <p className="text-xs text-text-secondary mt-1">{t('Same course appears under multiple categories', '同一課程出現在多個分類下')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-lg">✗</span>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{t('Misleading progress', '誤導性的進度')}</p>
                    <p className="text-xs text-text-secondary mt-1">{t("Lecture count doesn't reflect actual learning", '講座數量無法反映實際學習狀況')}</p>
                  </div>
                </div>
              </div>
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

          {/* 3 cols layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-[#8aacda]/20 rounded-lg p-4 md:p-6 text-center">
              <FolderTree className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 text-[#1e3a5f]" />
              <p className="text--[#1e3a5f] font-mono text-xs mb-2">01</p>
              <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">
                {t('Three-Tier Navigation', '三層導航架構')}
              </h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                {t('Category → Subject → Topic.', '類別 → 主題 → 子主題。')} <br />{t('Clear hierarchy so users always know where they are.', '清晰的層級讓使用者隨時知道自己的位置。')}
              </p>
            </div>

            <div className="bg-[#8aacda]/20 rounded-lg p-4 md:p-6 text-center">
              <Bookmark className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 text-[#1e3a5f]" />
              <p className="text-[#1e3a5f] font-mono text-xs mb-2">02</p>
              <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">
                {t('Save & Compare', '收藏與比較')}
              </h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                {t('Bookmark courses without pressure. Compare options and buy when ready.', '無壓力地收藏課程，比較選項後再決定購買。')}
              </p>
            </div>

            <div className="bg-[#8aacda]/20 rounded-lg p-4 md:p-6 text-center">
              <LayoutDashboard className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 text-[#1e3a5f]" />
              <p className="text-[#1e3a5f] font-mono text-xs mb-2">03</p>
              <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">
                {t('Progress Dashboard', '進度儀表板')}
              </h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                {t('Visual progress bars, saved courses, and certificates in one place.', '視覺化進度條、已收藏課程與證書集中在同一頁面。')}
              </p>
            </div>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== User Flow ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">{t('User Flow', '使用者流程')}</h2>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
            {t('The complete journey from discovery to enrollment.', '從發現課程到完成報名的完整旅程。')}
          </p>

          <div className="bg-[#f5f5f5] rounded-lg p-4 md:p-6">
            <img
              src="/images/Learnnow_UserFlow.png"
              alt="LearnNow User Flow"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Final Design ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">{t('Final Design', '最終設計')}</h2>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-8">
            {t('Key screens from the LearnNow platform.', 'LearnNow 平台的主要畫面。')}
          </p>

    <FadeInSection>
        {/* mobile：scroll img */}
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

          {/* Row 1：CourseDetailed (col-span-2) + CourseCard */}
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

          {/* Row 2 */}
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
              <img src="/images/MyLearning.png" alt="My Learning" className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" />
            </div>
          </div>

        </div>
    </FadeInSection>

        </div>
      </section>
      </FadeInSection>

{/* ===== Usability Testing ===== */}
<FadeInSection>
<section className="px-5 md:px-20 py-8 md:py-12">
    <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">{t('Usability Testing', '可用性測試')}</h2>

        {/* Testing Scope */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                <span className="font-medium text-text-primary">{t('Testing Scope: ', '測試範圍：')}</span>
                {t('This test focused on validating two core tasks within the Japanese language course flow. Broader features like course catalog and search were outside the scope for this phase.', '本次測試專注於驗證日語課程流程中的兩個核心任務。課程目錄和搜尋等更廣泛的功能不在本階段的測試範圍內。')}
            </p>
        </div>

        <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
            {t('Tested with 5 participants on Maze.', '使用 Maze 進行，共 5 位受測者。')}
        </p>

        {/* Task results */}
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
                            <p>{t('Course cards felt ', '課程卡片感覺')}<span className="font-medium text-text-primary">{t('too sparse', '內容過少')}</span>{t(' — users wanted key details visible without hovering', ' — 使用者希望在不懸停的情況下看到關鍵資訊')}</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <p>{t('One user clicked the homepage CTA expecting navigation — ', '一位使用者點擊首頁 CTA 期望進行導航 — ')}<span className="font-medium text-text-primary">{t('ended up in enrollment flow instead of save flow', '最終進入了報名流程而非收藏流程')}</span></p>
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

        {/* Findings Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                <h4 className="font-serif text-sm md:text-base text-text-primary mb-3 flex items-center gap-2">
                    <span className="text-red-400">✗</span> {t('Design Issues', '設計問題')}
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-text-secondary">
                    <li>• {t('Course cards lacked visible metadata', '課程卡片缺少可見的元資料')}</li>
                    <li>• {t('Grey menu color read as "disabled"', '灰色選單顏色被解讀為「停用」')}</li>
                    <li>• {t('Save button purpose was unclear', '收藏按鈕的用途不明確')}</li>
                </ul>
            </div>

            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                <h4 className="font-serif text-sm md:text-base text-text-primary mb-3 flex items-center gap-2">
                    <span className="text-blue-400">○</span> {t('Scope Gaps', '範圍缺口')}
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-text-secondary">
                    <li>• {t('Homepage CTA had no destination page', '首頁 CTA 沒有對應的目標頁面')}</li>
                    <li>• {t('No "All Courses" catalog in prototype', '原型中沒有「所有課程」目錄')}</li>
                </ul>
                <p className="text-xs text-text-secondary mt-3 italic">
                    {t('These validate user expectations and inform future roadmap.', '這些發現驗證了使用者的期望，並為未來的路線圖提供參考。')}
                </p>
            </div>
        </div>
    </div>
</section>
</FadeInSection>

{/* ===== Iterations ===== */}
<FadeInSection>
<section className="px-5 md:px-20 py-8 md:py-12">
    <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-2">{t('Iterations', '設計迭代')}</h2>
        <p className="text-sm text-text-secondary mb-6">{t('Changes made based on design issues identified in testing.', '根據測試中發現的設計問題所做的修改。')}</p>

        <div className="space-y-4">
            <div className="flex items-start gap-4 bg-gray-50 rounded-lg p-4">
                <div className="w-8 h-8 bg-[#1e3a5f]  rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">1</div>
                <div>
                    <p className="text-sm md:text-base text-text-primary font-medium">{t('Surfaced key metadata on course cards', '在課程卡片上顯示關鍵元資料')}</p>
                    <p className="text-xs md:text-sm text-text-secondary mt-1">{t('Moved duration, rating, and price from hover-only to always visible', '將時長、評分和價格從懸停才顯示改為始終可見')}</p>
                </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 rounded-lg p-4">
                <div className="w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">2</div>
                <div>
                    <p className="text-sm md:text-base text-text-primary font-medium">{t('Revised "My Learning" menu colors', '修改「我的學習」選單顏色')}</p>
                    <p className="text-xs md:text-sm text-text-secondary mt-1">{t('Changed from grey to active color to signal interactivity', '從灰色改為活躍色彩以表示可互動')}</p>
                </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 rounded-lg p-4">
                <div className="w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">3</div>
                <div>
                    <p className="text-sm md:text-base text-text-primary font-medium">{t('Added "Save to compare later" hint', '新增「收藏以便稍後比較」提示')}</p>
                    <p className="text-xs md:text-sm text-text-secondary mt-1">{t("Clarified the save button's purpose on course detail pages", '在課程詳細頁面上說明收藏按鈕的用途')}</p>
                </div>
            </div>
        </div>
    </div>
</section>
</FadeInSection>

{/* ===== Future Improvements ===== */}
<FadeInSection>
<section className="px-5 md:px-20 py-8 md:py-12">
    <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-2">{t('Future Improvements', '未來改善方向')}</h2>
        <p className="text-sm text-text-secondary mb-6">{t('Features identified through testing and analysis for future development.', '透過測試與分析所識別的未來開發功能。')}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Compare */}
            <div className="group relative border border-dashed border-brand-green rounded-lg p-4 md:p-6 cursor-pointer overflow-hidden">
                <Scale className="w-6 h-6 md:w-8 md:h-8 mb-3 text-[#1e3a5f]" />
                <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">{t('Compare Courses', '課程比較')}</h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    {t('Side-by-side comparison of saved courses — duration, price, ratings, and syllabus at a glance.', '並排比較已收藏的課程，一目了然地查看時長、價格、評分與課綱。')}
                </p>
            </div>

            {/* Mobile App */}
            <div className="border border-dashed border-brand-green rounded-lg p-4 md:p-6">
                <Smartphone className="w-6 h-6 md:w-8 md:h-8 mb-3 text-[#1e3a5f]" />
                <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">{t('Mobile App', '行動應用程式')}</h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    {t('Track progress, manage schedules, and receive reminders on the go.', '隨時追蹤進度、管理時程並接收提醒。')}
                </p>
            </div>

            {/* Course Catalog */}
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

{/* ===== Key Takeaways ===== */}
<FadeInSection>
<section className="px-5 md:px-20 py-8 md:py-12">
    <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-6">{t('Key Takeaways', '關鍵心得')}</h2>

        <div className="space-y-4">
            {/* Takeaway 1 */}
            <div className="bg-[#8aacda]/20 rounded-lg p-4 md:p-6">
                <div className="flex items-start gap-4">
                    <Lightbulb className="w-6 h-6 text-[#1e3a5f] flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">
                            {t('Visual cues set expectations', '視覺線索建立使用者期望')}
                        </h3>
                        <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                            {t('The grey "My Learning" menu was perceived as disabled. The homepage CTA looked clickable but led nowhere. ', '"我的學習"選單的灰色被視為停用狀態。首頁的 CTA 看起來可點擊但沒有去處。')}<span className="font-medium text-text-primary">{t('Every visual element creates an expectation — unmet expectations break user trust.', '每個視覺元素都建立了期望 — 未被滿足的期望會破壞使用者的信任。')}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Takeaway 2 */}
            <div className="bg-[#8aacda]/20 rounded-lg p-4 md:p-6">
                <div className="flex items-start gap-4">
                    <LayoutDashboard className="w-6 h-6 text-[#1e3a5f] flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">
                            {t('Essential info should be visible at first glance', '核心資訊應一目了然')}
                        </h3>
                        <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                            {t('Users wanted course details without hovering. ', '使用者希望不需懸停即可看到課程詳情。')}<span className="font-medium text-text-primary">{t("Core information shouldn't be gated behind interactions", '核心資訊不應隱藏在互動操作之後')}</span>{t(' — hover states should reveal supplementary details, not essentials.', ' — 懸停狀態應呈現補充資訊，而非必要內容。')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Takeaway 3 */}
            <div className="bg-[#8aacda]/20 rounded-lg p-4 md:p-6">
                <div className="flex items-start gap-4">
                    <FlaskConical className="w-6 h-6 text-[#1e3a5f] flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">
                            {t('Distinguish design flaws from scope gaps', '區分設計缺陷與範圍缺口')}
                        </h3>
                        <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                            {t('When users clicked the homepage CTA expecting a course catalog, it revealed a valid expectation — not a design flaw. ', '當使用者點擊首頁 CTA 期望看到課程目錄時，這揭示了一個合理的使用者期望 — 而非設計缺陷。')}<span className="font-medium text-text-primary">{t('Not every unexpected behavior is a problem to fix; some are opportunities to expand.', '並非每個意外行為都是需要修正的問題，有些是擴展的機會。')}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</FadeInSection>

      {/* ===== Navigation ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <Link
              to="/work"
              className="text-brand-green font-mono text-xs md:text-sm hover:underline"
            >
              {t('← Back to Projects', '← 返回作品集')}
            </Link>

            <Link
              to="/work/cloudair"
              className="text-brand-green font-mono text-xs md:text-sm hover:underline"
            >
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
