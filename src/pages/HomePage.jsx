// src/pages/HomePage.jsx
// The homepage is just the sections stacked in order.
// Each section is its own component in src/components/home/.
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import Hero from '../components/home/Hero.jsx';
import FeaturedHostels from '../components/home/FeaturedHostels.jsx';
import PopularLocations from '../components/home/PopularLocations.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx';
import Benefits from '../components/home/Benefits.jsx';
import ManagerCta from '../components/home/ManagerCta.jsx';

export default function HomePage() {
  useDocumentTitle(); // no page title → "CampusStay | Find Your Next Home…"

  return (
    <>
      <Hero />
      <FeaturedHostels />
      <PopularLocations />
      <HowItWorks />
      <Benefits />
      <ManagerCta />
    </>
  );
}
