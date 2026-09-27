import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';

const WEEKDAY_PACKAGES = [
  {
    id: 'wd-session-550',
    type: 'WEEKDAY SESSION',
    name: 'RACE SESSION',
    price: '₹550',
    sessions: '10 MIN SESSION',
    theme: 'light',
    btnText: 'BOOK NOW'
  },
  {
    id: 'wd-session-650',
    type: 'WEEKDAY PRO SESSION',
    name: 'PRO RACE SESSION',
    price: '₹650',
    sessions: '10 MIN PRO SESSION',
    theme: 'light',
    btnText: 'BOOK NOW'
  },
  {
    id: 'wd-bulk-5',
    type: 'WEEKDAY BULK PASS',
    name: '5 SESSIONS PASS',
    price: '₹3,250',
    sessions: '5 Race Sessions',
    theme: 'light',
    btnText: 'BUY PASS'
  },
  {
    id: 'wd-bulk-10',
    type: 'POPULAR BUNDLE',
    name: '10 SESSIONS PASS',
    price: '₹6,500',
    sessions: '10 + 2 Bonus Sessions',
    theme: 'dark',
    btnText: 'BUY 10-PASS'
  },
  {
    id: 'wd-bulk-15',
    type: 'GROUP PASS',
    name: '15 SESSIONS PASS',
    price: '₹9,750',
    sessions: '15 + 3 Bonus Sessions',
    theme: 'light',
    btnText: 'BUY PASS'
  },
  {
    id: 'wd-bulk-20',
    type: 'CHAMPION PASS',
    name: '20 SESSIONS PASS',
    price: '₹13,000',
    sessions: '20 + 4 Bonus Sessions',
    theme: 'light',
    btnText: 'BUY PASS'
  }
];

const WEEKEND_PACKAGES = [
  {
    id: 'we-session-650',
    type: 'WEEKEND SESSION',
    name: 'RACE SESSION',
    price: '₹650',
    sessions: '10 MIN SESSION',
    theme: 'light',
    btnText: 'BOOK NOW'
  },
  {
    id: 'we-session-760',
    type: 'WEEKEND PRO SESSION',
    name: 'PRO RACE SESSION',
    price: '₹760',
    sessions: '10 MIN PRO SESSION',
    theme: 'light',
    btnText: 'BOOK NOW'
  },
  {
    id: 'we-bulk-5',
    type: 'WEEKEND BULK PASS',
    name: '5 SESSIONS PASS',
    price: '₹3,250',
    sessions: '5 Race Sessions',
    theme: 'light',
    btnText: 'BUY PASS'
  },
  {
    id: 'we-bulk-10',
    type: 'POPULAR BUNDLE',
    name: '10 SESSIONS PASS',
    price: '₹6,500',
    sessions: '10 + 2 Bonus Sessions',
    theme: 'dark',
    btnText: 'BUY 10-PASS'
  },
  {
    id: 'we-bulk-15',
    type: 'GROUP PASS',
    name: '15 SESSIONS PASS',
    price: '₹9,750',
    sessions: '15 + 3 Bonus Sessions',
    theme: 'light',
    btnText: 'BUY PASS'
  },
  {
    id: 'we-bulk-20',
    type: 'CHAMPION PASS',
    name: '20 SESSIONS PASS',
    price: '₹13,000',
    sessions: '20 + 4 Bonus Sessions',
    theme: 'light',
    btnText: 'BUY PASS'
  }
];

const SingleBook = ({ 
  title, 
  subtitle,
  icon: Icon,
  packages, 
  onOpenBooking 
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev < packages.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : packages.length - 1));
  };

  const activePkg = packages[currentPage];

  const pageVariants = {
    enter: (dir) => ({
      rotateY: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.92,
      x: dir > 0 ? 50 : -50,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.92,
      x: dir > 0 ? -50 : 50,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4 select-none">
      
      <div className="flex items-center justify-between w-full px-2 font-mono text-xs">
        <div className="flex items-center gap-1.5 font-black text-[#F47C20]">
          <Icon className="w-4 h-4" />
          <span className="uppercase">{title}</span>
          <span className="text-[#888888] font-normal text-[10px] hidden sm:inline">({subtitle})</span>
        </div>

        <div className="flex items-center gap-1.5">
          {packages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentPage ? 1 : -1);
                setCurrentPage(idx);
              }}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentPage === idx
                  ? 'w-5 bg-[#F47C20]'
                  : 'w-2 bg-[#CCCCCC] hover:bg-[#999999]'
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>

        <span className="font-bold text-[#888888] text-[11px]">
          PAGE {currentPage + 1} / {packages.length}
        </span>
      </div>

      <div
        className="relative w-full aspect-[4/3] sm:aspect-[16/11] min-h-[300px] sm:min-h-[340px]"
        style={{ perspective: '1400px' }}
      >
        <div className="absolute inset-0 rounded-3xl bg-[#E5E5E5] translate-x-2 translate-y-2.5 opacity-60 shadow-lg" />
        <div className="absolute inset-0 rounded-3xl bg-[#ECECEC] translate-x-1 translate-y-1.5 opacity-80" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activePkg.id}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -100 || offset.x < -60) {
                handleNext();
              } else if (swipe > 100 || offset.x > 60) {
                handlePrev();
              }
            }}
            className={`absolute inset-0 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl cursor-grab active:cursor-grabbing border ${
              activePkg.theme === 'dark'
                ? 'bg-[#0A0A0A] text-white border-white/15'
                : 'bg-white text-[#111111] border-black/10'
            }`}
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div className="flex items-center justify-between font-mono text-xs pb-2 border-b border-black/10 dark:border-white/10">
              <span className={`px-2.5 py-0.5 rounded-full font-black text-[10px] uppercase tracking-wider ${
                activePkg.theme === 'dark' ? 'bg-[#F47C20] text-white' : 'bg-[#FAFAFA] text-[#F47C20]'
              }`}>
                {activePkg.type}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="font-mono font-bold text-[#888888] hover:text-[#F47C20] text-[10px] uppercase flex items-center gap-1 cursor-pointer transition-colors bg-transparent border-none p-0"
              >
                <span>FLIP PAGE</span>
                <span>&rarr;</span>
              </button>
            </div>

            <div className="space-y-2.5 my-auto py-2 text-center">
              <h3 className={`text-2xl sm:text-3xl font-display font-black uppercase tracking-tight ${
                activePkg.theme === 'dark' ? 'text-white' : 'text-[#0A0A0A]'
              }`}>
                {activePkg.name}
              </h3>

              <div className={`p-4 sm:p-5 rounded-2xl mx-auto max-w-xs ${
                activePkg.theme === 'dark' ? 'bg-white/10' : 'bg-[#FAFAFA]'
              }`}>
                <div className="text-4xl sm:text-5xl font-display font-black text-[#F47C20] tracking-tight">
                  {activePkg.price}
                </div>
                <span className={`font-mono text-xs font-bold block mt-1 ${
                  activePkg.theme === 'dark' ? 'text-white/80' : 'text-[#666666]'
                }`}>
                  {activePkg.sessions}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className={`w-full py-3.5 rounded-xl font-mono text-xs sm:text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                  activePkg.theme === 'dark'
                    ? 'bg-[#F47C20] hover:bg-white text-white hover:text-[#0A0A0A]'
                    : 'bg-[#0A0A0A] hover:bg-[#F47C20] text-white'
                }`}
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>{activePkg.btnText}</span>
              </button>
            </div>

            <div
              onClick={handleNext}
              className="absolute bottom-2 right-2 w-8 h-8 opacity-40 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              title="Click to flip to next page"
            >
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-[#F47C20]" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between w-full max-w-xs gap-3 pt-1">
        <button
          onClick={handlePrev}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#FAFAFA] hover:bg-[#F0F0F0] text-[#0A0A0A] font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4 text-[#F47C20]" />
          <span>PREV</span>
        </button>

        <button
          onClick={handleNext}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#0A0A0A] hover:bg-[#F47C20] text-white font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
        >
          <span>NEXT</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export const PackagesFlipBook = ({ onOpenBooking }) => {
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      
      <SingleBook
        title="WEEKDAYS"
        subtitle="MON – FRI"
        icon={Calendar}
        packages={WEEKDAY_PACKAGES}
        onOpenBooking={onOpenBooking}
      />

      <SingleBook
        title="WEEKENDS"
        subtitle="SAT – SUN & HOLIDAYS"
        icon={Sparkles}
        packages={WEEKEND_PACKAGES}
        onOpenBooking={onOpenBooking}
      />

    </div>
  );
};

export default PackagesFlipBook;
