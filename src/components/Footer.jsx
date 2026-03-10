import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

function Footer() {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText('yuntsaica@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <footer className="text-brand-green border-t border-border py-8 px-5 md:px-20 w-full mt-auto bg-transparent">
            <div className="flex justify-between items-start">
                <div className="flex flex-col items-start">
                    <p className="font-medium font-mono">{t('Get in Touch!', '歡迎與我聯繫！')}</p>
                    <button onClick={copyEmail} className="text-sm mt-1 font-mono flex gap-2 cursor-pointer hover:opacity-80 transition-opacity">{copied ? t('Email copied! ☻', '已複製! ☻') : 'yuntsaica@gmail.com'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth="2"/>
                    </svg>
                    </button>
                </div>
                <a href="https://linkedin.com/in/yun-tsai" target="_blank" rel="noopener noreferrer">
                    <svg className="w-6 h-6 fill-brand-green" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                </a>
            </div>
            <div className="text-center text-xs font-mono mt-5">
                <p>&copy; 2026 Yun Tsai. </p>
                <p>Designed & built with lots of coffee :)</p>
            </div>
        </footer>
    )
}

export default Footer;