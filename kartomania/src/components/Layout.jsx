import { Suspense, useLayoutEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SearchModal from './SearchModal';
import WhatsAppButton from './WhatsAppButton';
import { BookingLink } from './UI';

const PAGE_TITLES = {
  '/': 'Kartomania | Outdoor Go-Karting in Gurugram',
  '/experience': 'The Racing Experience | Kartomania Gurugram',
  '/karts': 'Our Karts | Kartomania',
  '/packages': 'Race Prices & Packages | Kartomania',
  '/about': 'Our Racing Story | Kartomania',
  '/gallery': 'Track Photos & Videos | Kartomania',
  '/contact': 'Visit & Contact Us | Kartomania Gurugram'
};

function RouteEffects() {
  const { pathname, hash, key } = useLocation();
  const previousKey = useRef(key);

  useLayoutEffect(() => {
    document.title = PAGE_TITLES[pathname] || 'Page Not Found | Kartomania';
    const targetId = pathname === '/karts' && hash === '#l4' ? 'junior' : hash.slice(1);
    const target = hash ? document.getElementById(targetId) : null;
    if (target) {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      target.focus({ preventScroll: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (previousKey.current !== key) {
        document.getElementById('main-content')?.focus({ preventScroll: true });
      }
    }
    previousKey.current = key;
  }, [pathname, hash, key]);

  return null;
}

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<div className="page-loading" role="status">Getting the circuit ready…</div>}>
          <Outlet />
          <RouteEffects />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <div className="mobile-booking-bar">
        <Link to="/packages"><small>Races from</small><strong>₹650 <span>/ session</span></strong></Link>
        <BookingLink />
      </div>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
