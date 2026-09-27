import { CalendarCheck, Flag, ShieldCheck } from 'lucide-react';
import TrackSection from '../components/TrackSection';
import GallerySection from '../components/GallerySection';
import FAQSection from '../components/FAQSection';
import FinalCTASection from '../components/FinalCTASection';
import { PageIntro, SectionHeading, BookingLink } from '../components/UI';

const STEPS = [
  { icon: CalendarCheck, title: 'Pick your race', text: 'Choose your kart and book through RaceFacer. Walk-ins are welcome, too.' },
  { icon: ShieldCheck, title: 'Gear up', text: 'Meet the marshals, get your helmet and balaclava, and take the safety briefing.' },
  { icon: Flag, title: 'Make every lap yours', text: 'Find your racing line. Chase your best time. Compare your laps with RaceFacer.' }
];

export default function TrackPage() {
  return (
    <>
      <PageIntro eyebrow="720m of possibility" title="This is" accent="real racing." description="14 technical corners. A 120m straight. An outdoor asphalt circuit designed to turn an ordinary day into a story worth telling." />
      <TrackSection detailed />
      <section className="section section--soft">
        <div className="container">
          <SectionHeading eyebrow="From arrival to adrenaline" title="Three steps." accent="One great race."><BookingLink /></SectionHeading>
          <div className="steps-grid">
            {STEPS.map(({ icon: Icon, title, text }, index) => (
              <article key={title}><span className="step-index">0{index + 1}</span><Icon size={29} strokeWidth={1.5} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>
      <GallerySection preview />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
