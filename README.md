# CampusStay

**Find Your Next Home, Closer to Campus.** A hostel discovery platform for university students in Ghana.

Built with HTML, CSS, JavaScript, Bootstrap 5, PHP and MySQL. The full plan (MVP, architecture, ERD, services, roadmap) is in [`docs/PROJECT_PLAN.md`](docs/PROJECT_PLAN.md).

## Current status

| Phase | Status |
|---|---|
| 1. UI/UX: homepage, header, footer, hostel card | ✅ Done (uses clearly labelled **demo data**) |
| 2. Database | ⏳ Next |
| 3–7 | Not started |

What works now: the homepage, responsive navbar, and a search form that sends your choices to `search.php`, which shows what it received. What does **not** work yet: real search results, login, maps, dashboards. Links to those pages return "Not Found" until we build them.

## Running it locally with XAMPP (Windows)

1. Install XAMPP from <https://www.apachefriends.org> and open the **XAMPP Control Panel**.
2. Click **Start** next to **Apache**. (MySQL isn't needed until Phase 2.)
3. Copy this project folder into `C:\xampp\htdocs\` and name it `campusstay`, so you have `C:\xampp\htdocs\campusstay\index.php`.
4. Open your browser at **http://localhost/campusstay/**.

On macOS the folder is `/Applications/XAMPP/htdocs/`.

**Without XAMPP:** if PHP is installed, run `php -S localhost:8000` inside the project folder and open http://localhost:8000.
