// src/App.jsx
// The "route table": which page component shows for which URL.
// Every page sits inside <Layout>, which adds the navbar and footer.
import { Routes, Route } from 'react-router';

import Layout from './components/layout/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import ComingSoonPage from './pages/ComingSoonPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />

        {/* Pages we haven't built yet: an honest "coming soon" instead of a broken link */}
        <Route path="/hostels/:id" element={<ComingSoonPage title="Hostel details" phase={4} />} />
        <Route path="/map" element={<ComingSoonPage title="Hostel map" phase={5} />} />
        <Route path="/about" element={<ComingSoonPage title="About us" phase={7} />} />
        <Route path="/contact" element={<ComingSoonPage title="Contact us" phase={7} />} />
        <Route path="/login" element={<ComingSoonPage title="Log in" phase={3} />} />
        <Route path="/register" element={<ComingSoonPage title="Create an account" phase={3} />} />

        {/* "*" matches any URL not listed above */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
