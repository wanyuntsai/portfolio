import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function ProjectCard({ project }) {
  const { t } = useLanguage();

  const isLiveOnly = !project.link && project.liveUrl;

  const cardContent = (
    <>
      {/* Image */}
      <div className="rounded-lg mb-4 overflow-hidden flex justify-center items-center">
        <img
          src={project.image}
          alt={project.title}
          className="w-full aspect-16/10 object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Title */}
      <div className="flex items-center gap-3 mb-1">
        <h3 className="font-serif text-xl md:text-2xl text-text-primary">{project.title}</h3>
      </div>

      {/* Subtitle */}
      <p className="text-text-secondary text-base mb-3 font-serif">{project.subtitle}</p>

      {/* Description */}
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
      <span className="relative text-brand-green text-base font-mono inline-flex items-center gap-1 w-fit
        transition-colors duration-300 group-hover:text-brand-green-light
        after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-brand-green
        after:transition-[width,background-color] after:duration-300 after:ease-out
        group-hover:after:w-[calc(100%+4px)] group-hover:after:bg-brand-green-light">
        {isLiveOnly ? t('Live Demo', '查看成品') : t('Case Study', '案例研究')}
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
          {isLiveOnly ? '↗' : '→'}
        </span>
      </span>
    </>
  );

  const cardClass = `rounded-lg p-6 flex flex-col transition-all duration-300 group h-full hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] cursor-pointer`;
  const cardStyle = { background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' };

  if (isLiveOnly) {
    return (
      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={cardClass} style={cardStyle}>
        {cardContent}
      </a>
    );
  }

  return (
    <Link to={project.link} className={cardClass} style={cardStyle}>
      {cardContent}
    </Link>
  );
}

export default ProjectCard;
