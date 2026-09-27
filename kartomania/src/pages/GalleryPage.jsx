import GallerySection from '../components/GallerySection';
import FinalCTASection from '../components/FinalCTASection';
import { PageIntro } from '../components/UI';

export default function GalleryPage() {
  return (
    <>
      <PageIntro eyebrow="Life on the racing line" title="See the" accent="rush." description="Real trackside moments, circuit flythroughs, and the little details that make Kartomania. Take a look around." />
      <GallerySection />
      <FinalCTASection />
    </>
  );
}
