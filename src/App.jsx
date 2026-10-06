import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PortfolioChat from './components/PortfolioChat';

import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import NotFound from './pages/NotFound';

import LearnNow from './pages/work/Learnnow'
import Vanlink from './pages/work/Vanlink'
import YouTubeMusic from "./pages/work/YouTubeMusic";
import MindLog from './pages/work/MindLog';

function AppContent() {
  const location = useLocation();
  const isWorkSubPage = location.pathname.includes('/work/'); // 改成 includes，因為路徑前面多了 /zh 或 /en

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className='min-h-screen w-full flex flex-col relative'>
      <Navbar/>
      <main className='flex-1'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/work/learnnow" element={<LearnNow />} />
          <Route path="/work/vanlink" element={<Vanlink />} />
          <Route path="/work/youtubemusic" element={<YouTubeMusic />} />
          <Route path="/work/mindlog" element={<MindLog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <div className={isWorkSubPage ? 'bg-neutral-50' : ''}>
        <Footer/>
      </div>
      <PortfolioChat />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 根目錄自動導向中文版 */}
        <Route path="/" element={<Navigate to="/zh" replace />} />

        {/* 所有頁面都掛在 /:lang 底下，LanguageProvider 移進 Router 裡 */}
        <Route
          path="/:lang/*"
          element={
            <LanguageProvider>
              <AppContent />
            </LanguageProvider>
          }
        />

        {/* 其他不合法路徑，導回中文首頁 */}
        <Route path="*" element={<Navigate to="/zh" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;