import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Users, Trophy, Sparkles, Flag, Briefcase, Zap } from 'lucide-react';
import MagneticButton from './MagneticButton';

const EXPERIENCES = [
  {
    number: "01",
    category: "INDIVIDUAL RACING",
    title: "TIME ATTACK RACE HEATS",
    subtitle: "Solo Precision & Qualifying",
    desc: "Single-driver open track sessions against the clock. Push 270cc Sodi RT10 pro karts to the edge with live 0.001s RaceFacer RFID telemetry and cloud leaderboards.",
    icon: Flag,
    image: "/gallery/kartomania-apex-single-kart.jpg",
    ctaText: "BOOK SESSION",
    link: "https://web.racefacer.com/kiosk/kartomaniaentertainlandmall",
    tag: "SOLO SESSION"
  },
  {
    number: "02",
    category: "GROUP RACING",
    title: "MINI GRAND PRIX TOURNAMENTS",
    subtitle: "Wheel-to-Wheel Grid Shootout",
    desc: "Exclusive track lockout for friends, clubs, and racing leagues. Includes practice laps, qualifying shootout, standing grid start, and a champagne podium trophy ceremony.",
    icon: Trophy,
    image: "/gallery/kartomania-grid-launch-paddock.jpg",
    ctaText: "RESERVE TOURNAMENT",
    link: "https://wa.me/919717548897?text=Hi%20Kartomania!%20I%20would%20like%20to%20inquire%20about%20a%20Group%20Grand%20Prix%20tournament.",
    tag: "GROUP GP"
  },
  {
    number: "03",
    category: "BIRTHDAY EVENTS",
    title: "BIRTHDAY RACING & BOWLING",
    subtitle: "High-Octane Party Packages",
    desc: "Celebrate your birthday on the fast track. Custom packages combining private race heats, personalized timing sheets, podium medals, and complimentary bowling lanes at Entertainland Mall.",
    icon: Sparkles,
    image: "/promos/monday-bonanza-50-off.jpg",
    ctaText: "PLAN BIRTHDAY",
    link: "https://wa.me/919717548897?text=Hi%20Kartomania!%20I%20would%20like%20to%20plan%20a%20Birthday%20Party%20package.",
    tag: "CELEBRATIONS"
  },
  {
    number: "04",
    category: "CORPORATE EVENTS",
    title: "TEAM ENDURANCE & OUTINGS",
    subtitle: "Corporate Relays & Networking",
    desc: "Energize your company with high-stakes team endurance relays, pit-stop challenges, conference lounge facilities, bespoke catering, and full venue branding options.",
    icon: Briefcase,
    image: "/leap-frog/leap-frog-team.jpg",
    ctaText: "REQUEST CORPORATE PROPOSAL",
    link: "https://wa.me/919717548897?text=Hi%20Kartomania!%20We%20would%20like%20to%20inquire%20about%20a%20Corporate%20Outing%20/%20Team%20Building%20event.",
    tag: "CORPORATE"
  },
  {
    number: "05",
    category: "JUNIOR RACING",
    title: "CADET DRIVER ACADEMY",
    subtitle: "Youth Coaching & Development",
    desc: "Safe, structured motorsport training for young pilots aged 7–12. Features speed-governed Sodi LR5 karts, racing line coaching by champion engineers, and youth licensing.",
    icon: Users,
    image: "/karts/sodi-lr5-junior.jpg",
    ctaText: "ENROLL JUNIOR",
    link: "https://wa.me/919717548897?text=Hi%20Kartomania!%20I%20would%20like%20to%20inquire%20about%20Junior%20Cadet%20training.",
    tag: "YOUTH ACADEMY"
  },
  {
    number: "06",
    category: "SPECIAL EVENTS",
    title: "NIGHT SESSIONS & HAPPY HOURS",
    subtitle: "Floodlit Evening Sessions",
    desc: "Experience high-speed racing under arena stadium floodlights. Take advantage of weekly specials including ₹500 Happy Hour Wednesdays and 50% Off BOGO Monday Bonanzas.",
    icon: Zap,
    image: "/gallery/kartomania-sunset-pitlane.jpg",
    ctaText: "CHECK SPECIALS",
    link: "https://web.racefacer.com/kiosk/kartomaniaentertainlandmall",
    tag: "NIGHT RACING"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export const EventsSection = () => {
  return (
    <section
      id="events"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-[54px] max-w-[1600px] mx-auto border-b border-[#EAEAEA] bg-white text-[#111111] relative z-20 overflow-hidden"
    >
      <div className="space-y-10 sm:space-y-14">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b-2 border-[#EAEAEA] pb-8 text-left">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F47C20] animate-orange-pulse" />
              <span className="font-mono text-xs sm:text-sm font-black text-[#F47C20] uppercase tracking-widest">
                06 • MORE THAN RACING
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-[#0A0A0A] uppercase tracking-tight leading-[0.92]">
              MAKE IT <br />
              <span className="text-[#F47C20]">AN EVENT.</span>
            </h2>
          </div>

          <div className="max-w-md text-left lg:text-right space-y-2 font-mono">
            <span className="text-xs text-[#888888] uppercase tracking-widest font-bold block">
              ENTERTAINLAND MALL &bull; BESPOKE TRACK EXPERIENCES
            </span>
            <p className="text-xs text-[#555555] font-sans leading-relaxed">
              From open time attacks to full corporate tournament buyouts, we engineer unforgettable motorsport experiences.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left"
        >
          {EXPERIENCES.map((exp, idx) => {
            const IconComp = exp.icon;

            return (
              <motion.div
                key={exp.number}
                custom={idx}
                variants={cardVariants}
                className="group relative rounded-2xl bg-[#FAFAFA] border-2 border-[#E5E5E5] hover:border-[#F47C20] transition-all duration-300 shadow-2xs hover:shadow-xl flex flex-col justify-between overflow-hidden"
              >
                <div className="relative w-full aspect-[16/11] overflow-hidden bg-black">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 font-mono text-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F47C20]" />
                      {exp.tag}
                    </span>
                    <span className="text-2xl sm:text-3xl font-display font-black text-white/90 drop-shadow-md">
                      {exp.number}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center gap-2 text-white">
                    <IconComp className="w-4 h-4 text-[#F47C20]" />
                    <span className="font-mono text-[11px] font-black text-white/90 uppercase tracking-wider">
                      {exp.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-black text-[#0A0A0A] group-hover:text-[#F47C20] transition-colors uppercase tracking-tight leading-tight">
                      {exp.title}
                    </h3>
                    <p className="font-mono text-[11px] text-[#888888] font-bold uppercase tracking-wider">
                      {exp.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm font-sans text-[#555555] leading-relaxed pt-1">
                      {exp.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EAEAEA] flex items-center justify-between">
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs font-black text-[#0A0A0A] group-hover:text-[#F47C20] uppercase tracking-wider flex items-center gap-1.5 transition-colors text-decoration-none"
                    >
                      <span>{exp.ctaText}</span>
                    </a>
                    
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#F0F0F0] group-hover:bg-[#F47C20] text-[#0A0A0A] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-2xs"
                      aria-label={exp.ctaText}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="p-8 sm:p-10 rounded-2xl bg-[#0A0A0A] text-white border-2 border-[#222222] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-left shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F47C20] animate-orange-pulse" />
              <span className="font-mono text-xs font-black text-[#F47C20] uppercase tracking-wider">
                CUSTOM TRACK BUYOUTS & HOSPITALITY
              </span>
            </div>
            <h4 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white uppercase tracking-tight leading-tight">
              PLANNING A BESPOKE MOTORSPORT EVENT?
            </h4>
            <p className="text-xs sm:text-sm font-sans text-white/75 leading-relaxed">
              Our events team coordinates private track locks, timing sheets, podium trophies, custom catering, and bowling passes at Entertainland Mall.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <MagneticButton
              href="https://wa.me/919717548897?text=Hi%20Kartomania!%20I%20would%20like%20to%20discuss%20a%20custom%20group%20event%20booking."
              variant="primary"
              className="py-3 px-6 text-xs font-black uppercase tracking-widest shadow-md"
            >
              CHAT ON WHATSAPP &rarr;
            </MagneticButton>

            <a
              href="tel:+919717548897"
              className="py-3 px-5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-black uppercase tracking-wider border border-white/20 transition-colors"
            >
              CALL +91 97175 48897
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EventsSection;
