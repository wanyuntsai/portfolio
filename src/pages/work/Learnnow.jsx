import { useState } from "react";
import { Link } from "react-router-dom";
import { FadeInSection, PageTransition } from "../../components/AnimatedSection";
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
            Work
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
              Online Learning Platform
            </p>
            
            <p className="text-sm md:text-base text-text-secondary mt-3 md:mt-6 leading-relaxed">
              An online learning platform that helps learners browse, save, and 
              enroll in courses with clarity and confidence.
            </p>

            {/* Tools & Role */}
            <div className="flex gap-8 md:gap-16 mt-4 md:mt-8">
              <div>
                <p className="font-serif text-sm md:text-lg text-text-primary mb-1">Tools</p>
                <p className="font-mono text-xs md:text-sm text-text-secondary">Figma, Maze</p>
              </div>
              <div>
                <p className="font-serif text-sm md:text-lg text-text-primary mb-1">My Role</p>
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
              Figma Demo
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
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">The Problem</h2>
          
          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
            Online learning platforms push for immediate conversion, but learners need time to explore and compare before committing.
          </p>

          {/* 痛點視覺化 */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 md:p-4 text-center">
              <EyeOff className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-amber-600" />
              <p className="text-xs md:text-sm text-text-primary font-medium">Hard to discover</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 md:p-4 text-center">
              <BookmarkX className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-amber-600" />
              <p className="text-xs md:text-sm text-text-primary font-medium">No save feature</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 md:p-4 text-center">
              <TrendingDown className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-amber-600" />
              <p className="text-xs md:text-sm text-text-primary font-medium">Unclear progress</p>
            </div>
          </div>

          {/* Design Goal */}
          <div className="bg-brand-green-light rounded-lg p-4 md:p-6">
            <p className="font-mono text-xs md:text-sm text-brand-green mb-3">Design Goal</p>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 md:px-4 md:py-3 flex-1 justify-center">
                <Search className="w-5 h-5 md:w-6 md:h-6 text-brand-green" />
                <span className="text-xs md:text-sm font-medium">Browse with Ease</span>
              </div>
              <span className="text-brand-green text-lg md:text-xl rotate-90 md:rotate-0">→</span>
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 md:px-4 md:py-3 flex-1 justify-center">
                <Bookmark className="w-5 h-5 md:w-6 md:h-6 text-brand-green" />
                <span className="text-xs md:text-sm font-medium">Save & Compare</span>
              </div>
              <span className="text-brand-green text-lg md:text-xl rotate-90 md:rotate-0">→</span>
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 md:px-4 md:py-3 flex-1 justify-center">
                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-brand-green" />
                <span className="text-xs md:text-sm font-medium">Track Progress</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Design Process ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-6">Design Process</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-brand-green-light rounded-full flex items-center justify-center mb-2">
                <Search className="w-5 h-5 text-brand-green" />
              </div>
              <p className="text-sm font-medium text-text-primary">Research</p>
            </div>
            <div className="hidden md:block text-text-secondary">→</div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-brand-green-light rounded-full flex items-center justify-center mb-2">
                <Lightbulb className="w-5 h-5 text-brand-green" />
              </div>
              <p className="text-sm font-medium text-text-primary">Define</p>
            </div>
            <div className="hidden md:block text-text-secondary">→</div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-brand-green-light rounded-full flex items-center justify-center mb-2">
                <Pencil className="w-5 h-5 text-brand-green" />
              </div>
              <p className="text-sm font-medium text-text-primary">Design</p>
            </div>
            <div className="hidden md:block text-text-secondary">→</div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-brand-green-light rounded-full flex items-center justify-center mb-2">
                <FlaskConical className="w-5 h-5 text-brand-green" />
              </div>
              <p className="text-sm font-medium text-text-primary">Test</p>
            </div>
            <div className="hidden md:block text-text-secondary">→</div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-brand-green-light rounded-full flex items-center justify-center mb-2">
                <RefreshCw className="w-5 h-5 text-brand-green" />
              </div>
              <p className="text-sm font-medium text-text-primary">Iterate</p>
            </div>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* ===== Competitive Analysis ===== */}
      <FadeInSection>
      <section className="px-5 md:px-20 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">Competitive Analysis</h2>
          
          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
            I analyzed<img 
        src="/images/coursera-logo.jpg" 
        alt="Coursera" 
        className="h-8 md:h-9 inline-block mx-2 hover:scale-110 transition-transform"
    />
           and
           <img 
        src="/images/udemy-logo.png" 
        alt="Udemy" 
        className="h-10 md:h-14 inline-block mx-2 hover:scale-110 transition-transform"
    />
            
            to understand how existing platforms handle course discovery and user retention.
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
                    <p className="text-sm font-medium text-text-primary">No save feature</p>
                    <p className="text-xs text-text-secondary mt-1">Users can't compare courses over time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-lg">✗</span>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Complex navigation</p>
                    <p className="text-xs text-text-secondary mt-1">Mixed organizing principles increase cognitive load</p>
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
                    <p className="text-sm font-medium text-text-primary">Inconsistent structure</p>
                    <p className="text-xs text-text-secondary mt-1">Same course appears under multiple categories</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-lg">✗</span>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Misleading progress</p>
                    <p className="text-xs text-text-secondary mt-1">Lecture count doesn't reflect actual learning</p>
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
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-6">Design Decisions</h2>
          
          {/* 3 cols layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-brand-green-light rounded-lg p-4 md:p-6 text-center">
              <FolderTree className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 text-brand-green" />
              <p className="text-brand-green font-mono text-xs mb-2">01</p>
              <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">
                Three-Tier Navigation
              </h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                Category → Subject → Topic. <br />Clear hierarchy so users always know where they are.
              </p>
            </div>

            <div className="bg-brand-green-light rounded-lg p-4 md:p-6 text-center">
              <Bookmark className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 text-brand-green" />
              <p className="text-brand-green font-mono text-xs mb-2">02</p>
              <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">
                Save & Compare
              </h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                Bookmark courses without pressure. Compare options and buy when ready.
              </p>
            </div>

            <div className="bg-brand-green-light rounded-lg p-4 md:p-6 text-center">
              <LayoutDashboard className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 text-brand-green" />
              <p className="text-brand-green font-mono text-xs mb-2">03</p>
              <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">
                Progress Dashboard
              </h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                Visual progress bars, saved courses, and certificates in one place.
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
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">User Flow</h2>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
            The complete journey from discovery to enrollment.
          </p>
          
          <div className="bg-brand-green-light rounded-lg p-4 md:p-6">
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
          <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">Final Design</h2>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-8">
            Key screens from the LearnNow platform.
          </p>
          
    <FadeInSection>
        {/* 手機：橫向滑動卡片 */}
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

        {/* 桌面：Bento Grid（上排大圖+右圖，下排三小圖） */}
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

          {/* Row 2：三張等寬小圖 */}
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
        <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-4">Usability Testing</h2>
        
        {/* Testing Scope */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                <span className="font-medium text-text-primary">Testing Scope: </span>
                This test focused on validating two core tasks within the Japanese language course flow. 
                Broader features like course catalog and search were outside the scope for this phase.
            </p>
        </div>

        <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
            Tested with 3 participants on Maze.
        </p>

        {/* Task results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Task 1 */}
            <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-brand-green-light px-4 py-3 border-b border-border">
                    <h3 className="font-serif text-base md:text-lg text-text-primary">Task 1: Save a Course</h3>
                </div>
                <div className="p-4">
                    <div className="flex justify-between mb-4">
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-brand-green">100%</p>
                            <p className="text-xs text-text-secondary">Success</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-brand-green">0%</p>
                            <p className="text-xs text-text-secondary">Drop-off</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-amber-500">31.9%</p>
                            <p className="text-xs text-text-secondary">Misclick</p>
                        </div>
                    </div>
                    
                    <div className="space-y-2 text-xs md:text-sm text-text-secondary leading-relaxed">
                        <div className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <p>Course cards felt <span className="font-medium text-text-primary">too sparse</span> — users wanted key details visible without hovering</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <p>One user clicked the homepage CTA expecting navigation — <span className="font-medium text-text-primary">ended up in enrollment flow instead of save flow</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Task 2 */}
            <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-brand-green-light px-4 py-3 border-b border-border">
                    <h3 className="font-serif text-base md:text-lg text-text-primary">Task 2: Enroll in Saved Course</h3>
                </div>
                <div className="p-4">
                    <div className="flex justify-between mb-4">
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-brand-green">100%</p>
                            <p className="text-xs text-text-secondary">Success</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-brand-green">0%</p>
                            <p className="text-xs text-text-secondary">Drop-off</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-brand-green">0%</p>
                            <p className="text-xs text-text-secondary">Misclick</p>
                        </div>
                    </div>
                    
                    <div className="space-y-2 text-xs md:text-sm text-text-secondary leading-relaxed">
                        <div className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <p>Grey menu color was perceived as <span className="font-medium text-text-primary">disabled/inactive</span></p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <p>One user navigated via "Explore" instead of "My Learning" — <span className="font-medium text-text-primary">familiar patterns overrode new shortcuts</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Findings Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                <h4 className="font-serif text-sm md:text-base text-text-primary mb-3 flex items-center gap-2">
                    <span className="text-red-400">✗</span> Design Issues
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-text-secondary">
                    <li>• Course cards lacked visible metadata</li>
                    <li>• Grey menu color read as "disabled"</li>
                    <li>• Save button purpose was unclear</li>
                </ul>
            </div>
            
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                <h4 className="font-serif text-sm md:text-base text-text-primary mb-3 flex items-center gap-2">
                    <span className="text-blue-400">○</span> Scope Gaps
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-text-secondary">
                    <li>• Homepage CTA had no destination page</li>
                    <li>• No "All Courses" catalog in prototype</li>
                </ul>
                <p className="text-xs text-text-secondary mt-3 italic">
                    These validate user expectations and inform future roadmap.
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
        <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-2">Iterations</h2>
        <p className="text-sm text-text-secondary mb-6">Changes made based on design issues identified in testing.</p>
        
        <div className="space-y-4">
            <div className="flex items-start gap-4 bg-gray-50 rounded-lg p-4">
                <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">1</div>
                <div>
                    <p className="text-sm md:text-base text-text-primary font-medium">Surfaced key metadata on course cards</p>
                    <p className="text-xs md:text-sm text-text-secondary mt-1">Moved duration, rating, and price from hover-only to always visible</p>
                </div>
            </div>
            
            <div className="flex items-start gap-4 bg-gray-50 rounded-lg p-4">
                <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">2</div>
                <div>
                    <p className="text-sm md:text-base text-text-primary font-medium">Revised "My Learning" menu colors</p>
                    <p className="text-xs md:text-sm text-text-secondary mt-1">Changed from grey to active color to signal interactivity</p>
                </div>
            </div>
            
            <div className="flex items-start gap-4 bg-gray-50 rounded-lg p-4">
                <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">3</div>
                <div>
                    <p className="text-sm md:text-base text-text-primary font-medium">Added "Save to compare later" hint</p>
                    <p className="text-xs md:text-sm text-text-secondary mt-1">Clarified the save button's purpose on course detail pages</p>
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
        <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-2">Future Improvements</h2>
        <p className="text-sm text-text-secondary mb-6">Features identified through testing and analysis for future development.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Compare */}
            <div className="group relative border border-dashed border-brand-green rounded-lg p-4 md:p-6 cursor-pointer overflow-hidden">
                <Scale className="w-6 h-6 md:w-8 md:h-8 mb-3 text-brand-green" />
                <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">Compare Courses</h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    Side-by-side comparison of saved courses — duration, price, ratings, and syllabus at a glance.
                </p>
                
                {/* Hover wireframe */}
                <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <img 
                        src="/images/learnnow-compare-wireframe.png" 
                        alt="Compare Feature Wireframe"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                    />
                </div>
            </div>
            
            {/* Mobile App */}
            <div className="border border-dashed border-brand-green rounded-lg p-4 md:p-6">
                <Smartphone className="w-6 h-6 md:w-8 md:h-8 mb-3 text-brand-green" />
                <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">Mobile App</h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    Track progress, manage schedules, and receive reminders on the go.
                </p>
            </div>
            
            {/* Course Catalog */}
            <div className="border border-dashed border-brand-green rounded-lg p-4 md:p-6">
                <Globe className="w-6 h-6 md:w-8 md:h-8 mb-3 text-brand-green" />
                <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">Course Catalog</h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    Full browsable catalog with search and filters — addressing the homepage CTA expectation.
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
        <h2 className="font-serif text-xl md:text-3xl text-text-primary mb-6">Key Takeaways</h2>
        
        <div className="space-y-4">
            {/* Takeaway 1 */}
            <div className="bg-brand-green-light rounded-lg p-4 md:p-6">
                <div className="flex items-start gap-4">
                    <Lightbulb className="w-6 h-6 text-brand-green flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">
                            Visual cues set expectations
                        </h3>
                        <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                            The grey "My Learning" menu was perceived as disabled. The homepage CTA looked 
                            clickable but led nowhere. <span className="font-medium text-text-primary">Every 
                            visual element creates an expectation — unmet expectations break user trust.</span>
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Takeaway 2 */}
            <div className="bg-brand-green-light rounded-lg p-4 md:p-6">
                <div className="flex items-start gap-4">
                    <LayoutDashboard className="w-6 h-6 text-brand-green flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">
                            Essential info should be visible at first glance
                        </h3>
                        <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                            Users wanted course details without hovering. <span className="font-medium text-text-primary">
                            Core information shouldn't be gated behind interactions</span> — hover states 
                            should reveal supplementary details, not essentials.
                        </p>
                    </div>
                </div>
            </div>

            {/* Takeaway 3 */}
            <div className="bg-brand-green-light rounded-lg p-4 md:p-6">
                <div className="flex items-start gap-4">
                    <FlaskConical className="w-6 h-6 text-brand-green flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-serif text-base md:text-lg text-text-primary mb-2">
                            Distinguish design flaws from scope gaps
                        </h3>
                        <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                            When users clicked the homepage CTA expecting a course catalog, it revealed a 
                            valid expectation — not a design flaw. <span className="font-medium text-text-primary">
                            Not every unexpected behavior is a problem to fix; some are opportunities to expand.</span>
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
              ← Back to Projects
            </Link>

            <Link 
              to="/work/cloudair"
              className="text-brand-green font-mono text-xs md:text-sm hover:underline"
            >
              Next Project →
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