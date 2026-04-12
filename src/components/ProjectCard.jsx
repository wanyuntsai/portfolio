import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function ProjectCard({ project }) {
  const { t } = useLanguage();

  return (
    <Link
      to={project.comingSoon ? '#' : project.link}
      onClick={project.comingSoon ? e => e.preventDefault() : undefined}
      className={`rounded-lg p-6 flex flex-col transition-all duration-300 group h-full ${
        project.comingSoon ? 'cursor-default opacity-70' : 'hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] cursor-pointer'
      }`}
      style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}
    >
      {/* Image */}
      <div className="rounded-lg mb-4 overflow-hidden flex justify-center items-center">
        {project.comingSoon ? (
          <div className="w-full h-48 md:h-60 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-text-secondary font-mono text-base opacity-40">{t('Coming Soon', '即將推出')}</span>
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-16/10 object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      {/* Title */}
      <div className="flex items-center gap-3 mb-1">
        <h3 className="font-serif text-xl md:text-2xl text-text-primary">{project.title}</h3>
        {project.comingSoon && (
          <span className="text-base font-mono px-2 py-0.5 rounded-full border border-text-secondary text-text-secondary opacity-60">
            {t('Coming Soon', '即將推出')}
          </span>
        )}
      </div>

      {/* Subtitle */}
      <p className="text-text-secondary text-base mb-3 font-serif">{project.subtitle}</p>

      {/* Description — desktop only, flex-1 pushes tags+CTA to bottom */}
      <p className="hidden md:flex md:flex-1 text-base text-text-secondary mb-3 font-funnel leading-relaxed line-clamp-2">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex gap-1.5 flex-wrap mb-4">
        {project.tags?.map((tag, index) => (
          <span
            key={index}
            className="rounded-full px-2 py-0.5 text-xs font-mono"
            style={{ border: '1px solid #A8C878', background: '#E4EED4', color: '#3A6020' }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      {!project.comingSoon && (
        <span className="relative text-brand-green text-base font-mono inline-flex items-center gap-1 w-fit
          transition-colors duration-300 group-hover:text-brand-green-light
          after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-brand-green
          after:transition-[width,background-color] after:duration-300 after:ease-out
          group-hover:after:w-[calc(100%+4px)] group-hover:after:bg-brand-green-light">
          {t('Case Study', '案例研究')}
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
        </span>
      )}
    </Link>
  );
}

export default ProjectCard;
