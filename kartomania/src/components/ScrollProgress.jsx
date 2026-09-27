import React, { useEffect, useRef, useState } from 'react';

const ScrollProgress = () => {
  const barRef = useRef(null);
  const [supportsCssScroll, setSupportsCssScroll] = useState(false);

  useEffect(() => {
    if (typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline', 'scroll()')) {
      setSupportsCssScroll(true);
      return;
    }

    if (typeof window !== 'undefined' && window.lenis) {
      const onLenisScroll = (e) => {
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${e.progress})`;
        }
      };
      window.lenis.on('scroll', onLenisScroll);
      return () => window.lenis?.off('scroll', onLenisScroll);
    }

    let ticking = false;
    let cachedScrollable = document.documentElement.scrollHeight - window.innerHeight;

    const handleResize = () => {
      cachedScrollable = document.documentElement.scrollHeight - window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (cachedScrollable > 0 && barRef.current) {
            const progress = Math.min(1, Math.max(0, window.scrollY / cachedScrollable));
            barRef.current.style.transform = `scaleX(${progress})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-black/5 pointer-events-none" aria-hidden="true">
      <div
        ref={barRef}
        className={`h-full w-full bg-[#F47C20] origin-left ${
          supportsCssScroll ? 'scroll-driven-progress' : ''
        }`}
        style={supportsCssScroll ? undefined : { transform: 'scaleX(0)' }}
      />
    </div>
  );
};

export default ScrollProgress;
