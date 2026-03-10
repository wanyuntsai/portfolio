import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';

// projects page
// import CloudAir from './pages/work/CloudAir'
import LearnNow from './pages/work/Learnnow'
import Vanlink from './pages/work/Vanlink'
// import MissBean from './pages/work/MissBean'

function AppContent() {
  const location = useLocation();
  const isWorkSubPage = location.pathname.startsWith('/work/');

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
          {/* <Route path="/work/Cloudair" element={<CloudAir/>} /> */}
        </Routes>
      </main>
      <div className={isWorkSubPage ? 'bg-white' : ''}>
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