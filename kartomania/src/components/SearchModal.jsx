import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import Dialog from './Dialog';
import { KARTS_DATA } from '../data/kartsData';

const SEARCH_ITEMS = [
  { title: 'Race prices & multi-session passes', description: 'Single races, repeat rates, and shareable passes', path: '/packages', keywords: 'cost pricing price booking tickets offers bowling weekday weekend' },
  { title: 'Our karts', description: KARTS_DATA.map((kart) => kart.name).join(', '), path: '/karts', keywords: 'karts fleet prices racing levels speed qualification qualify lap times' },
  { title: 'The 720m racing experience', description: 'Explore the circuit, its 14 turns, and live lap timing', path: '/experience', keywords: 'track circuit racefacer telemetry racing laps' },
  { title: 'Plan your visit', description: 'Opening hours, directions, and contact information', path: '/contact', keywords: 'location address map parking phone email whatsapp enquiry timings group corporate party' },
  { title: 'Before your first race', description: 'Age, height, safety gear, and other useful answers', path: '/experience#faq', keywords: 'faq questions requirements eligibility helmet shoes license duration' },
  { title: 'From the track', description: 'Racing photographs and circuit videos', path: '/gallery', keywords: 'gallery photos pictures film videos' },
  { title: 'Our racing story', description: 'Rohit Khanna and Leap Frog Racing', path: '/about', keywords: 'founder about heritage championship team' }
];

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState('');
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = SEARCH_ITEMS.filter((item) => words.every((word) => `${item.title} ${item.description} ${item.keywords}`.toLowerCase().includes(word)));

  return (
    <Dialog title="Find your way to the grid" onClose={onClose} className="search-dialog">
      <div className="search-field">
        <Search size={21} aria-hidden="true" />
        <label className="sr-only" htmlFor="site-search">Search Kartomania</label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try prices, L1, or directions"
          autoComplete="off"
          maxLength={100}
          data-autofocus
        />
      </div>
      <p className="search-count" role="status">{query.trim() ? `${results.length} matching ${results.length === 1 ? 'page' : 'pages'}` : 'Quick links'}</p>
      <ul className="search-results">
        {results.map((item) => (
          <li key={item.path}>
            <Link to={item.path} onClick={onClose}>
              <span><strong>{item.title}</strong><small>{item.description}</small></span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      {!results.length && <p className="empty-state">No matches for “{query}”. Try “prices”, “height”, or “directions”.</p>}
      <p className="dialog-hint">Use Tab to browse links. Press Escape to close.</p>
    </Dialog>
  );
}
