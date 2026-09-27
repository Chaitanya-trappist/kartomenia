import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS_DATA = [
  {
    id: 1,
    name: "ADITYA VERMA",
    role: "AMATEUR RACER & MOTORSPORT ENTHUSIAST",
    rating: 5,
    tag: "VERIFIED RACER",
    sessionType: "PRO SODI RT10 270CC",
    quote: "Hands down the best outdoor go-karting circuit in Delhi NCR. The 680m span has genuine technical chicanes and hairpins where you actually need braking technique. The Sodi RT10 karts are razor-sharp, and the live RaceFacer telemetry gives you real F1-grade sector splits.",
    lapTime: "BEST LAP: 32.140s"
  },
  {
    id: 2,
    name: "KARAN MALHOTRA",
    role: "CORPORATE EVENT ORGANIZER",
    rating: 5,
    tag: "CORPORATE TOURNAMENT",
    sessionType: "25-DRIVER MINI GP",
    quote: "We hosted our company's annual championship here with 25 drivers. The team lockout, practice heats, qualifying shootout, and standing grid start were flawlessly managed by the track marshals. Having complimentary bowling lanes right at Entertainland Mall made it an unforgettable team outing.",
    lapTime: "25 RACERS • 3 HEATS"
  },
  {
    id: 3,
    name: "SIMRAN KAUR",
    role: "WEEKEND DRIVER",
    rating: 5,
    tag: "FAMILY TANDEM",
    sessionType: "SUPER PRO TWIN 500CC",
    quote: "Took the Twin 2-seater with my son and we had a phenomenal time! The outdoor asphalt has incredible grip, safety barriers are heavy-duty polymer, and all helmets and balaclavas were spotless and sanitized. Polite, professional pit crew.",
    lapTime: "TANDEM COCKPIT"
  },
  {
    id: 4,
    name: "ROHAN SINGHANIA",
    role: "CLUB RACE DRIVER",
    rating: 5,
    tag: "NIGHT SESSION",
    sessionType: "FLOODLIT NIGHT HEATS",
    quote: "Night racing under the stadium floodlights is pure adrenaline. You can really unleash full throttle down the 120m straight into Turn 1. The ₹500 Wednesday Happy Hour deal is easily the best value motorsport experience in Gurgaon.",
    lapTime: "BEST LAP: 31.890s"
  },
  {
    id: 5,
    name: "VARUN GUPTA",
    role: "LEAP FROG TRACK PILOT",
    rating: 5,
    tag: "CHAMPIONSHIP FLEET",
    sessionType: "TIME ATTACK SESSION",
    quote: "You can immediately feel this track was designed by national champion Rohit Khanna. The Honda GX engines are balanced with zero power discrepancy between karts, which makes wheel-to-wheel battles 100% about driver skill.",
    lapTime: "BEST LAP: 31.550s"
  },
  {
    id: 6,
    name: "POOJA NAIR",
    role: "BIRTHDAY HOST",
    rating: 5,
    tag: "BIRTHDAY GP",
    sessionType: "10-SESSION PASS BUNDLE",
    quote: "Celebrated my brother's birthday with the 10-session pass package. Incredible value with the bonus sessions and bowling games included. The team printed official RaceFacer timing sheets with split times for everyone on the podium.",
    lapTime: "PODIUM CELEBRATION"
  }
];

export const ReviewsSection = ({ onOpenBooking }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="reviews"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-[54px] max-w-[1600px] mx-auto border-b border-[#EAEAEA] bg-white text-[#111111] relative z-20 overflow-hidden"
    >
      <div className="space-y-10 sm:space-y-14">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b-2 border-[#EAEAEA] pb-8 text-left">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F47C20] animate-orange-pulse" />
              <span className="font-mono text-xs sm:text-sm font-black text-[#F47C20] uppercase tracking-widest">
                09 • DRIVER REVIEWS
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-[#0A0A0A] uppercase tracking-tight leading-[0.92]">
              THE DRIVERS <br />
              <span className="text-[#F47C20]">HAVE SPOKEN.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-2">
              <div className="flex text-[#F47C20]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-black text-sm text-[#0A0A0A]">4.9 / 5.0</span>
              <span className="text-xs text-[#888888] font-bold uppercase">(500+ REVIEWS)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-3 rounded-xl bg-[#FAFAFA] hover:bg-[#F47C20] text-[#0A0A0A] hover:text-white border border-[#E5E5E5] transition-colors cursor-pointer shadow-2xs"
                aria-label="Scroll reviews left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-3 rounded-xl bg-[#FAFAFA] hover:bg-[#F47C20] text-[#0A0A0A] hover:text-white border border-[#E5E5E5] transition-colors cursor-pointer shadow-2xs"
                aria-label="Scroll reviews right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory text-left scroll-smooth"
        >
          {REVIEWS_DATA.map((review) => (
            <div
              key={review.id}
              className="w-[88vw] xs:w-[360px] sm:w-[440px] lg:w-[480px] shrink-0 p-6 sm:p-8 rounded-2xl bg-[#FAFAFA] border-2 border-[#E5E5E5] hover:border-[#F47C20] transition-all duration-300 shadow-2xs hover:shadow-xl flex flex-col justify-between snap-start group"
            >
              <div className="space-y-4">
                
                <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3">
                  <div className="flex items-center gap-1.5 text-[#F47C20]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#E0E0E0] text-[9px] sm:text-[10px] font-mono font-black text-[#F47C20] uppercase tracking-wider shadow-2xs">
                    {review.tag}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm sm:text-base font-sans font-medium text-[#222222] leading-relaxed italic">
                    "{review.quote}"
                  </p>
                </div>

              </div>

              <div className="pt-6 mt-6 border-t border-[#EAEAEA] flex items-center justify-between font-mono text-xs">
                <div className="space-y-0.5">
                  <div className="font-display font-black text-sm sm:text-base text-[#0A0A0A] group-hover:text-[#F47C20] transition-colors uppercase tracking-tight">
                    {review.name}
                  </div>
                  <span className="text-[10px] text-[#888888] font-bold uppercase tracking-wider block">
                    {review.role}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-black text-[#F47C20] uppercase block">
                    {review.sessionType}
                  </span>
                  <span className="text-[9px] text-[#666666] font-bold block">
                    {review.lapTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-[#0A0A0A] text-white border-2 border-[#222222] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-left shadow-lg">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F47C20] animate-orange-pulse" />
            <span className="font-black text-white uppercase tracking-wider">
              OVER 50,000+ LAPS LOGGED ON RACEFACER TIMING
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white/70 hidden sm:inline">
              Ready to post your benchmark lap?
            </span>
            <button
              onClick={() => {
                if (onOpenBooking) onOpenBooking();
                else window.open("https://web.racefacer.com/kiosk/kartomaniaentertainlandmall", "_blank", "noopener,noreferrer");
              }}
              className="px-5 py-2 rounded-lg bg-[#F47C20] hover:bg-white text-white hover:text-[#0A0A0A] font-black uppercase tracking-wider transition-colors cursor-pointer"
            >
              BOOK SESSION &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;
