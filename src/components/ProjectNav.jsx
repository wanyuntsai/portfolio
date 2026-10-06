import { Link } from 'react-router-dom';

function NavCard({ href, direction, name, subtitle, image, imageClass, containerClass }) {
    const isNext = direction === 'next';
    return (
        <Link
            to={href}
            className={`group flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex-1 min-w-0 ${isNext ? 'flex-row-reverse' : ''}`}
        >
            <div className={`w-10 h-14 md:w-12 md:h-16 rounded-lg overflow-hidden shrink-0 ${containerClass ?? 'bg-gray-100'}`}>
                <img
                    src={image}
                    alt={name}
                    className={`w-full h-full group-hover:scale-105 transition-transform duration-300 ${imageClass ?? 'object-cover object-top'}`}
                />
            </div>
            <div className={`flex-1 min-w-0 ${isNext ? 'text-right' : ''}`}>
                <p className="font-mono text-[10px] md:text-xs text-text-secondary uppercase tracking-widest mb-0.5">
                    {isNext ? 'Next →' : '← Prev'}
                </p>
                <p className="font-medium text-text-primary text-xs md:text-sm leading-snug truncate">{name}</p>
                <p className="text-[10px] md:text-xs text-text-secondary truncate">{subtitle}</p>
            </div>
        </Link>
    );
}

export default function ProjectNav({ prev, next }) {
    return (
        <div className="w-full flex justify-between items-stretch gap-3 md:gap-4 py-8 md:py-12">
            {prev ? <NavCard {...prev} direction="prev" /> : <div className="flex-1" />}
            {next ? <NavCard {...next} direction="next" /> : <div className="flex-1" />}
        </div>
    );
}
