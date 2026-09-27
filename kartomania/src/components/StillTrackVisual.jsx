import { Flag, Timer } from 'lucide-react';

export default function StillTrackVisual() {
  return (
    <figure className="circuit-visual">
      <div className="circuit-visual-heading"><span><Flag size={15} aria-hidden="true" /> The Grand Prix circuit</span><span>GGM / 01</span></div>
      <img src="/kartomania-track-dark.png" alt="Kartomania circuit layout, showing its winding technical section, long straight, and pitlane" width="1024" height="682" loading="lazy" decoding="async" />
      <figcaption><span>720m <small>of pure possibility</small></span><span><Timer size={15} aria-hidden="true" /> RaceFacer timed</span></figcaption>
    </figure>
  );
}
