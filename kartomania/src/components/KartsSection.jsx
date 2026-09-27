import { useState } from 'react';
import { KARTS_DATA } from '../data/kartsData';
import RaceCard from './RaceCard';
import PriceToggle from './PriceToggle';
import { SectionHeading, TextLink } from './UI';

export default function KartsSection({ detailed = false }) {
  const [dayType, setDayType] = useState('weekday');

  return (
    <section className="section section--soft" id="fleet" tabIndex={-1}>
      <div className="container">
        <SectionHeading eyebrow="The racing fleet" title="Our" accent="machines." description="Three racing levels: L1, L2, and L3. Junior karts are also available.">
          <div className="section-actions">
            {!detailed && <TextLink to="/karts">Our karts</TextLink>}
            <PriceToggle value={dayType} onChange={setDayType} controls="kart-options" />
          </div>
        </SectionHeading>
        <div id="kart-options" className={`race-grid${detailed ? ' race-grid--detailed' : ''}`}>
          {KARTS_DATA.map((kart) => <RaceCard key={kart.id} kart={kart} dayType={dayType} detailed={detailed} />)}
        </div>
        <p className="pricing-note">All prices include taxes, a DOT-certified helmet, and a sanitary balaclava. Complete your booking on RaceFacer.</p>
      </div>
    </section>
  );
}
