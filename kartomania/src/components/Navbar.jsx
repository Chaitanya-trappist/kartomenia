import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MapPin, Menu, Search, Phone } from 'lucide-react';
import { BookingLink } from './UI';
import MobileMenu from './MobileMenu';
import siteConfig from '../data/siteConfig';

export default function Navbar({ onOpenSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="utility-bar">
        <div className="container utility-inner">
          <a href={siteConfig.urls.googleMaps} target="_blank" rel="noopener noreferrer">
            <MapPin size={13} aria-hidden="true" /> Entertainland Mall, Sector 83, Gurugram
          </a>
          <span className="utility-hours">Mon–Fri: 2–11 PM <span aria-hidden="true">/</span> Weekends & holidays: 1–11 PM</span>
          <a className="utility-phone" href={`tel:${siteConfig.contact.phonePrimary.replace(/\s/g, '')}`}>
            <Phone size={13} aria-hidden="true" />{siteConfig.contact.phonePrimary}
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav-inner">
          <Link to="/" className="brand" aria-label="Kartomania home">
            <img src="/logo.png" alt="Kartomania" width="126" height="71" />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {siteConfig.navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="icon-button nav-search" type="button" onClick={onOpenSearch} aria-label="Search the website" aria-haspopup="dialog">
              <Search size={20} aria-hidden="true" />
            </button>
            <BookingLink className="nav-booking" />
            <button
              className="icon-button menu-toggle"
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
            >
              <Menu size={25} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </>
  );
}
