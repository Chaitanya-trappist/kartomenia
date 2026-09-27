import { Component, lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const TrackPage = lazy(() => import('./pages/TrackPage'));
const KartsPage = lazy(() => import('./pages/KartsPage'));
const PackagesPage = lazy(() => import('./pages/PackagesPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Kartomania could not render this page:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-page">
          <p className="eyebrow">A quick pit stop</p>
          <h1>Something went wrong.</h1>
          <p>The page could not load. Please reload, or contact our team if the problem continues.</p>
          <button type="button" className="button button--primary" onClick={() => window.location.reload()}>Reload the page</button>
          <a href="tel:+919717548897">Call +91 97175 48897</a>
        </main>
      );
    }
    return this.props.children;
  }
}

function LegacyRedirect({ to }) {
  const { hash, search } = useLocation();
  return <Navigate to={`${to}${search}${hash}`} replace />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="experience" element={<TrackPage />} />
          <Route path="karts" element={<KartsPage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="experiences" element={<LegacyRedirect to="/experience" />} />
          <Route path="track" element={<LegacyRedirect to="/experience" />} />
          <Route path="price" element={<LegacyRedirect to="/packages" />} />
          <Route path="race" element={<LegacyRedirect to="/packages" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
