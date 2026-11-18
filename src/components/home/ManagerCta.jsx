// src/components/home/ManagerCta.jsx
// "Call to action" banner inviting hostel managers to list their hostel.
import { Link } from 'react-router';

export default function ManagerCta() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-banner">
          <div>
            <h2>Do you manage a hostel?</h2>
            <p>List your hostel for free, show every room type and price, and get calls from students directly.</p>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Link to="/register?role=manager" className="btn btn-light btn-lg">List your hostel</Link>
            <Link to="/about" className="btn btn-outline-light btn-lg">Learn more</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
