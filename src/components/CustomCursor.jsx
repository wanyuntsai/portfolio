import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only on pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let visible = false;

    const show = () => {
      if (visible) return;
      visible = true;
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    };

    const onMove = (e) => {
      show();
      dot.style.transform  = `translate(${e.clientX}px, ${e.clientY}px)`;
      ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const onLeave = () => {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
      visible = false;
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      {/* dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 12, height: 12,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #7BE849 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          transition: 'opacity 0.2s',
        }}
      />
      {/* ring — slight lag via CSS transition */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 32, height: 32,
          borderRadius: '50%',
          border: '1px solid rgba(45,90,39,0.45)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          transition: 'transform 0.12s ease-out, opacity 0.2s',
        }}
      />
    </>
  );
}
