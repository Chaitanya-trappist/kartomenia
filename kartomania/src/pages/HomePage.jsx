import { ArrowUpRight, Gift, Users, Flag } from 'lucide-react';
import Hero from '../components/Hero';
import TrackSection from '../components/TrackSection';
import KartsSection from '../components/KartsSection';
import AboutSection from '../components/AboutSection';
import GallerySection from '../components/GallerySection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import FinalCTASection from '../components/FinalCTASection';
import { ActionLink } from '../components/UI';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrackSection />
      <KartsSection />
      <section className="section pass-promo">
        <div className="container pass-promo-inner">
          <div>
            <p className="eyebrow"><span aria-hidden="true" />Good things come in more laps</p>
            <h2>More racing.<br /><span>More reasons to return.</span></h2>
            <p>5, 10, 15, or 20 sessions. One very good excuse to get the crew together.</p>
            <ActionLink to="/packages#bulk-packages">Find your race pass<ArrowUpRight size={18} aria-hidden="true" /></ActionLink>
          </div>
          <div className="pass-promo-benefits">
            <div><Gift aria-hidden="true" /><span><strong>A little extra, on us</strong><small>Free bowling, plus bonus races on selected passes.</small></span></div>
            <div><Users aria-hidden="true" /><span><strong>Good times are shareable</strong><small>Bring friends and family along for the ride.</small></span></div>
            <div><Flag aria-hidden="true" /><span><strong>Make every visit count</strong><small>Passes from ₹3,250, valid for 2–6 months.</small></span></div>
          </div>
        </div>
      </section>
      <GallerySection preview />
      <AboutSection />
      <FAQSection />
      <ContactSection />
      <FinalCTASection />
    </>
  );
}
