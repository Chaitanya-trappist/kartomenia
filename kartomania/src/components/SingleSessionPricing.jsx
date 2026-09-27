import { SINGLE_SESSIONS } from '../data/packagesData';
import RaceCard from './RaceCard';

export default function SingleSessionPricing({ dayType = 'weekday' }) {
  return (
    <div className="race-grid pricing-race-grid">
      {SINGLE_SESSIONS.map((kart) => <RaceCard key={kart.id} kart={kart} dayType={dayType} booking showImage={false} />)}
    </div>
  );
}
