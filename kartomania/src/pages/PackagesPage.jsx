import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Timer } from 'lucide-react';
import SingleSessionPricing from '../components/SingleSessionPricing';
import PricingSection, { RepeatPricing } from '../components/PricingSection';
import PriceToggle from '../components/PriceToggle';
import FAQSection from '../components/FAQSection';
import FinalCTASection from '../components/FinalCTASection';
import { PageIntro, SectionHeading } from '../components/UI';
import siteConfig from '../data/siteConfig';

export default function PackagesPage() {
  const [dayType, setDayType] = useState('weekday');
  return (
    <>
      <PageIntro eyebrow="Less guesswork. More go." title="Great laps." accent="Clear prices." description="A quick sprint, a shared adventure, or a pass for your next few visits. Choose your pace, and leave the rest to us." />
      <div className="pricing-controls">
        <div className="container pricing-controls-inner">
          <nav aria-label="Package sections">
            <Link to="#single-sessions">Single sessions</Link>
            <Link to="#bulk-packages">Race passes</Link>
            <Link to="#repeat-races">Repeat races</Link>
          </nav>
          <PriceToggle value={dayType} onChange={setDayType} controls="single-sessions bulk-packages" />
        </div>
      </div>
      <section className="section section--soft" id="single-sessions" tabIndex={-1}>
        <div className="container">
          <SectionHeading eyebrow={`${dayType === 'weekday' ? 'Monday–Friday' : 'Weekends & holidays'} prices`} title="One session." accent="All the feeling." description={`Standard sessions include ${siteConfig.racing.sessionMinutes} minutes of racing. Pick the kart that fits your kind of adventure.`} />
          <SingleSessionPricing dayType={dayType} />
          <div className="session-inclusions"><span><ShieldCheck size={17} aria-hidden="true" />Helmet & sanitary balaclava included</span><span><Timer size={17} aria-hidden="true" />Live RaceFacer lap timing</span><span>100% tax & GST inclusive</span></div>
        </div>
      </section>
      <section className="section" id="bulk-packages" tabIndex={-1}>
        <div className="container">
          <SectionHeading eyebrow={`${dayType === 'weekday' ? 'Weekday' : 'Weekend & holiday'} pass prices`} title="Buy more." accent="Race more." description="Shareable passes, complimentary bowling, and bonus races on selected packages. More reasons to come back." />
          <PricingSection dayType={dayType} />
        </div>
      </section>
      <RepeatPricing />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
