import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

function Footer() {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText('yuntsaiintw@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <footer className="text-brand-green border-t border-border py-8 w-full mt-auto bg-transparent">
          <div className="max-w-7xl mx-auto px-5 md:px-20">
            <div className="flex justify-between items-start">
                <div className="flex flex-col items-start">
                    <p className="font-medium font-mono">{t('Get in Touch!', '歡迎與我聯繫！')}</p>
                    <button onClick={copyEmail} className="text-sm mt-1 font-mono flex gap-2 cursor-pointer hover:opacity-80 transition-opacity">{copied ? t('Email copied! ☻', '已複製! ☻') : 'yuntsaiintw@gmail.com'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth="2"/>
                    </svg>
                    </button>
                </div>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=yuntsaiintw@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Send me an email via Gmail">
                    <svg className="w-6 h-6 stroke-brand-green" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                    </svg>
                </a>
            </div>
            <div className="text-center text-xs font-mono mt-5">
                <p>&copy; 2026 Yun Tsai </p>
                <p className="text-xs text-brand-green mt-0.5">Designed & built with lots of coffee :)</p>
            </div>
          </div>
        </footer>
    )
}

export default Footer;