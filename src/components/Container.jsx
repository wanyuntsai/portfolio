export function Container({ children, className = '' }) {
  return (
    <div className={`max-w-[1280px] mx-auto px-5 md:px-16 xl:px-20 ${className}`}>
      {children}
    </div>
  );
}
