// src/components/layout/Footer.jsx
// The footer at the bottom of every page.
import { Link } from 'react-router';
import { SITE } from '../../config/site.js';

// Each column is data, so we can loop over it instead of repeating HTML.
const COLUMNS = [
  {
    heading: 'Students',
    links: [
      { to: '/search', label: 'Find hostels' },
      { to: '/map', label: 'Hostel map' },
      { to: '/register', label: 'Create account' },
    ],
  },
  {
    heading: 'Managers',
    links: [
      { to: '/register?role=manager', label: 'List your hostel' },
      { to: '/login', label: 'Manager login' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { to: '/about', label: 'About us' },
      { to: '/contact', label: 'Contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <Link className="brand brand-light mb-3 d-inline-flex" to="/">
              <span className="brand-mark"><i className="bi bi-house-heart-fill" /></span>
              {SITE.name}
            </Link>
            <p className="footer-text">
              Helping university students in Ghana find accommodation close to campus, with clear
              prices and direct contact with hostel managers. No middlemen.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div className="col-6 col-lg-2" key={col.heading}>
              <h6 className="footer-heading">{col.heading}</h6>
              <ul className="footer-links">
                {col.links.map((link) => (
                  <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-6 col-lg-2">
            <h6 className="footer-heading">Get in touch</h6>
            <ul className="footer-links">
              <li><i className="bi bi-envelope me-1" /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><i className="bi bi-geo-alt me-1" /> Ghana</li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />
        <div className="d-flex flex-column flex-md-row justify-content-between gap-2 small footer-text">
          <span>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span>{SITE.name} does not collect payments or reserve rooms. Always inspect a hostel before paying.</span>
        </div>
      </div>
    </footer>
  );
}
