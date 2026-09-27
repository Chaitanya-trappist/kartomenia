import { useState, useEffect } from 'react';

export const useCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState({ active: false, text: '', type: 'default' });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;
    setIsVisible(true);

    let rafId = null;

    const onMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const targetEl = e.target;

      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        setMousePosition({ x, y });

        const target = (targetEl && typeof targetEl.closest === 'function')
          ? targetEl.closest('[data-cursor], button, a, input, [role="button"]')
          : null;

        if (target) {
          const cursorAttr = target.getAttribute('data-cursor');
          if (cursorAttr) {
            setCursorState({ active: true, text: cursorAttr, type: 'badge' });
          } else {
            setCursorState({ active: true, text: '', type: 'hover' });
          }
        } else {
          setCursorState({ active: false, text: '', type: 'default' });
        }
      });
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return { mousePosition, cursorState, isVisible };
};
