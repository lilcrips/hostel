// src/pages/ComingSoonPage.jsx
// One reusable page for features we haven't built yet. Better than a broken
// link, and honest: it says the feature doesn't work yet and when it will.
// Props: title (page name) and phase (roadmap phase that builds it).
import { Link } from 'react-router';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function ComingSoonPage({ title, phase }) {
  useDocumentTitle(title);

  return (
    <section className="section">
      <div className="container narrow text-center">
        <span className="coming-soon-icon"><i className="bi bi-tools" /></span>
        <h1 className="section-title mb-2">{title}</h1>
        <p className="text-muted mb-4">
          This page isn't built yet. It's planned for <strong>Phase {phase}</strong> of the roadmap.
        </p>
        <Link to="/" className="btn btn-brand">Back to homepage</Link>
      </div>
    </section>
  );
}
