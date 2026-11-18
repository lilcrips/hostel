// src/components/home/Hero.jsx
// The big welcome section at the top of the homepage, with the search form.
import SearchForm from '../search/SearchForm.jsx';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container position-relative">
        <div className="row justify-content-center text-center">
          <div className="col-lg-9">
            <span className="hero-eyebrow">
              <i className="bi bi-patch-check-fill" /> Direct contact with managers. No agent fees.
            </span>
            <h1 className="hero-title">
              Find your next home, <span className="text-accent">closer to campus.</span>
            </h1>
            <p className="hero-subtitle">
              Compare hostels around your university by price, room type, facilities and distance,
              then call or WhatsApp the manager yourself.
            </p>
          </div>
        </div>

        <SearchForm />

        <ul className="hero-trust">
          <li><i className="bi bi-shield-check" /> Listings reviewed before publishing</li>
          <li><i className="bi bi-rulers" /> Distances calculated from real coordinates</li>
          <li><i className="bi bi-whatsapp" /> Call or WhatsApp managers directly</li>
        </ul>
      </div>
    </section>
  );
}
