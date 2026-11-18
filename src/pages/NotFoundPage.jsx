// src/pages/NotFoundPage.jsx
// Shown for any URL that doesn't match a route in App.jsx.
import { Link } from 'react-router';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function NotFoundPage() {
  useDocumentTitle('Page not found');

  return (
    <section className="section">
      <div className="container narrow text-center">
        <span className="coming-soon-icon"><i className="bi bi-signpost-2" /></span>
        <h1 className="section-title mb-2">Page not found</h1>
        <p className="text-muted mb-4">We couldn't find that page. It may have moved, or the link may be wrong.</p>
        <Link to="/" className="btn btn-brand">Back to homepage</Link>
      </div>
    </section>
  );
}
