import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LanguageToggleDesktop, LanguageToggleMobile } from './LanguageToggle';


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [copied, setCopied] = useState(false);
    const { t, language } = useLanguage();
    const menuFont = language === 'zh' ? 'font-sans' : 'font-mono';

    const copyEmail = () => {
        navigator.clipboard.writeText('yuntsaica@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const location = useLocation();

    // background color by page
    const isHome = location.pathname === '/';
    const isProjectDetail = location.pathname.startsWith('/work/') && location.pathname !== '/work';
    const bgColor = isProjectDetail ? 'bg-white' : isHome ? 'bg-transparent' : 'bg-brand-cream';

    // fix scroll lock when menu open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen])

    const navPosition = isHome ? 'absolute inset-x-0 top-0 z-10' : '';

    return (
        <>
        <nav className={`flex justify-between items-center p-6 ${bgColor} ${navPosition}`}>
            <Link to="/" className="font-hand text-2xl">Yun Tsai</Link>

            {/* desktop menu */}
            <div className={`hidden md:flex gap-8 items-center ${menuFont}`}>
                <Link to="/work" className="py-2 px-4 text-text-secondary text-center hover:text-[#9BBF6A] transition-all hover:scale-105">{t('Work', '作品')}</Link>
                <Link to="/about" className="text-text-secondary text-center hover:text-[#9BBF6A] transition-colors hover:scale-105">{t('About', '關於我')}</Link>

                {/* Contact with Dropdown */}
                <div className="relative group">
                    <span className="py-2 px-4 hover:text-[#9BBF6A] hover:scale-105 transition-all cursor-pointer font-mono text-text-secondary inline-block">
                        {t('Contact', '聯絡我')}
                    </span>

                    {/* Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="bg-white rounded-lg shadow-lg border border-border p-3 min-w-45">

                            {/* LinkedIn */}
                            <a
                                href="https://linkedin.com/in/yun-tsai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brand-green-light transition-colors"
                            >
                                <svg className="w-5 h-5 fill-brand-green" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                                <span className="font-mono text-sm text-text-primary">LinkedIn</span>
                            </a>

                            {/* Email */}
                            <button
                                onClick={copyEmail}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brand-green-light transition-colors w-full text-left"
                            >
                                <svg className="w-5 h-5 stroke-brand-green" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                <span className="font-mono text-sm text-text-primary">{copied ? t('Email copied! ☻', '已複製! ☻') : t('Copy Email', '複製信箱')}</span>
                            </button>

                        </div>
                    </div>
                </div>

                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
                >{t('Resume', '履歷')}
                </a>

                <LanguageToggleDesktop />
            </div>

            {/* mobile hamburger */}
            <button onClick={() => setIsOpen(!isOpen)} className="flex flex-col gap-1.5 md:hidden">
                <span className="w-6 h-0.5 bg-black"></span>
                <span className="w-6 h-0.5 bg-black"></span>
                <span className="w-6 h-0.5 bg-black"></span>
            </button>
        </nav>

        {/* mobile menu overlay */}
        {isOpen && (
            <div className={`fixed inset-0 bg-brand-cream z-50 flex flex-col overflow-hidden ${menuFont}`}>
                {/* logo */}
                <div className="relative z-10 flex justify-between items-center p-6">
                    <Link to="/" className="font-hand text-2xl" onClick={() => setIsOpen(false)}>Yun Tsai</Link>

                    {/* close button */}
                    <button onClick={() => setIsOpen(false)} className="flex flex-col justify-center items-center w-6 h-6 relative">
                        <span className='w-6 h-[2px] bg-black absolute rotate-45'></span>
                        <span className='w-6 h-[2px] bg-black absolute -rotate-45'></span>
                    </button>
                </div>

                {/* Menu links */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                    <Link to="/work" onClick={() => setIsOpen(false)} className="text-xl text-text-secondary px-8 py-3 rounded-full border-2 border-transparent hover:border-[#9BBF6A] hover:text-[#9BBF6A] hover:scale-105 transition-all">{t('Work', '作品')}</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className="text-xl text-text-secondary px-8 py-3 rounded-full border-2 border-transparent hover:border-[#9BBF6A] hover:text-[#9BBF6A] hover:scale-105 transition-all">{t('About', '關於我')}</Link>

                    {/* Contact - Mobile */}
                    <div className="flex flex-col items-center">
                        <span
                            className="text-xl text-text-secondary px-8 py-3 rounded-full border-2 border-transparent hover:border-[#9BBF6A] hover:text-[#9BBF6A] hover:scale-105 transition-all cursor-pointer"
                            onClick={() => setShowContact(!showContact)}
                        >
                            {t('Contact', '聯絡我')}
                        </span>

                        {showContact && (
                            <div className="flex flex-col items-center gap-2 mt-4">
                                <a
                                    href="https://linkedin.com/in/yun-tsai"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)}
                                    className="text-base text-text-secondary hover:text-[#9BBF6A] transition-colors"
                                >
                                    LinkedIn
                                </a>
                                <button
                                    onClick={() => { copyEmail(); setIsOpen(false); }}
                                    className="text-base text-text-secondary hover:text-[#9BBF6A] transition-colors"
                                >
                                    {copied ? t('Email copied! ☻', '已複製! ☻') : t('Copy Email', '複製信箱')}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Resume */}
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-2 border border-gray-300 rounded-full text-lg hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >{t('Resume', '履歷')}
                    </a>

                    <LanguageToggleMobile />
                </div>
            </div>
        )}
        </>
    )
}

export default Navbar;
