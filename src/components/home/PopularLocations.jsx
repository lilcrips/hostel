// src/components/home/PopularLocations.jsx
// Quick links to search popular neighbourhoods near each campus.
import { Link } from 'react-router';
import { popularLocations } from '../../data/demoData.js';

export default function PopularLocations() {
  return (
    <section className="section section-tinted">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">Popular locations</span>
            <h2 className="section-title">Where students live</h2>
          </div>
        </div>
        <div className="row g-3">
          {popularLocations.map((loc) => {
            const params = new URLSearchParams({ campus: loc.campus_id, q: loc.name });
            return (
              <div className="col-6 col-md-4 col-lg-2" key={loc.name}>
                <Link className="location-tile" to={`/search?${params}`}>
                  <span className="location-icon"><i className={`bi ${loc.icon}`} /></span>
                  <span className="location-name">{loc.name}</span>
                  <span className="location-campus">near {loc.campus}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
