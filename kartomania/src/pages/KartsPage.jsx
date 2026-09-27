import KartsSection from '../components/KartsSection';
import FAQSection from '../components/FAQSection';
import FinalCTASection from '../components/FinalCTASection';
import { PageIntro } from '../components/UI';

export default function KartsPage() {
  return (
    <>
      <PageIntro eyebrow="Racing fleet" title="Choose" accent="your ride." />
      <KartsSection detailed />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
