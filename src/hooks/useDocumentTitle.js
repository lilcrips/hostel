// src/hooks/useDocumentTitle.js
// A "hook" is a reusable piece of React logic whose name starts with "use".
// This one sets the browser-tab title for a page, e.g. "Find Hostels | CampusStay".
import { useEffect } from 'react';
import { SITE } from '../config/site.js';

export default function useDocumentTitle(pageTitle) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`;
  }, [pageTitle]); // re-run only when pageTitle changes
}
