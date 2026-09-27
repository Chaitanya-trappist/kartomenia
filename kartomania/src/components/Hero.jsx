import { useState } from 'react';
import { ArrowDown, Flag, Play, ShieldCheck, Timer, Users } from 'lucide-react';
import { ActionLink, BookingLink } from './UI';
import { MediaDialog } from './GallerySection';
import { GALLERY_MEDIA } from '../data/galleryData';
import siteConfig from '../data/siteConfig';

export default function Hero() {
  const [filmOpen, setFilmOpen] = useState(false);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <img
          className="hero-image"
          src="/gallery/kartomania-track-chase-drift.jpg"
          alt="Racers chasing the next corner at Kartomania"
          width="1024"
          height="682"
          fetchPriority="high"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-lines" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-content">
            <p className="eyebrow"><Flag size={15} aria-hidden="true" />Gurugram’s outdoor karting circuit</p>
            <h1 id="hero-title"><span>Race.</span> <span>Feel.</span> <span className="hero-accent">Repeat.</span></h1>
            <p className="hero-description">Leave the everyday at the starting line.<br />720 metres of real racing. A rush like no other.</p>
            <div className="hero-actions">
              <BookingLink>Book your race</BookingLink>
              <ActionLink to="/packages" variant="outline-light">Explore race packages</ActionLink>
            </div>
            <p className="hero-footnote">From ₹650 / session <span aria-hidden="true">·</span> No experience needed</p>
          </div>
          <div className="hero-side">
            <div className="hero-coordinate" aria-hidden="true"><span>THE EVERYDAY</span><span>STOPS HERE.</span></div>
            <button className="hero-film-button" type="button" onClick={() => setFilmOpen(true)} aria-haspopup="dialog">
              <span className="play-circle"><Play size={20} fill="currentColor" aria-hidden="true" /></span>
              <span><small>A little taste of the adrenaline</small><strong>Take a lap with us</strong></span>
              <span className="film-duration">01:32</span>
            </button>
          </div>
        </div>
        <a href="#experience-preview" className="hero-scroll" aria-label="Explore the circuit below"><ArrowDown size={19} aria-hidden="true" /></a>
      </section>
      <div className="track-stats-strip">
        <dl className="container hero-stats">
          <div><dt>Outdoor circuit</dt><dd>720<span>m</span></dd></div>
          <div><dt>Technical turns</dt><dd>14</dd></div>
          <div><dt>Top speed</dt><dd>{siteConfig.racing.maxSpeedKmh}<span>km/h</span></dd></div>
          <div><dt>Standard session</dt><dd>{siteConfig.racing.sessionMinutes}<span>min</span></dd></div>
        </dl>
      </div>
      <div className="reassurance-strip">
        <div className="container">
          <span><ShieldCheck size={18} aria-hidden="true" /> Safety gear included</span>
          <span><Timer size={18} aria-hidden="true" /> Live RaceFacer lap timing</span>
          <span><Users size={18} aria-hidden="true" /> Friends & family</span>
          <span><Flag size={18} aria-hidden="true" /> Walk-ins welcome</span>
        </div>
      </div>
      {filmOpen && <MediaDialog items={[GALLERY_MEDIA[0]]} initialId={GALLERY_MEDIA[0].id} onClose={() => setFilmOpen(false)} />}
    </>
  );
}
