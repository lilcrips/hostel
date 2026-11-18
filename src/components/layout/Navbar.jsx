// src/components/layout/Navbar.jsx
// The navigation bar at the top of every page.
//
// New React ideas here:
//  - useState: a "memory" for the component. `menuOpen` remembers whether the
//    mobile menu is open; calling setMenuOpen(...) changes it and React
//    redraws the navbar automatically.
//  - useEffect: run code after the component appears, e.g. listen for scrolling.
//  - <NavLink>: a link that doesn't reload the page, and knows when it's "active".
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { SITE } from '../../config/site.js';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Find Hostels' },
  { to: '/map', label: 'Map' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Add a shadow once the user scrolls down a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll); // clean up when the navbar is removed
  }, []);

  // Close the mobile menu whenever the page changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`navbar navbar-expand-lg site-nav sticky-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand brand" to="/">
          <span className="brand-mark"><i className="bi bi-house-heart-fill" /></span>
          {SITE.name}
        </Link>

        {/* Hamburger button: only visible on small screens */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainMenu"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="mainMenu">
          <ul className="navbar-nav mx-auto gap-lg-2">
            {NAV_ITEMS.map((item) => (
              <li className="nav-item" key={item.to}>
                {/* `end` = only "active" on an exact match (so "/" isn't active everywhere) */}
                <NavLink className="nav-link" to={item.to} end>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
            <Link to="/login" className="btn btn-outline-brand">Log in</Link>
            <Link to="/register" className="btn btn-brand">Sign up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
