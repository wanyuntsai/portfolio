import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    // t function: takes English and Chinese strings and returns the correct text based on the current language
    const t = (en, zh) => language  === 'en' ? en : zh;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}