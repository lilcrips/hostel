// src/components/home/FeaturedHostels.jsx
// Shows a few hostel cards. For now they're DEMO hostels; in Phase 4 this
// will load approved hostels from Supabase instead.
import { Link } from 'react-router';
import HostelCard from '../hostel/HostelCard.jsx';
import { demoHostels } from '../../data/demoData.js';

export default function FeaturedHostels() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">Featured hostels</span>
            <h2 className="section-title">Popular with students this semester</h2>
          </div>
          <Link to="/search" className="btn btn-outline-brand">
            View all hostels <i className="bi bi-arrow-right" />
          </Link>
        </div>

        <div className="demo-notice" role="note">
          <i className="bi bi-info-circle-fill" />
          <span>
            <strong>Demo listings.</strong> These hostels are fictional examples that show how real
            listings will look. Real hostels will appear here once managers submit them and an admin
            approves them.
          </span>
        </div>

        <div className="row g-4">
          {/* .map() turns each hostel object into a <HostelCard>. `key` helps React track items. */}
          {demoHostels.map((hostel) => (
            <div className="col-12 col-md-6 col-lg-4" key={hostel.id}>
              <HostelCard hostel={hostel} isDemo />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
