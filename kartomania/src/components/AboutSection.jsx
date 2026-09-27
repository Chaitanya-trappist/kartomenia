import { Flame, Gauge, ShieldCheck, Trophy } from 'lucide-react';
import { SectionHeading, TextLink } from './UI';
import siteConfig from '../data/siteConfig';
import { RACING_LEVELS } from '../data/kartsData';

const PRINCIPLES = [
  { icon: Flame, title: 'Speed', text: RACING_LEVELS.map((kart) => `${kart.name}: ${kart.topSpeedKmh} km/h.`).join(' ') },
  { icon: Gauge, title: 'Precision', text: '0.001s RaceFacer live RFID transponder lap timing with sector analysis.' },
  { icon: ShieldCheck, title: 'Safety', text: 'FIA-certified 360° perimeter impact absorption barriers & remote pitlane controls.' },
  { icon: Trophy, title: 'Experience', text: 'Over two decades of national championship racing heritage led by Rohit Khanna.' }
];

export default function AboutSection({ full = false }) {
  return (
    <section className="section story-section" id="heritage" tabIndex={-1}>
      <div className="container">
        <div className="story-grid">
          <div className="founder-photo">
            <img src="/founder-rohit-khanna.jpg" alt="Mr. Rohit Khanna, Kartomania founder and national racing champion" width="720" height="900" loading="lazy" decoding="async" />
            <div className="founder-caption"><span>Behind the chequered flag</span><strong>{siteConfig.founder.name}</strong><small>Founder & Director · Leap Frog Racing</small></div>
            <span className="story-photo-label" aria-hidden="true">DRIVEN BY PASSION / SINCE DAY ONE</span>
          </div>
          <div className="story-copy">
            <SectionHeading eyebrow="Racing is in our DNA" title="Born on the podium." accent="Built for you." />
            <p>{siteConfig.founder.bio}</p>
            <p>At Entertainland Mall in Sector 83, Gurugram, our 720-metre outdoor circuit brings that passion to every driver, every corner, and every lap.</p>
            <blockquote>“We didn’t build Kartomania as an amusement ride. We engineered it as a real motorsport proving ground.”</blockquote>
            <div className="story-stats">
              <div><strong>20<span>+</span></strong><small>Years of racing DNA</small></div>
              <div><strong>50<span>+</span></strong><small>National podiums</small></div>
            </div>
            {!full && <TextLink to="/about">Meet the people behind the passion</TextLink>}
          </div>
        </div>
        {full && (
          <>
            <div className="principles-grid">
              {PRINCIPLES.map(({ icon: Icon, title, text }) => (
                <article key={title}><Icon size={26} strokeWidth={1.6} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
            <div className="about-fleet-link" id="racing-fleet" tabIndex={-1}>
              <div><p className="eyebrow">The racing fleet</p><h2>Meet the racing machines.</h2></div>
              <TextLink to="/karts">Our karts</TextLink>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
