import { Flag } from 'lucide-react';
import { ActionLink } from '../components/UI';

export default function NotFoundPage() {
  return (
    <section className="not-found container">
      <Flag size={40} strokeWidth={1.5} aria-hidden="true" />
      <p className="eyebrow">404 / A little off the racing line</p>
      <h1>Let’s get you<br /><span>back on track.</span></h1>
      <p>We couldn’t find that page. Your next great race is still right here.</p>
      <div><ActionLink to="/">Back to home</ActionLink><ActionLink to="/packages" variant="outline">Explore race packages</ActionLink></div>
    </section>
  );
}
