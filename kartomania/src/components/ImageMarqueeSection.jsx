import React from 'react';

const MARQUEE_IMAGES = [
  {
    src: "/gallery/avalanche-formula-racing.jpg",
    alt: "Kartomania Kart Fleet & Pit Lane Area",
    caption: "RACE FLEET PIT LANE"
  },
  {
    src: "/gallery/racefacer-live-timing.jpg",
    alt: "Kartomania Night Track & Live Timing Leaderboard",
    caption: "NIGHT TRACK & LIVE TELEMETRY"
  },
  {
    src: "/gallery/kartomania-track-circuit.jpg",
    alt: "Kartomania 680M Outdoor Asphalt Circuit",
    caption: "680M GP CIRCUIT APEX"
  },
  {
    src: "/gallery/kartomania-sunset-pitlane.jpg",
    alt: "Kartomania Sunset Track & High-Speed Straight",
    caption: "SUNSET HIGH-SPEED SESSION"
  }
];

export const ImageMarqueeSection = () => {
  return (
    <section className="py-6 sm:py-8 lg:py-10 bg-white text-[#111111] overflow-hidden border-t border-[#EAEAEA] relative z-20">
      <div className="space-y-6 sm:space-y-8">
        
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-[54px] text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#EAEAEA] pb-4">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-[#F47C20] uppercase tracking-widest block">
                THE KARTOMANIA EXPERIENCE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-[#0A0A0A] uppercase tracking-tight">
                REAL TRACK. REAL KARTS. <span className="text-[#F47C20]">REAL ADRENALINE.</span>
              </h2>
            </div>
            <span className="font-mono text-[10px] sm:text-xs text-[#888888] uppercase font-bold">
              LIVE CIRCUIT GALLERY
            </span>
          </div>
        </div>

        <div className="animate-image-marquee-container image-marquee-fade-mask relative w-full py-1">
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              aria-hidden={groupIndex === 1 ? 'true' : undefined}
              className="animate-image-marquee-track flex items-center shrink-0"
            >
              {MARQUEE_IMAGES.map((img, imgIdx) => (
                <div
                  key={`marquee-${groupIndex}-${imgIdx}`}
                  className="group relative h-[230px] sm:h-[290px] lg:h-[340px] w-[300px] sm:w-[400px] lg:w-[480px] shrink-0 rounded-2xl overflow-hidden bg-[#F5F5F5] border border-[#E5E5E5] transition-all duration-300 shadow-xs"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ImageMarqueeSection;