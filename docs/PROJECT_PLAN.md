# CampusStay — Project Plan

> Find Your Next Home, Closer to Campus.

This document is the "map" for the whole project. Read it once now, and come back to it whenever you're unsure where something belongs.

---

## 1. MVP: what the first working version must do

The full idea is big. The **MVP (Minimum Viable Product)** is the smallest version students can actually use. Everything else waits until the MVP works.

| # | MVP feature | Why it's essential |
|---|-------------|--------------------|
| 1 | Browse and search approved hostels by campus, price, room type, distance | This is the whole point of the site |
| 2 | Hostel details page: photos, description, rooms and prices, facilities | Students need this to decide |
| 3 | Straight-line distance from the selected campus (computed from saved coordinates) | Shows how close a hostel really is |
| 4 | Map showing campus + hostels (Leaflet + OpenStreetMap) | Shows where things are |
| 5 | Call Now (`tel:`) and WhatsApp (`wa.me`) buttons | Talk to managers directly, with no agent in between |
| 6 | Student and manager registration/login (hashed passwords, sessions) | Needed for favourites and listings |
| 7 | Manager dashboard: add/edit own hostel, rooms, prices, availability, photos | Gets real hostels onto the site |
| 8 | Admin dashboard: approve/reject hostels, verify managers, manage campuses, handle reports | Keeps the listings honest |
| 9 | Save favourites (students) | Simple and useful |
| 10 | Report a listing | Lets students flag misleading listings |

**After the MVP (version 2):** walking routes and times (routing API), hostel comparison, reviews and ratings, recently viewed, saved searches, notifications, booking enquiries, manager analytics. The database is designed so these slot in later without starting over.

**Not in scope:** payments and room reservation. The site does **not** claim to reserve rooms.

---

## 2. Architecture

We use a **classic server-rendered PHP app** with a small amount of JavaScript. It's the easiest setup to understand and it runs on XAMPP or any cheap PHP host.

```
 Browser (HTML + CSS + JS)
     │  1. Student opens /search.php?campus=1&max_price=5000
     ▼
 Apache (XAMPP)  ──►  PHP page (search.php)
                         │  2. Validates input, builds a prepared SQL query
                         ▼
                      MySQL database
                         │  3. Returns matching rows
                         ▼
                      PHP turns the rows into HTML
     ◄───────────────────┘  4. Browser receives a finished page

 For interactive parts (map markers, "save favourite" button):
 JavaScript ──fetch()──► /api/*.php ──► MySQL ──► JSON back to JavaScript
```

- **HTML** = structure (headings, forms, cards).
- **CSS** = appearance (colours, layout, responsiveness).
- **JavaScript** = behaviour in the browser (map, toggling, instant feedback).
- **PHP** = runs on the server: reads/writes the database, checks logins, decides what HTML to send.
- **MySQL** = permanent storage of users, hostels, rooms, etc.

We'll write plain PHP with no framework, organised so we never repeat code:
- `includes/` holds shared pieces (header, footer, helper functions).
- `config/` holds settings and the database connection.
- Each page is one PHP file that includes those shared pieces.

---

## 3. Folder structure

Repository root = the folder you will copy into `C:\xampp\htdocs\campusstay`.

```
campusstay/
├── index.php              ← Homepage (Phase 1) ✅
├── search.php             ← Search results + filters (Phase 4)
├── hostel.php             ← Single hostel details, e.g. hostel.php?id=5 (Phase 4/5)
├── map.php                ← Map of hostels around a campus (Phase 5)
├── about.php, contact.php ← Info pages
├── login.php, register.php, logout.php   ← Authentication (Phase 3)
│
├── config/
│   ├── config.php         ← Site name, base URL, upload limits
│   └── database.php       ← Creates the PDO connection to MySQL (Phase 2)
│
├── includes/
│   ├── header.php         ← <head>, navbar: shared by every page ✅
│   ├── footer.php         ← Footer + scripts: shared by every page ✅
│   ├── functions.php      ← Helpers: e(), formatting, distance calc ✅
│   └── auth.php           ← Login checks, role checks, CSRF (Phase 3)
│
├── student/               ← Student dashboard pages (Phase 6)
├── manager/               ← Hostel manager dashboard pages (Phase 3/6)
├── admin/                 ← Admin dashboard pages (Phase 6)
├── api/                   ← Small PHP files that return JSON for JavaScript (Phase 5)
│
├── assets/
│   ├── css/style.css      ← All our custom styles ✅
│   ├── js/main.js         ← Shared JavaScript ✅
│   └── images/            ← Logo, icons, static images
│
├── uploads/               ← Photos/videos uploaded by managers (not committed to git)
│   ├── hostels/
│   └── rooms/
│
├── database/
│   ├── schema.sql         ← CREATE TABLE statements (Phase 2)
│   └── seed_demo.sql      ← Clearly labelled DEMO data (Phase 2)
│
└── docs/
    └── PROJECT_PLAN.md    ← This file
```

**Why separate folders?** Each folder has one job, so you always know where to look. `student/`, `manager/` and `admin/` are separated so that one line at the top of each file can block anyone with the wrong role.

---

## 4. Database design (ERD)

```
                 ┌──────────────┐
                 │   campuses   │
                 │ id, name,    │
                 │ short_name,  │
                 │ city, lat,   │
                 │ lng          │
                 └──────┬───────┘
                        │ 1
                        │ has many
                        │ N
┌──────────┐ 1    N ┌───┴──────────┐ 1     N ┌──────────────┐
│  users   ├────────┤   hostels    ├─────────┤    rooms     │
│ id, name,│manages │ id, manager_id│contains│ id, hostel_id│
│ email,   │        │ campus_id,   │         │ room_type,   │
│ phone,   │        │ name, slug,  │         │ occupants,   │
│ password │        │ address, lat,│         │ price,       │
│ _hash,   │        │ lng, status, │         │ price_period,│
│ role,    │        │ is_verified, │         │ total_rooms, │
│ status   │        │ updated_at   │         │ available_   │
└─┬──┬──┬──┘        └┬──┬──┬──┬────┘         │ rooms,       │
  │  │  │            │  │  │  │              │ availability_│
  │  │  │            │  │  │  │              │ updated_at   │
  │  │  │   ┌────────┘  │  │  └───────┐      └──────┬───────┘
  │  │  │   │ 1:N       │  │ 1:N      │ N:M         │ 1:N
  │  │  │ hostel_images │ hostel_videos  hostel_facilities ── facilities
  │  │  │               │                              room_images
  │  │  │               │
  │  │  └── favourites (user_id, hostel_id)  ← N:M students ↔ hostels
  │  └───── reviews    (user_id, hostel_id, rating, comment, manager_reply)
  └──────── reports    (user_id, hostel_id, reason, status)

 manager_verifications (manager_id, document, status, reviewed_by)
```

### Relationships in plain English

| Relationship | Type | How it's stored |
|---|---|---|
| A campus has many hostels | one-to-many | `hostels.campus_id` → `campuses.id` |
| A manager (user) manages many hostels | one-to-many | `hostels.manager_id` → `users.id` |
| A hostel has many room categories | one-to-many | `rooms.hostel_id` → `hostels.id` |
| A hostel has many images / videos | one-to-many | `hostel_images.hostel_id`, `hostel_videos.hostel_id` |
| Hostels ↔ facilities | many-to-many | junction table `hostel_facilities(hostel_id, facility_id)` |
| Students ↔ saved hostels | many-to-many | junction table `favourites(user_id, hostel_id)` |
| A hostel has many reviews | one-to-many | `reviews.hostel_id`, plus `reviews.user_id` for the author |
| Reports | many-to-one | `reports.hostel_id`, `reports.user_id` |

**Key ideas you'll learn in Phase 2:**
- **Primary key** (`id`): a unique number for each row.
- **Foreign key**: a column pointing at another table's `id`. MySQL refuses links to rows that don't exist.
- **Junction table**: how SQL stores "many-to-many".
- **`users.role`**: one users table for all three roles (`student`, `manager`, `admin`), which keeps login code in one place.
- **`hostels.status`** (`pending` / `approved` / `rejected` / `suspended`): only `approved` hostels appear publicly.
- **`hostels.is_verified`**: set **only** by an admin, and drives the verified badge.
- **`rooms.availability_updated_at`**: if it's older than a set limit (e.g. 30 days), the site shows "Availability not recently confirmed" instead of "Available".
- **Prices**: stored per room as `price` + `price_period` (`semester` / `academic_year` / `month`) and always displayed together.

A hostel near two campuses: in the MVP each hostel has one primary campus, but the distance is calculated from its coordinates to **whichever campus the student selects**, so the numbers stay correct for any campus.

---

## 5. External services, API keys and costs

| Service | Used for | Key needed? | Cost |
|---|---|---|---|
| **Bootstrap 5** (CDN) | Responsive layout, components | No | Free |
| **Bootstrap Icons** (CDN) | Icons | No | Free |
| **Google Fonts** | Typography | No | Free |
| **Leaflet.js** | Interactive map library | No | Free |
| **OpenStreetMap tiles** | Map images | No | Free, but there's a fair-use policy. Fine for development and low traffic. For a busy production site, use a tile provider (e.g. MapTiler or Stadia Maps, both with free tiers). |
| **Haversine formula** (our own code) | Straight-line distance | No | Free; runs in PHP/SQL |
| **OSRM / OpenRouteService** | Walking route distance and time (v2) | OpenRouteService: free API key; public OSRM demo: no key but not for production | Free tiers |
| **WhatsApp `wa.me` links** | WhatsApp button | No | Free |
| **`tel:` links** | Call button | No | Free |
| Google Maps Platform | Alternative to all the map services | Yes, plus billing account | Has a monthly free credit; pay beyond that. Not needed. |

**Distance honesty rule:**
- Straight-line distances are labelled **"≈ 1.2 km straight-line"**.
- Walking distances are shown only when a routing service actually returned them, labelled **"1.6 km walk · ~20 min (via OpenStreetMap routing)"**.
- If a hostel has no coordinates, we show **"Distance unavailable"**. We never guess.

**Coordinates:** campus and hostel coordinates must be checked against a map by the admin/manager (manager drops a pin; admin confirms during approval). Any demo coordinates are marked as approximate demo data.

---

## 6. How the components communicate

1. **Page requests (most of the site):** the browser asks for `search.php?...`, PHP queries MySQL with **prepared statements**, then PHP prints HTML. Filters are ordinary `GET` form fields, so search URLs can be bookmarked and shared.
2. **Form submissions** (login, add hostel): `POST` to a PHP file. PHP validates the input, checks the **CSRF token**, saves to MySQL, then redirects.
3. **JavaScript → PHP API** (map markers, favourite toggle): `fetch('api/hostels.php?campus=1')`, and PHP returns **JSON**.
4. **Sessions:** after login PHP stores `user_id` and `role` in `$_SESSION`. Every protected page checks them on the server. Hiding a button with JavaScript is never enough.
5. **Files:** uploaded images are checked (real image type, size limit), renamed randomly, saved in `uploads/`, and only the file path is stored in MySQL.

---

## 7. Development sequence

| Phase | Goal | "Done" means… |
|---|---|---|
| **1. UI/UX** | Shared header/footer, homepage, design system, hostel card design | Homepage looks right on phone and desktop ✅ *(in progress)* |
| **2. Database** | `schema.sql`, `seed_demo.sql`, `config/database.php` | Tables visible in phpMyAdmin; PHP connects without errors |
| **3. Backend/Auth** | Register, login, logout, roles, CSRF, manager adds hostel + rooms | Manager can log in and create a *pending* hostel |
| **4. Search** | `search.php` with all filters + sorting, `hostel.php` | Example search (≤2 km, GH₵3,000–5,000, double room available) returns correct results |
| **5. Maps & Contact** | Leaflet map, Haversine distances, call/WhatsApp, (walking routes) | Markers in the right places, distances labelled honestly |
| **6. Dashboards** | Student, manager, admin dashboards; approval and verification | Admin approves a hostel, which then appears in search |
| **7. Testing** | Forms, permissions, uploads, mobile, performance | Test checklist passes |

We don't move to the next phase until the current one works on your machine.
