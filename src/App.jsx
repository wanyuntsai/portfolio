import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import NotFound from './pages/NotFound';

// projects page
import LearnNow from './pages/work/Learnnow'
import Vanlink from './pages/work/Vanlink'
import YouTubeMusic from "./pages/work/YouTubeMusic";
import MindLog from './pages/work/MindLog';
import YunJam from './pages/work/YunJam';

function AppContent() {
  const location = useLocation();
  const isWorkSubPage = location.pathname.startsWith('/work/');

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
          {/* project routes */}
          <Route path="/work/learnnow" element={<LearnNow />} />
          <Route path="/work/vanlink" element={<Vanlink />} />
          <Route path="/work/youtubemusic" element={<YouTubeMusic />} />
          <Route path="/work/mindlog" element={<MindLog />} />
          <Route path="/work/yunjam" element={<YunJam />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <div className={isWorkSubPage ? 'bg-neutral-50' : ''}>
        <Footer/>
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;