import { useState } from 'react';
import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { SectionHeading, ActionLink, TextLink } from './UI';
import siteConfig from '../data/siteConfig';

function VenueMap() {
  const [showMap, setShowMap] = useState(false);
  return (
    <div className="venue-map">
      {showMap ? (
        <iframe
          title="Kartomania at Entertainland Mall on Google Maps"
          src="https://maps.google.com/maps?q=Kartomania%20Go%20Karting%20Entertainland%20Mall%20Sector%2083%20Gurugram&t=&z=15&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="map-preview">
          <img src="/gallery/kartomania-circuit-sunset-wide.jpg" alt="Sunset at Kartomania's outdoor circuit at Entertainland Mall" width="1024" height="768" loading="lazy" decoding="async" />
          <div className="map-preview-content">
            <span className="map-pin"><MapPin size={29} aria-hidden="true" /></span>
            <p className="eyebrow">Your destination for adrenaline</p>
            <h3>See you at<br />the starting line.</h3>
            <button className="button button--light" type="button" onClick={() => setShowMap(true)}>Show interactive map<Navigation size={16} aria-hidden="true" /></button>
            <small>Google Maps loads only when you choose.</small>
          </div>
        </div>
      )}
      <div className="map-caption"><MapPin size={15} aria-hidden="true" /><span>Entertainland Mall · Sector 83 · NH-48 Manesar</span></div>
    </div>
  );
}

export default function ContactSection({ showHeading = true }) {
  return (
    <section className="section visit-section" id="location" tabIndex={-1}>
      <div className="container">
        {showHeading && (
          <SectionHeading eyebrow="Make a day of it" title="A little closer to" accent="a great time.">
            <TextLink to="/contact">Plan your visit</TextLink>
          </SectionHeading>
        )}
        <div className="visit-grid">
          <div className="visit-details">
            <div className="visit-detail">
              <MapPin size={21} aria-hidden="true" />
              <div><h3>Find the circuit</h3><address>{siteConfig.contact.address}</address></div>
            </div>
            <div className="visit-detail">
              <Clock size={21} aria-hidden="true" />
              <div><h3>Make time for a lap</h3>
                <dl className="opening-hours">
                  <div><dt>Monday – Friday</dt><dd>{siteConfig.contact.hours.weekdayTime}</dd></div>
                  <div><dt>Sat, Sun & public holidays</dt><dd>{siteConfig.contact.hours.weekendTime}</dd></div>
                </dl>
              </div>
            </div>
            <div className="visit-detail">
              <Phone size={21} aria-hidden="true" />
              <div><h3>Talk to our team</h3>
                <div className="contact-numbers">
                  <a href={`tel:${siteConfig.contact.phonePrimary.replace(/\s/g, '')}`}>{siteConfig.contact.phonePrimary}</a>
                  <a href={`tel:${siteConfig.contact.phoneSecondary.replace(/\s/g, '')}`}>{siteConfig.contact.phoneSecondary}</a>
                </div>
                <a className="contact-email" href={`mailto:${siteConfig.contact.email}`}><Mail size={15} aria-hidden="true" />{siteConfig.contact.email}</a>
              </div>
            </div>
            <ActionLink href={siteConfig.urls.googleMaps} external className="directions-button"><Navigation size={17} aria-hidden="true" />Get directions</ActionLink>
          </div>
          <VenueMap />
        </div>
      </div>
    </section>
  );
}
