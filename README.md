# CampusStay

**Find Your Next Home, Closer to Campus.** A hostel discovery platform for university students in Ghana.

Built with **React + Vite**, **Supabase** (database, login, file storage) and **Bootstrap 5**, hosted on **Vercel**.
The full plan (MVP, architecture, database design, services, roadmap) is in [`docs/PROJECT_PLAN.md`](docs/PROJECT_PLAN.md).

## Current status

| Phase | Status |
|---|---|
| 1. UI/UX: React app, layout, homepage, hostel card | ✅ Done (uses clearly labelled **demo data**) |
| 2. Database (Supabase) | ⏳ Next |
| 3–7 | Not started |

**What works now:**
- The homepage and the responsive navbar with its mobile menu.
- The search form, which sends your choices to `/search`. That page shows the filters it received.
- Placeholder pages for features that aren't built yet.

**What doesn't work yet:** real search results, login, maps, dashboards. Nothing is saved anywhere yet.

## Running it on your computer

You need **Node.js 18 or newer** (the LTS installer from <https://nodejs.org> includes it). Check with `node -v`.

```bash
npm install      # first time only: downloads the libraries into node_modules/
npm run dev      # starts the development server
```

Open the address it prints (usually **http://localhost:5173**). The page refreshes automatically when you save a file. Press `Ctrl + C` in the terminal to stop the server.

```bash
npm run build    # creates the optimised production version in dist/
npm run preview  # serves dist/ locally to check the production build
```

## Deploying to Vercel (free)

1. Push this repository to GitHub.
2. On <https://vercel.com>, choose **Add New → Project** and import the repository. Vercel detects Vite automatically.
3. From Phase 2 onwards, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under **Settings → Environment Variables**.

`vercel.json` makes page refreshes on addresses like `/search` work, instead of showing a 404.
