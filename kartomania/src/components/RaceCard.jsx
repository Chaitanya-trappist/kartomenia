import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BookingLink } from './UI';
import { formatPrice, getPrice } from '../utils/pricing';
import { formatKartQualification } from '../utils/karts';
import siteConfig from '../data/siteConfig';

export default function RaceCard({ kart, dayType = 'weekday', detailed = false, booking = false, showImage = true }) {
  return (
    <article className={`race-card${detailed ? ' race-card--detailed' : ''}`} id={detailed ? kart.id : undefined} tabIndex={detailed ? -1 : undefined}>
      {showImage && (
        <div className="race-card-image">
          <img src={kart.image} alt={`${kart.name} kart at the circuit`} width="1024" height="576" loading="lazy" decoding="async" />
          <span className="kart-number">{kart.name}</span>
        </div>
      )}
      <div className="race-card-body">
        <div className="race-card-info">
          <div className="race-card-heading">
            <h3>{kart.name}</h3>
            {kart.topSpeedKmh !== undefined && (
              <dl className="kart-details">
                <div className="kart-speed">
                  <dt>Top speed</dt>
                  <dd>{kart.topSpeedKmh} <span>km/h</span></dd>
                </div>
              </dl>
            )}
          </div>
          {kart.qualification && (
            <dl className="kart-details">
              <div className="kart-qualification">
                <dt>Qualify for {kart.name}</dt>
                <dd>{formatKartQualification(kart.qualification)}</dd>
              </div>
            </dl>
          )}
        </div>
        <div className="race-card-price">
          <div><small>{dayType === 'weekday' ? 'Weekday' : 'Weekend & holiday'} rate</small><strong>{formatPrice(getPrice(kart, dayType))}<span> / {siteConfig.racing.sessionMinutes} min</span></strong></div>
        </div>
        {booking || detailed
          ? <BookingLink className="button--full" variant={kart.id === 'l1' ? 'primary' : 'outline'} aria-label={`Book ${kart.name} session on RaceFacer`}>Book {kart.name} session</BookingLink>
          : <Link className="card-link" to={`/karts#${kart.id}`}>View {kart.name}<ArrowUpRight size={19} aria-hidden="true" /></Link>}
      </div>
    </article>
  );
}
