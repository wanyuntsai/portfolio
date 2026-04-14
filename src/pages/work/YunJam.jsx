import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeInSection, PageTransition } from '../../components/AnimatedSection';
import { useToc } from '../../hooks/useToc';
import ProjectNav from '../../components/ProjectNav';
import { useLanguage } from '../../context/LanguageContext';

/* ─── Helpers — match site case study style ───────────────────────────── */
const SectionLabel = ({ children }) => (
  <p className="font-mono text-xs text-brand-green tracking-widest uppercase mb-6">
    {children}
  </p>
);

const Heading = ({ children, className = '' }) => (
  <h2 className={`font-serif text-2xl md:text-3xl text-text-primary leading-snug mb-4 ${className}`}>
    {children}
  </h2>
);

const Body = ({ children, className = '' }) => (
  <p className={`text-base text-text-secondary leading-relaxed ${className}`}>
    {children}
  </p>
);

const Divider = () => <hr className="border-t border-border my-0" />;

/* ─── Component ───────────────────────────────────────────────────────── */
function YunJam() {
  const { t } = useLanguage();
  const { tocItems, activeId, showToc, scrollToSection } = useToc();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    document.title = 'Yun Jam | Yun Tsai';
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
      setShowBackToTop(scrolled > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const decisions = [
    {
      num: '01',
      title: t('Grid cards → turntable UI', '格狀卡片 → 唱盤 UI'),
      body: t(
        'The first version was a 2×2 grid of square cards. I saw a DJ simulator interface and thought: what if selecting a song felt like dropping a tonearm? That visual metaphor drove the whole redesign — the record spins, the arm drops, the music starts.',
        '第一版是 2×2 的方形卡片網格。某天看到 DJ 模擬介面後我想：如果選歌的感覺像是放下唱針呢？這個視覺比喻驅動了整個重新設計——唱片旋轉，唱針落下，音樂響起。'
      ),
    },
    {
      num: '02',
      title: t('Embed over full API', '選擇 Embed 而非完整 API'),
      body: t(
        "Spotify's Web Playback SDK enables full custom controls — but requires a Premium account. That breaks the experience for most visitors. The Embed iframe works for everyone, no login needed. I chose reach over control.",
        'Spotify 的 Web Playback SDK 提供完整自訂控制，但需要 Premium 帳號，大多數訪客因此無法使用。Embed iframe 不需登入，所有人都能使用。我選擇了觸及率而非控制權。'
      ),
    },
    {
      num: '03',
      title: t('Tool, not showcase', '工具，而非展示'),
      body: t(
        'The biggest shift: instead of showing my four songs, I made it so anyone can build their own. Paste a Spotify URL → auto-fetch metadata via oEmbed → add a mood tag → share via URL. The playlist is yours.',
        '最大的轉變：與其展示我的四首歌，不如讓任何人都能建立自己的。貼上 Spotify 連結 → 透過 oEmbed 自動抓取資料 → 加上情緒標籤 → 分享連結。播放清單是你的。'
      ),
    },
  ];

  const myDecisions = [
    t('The concept (personal playlist → shareable tool)', '概念設計（個人播放清單 → 可分享工具）'),
    t('Visual direction (turntable aesthetic, warm cream palette)', '視覺方向（唱盤美學、暖米色調）'),
    t('Which features to build and in what order', '決定要做哪些功能及開發順序'),
    t('Song selection and mood tags', '選曲與情緒標籤'),
    t('Choosing Spotify Embed over the full SDK', '選擇 Spotify Embed 而非完整 SDK'),
  ];

  const claudeContributions = [
    t('Translating design directions into working HTML / CSS / JS', '將設計方向轉換為實際的 HTML / CSS / JS'),
    t('Suggesting the oEmbed API for auto-fetching song info', '建議使用 oEmbed API 自動抓取歌曲資訊'),
    t('Implementing URL hash encoding for the share feature', '實作分享功能的 URL 雜湊編碼'),
    t('Debugging issues throughout', '全程除錯'),
  ];

  const features = [
    { icon: '◉', label: t('Turntable UI', '唱盤 UI'), desc: t('Spinning vinyl with CSS animation, tonearm drops on track select', 'CSS 動畫旋轉黑膠唱片，選曲時唱針落下') },
    { icon: '▶', label: t('Spotify Embed playback', 'Spotify Embed 播放'), desc: t('Real in-page audio — no login required for most users', '頁面內直接播放音樂，大多數使用者無需登入') },
    { icon: '+', label: t('Add any song', '新增任意歌曲'), desc: t('Paste a Spotify URL and the song appears instantly', '貼上 Spotify 連結，歌曲立即出現') },
    { icon: '⟳', label: t('Auto-fetch metadata', '自動抓取元資料'), desc: t('Title, artist, and album art pulled via oEmbed API — no API key needed', '透過 oEmbed API 自動抓取標題、歌手及專輯封面，無需 API 金鑰') },
    { icon: '⤴', label: t('Share your Jam', '分享你的 Jam'), desc: t('Entire playlist encoded into a single shareable URL', '整個播放清單編碼進一個可分享的連結') },
    { icon: '✎', label: t('Editable playlist name', '可編輯播放清單名稱'), desc: t('Click the title to rename your Jam', '點擊標題即可重新命名') },
    { icon: '◫', label: t('Persistent storage', '持久儲存'), desc: t('localStorage keeps your playlist between sessions', 'localStorage 讓播放清單在工作階段間保留') },
  ];

  const learned = [
    t('Browser-based audio limitations shape product decisions more than any API feature list.', '瀏覽器的音訊限制對產品決策的影響，遠大於任何 API 功能清單。'),
    t('The difference between auth-gated APIs (Web Playback SDK) and open ones (oEmbed) is a UX decision, not just a technical one.', '需驗證的 API（Web Playback SDK）與開放 API（oEmbed）之間的差異，是 UX 決策，不只是技術選擇。'),
    t('Encoding structured data into URLs is a lightweight, dependency-free way to enable shareable state.', '將結構化資料編碼進 URL，是一種輕量、無需依賴的可分享狀態實作方式。'),
    t('Working with AI on code is less about prompting and more about knowing what you want — clarity of direction is everything.', '與 AI 協作寫程式，重點不在於如何下指令，而在於清楚知道自己要什麼——方向的清晰度決定一切。'),
  ];

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 z-60 h-0.5 bg-brand-green transition-all duration-100"
        style={{ width: `${scrollProgress}%` }} />

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-sm bg-brand-green text-white hover:bg-brand-green/80 transition-colors"
          aria-label="Back to top"
        >↑</button>
      )}

      <PageTransition>
      <div className="bg-brand-white min-h-screen pt-20">

        {/* ── Breadcrumb ─────────────────────────────────────────────── */}
        <nav className="max-w-7xl mx-auto px-5 md:px-16 xl:px-20 pt-8 md:pt-14">
          <div className="flex items-center gap-2 text-sm font-mono text-text-secondary">
            <Link to="/work" className="text-brand-green hover:underline">{t('Work', '作品')}</Link>
            <span>›</span>
            <span className="text-text-primary">Yun Jam</span>
          </div>
        </nav>

        {/* ══ 1. HERO ══════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-5 md:px-16 xl:px-20 py-4 md:py-10">
          <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-12">

            {/* left: title, description, meta, CTA */}
            <div className="md:w-1/2 flex flex-col">
              <div className="flex flex-col gap-y-2">
                <h1 className="font-serif text-3xl md:text-5xl text-text-primary">Yun Jam</h1>
                <p className="font-serif text-lg md:text-2xl text-text-secondary">
                  {t('A static class assignment turned into a shareable, interactive music tool.', '從課堂作業發展成可分享的互動音樂工具。')}
                </p>
                <p className="pt-2 text-base text-text-secondary leading-relaxed">
                  {t(
                    'Built with vanilla web and a clear product vision — anyone can build and share their own curated playlist in minutes, no account required.',
                    '以原生網頁技術打造，有明確的產品思維——任何人都可以在幾分鐘內建立並分享自己的播放清單，無需帳號。'
                  )}
                </p>
              </div>

              {/* Tools, Role, Timeline */}
              <div className="flex gap-8 md:gap-16 pt-4 md:pt-6">
                <div>
                  <p className="font-serif text-sm md:text-lg text-text-primary mb-1">{t('Tools', '工具')}</p>
                  <p className="font-mono text-sm text-text-secondary">HTML, CSS, JS, Spotify API, Claude AI</p>
                </div>
                <div>
                  <p className="font-serif text-sm md:text-lg text-text-primary mb-1">{t('My Role', '職位')}</p>
                  <p className="font-mono text-sm text-text-secondary">{t('Designer + Developer', '設計師 + 開發者')}</p>
                </div>
                <div>
                  <p className="font-serif text-sm md:text-lg text-text-primary mb-1">{t('Timeline', '時間')}</p>
                  <p className="font-mono text-sm text-text-secondary">3 Weeks</p>
                </div>
              </div>

              <a
                href="https://wanyuntsai.github.io/yunjam/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-brand-green text-white px-4 py-2 rounded-full text-sm font-mono hover:bg-brand-green/90 transition-colors w-fit"
              >
                {t('Live Demo ↗', '線上試玩 ↗')}
              </a>
            </div>

            {/* right: hero image */}
            <div className="md:w-1/2 mt-2 md:mt-0">
              <img
                src="/images/YunJam/yunjam_mkup.png"
                alt="Yun Jam Preview"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        <Divider />

        {/* ── TOC + Body ─────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-5 md:px-16 xl:px-20 lg:flex lg:gap-16">

          {/* TOC sidebar */}
          <aside className="hidden lg:block w-56 shrink-0 mt-16">
            <p className="text-sm tracking-widest text-neutral-400 uppercase mb-3">{t('Case Study', '案例研究')}</p>
            <div className={`sticky top-24 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto transition-opacity duration-500 ${showToc ? 'opacity-100' : 'opacity-0'}`}>
              <ul className="space-y-0.5">
                {tocItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-start w-full text-left py-1.5 transition-all duration-200 text-sm leading-snug ${
                        activeId === item.id
                          ? 'border-l-2 border-[#9CAF6C] pl-3 font-medium text-text-primary'
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
                <p className="text-sm text-neutral-500 mb-3">{t('Explore other case studies.', '瀏覽其他案例研究。')}</p>
                <Link to="/work" className="inline-flex items-center gap-1 text-sm font-mono text-brand-green hover:underline">
                  {t('View all work', '查看所有作品')} →
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 py-16 space-y-0">

            {/* ══ 2. Overview ══════════════════════════════════════════ */}
            <section className="pb-14">
              <SectionLabel>{t('Overview', '概覽')}</SectionLabel>
              <Heading>{t('What is Yun Jam?', 'Yun Jam 是什麼？')}</Heading>
              <div className="max-w-2xl space-y-4">
                <Body>
                  {t(
                    'Yun Jam started as a class assignment — a simple HTML playlist page with four songs I liked. It ended up becoming a fully interactive music tool that lets anyone build and share their own curated playlist in minutes, no account required.',
                    'Yun Jam 最初是一個課堂作業——一個有四首歌的簡單 HTML 播放清單頁面。最後發展成一個互動音樂工具，讓任何人都能在幾分鐘內建立並分享自己的播放清單，無需帳號。'
                  )}
                </Body>
                <Body>
                  {t(
                    'The core question throughout: ',
                    '整個過程的核心問題：'
                  )}
                  <em className="text-text-primary not-italic font-medium">
                    {t('how do I make this useful for someone who isn\'t me?', '如何讓這個工具對非我的人也有用？')}
                  </em>
                  {t(' That question drove every design and product decision.', '這個問題驅動了每一個設計與產品決策。')}
                </Body>
              </div>
            </section>

            <Divider />

            {/* ══ 3. The Problem ═══════════════════════════════════════ */}
            <section className="py-14">
              <SectionLabel>{t('The Problem', '問題')}</SectionLabel>
              <Heading>{t('What was wrong with V1', 'V1 版本的問題')}</Heading>
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <div className="max-w-md">
                  <Body className="mb-6">
                    {t(
                      'The original assignment was a static webpage: four song cards, a background image, some hover effects. It worked, but it felt like a template. I wanted it to feel like ',
                      '原始作業是一個靜態網頁：四張歌曲卡片、一張背景圖、一些 hover 效果。它能用，但感覺像是套模板。我希望它有'
                    )}
                    <em className="text-text-primary not-italic font-medium">{t('mine', '自己的個性')}</em>
                    {t(' — and eventually, like everyone else\'s too.', '——最終，也讓每個人都能有自己的。')}
                  </Body>
                  <ul className="space-y-3">
                    {[
                      t('Cards linked out to Spotify — broke the in-page experience', '卡片連結至 Spotify——破壞了頁面內的體驗'),
                      t('No actual music playback on the page', '頁面內沒有實際的音樂播放'),
                      t('Only my four songs, hardcoded — no one else could use it', '只有我的四首歌，寫死在程式裡——其他人無法使用'),
                    ].map((p, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1 text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0 font-mono text-red-400 bg-red-50 border border-red-200">✕</span>
                        <span className="text-base text-text-secondary">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shrink-0 md:w-72 lg:w-80">
                  <img
                    src="/images/YunJam/yunjamv1.png"
                    alt="Yun Jam V1"
                    className="w-full h-auto rounded-xl border border-border"
                  />
                  <p className="mt-2 text-xs font-mono text-text-secondary text-center">V1 — {t('original class assignment', '原始課堂作業')}</p>
                </div>
              </div>
            </section>

            <Divider />

            {/* ══ 4. Design Decisions ══════════════════════════════════ */}
            <section className="py-14">
              <SectionLabel>{t('Design Decisions', '設計決策')}</SectionLabel>
              <Heading>{t('Three calls that shaped the project', '三個關鍵決定')}</Heading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
                {decisions.map(d => (
                  <div key={d.num} className="rounded-2xl p-6 bg-white/60 border border-border">
                    <p className="font-mono text-2xl text-border mb-3">{d.num}</p>
                    <p className="font-serif text-lg text-text-primary leading-snug mb-3">{d.title}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{d.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ══ 5. Process ═══════════════════════════════════════════ */}
            <section className="py-14">
              <SectionLabel>{t('Process', '過程')}</SectionLabel>
              <Heading>{t('How I worked with Claude', '如何與 Claude 協作')}</Heading>
              <div className="max-w-3xl space-y-6">

                <Body>
                  {t(
                    'I treated Claude the same way a design lead treats a developer — I owned every product and design decision, Claude handled implementation. The clearer my brief, the better the output.',
                    '我把 Claude 當作工程師對待——每個產品與設計決策都由我主導，Claude 負責實作。我的需求描述越清晰，產出就越精準。'
                  )}
                </Body>

                {/* Concrete workflow example */}
                <div className="rounded-2xl border border-border bg-white/60 overflow-hidden">
                  <div className="px-6 py-4 border-b border-border">
                    <p className="font-mono text-xs text-brand-green tracking-widest uppercase">
                      {t('A real workflow moment', '一個具體的協作過程')}
                    </p>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="px-6 py-4 flex gap-4">
                      <span className="font-mono text-xs text-text-secondary w-28 shrink-0 pt-0.5 uppercase tracking-wide">{t('Goal', '目標')}</span>
                      <p className="text-sm text-text-secondary">{t('When a user pastes a Spotify URL, auto-fetch the song title, artist, and album art — no manual input.', '使用者貼上 Spotify 連結時，自動抓取歌曲名稱、歌手與專輯封面，無需手動輸入。')}</p>
                    </div>
                    <div className="px-6 py-4 flex gap-4">
                      <span className="font-mono text-xs text-brand-green w-28 shrink-0 pt-0.5 uppercase tracking-wide">{t('My brief', '我的描述')}</span>
                      <p className="text-sm text-text-secondary italic">{t('"Detect when the user pastes a Spotify URL. Pull the song name, artist, and thumbnail automatically. The user shouldn\'t have to type anything extra."', '"偵測使用者貼上 Spotify 連結的動作，自動抓取歌名、歌手與縮圖。使用者不需要額外輸入任何內容。"')}</p>
                    </div>
                    <div className="px-6 py-4 flex gap-4">
                      <span className="font-mono text-xs text-text-secondary w-28 shrink-0 pt-0.5 uppercase tracking-wide">{t('Claude suggested', 'Claude 建議')}</span>
                      <p className="text-sm text-text-secondary">{t("Spotify's oEmbed API — a public endpoint that returns track metadata with no API key or user login required.", 'Spotify oEmbed API——一個公開的端點，無需 API 金鑰或使用者登入即可回傳歌曲資料。')}</p>
                    </div>
                    <div className="px-6 py-4 flex gap-4 bg-brand-green/5">
                      <span className="font-mono text-xs text-brand-green w-28 shrink-0 pt-0.5 uppercase tracking-wide">{t('My call', '我的決策')}</span>
                      <p className="text-sm text-text-secondary">{t('Yes — no API key means no login barrier, which directly supports the "no account required" principle I\'d set from day one.', '採用——沒有 API 金鑰代表沒有登入門檻，直接支持了我從第一天就定下的「無需帳號」原則。')}</p>
                    </div>
                  </div>
                </div>

                {/* Ownership breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl p-6 bg-white/60 border border-border">
                    <p className="font-mono text-xs text-brand-green tracking-widest uppercase mb-4">{t('I owned', '我負責')}</p>
                    <ul className="space-y-2">
                      {myDecisions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="mt-1 shrink-0 text-brand-green">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl p-6 bg-white/60 border border-border">
                    <p className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-4">{t('Claude handled', 'Claude 負責')}</p>
                    <ul className="space-y-2">
                      {claudeContributions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="mt-1 shrink-0 text-border">◆</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <Divider />

            {/* ══ 6. Features ══════════════════════════════════════════ */}
            <section className="py-14">
              <SectionLabel>{t('Features', '功能')}</SectionLabel>
              <Heading>{t('What it does', '功能介紹')}</Heading>
              <div className="max-w-2xl space-y-1">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-4 py-4 border-b border-border">
                    <span className="text-lg w-6 text-center shrink-0 mt-0.5 text-brand-green">{f.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-text-primary mb-0.5">{f.label}</p>
                      <p className="text-sm text-text-secondary">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ══ 7. Live Demo ═════════════════════════════════════════ */}
            <section className="py-14">
              <SectionLabel>{t('Live Demo', '線上試玩')}</SectionLabel>
              <Heading>{t('Try it yourself', '親自試試')}</Heading>
              <Body className="mb-6">
                {t(
                  'Paste any Spotify track URL to add a song, build your playlist, then hit Share to generate a shareable link.',
                  '貼上任何 Spotify 歌曲連結即可新增歌曲，建立好播放清單後點擊分享，即可產生專屬連結。'
                )}
              </Body>
              <div className="rounded-2xl border border-border overflow-hidden">
                <iframe
                  src="https://wanyuntsai.github.io/yunjam/"
                  title="Yun Jam Live Demo"
                  className="w-full block"
                  style={{ height: '650px' }}
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-xs font-mono text-text-secondary">
                {t('Best experienced on desktop. ', '建議在桌機上體驗。')}
                <a href="https://wanyuntsai.github.io/yunjam/" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline">
                  {t('Open in new tab ↗', '在新分頁開啟 ↗')}
                </a>
              </p>
            </section>

            <Divider />

            {/* ══ 8. Takeaways ═════════════════════════════════════════ */}
            <section className="py-14">
              <SectionLabel>{t('Takeaways', '心得')}</SectionLabel>
              <Heading>{t('What I learned', '我學到了什麼')}</Heading>
              <div className="max-w-2xl space-y-5">
                {learned.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="font-mono text-xs text-brand-green mt-1 shrink-0 w-5">0{i + 1}</span>
                    <p className="text-base text-text-secondary leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ══ 8. Reflection ════════════════════════════════════════ */}
            <section className="py-14">
              <SectionLabel>{t('Reflection', '反思')}</SectionLabel>
              <div className="max-w-2xl space-y-5">
                <Body>
                  {t(
                    'There\'s a version of this project where I hand-wrote every line of code myself, and it probably would have looked much simpler and taken much longer. Using AI as a collaborator let me focus on the parts I actually care about — the concept, the feel, the user experience — and ship something I\'m proud of.',
                    '有一個版本的我自己手寫了每一行程式，那個版本可能簡單許多，也花了更長時間。以 AI 作為協作者，讓我能專注在我真正在乎的部分——概念、感受、使用者體驗——並做出一個我引以為豪的東西。'
                  )}
                </Body>

              </div>
            </section>

            <Divider />

            <FadeInSection>
              <ProjectNav
                prev={{ href: '/work/MindLog', name: 'MindLog', subtitle: t('Mental health app', '心理健康應用程式'), image: '/images/MindLog/MindLog_mkup.png' }}
                next={{ href: '/work/vanlink', name: 'VanLink', subtitle: t('Vancouver transit app', '大溫地區統一通勤 App'), image: '/images/Vanlink/Vanlink_mkup.png' }}
              />
            </FadeInSection>

          </div>
        </div>
      </div>
      </PageTransition>
    </>
  );
}

export default YunJam;
