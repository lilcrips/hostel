// src/components/layout/Layout.jsx
// The frame around every page: Navbar on top, Footer at the bottom.
// <Outlet /> is where React Router places the current page (Home, Search…).
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  const { pathname } = useLocation();

  // When the user goes to a new page, start at the top (like a normal website).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
