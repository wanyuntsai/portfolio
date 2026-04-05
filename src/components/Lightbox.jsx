import { useEffect } from 'react';

function Lightbox({ src, onClose }) {
    useEffect(() => {
        if (!src) return;
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [src, onClose]);

    if (!src) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={onClose}
        >
            <img
                src={src}
                alt=""
                className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
}

export default Lightbox;
