// src/config/site.js
// Site-wide settings in one place. Change SITE.name and the whole site updates.
// `export` makes these values importable from other files.

export const SITE = {
  name: 'CampusStay',
  tagline: 'Find Your Next Home, Closer to Campus.',
  email: 'hello@campusstay.example', // placeholder until a real address exists
};

// Ghanaian cedi
export const CURRENCY = 'GH₵';

// If a manager hasn't confirmed room availability in this many days,
// we stop calling it "available" and warn the student instead.
export const AVAILABILITY_STALE_DAYS = 30;
