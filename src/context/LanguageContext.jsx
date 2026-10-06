import { createContext, useContext, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const { lang } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const language = lang === 'en' ? 'en' : 'zh';

    useEffect(() => {
        document.documentElement.lang = language === 'en' ? 'en' : 'zh-TW';
        localStorage.setItem('language', language);
    }, [language]);

    // 網址帶入非法語言代碼(例如 /fr)時，自動導回中文版本
    useEffect(() => {
        if (lang !== 'zh' && lang !== 'en') {
            const rest = location.pathname.replace(`/${lang}`, '');
            navigate(`/zh${rest}`, { replace: true });
        }
    }, [lang]);

    const setLanguage = (newLanguage) => {
        const rest = location.pathname.replace(/^\/(zh|en)/, '');
        navigate(`/${newLanguage}${rest}${location.search}`);
    };

    const t = (en, zh) => (language === 'en' ? en : zh);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}