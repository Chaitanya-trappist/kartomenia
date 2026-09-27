import { Clock, Gift, Repeat, ShieldCheck } from 'lucide-react';
import { MULTI_SESSION_PACKAGES, REPEAT_TIERS } from '../data/packagesData';
import { formatPrice, getEffectiveRate, getPrice } from '../utils/pricing';
import { BookingLink, CheckList, TextLink } from './UI';

export default function PricingSection({ dayType = 'weekday' }) {
  return (
    <>
      <div className="pass-grid">
        {MULTI_SESSION_PACKAGES.map((pass) => (
          <article className={`pass-card${pass.id === 'pkg-10' ? ' pass-card--featured' : ''}`} key={pass.id}>
            <div className="pass-card-top"><span className="card-eyebrow">{pass.tag}</span><span className="pass-validity"><Clock size={13} aria-hidden="true" />{pass.validityMonths} months</span></div>
            <h3>{pass.sessions}<span>session pass</span></h3>
            <p className="pass-price">{formatPrice(getPrice(pass, dayType))}</p>
            <p className="pass-rate">Approx. {formatPrice(getEffectiveRate(pass, dayType))} / race{pass.bonusSessions > 0 && ` · ${pass.sessions + pass.bonusSessions} total`}</p>
            <div className="pass-bonus">
              <Gift size={18} aria-hidden="true" />
              <span>{pass.bonusSessions > 0 && <>{pass.bonusSessions} bonus {pass.bonusSessions === 1 ? 'race' : 'races'} + </>}{pass.bowlingGames} free bowling {pass.bowlingGames === 1 ? 'game' : 'games'}</span>
            </div>
            <CheckList items={pass.perks} />
            <BookingLink variant={pass.id === 'pkg-10' ? 'primary' : 'outline'} className="button--full" aria-label={`Buy a ${pass.sessions} session pass on RaceFacer`}>Get this pass</BookingLink>
          </article>
        ))}
      </div>
      <div className="pass-reassurance">
        <p>Bonus sessions and bowling games are added to your profile. Passes are shareable and valid across all 7 days within their validity window.</p>
        <span><ShieldCheck size={18} aria-hidden="true" />Tax & GST included</span>
      </div>
    </>
  );
}

export function RepeatPricing() {
  return (
    <section className="section repeat-section" id="repeat-races" tabIndex={-1}>
      <div className="container repeat-layout">
        <div>
          <p className="eyebrow"><Repeat size={16} aria-hidden="true" />Level 2 · Same-day repeat</p>
          <h2 className="section-title">One day.<br /><span>More laps.</span></h2>
          <p>Come back for another run and watch the rate come down. Same person, same day; discounts are applied at the desk.</p>
          <TextLink to="/contact#enquiry-form">Ask about repeat races</TextLink>
        </div>
        <div className="repeat-tiers">
          {REPEAT_TIERS.map((tier, index) => (
            <div key={tier.run} className={index === 3 ? 'repeat-tier is-best' : 'repeat-tier'}>
              <span>{tier.run}</span><strong>{formatPrice(tier.price)}</strong>
              <small>{tier.saving ? `Save ${formatPrice(tier.saving)}` : 'Standard entry'}</small>
            </div>
          ))}
          <p><ShieldCheck size={16} aria-hidden="true" /> All repeat rates are tax & GST inclusive.</p>
        </div>
      </div>
    </section>
  );
}
