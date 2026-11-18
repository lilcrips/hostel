// src/pages/SearchPage.jsx
// PLACEHOLDER until Phase 4.
// It only shows the filters it received in the URL (?campus=…&budget=…),
// to prove the homepage form works. It does not search anything yet.
// Real results will come from Supabase in Phase 4.
import { Link, useSearchParams } from 'react-router';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { campuses, budgetRanges, roomTypes } from '../data/demoData.js';

export default function SearchPage() {
  useDocumentTitle('Find Hostels');
  const [searchParams] = useSearchParams(); // reads the part of the URL after "?"

  // Never trust URL values: only accept ones we recognise.
  const campus = campuses.find((c) => String(c.id) === searchParams.get('campus'));
  const filters = [
    ['Campus', campus ? campus.short_name : 'Any campus'],
    ['Budget', budgetRanges[searchParams.get('budget')] ?? 'Any budget'],
    ['Room type', roomTypes[searchParams.get('room_type')] ?? 'Any room type'],
    ['Keyword', searchParams.get('q') || '—'],
  ];

  return (
    <section className="section">
      <div className="container narrow">
        <span className="section-eyebrow">Phase 4 preview</span>
        <h1 className="section-title mb-3">Search results are coming soon</h1>

        <div className="demo-notice" role="note">
          <i className="bi bi-cone-striped" />
          <span>
            This page doesn't search yet. Below are the filters it received from the homepage, which
            shows the form is working. We'll connect it to the database in Phase 4.
          </span>
        </div>

        <ul className="list-group mb-4">
          {filters.map(([label, value]) => (
            <li className="list-group-item d-flex justify-content-between gap-3" key={label}>
              <span>{label}</span>
              <strong className="text-end text-break">{value}</strong>
            </li>
          ))}
        </ul>

        <Link to="/" className="btn btn-outline-brand"><i className="bi bi-arrow-left" /> Back to homepage</Link>
      </div>
    </section>
  );
}
