// src/components/home/Benefits.jsx
// "Why CampusStay": the four main promises the platform makes.
import { Link } from 'react-router';
import { SITE } from '../../config/site.js';

const BENEFITS = [
  { icon: 'bi-cash-coin', title: 'Clear prices', text: "Every room shows its price and whether it's per semester, year or month." },
  { icon: 'bi-geo', title: 'Honest distances', text: 'Calculated from real coordinates and clearly labelled as straight-line or walking.' },
  { icon: 'bi-patch-check', title: 'Reviewed listings', text: 'Hostels are checked before publishing. Verified badges are earned, not bought.' },
  { icon: 'bi-clock-history', title: 'Fresh availability', text: 'Each listing shows when it was last updated, so you know if the info is current.' },
];

export default function Benefits() {
  return (
    <section className="section section-tinted">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-lg-5">
            <span className="section-eyebrow">Why {SITE.name}</span>
            <h2 className="section-title">Hostel hunting without the stress</h2>
            <p className="text-muted">
              No more walking from hostel to hostel in the sun or paying agents just to see a room.
              Everything you need to decide is in one place.
            </p>
            <Link to="/search" className="btn btn-brand btn-lg mt-2">Start searching</Link>
          </div>
          <div className="col-lg-7">
            <div className="row g-3">
              {BENEFITS.map((b) => (
                <div className="col-sm-6" key={b.title}>
                  <div className="benefit-card">
                    <i className={`bi ${b.icon}`} />
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
