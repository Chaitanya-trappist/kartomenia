import { NavLink } from 'react-router-dom';
import { ArrowUpRight, Phone } from 'lucide-react';
import Dialog from './Dialog';
import { BookingLink } from './UI';
import siteConfig from '../data/siteConfig';

export default function MobileMenu({ onClose }) {
  const links = [{ name: 'Home', path: '/' }, ...siteConfig.navLinks, { name: 'Gallery', path: '/gallery' }];

  return (
    <Dialog title="Explore Kartomania" onClose={onClose} className="mobile-menu">
      <nav aria-label="Mobile navigation">
        {links.map((link, index) => (
          <NavLink key={link.path} to={link.path} end={link.path === '/'} onClick={onClose}>
            <span className="menu-number">0{index + 1}</span>
            {link.name}
            <ArrowUpRight size={20} aria-hidden="true" />
          </NavLink>
        ))}
      </nav>
      <div className="mobile-menu-footer">
        <BookingLink onClick={onClose} />
        <a className="text-link" href={`tel:${siteConfig.contact.phonePrimary.replace(/\s/g, '')}`}>
          <Phone size={17} aria-hidden="true" />{siteConfig.contact.phonePrimary}
        </a>
        <p>Entertainland Mall · Sector 83, Gurugram</p>
      </div>
    </Dialog>
  );
}
