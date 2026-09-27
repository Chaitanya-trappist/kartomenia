import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './Icons';
import siteConfig from '../data/siteConfig';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-column">
            <Link to="/" className="brand" aria-label="Kartomania home">
              <img src="/logo.png" alt="Kartomania" width="150" height="84" loading="lazy" />
            </Link>
            <p>Real racing. Real adrenaline.<br />Your next great lap starts here.</p>
            <div className="social-links">
              <a href={siteConfig.urls.instagram} target="_blank" rel="noopener noreferrer" aria-label="Kartomania on Instagram"><InstagramIcon aria-hidden="true" /></a>
              <a href={siteConfig.urls.facebook} target="_blank" rel="noopener noreferrer" aria-label="Kartomania on Facebook"><FacebookIcon aria-hidden="true" /></a>
              <a href={siteConfig.urls.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with Kartomania on WhatsApp"><WhatsAppIcon aria-hidden="true" /></a>
            </div>
          </div>
          <div>
            <h2 className="footer-heading">Explore</h2>
            <nav aria-label="Footer navigation">
              <Link to="/">Home</Link>
              {siteConfig.navLinks.map((link) => <Link key={link.path} to={link.path}>{link.name}</Link>)}
              <Link to="/gallery">Gallery</Link>
            </nav>
          </div>
          <div>
            <h2 className="footer-heading">Find the circuit</h2>
            <address>{siteConfig.contact.address}</address>
            <a className="footer-directions" href={siteConfig.urls.googleMaps} target="_blank" rel="noopener noreferrer">
              Get directions <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href={`tel:${siteConfig.contact.phonePrimary.replace(/\s/g, '')}`}>{siteConfig.contact.phonePrimary}</a>
            <a href={`tel:${siteConfig.contact.phoneSecondary.replace(/\s/g, '')}`}>{siteConfig.contact.phoneSecondary}</a>
            <a className="footer-email" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </div>
          <div>
            <h2 className="footer-heading">Make time to race</h2>
            <dl className="footer-hours">
              <div><dt>Monday – Friday</dt><dd>{siteConfig.contact.hours.weekdayTime}</dd></div>
              <div><dt>Weekends & public holidays</dt><dd>{siteConfig.contact.hours.weekendTime}</dd></div>
            </dl>
            <Link to="/experience#faq" className="footer-faq">First time? Start here <ArrowUpRight size={16} aria-hidden="true" /></Link>
            <a href={siteConfig.urls.booking} target="_blank" rel="noopener noreferrer" className="footer-faq">RaceFacer & live timing <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">RACE. FEEL. REPEAT.</div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Kartomania. All rights reserved.</span>
          <span><MapPin size={13} aria-hidden="true" /> Gurugram, India</span>
          <span>Built for the love of racing.</span>
        </div>
      </div>
    </footer>
  );
}
