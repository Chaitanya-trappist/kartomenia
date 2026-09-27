export const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const fadeBlur = {
  hidden: { opacity: 0, y: 50, filter: 'blur(20px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const drawerSlide = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
