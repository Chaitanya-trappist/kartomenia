import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Flag } from 'lucide-react';

export const OpeningAnimation = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [percent, setPercent] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timers = [];

    timers.push(setTimeout(() => setStage(1), 200));
    timers.push(setTimeout(() => setStage(2), 500));
    timers.push(setTimeout(() => setStage(3), 800));
    timers.push(setTimeout(() => setStage(4), 1100));
    timers.push(setTimeout(() => setStage(5), 1400));

    const progressInterval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 60);

    timers.push(
      setTimeout(() => {
        setStage(6);
        setPercent(100);
      }, 1800)
    );

    timers.push(
      setTimeout(() => {
        setIsFadingOut(true);
      }, 2300)
    );

    timers.push(
      setTimeout(() => {
        if (!completedRef.current) {
          completedRef.current = true;
          document.body.style.overflow = originalOverflow;
          if (onComplete) onComplete();
        }
      }, 2800)
    );

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (completedRef.current) return;
    setIsFadingOut(true);
    setTimeout(() => {
      completedRef.current = true;
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999999] bg-[#050505] text-white flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none transition-opacity duration-500 ease-out will-change-[opacity] ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ isolation: 'isolate' }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none opacity-40" />

      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full blur-[130px] transition-colors duration-500 pointer-events-none ${
          stage === 6 ? 'bg-[#00E5FF]/20' : 'bg-[#F47C20]/15'
        }`}
      />

      <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#888888]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F47C20] animate-pulse" />
          <span className="font-bold text-white uppercase tracking-widest text-[10px] sm:text-xs">
            KARTOMANIA GRAND PRIX • GRID INITIALIZATION
          </span>
        </div>

        <button
          onClick={handleSkip}
          className="group px-4 py-2 rounded-xl bg-white/10 hover:bg-[#F47C20] text-white border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer text-xs font-bold uppercase tracking-wider shadow-md"
        >
          <span>SKIP INTRO</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto w-full text-center space-y-6 sm:space-y-8 my-auto">
        
        <div className="space-y-1">
          <span className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-[#F47C20] block">
            DELHI NCR &bull; 720M CHAMPIONSHIP CIRCUIT
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-white leading-none">
            KART<span className="text-[#F47C20]">OMANIA.</span>
          </h1>
        </div>

        <div className="p-4 sm:p-6 rounded-3xl bg-[#0F0F12] border-2 border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.9)] max-w-lg mx-auto">
          <div className="grid grid-cols-5 gap-2.5 sm:gap-4 items-center justify-center">
            {[1, 2, 3, 4, 5].map((lightNum) => {
              const isLit = stage >= lightNum && stage < 6;
              const isGreenGo = stage === 6;

              return (
                <div key={lightNum} className="flex flex-col items-center gap-1.5 sm:gap-2">
                  <div className="w-12 h-20 sm:w-16 sm:h-28 rounded-2xl bg-[#000000] border-2 border-white/20 flex flex-col items-center justify-between p-2 shadow-inner">
                    
                    <div className={`w-2 h-2 rounded-full ${isLit ? 'bg-[#F47C20] opacity-80' : 'bg-[#222222]'}`} />

                    <div
                      className={`w-8 h-8 sm:w-11 sm:h-11 rounded-full transition-all duration-150 border-2 ${
                        isGreenGo
                          ? 'bg-[#00FF66] border-white shadow-[0_0_35px_#00FF66]'
                          : isLit
                          ? 'bg-[#FF1A1A] border-white shadow-[0_0_35px_#FF1A1A]'
                          : 'bg-[#181818] border-[#333333]'
                      }`}
                    />

                    <span className="font-mono text-[8px] sm:text-[9px] font-black text-[#555555]">
                      0{lightNum}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] sm:text-xs">
            <span className="text-[#888888] font-bold">GRID STATUS:</span>
            <span
              className={`font-black uppercase tracking-wider ${
                stage === 6
                  ? 'text-[#00FF66] text-xs sm:text-sm'
                  : stage > 0
                  ? 'text-[#FF1A1A]'
                  : 'text-[#888888]'
              }`}
            >
              {stage === 6 ? '⚡ LIGHTS OUT · GO!' : stage > 0 ? `REV AT 100% · READY (${stage}/5)` : 'INITIALIZING SENSORS...'}
            </span>
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-2 font-mono">
          <div className="flex items-center justify-between text-xs font-bold text-[#AAAAAA]">
            <span>ENGINE CALIBRATION</span>
            <span className="text-[#F47C20]">{percent}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden border border-white/10 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-75 ${
                stage === 6
                  ? 'bg-gradient-to-r from-[#F47C20] via-[#00E5FF] to-[#00FF66] shadow-[0_0_15px_#00FF66]'
                  : 'bg-gradient-to-r from-[#F47C20] to-[#FF4500] shadow-[0_0_10px_#F47C20]'
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#777777] border-t border-white/10 pt-4">
        <div className="flex items-center gap-4 text-[10px] sm:text-xs">
          <span>LENGTH: <strong className="text-white">720M</strong></span>
          <span>&bull;</span>
          <span>TOP SPEED: <strong className="text-[#F47C20]">75 KM/H</strong></span>
          <span>&bull;</span>
          <span>CORNERS: <strong className="text-white">14 APEXES</strong></span>
        </div>

        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#AAAAAA]">
          <Flag className="w-3.5 h-3.5 text-[#F47C20]" />
          <span>RACEFACER 0.001S TELEMETRY ACTIVE</span>
        </div>
      </div>

    </div>
  );
};

export default OpeningAnimation;
