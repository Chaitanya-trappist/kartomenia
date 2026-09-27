import { Flag, Gauge, ShieldCheck, Timer } from 'lucide-react';
import StillTrackVisual from './StillTrackVisual';
import { SectionHeading, TextLink } from './UI';
import { TRACK_DATA } from '../data/trackData';

const HIGHLIGHTS = [
  { icon: Flag, title: 'Every corner counts', detail: '14 technical turns and a 120m full-throttle straight. Find your line, then find a better one.' },
  { icon: Timer, title: 'Chase your personal best', detail: 'RaceFacer live timing tracks every lap with 0.001-second precision.' },
  { icon: ShieldCheck, title: 'You race. We look out.', detail: 'Safety briefings, protective gear, and track marshals are part of the experience.' }
];

export default function TrackSection({ detailed = false }) {
  return (
    <section className="section track-section" id="experience-preview" tabIndex={-1}>
      <div className="container">
        <SectionHeading eyebrow="Not an amusement ride. A racing experience." title="A real circuit." accent="A real rush." description="Open sky. High-grip asphalt. The sound of your next personal best. Welcome to the Kartomania Grand Prix circuit.">
          {!detailed && <TextLink to="/experience">Discover the experience</TextLink>}
        </SectionHeading>
        <div className="track-overview">
          <StillTrackVisual />
          <div className="track-highlights">
            <p className="track-intro">Built for the competitive.<br /><strong>Open to everyone.</strong></p>
            {HIGHLIGHTS.map(({ icon: Icon, title, detail }) => (
              <div className="track-highlight" key={title}>
                <span className="feature-icon"><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></span>
                <div><h3>{title}</h3><p>{detail}</p></div>
              </div>
            ))}
            <div className="track-width"><Gauge size={17} aria-hidden="true" /> {TRACK_DATA.width} · Outdoor asphalt circuit</div>
          </div>
        </div>
        {detailed && (
          <div className="sector-grid">
            {TRACK_DATA.sectors.map((sector, index) => (
              <article key={sector.sector}>
                <span className="sector-number">0{index + 1}</span>
                <p className="card-eyebrow">{sector.sector}</p>
                <h3>{sector.title}</h3>
                <p>{sector.description}</p>
                <small>{sector.technicalNote}</small>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
