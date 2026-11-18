# CampusStay — Project Plan

> Find Your Next Home, Closer to Campus.

This document is the "map" for the whole project. Come back to it whenever you're unsure where something belongs.

**Stack:** React (built with Vite) + Supabase (database, login, file storage) + Vercel (hosting).
*(The project originally started in PHP + MySQL; we switched before building the backend.)*

---

## 1. MVP: what the first working version must do

| # | MVP feature | Why it's essential |
|---|-------------|--------------------|
| 1 | Browse and search approved hostels by campus, price, room type, distance | This is the whole point of the site |
| 2 | Hostel details page: photos, description, rooms and prices, facilities | Students need this to decide |
| 3 | Straight-line distance from the selected campus (from saved coordinates) | Shows how close a hostel really is |
| 4 | Map of campus + hostels (Leaflet + OpenStreetMap) | Shows where things are |
| 5 | Call Now (`tel:`) and WhatsApp (`wa.me`) buttons | Direct contact, with no agent in between |
| 6 | Student and manager sign-up/login (Supabase Auth) | Needed for favourites and listings |
| 7 | Manager dashboard: add/edit own hostel, rooms, prices, availability, photos | Gets real hostels onto the site |
| 8 | Admin dashboard: approve/reject hostels, verify managers, manage campuses, handle reports | Keeps listings honest |
| 9 | Save favourites (students) | Simple and useful |
| 10 | Report a listing | Lets students flag misleading listings |

**Version 2:** walking routes and times, hostel comparison, reviews and ratings, recently viewed, saved searches, notifications, booking enquiries, manager analytics.
**Not in scope:** payments and room reservations. The site never claims to reserve rooms.

---

## 2. Architecture

```
 ┌───────────────────────── Browser ─────────────────────────┐
 │  React app (built by Vite, hosted on Vercel)              │
 │   pages + components  ──►  supabase-js client             │
 └──────────────────────────────┬────────────────────────────┘
                                │ HTTPS (with the public "anon" key
                                │  + the logged-in user's token)
 ┌──────────────────────────────▼────────────────────────────┐
 │  Supabase                                                 │
 │   Auth      → sign-up, login, password hashing, sessions  │
 │   Postgres  → tables + Row Level Security (RLS) rules     │
 │   Storage   → hostel photos/videos (buckets + rules)      │
 │   Edge Functions → server-only code that needs secret     │
 │                    keys (e.g. walking routes, v2)         │
 └───────────────────────────────────────────────────────────┘
```

- **React** builds the user interface from small reusable **components** (`Navbar`, `HostelCard`, …).
- **Vite** runs the development server (`npm run dev`) and builds optimised files for Vercel (`npm run build`).
- **React Router** shows a different page for each URL (`/`, `/search`, `/hostels/12`) without reloading the browser.
- **Supabase** replaces the whole PHP + MySQL backend.

### ⚠️ The most important security idea: Row Level Security (RLS)

The browser talks to the database directly, and the Supabase **anon key is public**: anyone can see it in the browser. So the rules about who may read or change what must live **inside the database** as RLS policies. Examples:

- Anyone may read hostels where `status = 'approved'`.
- A manager may insert, update or delete only hostels where `manager_id = auth.uid()` (their own).
- Only admins may change `status` or `is_verified`.
- A student may read and change only their own favourites.

Hiding a button in React is **not** security. The database must refuse the action. The `service_role` key bypasses all RLS, so it must **never** appear in frontend code.

---

## 3. Folder structure

```
campusstay/
├── index.html               ← The single HTML page React draws into
├── package.json             ← Project name, scripts, list of libraries
├── vite.config.js           ← Vite settings
├── vercel.json              ← Tells Vercel to send every URL to index.html
├── .env.example             ← Template for Supabase keys (copy to .env)
├── public/                  ← Files served as-is (favicon)
├── docs/                    ← This plan + screenshots
├── supabase/                ← (Phase 2) SQL for tables, RLS policies, demo seed data
└── src/
    ├── main.jsx             ← Entry point: loads CSS, router, <App />
    ├── App.jsx              ← Route table: which page for which URL
    ├── config/site.js       ← Site name, currency, settings
    ├── data/demoData.js     ← ⚠️ Temporary demo data (removed in Phase 4)
    ├── utils/format.js      ← Price/distance/availability helpers
    ├── hooks/               ← Reusable React logic (useDocumentTitle, later useAuth…)
    ├── lib/                 ← (Phase 2) supabase.js: the Supabase client
    ├── styles/global.css    ← All custom styles
    ├── components/
    │   ├── layout/          ← Navbar, Footer, Layout (shared by all pages)
    │   ├── home/            ← Homepage sections
    │   ├── hostel/          ← HostelCard (later: gallery, room table, contact buttons)
    │   └── search/          ← SearchForm (later: filter sidebar)
    └── pages/               ← One file per page: HomePage, SearchPage, …
        (later: student/, manager/, admin/ subfolders for dashboards)
```

---

## 4. Database design (Supabase Postgres)

Supabase Auth keeps login accounts in its own `auth.users` table. We add a **`profiles`** table with the same `id` to store each person's name, phone and role.

```
 auth.users (Supabase) ──1:1── profiles
                               id (uuid), full_name, phone,
                               role: student|manager|admin, status
                                  │ 1
                                  │ manages
                                  │ N
 campuses ──1:N──────────────── hostels ──1:N── rooms ──1:N── room_images
 id, name, short_name,          id, manager_id, campus_id,    id, hostel_id, room_type,
 city, latitude, longitude      name, description, address,   occupants_per_room, price,
                                neighbourhood, latitude,      price_period, total_rooms,
                                longitude, contact_phone,     available_rooms,
                                whatsapp_number, status,      availability_updated_at
                                is_verified, updated_at
                                  │
        ┌────────────┬────────────┼──────────────┬──────────────┐
   hostel_images  hostel_videos  hostel_facilities ── facilities  reports
     (1:N)          (1:N)          (N:M junction)               (user, reason, status)
        ┌─────────────┴────────────┐
    favourites (profile ↔ hostel)  reviews (profile, hostel, rating, comment, manager_reply)

 manager_verifications (manager_id, document_path, status, reviewed_by)
```

| Relationship | Type | Stored as |
|---|---|---|
| A campus has many hostels | 1:N | `hostels.campus_id → campuses.id` |
| A manager manages many hostels | 1:N | `hostels.manager_id → profiles.id` |
| A hostel has many room categories | 1:N | `rooms.hostel_id → hostels.id` |
| A hostel has many images / videos | 1:N | `hostel_images.hostel_id`, `hostel_videos.hostel_id` |
| Hostels ↔ facilities | N:M | junction table `hostel_facilities` |
| Students ↔ saved hostels | N:M | junction table `favourites` |
| A hostel has many reviews | 1:N | `reviews.hostel_id` (+ `reviews.user_id`) |

**Rules carried over from the original brief:**
- Only `status = 'approved'` hostels are public, and only admins can approve.
- `is_verified` is set only by an admin. It controls the verified badge.
- Each room has its own `price` + `price_period` (`semester` / `academic_year` / `month`), always shown together.
- If `availability_updated_at` is older than 30 days, the site shows "Not recently confirmed", never "Available".
- Photos go in a Supabase **Storage** bucket. The database stores only the file path. Upload rules limit file type and size.

**Distance:** calculated from campus and hostel coordinates with the Haversine formula (`src/utils/format.js`). It can also run inside Postgres so that "within 2 km" filters happen in the database.

---

## 5. External services, keys and costs

| Service | Used for | Key? | Cost |
|---|---|---|---|
| **Supabase** | Database, Auth, Storage | Project URL + anon key (public) | Free tier. Free projects pause after ~1 week of inactivity (resume from the dashboard). |
| **Vercel** | Hosting | GitHub login | Free Hobby plan, **non-commercial use only**. Move to Pro or Netlify/Cloudflare Pages if the site earns money. |
| Bootstrap, Bootstrap Icons | Layout, icons | No | Free (installed via npm) |
| Google Fonts | Typography | No | Free |
| Leaflet + OpenStreetMap tiles | Interactive map | No | Free under a fair-use policy. Use a tile provider (MapTiler / Stadia, free tiers) if traffic grows. |
| OpenRouteService | Walking routes (v2) | Free API key, kept in a Supabase Edge Function, never in React | Free tier |
| WhatsApp `wa.me`, `tel:` links | Contact buttons | No | Free |

**Distance honesty rule:**
- Straight-line distance is shown as "≈ 1.2 km straight-line".
- Walking distance appears only when a routing service actually returned it.
- If there are no coordinates, the site shows "Distance unavailable".

---

## 6. How the parts communicate

1. **Reading data:** a page calls `supabase.from('hostels').select(...).eq('status', 'approved')`. Supabase checks the RLS rules and returns JSON, and React draws the cards.
2. **Search filters:** filters live in the URL (`/search?campus=2&budget=3000-5000`), so searches can be bookmarked and shared. `SearchPage` reads them and builds the Supabase query.
3. **Login:** `supabase.auth.signUp()` / `signInWithPassword()`. Supabase hashes the password and gives the browser a session token, which is then sent with every request so RLS knows who `auth.uid()` is.
4. **Uploads:** `supabase.storage.from('hostel-images').upload(...)`, then the returned file path is saved in `hostel_images`.
5. **Secret-key work** (routing API): React calls a Supabase Edge Function, which holds the key on the server.

---

## 7. Development sequence

| Phase | Goal | "Done" means… |
|---|---|---|
| **1. UI/UX** | React app, shared layout, homepage, hostel card | Homepage works on phone and desktop ✅ |
| **2. Database** | Supabase project, tables, relationships, RLS policies, labelled demo seed, `src/lib/supabase.js` | Tables visible in Supabase, React reads campuses from it |
| **3. Auth** | Sign-up/login for students and managers, `profiles` + roles, protected routes | Manager can log in and create a *pending* hostel |
| **4. Search** | Real `SearchPage` with all filters + sorting, hostel details page | Example search (≤2 km, GH₵3,000–5,000, double room available) returns correct results |
| **5. Maps & contact** | Leaflet map, distances, call/WhatsApp, (walking routes) | Markers in the right places, distances labelled honestly |
| **6. Dashboards** | Student, manager, admin dashboards, approval and verification, photo uploads | Admin approves a hostel, which then appears in search |
| **7. Testing & launch** | Forms, RLS permission tests, uploads, mobile, deploy to Vercel | Live on `*.vercel.app`, test checklist passes |

We don't move to the next phase until the current one works on your machine.
