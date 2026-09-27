import React from 'react';
import { Flag, Gauge, Trophy, ShieldCheck } from 'lucide-react';

const FEATURE_BLOCKS = [
  {
    title: "720M OUTDOOR ASPHALT",
    desc: "Northern India's longest outdoor asphalt track engineered with 14 tactical corners, downhill sweeps, and a 120-meter straight.",
    icon: Flag,
    stat: "720M • 14 TURNS"
  },
  {
    title: "270CC SODI & 500CC FLEET",
    desc: "Imported French Sodi RT10 pro chassis powered by 4-stroke Honda engines, Twin 500cc tandem karts, and restricted Cadet junior racers.",
    icon: Gauge,
    stat: "75 KM/H TOP SPEED"
  },
  {
    title: "0.001S RACEFACER TIMING",
    desc: "Live RFID transponder timing with sector splits, mobile cloud leaderboards, and precision lap records.",
    icon: Trophy,
    stat: "0.001S ACCURACY"
  },
  {
    title: "FIA POLYMER BARRIERS",
    desc: "Energy-absorbing polymer safety barriers, sanitized DOT full-face helmets, neck braces, and trackside marshals.",
    icon: ShieldCheck,
    stat: "100% PROTECTED"
  }
];

export const WhoWeAreSection = () => {
  return (
    <section
      id="why-kartomania"
      className="relative w-full bg-white text-[#111111] py-10 sm:py-14 px-4 sm:px-8 lg:px-[54px] max-w-[1600px] mx-auto"
    >
      <div className="space-y-8 sm:space-y-10">
        
        <div className="text-left">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0A0A0A] uppercase tracking-tight leading-[0.92]">
            BUILT FOR <span className="text-[#F47C20]">THE RUSH.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 text-left">
          {FEATURE_BLOCKS.map((block, idx) => {
            const IconComponent = block.icon;
            return (
              <div
                key={idx}
                className="group relative p-5 sm:p-6 rounded-2xl bg-[#FAFAFA] hover:bg-[#F5F5F5] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-2 rounded-lg bg-white text-[#F47C20] w-fit shadow-xs">
                    <IconComponent className="w-4 h-4" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-black text-[#0A0A0A] uppercase tracking-tight group-hover:text-[#F47C20] transition-colors leading-tight">
                    {block.title}
                  </h3>

                  <p className="text-xs font-sans text-[#555555] leading-relaxed max-w-xl">
                    {block.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 flex items-center justify-between font-mono text-xs">
                  <span className="font-display font-black text-xs sm:text-sm text-[#F47C20]">
                    {block.stat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhoWeAreSection;
