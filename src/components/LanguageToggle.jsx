import { useLanguage } from '../context/LanguageContext';

function LanguageToggleButton({ className = '' }) {
    const { language, setLanguage } = useLanguage();
    const next = language === 'en' ? 'zh' : 'en';
    const label = language === 'en' ? '中' : 'EN';

    return (
        <button
            onClick={() => setLanguage(next)}
            className={`rounded-full text-xs font-medium transition-all 
bg-brand-green text-white
hover:bg-white hover:text-brand-green
${className} cursor-pointer hover:scale-105 active:scale-95`}
        >
            {label}
        </button>
    );
}

// desktop - shown inside navbar
export function LanguageToggleDesktop() {
    return <LanguageToggleButton className="hidden md:flex items-center justify-center w-9 h-9" />;
}

// mobile - shown inside hamburger menu
export function LanguageToggleMobile() {
    return <LanguageToggleButton className="w-11 h-11" />;
}
