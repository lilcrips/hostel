// src/utils/format.js
// Small reusable helper functions ("utilities"). Every component formats
// prices, distances and availability the same way by importing these.
import { CURRENCY, AVAILABILITY_STALE_DAYS } from '../config/site.js';

const PERIOD_LABELS = {
  semester: 'per semester',
  academic_year: 'per academic year',
  month: 'per month',
};

/** pricePeriodLabel('academic_year') → "per academic year" */
export function pricePeriodLabel(period) {
  return PERIOD_LABELS[period] ?? '';
}

/** formatMoney(4500) → "GH₵4,500" */
export function formatMoney(amount) {
  return CURRENCY + Number(amount).toLocaleString('en-GH');
}

/** formatPrice(4500, 'academic_year') → "GH₵4,500 per academic year" */
export function formatPrice(amount, period) {
  return `${formatMoney(amount)} ${pricePeriodLabel(period)}`;
}

/**
 * Decide what availability message to show.
 * We never claim rooms are available if the info is outdated.
 * Returns { label, className }.
 */
export function availabilityStatus(availableRooms, updatedAt) {
  if (!updatedAt) {
    return { label: 'Availability unknown', className: 'status-unknown' };
  }
  const daysOld = (Date.now() - new Date(updatedAt).getTime()) / 86_400_000; // ms in a day
  if (daysOld > AVAILABILITY_STALE_DAYS) {
    return { label: 'Not recently confirmed', className: 'status-unknown' };
  }
  if (availableRooms > 0) {
    return { label: 'Rooms available', className: 'status-available' };
  }
  return { label: 'Fully occupied', className: 'status-full' };
}

/** timeAgo('2026-11-15T10:00:00Z') → "Updated 3 days ago" */
export function timeAgo(dateString) {
  const seconds = (Date.now() - new Date(dateString).getTime()) / 1000;
  if (seconds < 3600) return 'Updated just now';
  if (seconds < 86_400) return `Updated ${Math.floor(seconds / 3600)} h ago`;
  const days = Math.floor(seconds / 86_400);
  return `Updated ${days} day${days === 1 ? '' : 's'} ago`;
}

/**
 * Straight-line ("as the crow flies") distance in km between two points,
 * using the Haversine formula. NOT the walking distance: roads bend, so
 * walking is always longer. We always label it "straight-line".
 * Used from Phase 5.
 */
export function haversineKm(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Honest distance text: never guesses when we have no coordinates. */
export function formatDistance(km) {
  if (km === null || km === undefined) return 'Distance unavailable';
  return `≈ ${km.toFixed(1)} km straight-line`;
}
