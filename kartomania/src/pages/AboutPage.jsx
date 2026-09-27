import AboutSection from '../components/AboutSection';
import FinalCTASection from '../components/FinalCTASection';
import { PageIntro } from '../components/UI';

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="The people behind the passion" title="Racing is" accent="in our DNA." description="Two decades of motorsport pedigree. One simple idea: bring the feeling of real racing to everyone." />
      <AboutSection full />
      <FinalCTASection />
    </>
  );
}
