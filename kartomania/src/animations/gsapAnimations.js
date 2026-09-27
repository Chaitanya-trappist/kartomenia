import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initHeroZoom = (containerRef, bgRef, contentRef) => {
  if (!containerRef.current || !bgRef.current) return null;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.3,
      },
    });

    tl.to(bgRef.current, {
      scale: 0.95,
      borderRadius: '24px',
      opacity: 0.6,
      ease: 'power1.out',
    }, 0);

    if (contentRef?.current) {
      tl.to(contentRef.current, {
        y: -60,
        opacity: 0.2,
        ease: 'power1.out',
      }, 0);
    }
  }, containerRef);

  return ctx;
};

export const initClipMaskReveal = (elementRef) => {
  if (!elementRef.current) return null;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      elementRef.current,
      { scale: 1.15, opacity: 0.5, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
      {
        scale: 1,
        opacity: 1,
        clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
        },
      }
    );
  });

  return ctx;
};
