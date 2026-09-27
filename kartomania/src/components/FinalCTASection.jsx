import { Flag } from 'lucide-react';
import { BookingLink, ActionLink } from './UI';

export default function FinalCTASection() {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <div>
          <p className="eyebrow"><Flag size={17} aria-hidden="true" />Your next story starts on the grid</p>
          <h2>Less ordinary.<br />More <span>adrenaline.</span></h2>
        </div>
        <div className="final-cta-actions">
          <p>Bring your people. Find your racing line.<br />We’ll take care of the rest.</p>
          <BookingLink variant="dark">Let’s go racing</BookingLink>
          <ActionLink to="/contact" variant="text">Plan your visit</ActionLink>
        </div>
      </div>
      <div className="checkered-edge" aria-hidden="true" />
    </section>
  );
}
