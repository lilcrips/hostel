// src/components/search/SearchForm.jsx
// The hostel search form (campus, budget, room type, keyword).
//
// This is a "controlled form": React state holds each field's value, and
// each <select>/<input> shows that state. On submit we build a URL like
//   /search?campus=2&budget=3000-5000&room_type=two_in_room
// so searches can be bookmarked and shared.
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { campuses, budgetRanges, roomTypes } from '../../data/demoData.js';

export default function SearchForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ campus: '', budget: '', room_type: '', q: '' });

  // One change handler for every field: uses the field's `name` to know what to update.
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page

    // Only put filled-in fields in the URL.
    const params = new URLSearchParams();
    Object.entries(form).forEach(([key, value]) => {
      if (value.trim() !== '') params.set(key, value.trim());
    });
    navigate(`/search?${params.toString()}`);
  }

  return (
    <form className="search-panel" onSubmit={handleSubmit}>
      <div className="row g-3 align-items-end">
        <div className="col-12 col-md-6 col-lg-3">
          <label htmlFor="campus" className="form-label"><i className="bi bi-mortarboard" /> Campus</label>
          <select
            className="form-select" id="campus" name="campus" required
            value={form.campus} onChange={handleChange}
            onInvalid={(e) => e.target.setCustomValidity('Please choose your campus so we can find hostels near it.')}
            onInput={(e) => e.target.setCustomValidity('')}
          >
            <option value="" disabled>Select your campus</option>
            {campuses.map((c) => (
              <option key={c.id} value={c.id}>{c.short_name} ({c.city})</option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <label htmlFor="budget" className="form-label">
            <i className="bi bi-wallet2" /> Budget <small className="text-muted">(per year)</small>
          </label>
          <select className="form-select" id="budget" name="budget" value={form.budget} onChange={handleChange}>
            <option value="">Any budget</option>
            {Object.entries(budgetRanges).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <label htmlFor="room_type" className="form-label"><i className="bi bi-door-open" /> Room type</label>
          <select className="form-select" id="room_type" name="room_type" value={form.room_type} onChange={handleChange}>
            <option value="">Any room type</option>
            {Object.entries(roomTypes).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <button type="submit" className="btn btn-brand btn-lg w-100">
            <i className="bi bi-search me-1" /> Search hostels
          </button>
        </div>

        <div className="col-12">
          <label htmlFor="q" className="visually-hidden">Hostel name or area</label>
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-geo-alt" /></span>
            <input
              type="text" className="form-control" id="q" name="q" maxLength={100}
              placeholder="Optional: hostel name or area, e.g. Ayeduase, East Legon"
              value={form.q} onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
