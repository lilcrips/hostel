// src/components/hostel/HostelCard.jsx
// One hostel "card". It receives a `hostel` object as a PROP (an input,
// like a function argument) and displays it. The same card will be used
// on the homepage, search results and the student's saved hostels.
//
// Safety note: React automatically escapes text inside {curly braces}, so a
// hostel name like "<script>…" shows as plain text and never runs.
// (That's what e() did for us in PHP.)
import { useState } from 'react';
import { Link } from 'react-router';
import {
  availabilityStatus, formatDistance, formatMoney, pricePeriodLabel, timeAgo,
} from '../../utils/format.js';

export default function HostelCard({ hostel, isDemo = false }) {
  const status = availabilityStatus(hostel.available_rooms, hostel.availability_updated_at);

  // Demo-only heart: changes the icon but saves NOTHING.
  // Real saving (Supabase "favourites" table, login required) comes later.
  const [saved, setSaved] = useState(false);

  return (
    <article className="hostel-card">
      {/* --hue gives each placeholder a different colour until real photos exist */}
      <div className="hostel-card-media" style={{ '--hue': hostel.image_hue }}>
        <i className="bi bi-building" />
        <div className="card-badges">
          {isDemo && <span className="badge-demo">Demo</span>}
          {hostel.is_verified && (
            <span className="badge-verified" title="Passed CampusStay verification">
              <i className="bi bi-patch-check-fill" /> Verified
            </span>
          )}
        </div>
        <button
          type="button"
          className={`btn-fav ${saved ? 'is-saved' : ''}`}
          aria-label={saved ? 'Remove from saved' : 'Save hostel'}
          aria-pressed={saved}
          title={isDemo ? 'Demo only: saving will work after login (later phase)' : undefined}
          onClick={() => setSaved(!saved)}
        >
          <i className={saved ? 'bi bi-heart-fill' : 'bi bi-heart'} />
        </button>
      </div>

      <div className="hostel-card-body">
        <h3 className="hostel-card-title">{hostel.name}</h3>
        <p className="hostel-card-location">
          <i className="bi bi-geo-alt-fill" /> {hostel.neighbourhood} · near {hostel.campus}
        </p>
        <p className="hostel-card-distance">
          <i className="bi bi-signpost" /> {formatDistance(hostel.distance_km)}
        </p>

        <div className="hostel-card-tags">
          {hostel.room_types.map((type) => <span className="tag tag-room" key={type}>{type}</span>)}
        </div>
        <div className="hostel-card-tags">
          {hostel.facilities.map((f) => <span className="tag" key={f}>{f}</span>)}
        </div>

        <div className="hostel-card-footer">
          <div>
            <span className="price-from">From</span>
            <span className="price">{formatMoney(hostel.min_price)}</span>
            <span className="price-period">{pricePeriodLabel(hostel.price_period)}</span>
          </div>
          <div className="text-end">
            <span className={`status-pill ${status.className}`}>{status.label}</span>
            <small className="d-block text-muted mt-1">{timeAgo(hostel.availability_updated_at)}</small>
          </div>
        </div>

        <Link to={`/hostels/${hostel.id}`} className="btn btn-brand w-100 mt-3">View details</Link>
      </div>
    </article>
  );
}
