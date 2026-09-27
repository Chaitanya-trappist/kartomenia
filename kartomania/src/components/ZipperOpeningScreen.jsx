import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

export const ZipperOpeningScreen = ({ onComplete }) => {
  const [stage, setStage] = useState('unzipping');
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timerOpen = setTimeout(() => {
      setStage('revealed');
    }, 1600);

    const timerDone = setTimeout(() => {
      setIsDismissed(true);
      if (onComplete) onComplete();
    }, 2200);

    return () => {
      clearTimeout(timerOpen);
      clearTimeout(timerDone);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsDismissed(true);
    if (onComplete) onComplete();
  };

  if (isDismissed) return null;

  const teethCount = 32;
  const teeth = Array.from({ length: teethCount }, (_, i) => i);

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          key="zipper-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } }}
          className="fixed inset-0 z-[99999] overflow-hidden select-none pointer-events-auto"
          style={{ perspective: '1200px' }}
        >
          <button
            onClick={handleSkip}
            className="absolute top-5 right-5 z-50 px-4 py-2 rounded-full bg-black/60 hover:bg-[#F47C20] text-white/90 hover:text-white font-mono text-[10px] font-black uppercase tracking-widest backdrop-blur-md transition-all border border-white/20 cursor-pointer flex items-center gap-1.5 shadow-lg"
          >
            <span>SKIP</span>
            <span>&rarr;</span>
          </button>

          <div className="absolute top-5 left-5 z-50 font-mono text-xs text-white/80 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F47C20] animate-ping" />
            <span className="font-bold tracking-widest uppercase text-white">KARTOMANIA</span>
          </div>

          <motion.div
            initial={{ x: 0, rotateY: 0, opacity: 1 }}
            animate={{
              x: stage === 'revealed' ? '-105%' : ['0%', '-8%', '-35%', '-105%'],
              rotateY: stage === 'revealed' ? -40 : [0, -5, -20, -40],
              opacity: stage === 'revealed' ? 0 : [1, 1, 0.95, 0]
            }}
            transition={{
              duration: 2.1,
              times: [0, 0.3, 0.75, 1],
              ease: [0.25, 0.1, 0.25, 1]
            }}
            style={{ transformOrigin: 'left center' }}
            className="absolute top-0 left-0 bottom-0 w-1/2 bg-[#0A0A0A] border-r-2 border-[#333333] shadow-[20px_0_40px_rgba(0,0,0,0.9)] z-20 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#444444_1px,transparent_1px)] [background-size:10px_10px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-[#0A0A0A] to-[#141414]" />

            <div className="absolute top-0 bottom-0 right-0 w-4 flex flex-col justify-between py-1 z-10">
              {teeth.map((t) => (
                <motion.div
                  key={`left-tooth-${t}`}
                  initial={{ rotate: 0, x: 0 }}
                  animate={{
                    rotate: stage === 'revealed' ? -45 : [0, -15, -45],
                    x: stage === 'revealed' ? -10 : [0, -3, -10]
                  }}
                  transition={{
                    duration: 1.8,
                    delay: t * 0.04,
                    ease: 'easeOut'
                  }}
                  className="w-3.5 h-2 bg-gradient-to-l from-[#F47C20] via-[#CCCCCC] to-[#555555] rounded-l-xs shadow-xs"
                />
              ))}
            </div>

            <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-[#F47C20] blur-[1px] opacity-75" />
          </motion.div>

          <motion.div
            initial={{ x: 0, rotateY: 0, opacity: 1 }}
            animate={{
              x: stage === 'revealed' ? '105%' : ['0%', '8%', '35%', '105%'],
              rotateY: stage === 'revealed' ? 40 : [0, 5, 20, 40],
              opacity: stage === 'revealed' ? 0 : [1, 1, 0.95, 0]
            }}
            transition={{
              duration: 2.1,
              times: [0, 0.3, 0.75, 1],
              ease: [0.25, 0.1, 0.25, 1]
            }}
            style={{ transformOrigin: 'right center' }}
            className="absolute top-0 right-0 bottom-0 w-1/2 bg-[#0A0A0A] border-l-2 border-[#333333] shadow-[-20px_0_40px_rgba(0,0,0,0.9)] z-20 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#444444_1px,transparent_1px)] [background-size:10px_10px]" />
            <div className="absolute inset-0 bg-gradient-to-l from-black via-[#0A0A0A] to-[#141414]" />

            <div className="absolute top-0 bottom-0 left-0 w-4 flex flex-col justify-between py-1 z-10 translate-y-1.5">
              {teeth.map((t) => (
                <motion.div
                  key={`right-tooth-${t}`}
                  initial={{ rotate: 0, x: 0 }}
                  animate={{
                    rotate: stage === 'revealed' ? 45 : [0, 15, 45],
                    x: stage === 'revealed' ? 10 : [0, 3, 10]
                  }}
                  transition={{
                    duration: 1.8,
                    delay: t * 0.04,
                    ease: 'easeOut'
                  }}
                  className="w-3.5 h-2 bg-gradient-to-r from-[#F47C20] via-[#CCCCCC] to-[#555555] rounded-r-xs shadow-xs"
                />
              ))}
            </div>

            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#F47C20] blur-[1px] opacity-75" />
          </motion.div>

          <motion.div
            initial={{ y: '-30vh', scale: 0.9, opacity: 1 }}
            animate={{
              y: '125vh',
              scale: [0.9, 1.15, 1.45],
              opacity: [1, 1, 1, 0.9]
            }}
            transition={{
              duration: 2.0,
              times: [0, 0.6, 1],
              ease: [0.22, 0.05, 0.25, 1]
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none"
            style={{ width: '130px' }}
          >
            <div className="w-2 h-72 bg-gradient-to-t from-[#F47C20] via-[#F47C20]/60 to-transparent blur-[2px] -mb-12" />

            <div className="relative w-full flex flex-col items-center">
              
              <div 
                className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-64 h-48 bg-gradient-to-b from-white/40 via-[#F47C20]/25 to-transparent blur-lg pointer-events-none"
                style={{ transform: 'rotate(180deg) translateX(50%)' }}
              />

              <svg
                viewBox="0 0 160 260"
                className="w-28 sm:w-32 h-auto drop-shadow-[0_12px_30px_rgba(244,124,32,0.8)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="10" y="32" width="24" height="46" rx="6" fill="#111111" stroke="#444444" strokeWidth="2" />
                <rect x="126" y="32" width="24" height="46" rx="6" fill="#111111" stroke="#444444" strokeWidth="2" />
                <rect x="6" y="172" width="28" height="56" rx="7" fill="#0D0D0D" stroke="#444444" strokeWidth="2" />
                <rect x="126" y="172" width="28" height="56" rx="7" fill="#0D0D0D" stroke="#444444" strokeWidth="2" />

                <line x1="34" y1="55" x2="126" y2="55" stroke="#666666" strokeWidth="4" strokeLinecap="round" />
                <line x1="28" y1="200" x2="132" y2="200" stroke="#555555" strokeWidth="6" strokeLinecap="round" />

                <path
                  d="M 26 48 C 35 15, 125 15, 134 48 C 134 62, 116 66, 80 66 C 44 66, 26 62, 26 48 Z"
                  fill="#0A0A0A"
                  stroke="#F47C20"
                  strokeWidth="3.5"
                />

                <path d="M 72 20 L 72 66" stroke="#F47C20" strokeWidth="4.5" />
                <path d="M 88 20 L 88 66" stroke="#F47C20" strokeWidth="4.5" />

                <path
                  d="M 20 72 C 20 66, 38 72, 38 82 L 38 185 C 38 195, 20 195, 20 185 Z"
                  fill="#111111"
                  stroke="#F47C20"
                  strokeWidth="2.5"
                />
                <path
                  d="M 140 72 C 140 66, 122 72, 122 82 L 122 185 C 122 195, 140 195, 140 185 Z"
                  fill="#111111"
                  stroke="#F47C20"
                  strokeWidth="2.5"
                />

                <rect x="40" y="58" width="80" height="140" rx="8" fill="#181818" stroke="#333333" strokeWidth="2" />

                <ellipse cx="80" cy="140" rx="22" ry="26" fill="#0A0A0A" stroke="#444444" strokeWidth="2" />
                
                <rect x="100" y="130" width="22" height="30" rx="3" fill="#333333" stroke="#555555" strokeWidth="1.5" />
                <circle cx="111" cy="145" r="5" fill="#F47C20" />

                <circle cx="80" cy="132" r="14" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" />
                <path d="M 71 125 C 75 120, 85 120, 89 125" stroke="#F47C20" strokeWidth="4.5" strokeLinecap="round" />

                <ellipse cx="80" cy="98" rx="14" ry="8" fill="none" stroke="#FFFFFF" strokeWidth="3" />

                <rect x="22" y="222" width="116" height="10" rx="4" fill="#0A0A0A" stroke="#F47C20" strokeWidth="2.5" />
                <circle cx="50" cy="227" r="4" fill="#F47C20" className="animate-ping" />
                <circle cx="110" cy="227" r="4" fill="#F47C20" className="animate-ping" />
              </svg>

              <div className="w-7 h-7 -mt-2 rounded-full border-2 border-[#F47C20] bg-black flex items-center justify-center shadow-lg">
                <Zap className="w-3.5 h-3.5 text-[#F47C20] fill-current animate-pulse" />
              </div>
            </div>
          </motion.div>

          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 bg-gradient-to-b from-[#F47C20] via-white to-[#F47C20] blur-[3px] opacity-90 z-10" />

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ZipperOpeningScreen;
