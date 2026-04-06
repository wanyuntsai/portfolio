import { useState, useEffect, useCallback, useRef } from 'react';

export function useToc() {
    const [tocItems, setTocItems] = useState([]);
    const [activeId, setActiveId] = useState('');
    const [showToc, setShowToc] = useState(false);
    const debounceRef = useRef(null);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
    };

    const scan = useCallback(() => {
        const headings = Array.from(document.querySelectorAll('h2'));
        const items = headings.map((h, i) => {
            const id = `toc-${i}`;
            h.id = id;
            h.style.scrollMarginTop = '100px';
            return { id, text: h.textContent.trim() };
        });
        setTocItems(items);
    }, []);

    useEffect(() => {
        const debouncedScan = () => {
            clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(scan, 100);
        };

        debouncedScan();

        const observer = new MutationObserver(debouncedScan);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            clearTimeout(debounceRef.current);
        };
    }, [scan]);

    useEffect(() => {
        if (!tocItems.length) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                        setShowToc(true);
                    }
                });
            },
            { rootMargin: '0% 0% -50% 0%', threshold: 0.1 }
        );
        tocItems.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [tocItems]);

    return { tocItems, activeId, showToc, scrollToSection };
}
