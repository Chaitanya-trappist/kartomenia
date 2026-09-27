import React from 'react';
import { motion } from 'framer-motion';

export const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  yOffset = 24,
  once = true,
  amount = 0.1,
  id,
}) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{
        opacity: 1,
        y: 0,
        transitionEnd: { transform: 'none' },
      }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
