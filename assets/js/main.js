/* =====================================================================
   assets/js/main.js: shared JavaScript for every page
   ---------------------------------------------------------------------
   JavaScript runs in the visitor's browser. Here we only add small
   comforts. Anything important (logins, saving data) is ALWAYS
   handled by PHP on the server, because users can switch JS off or
   tamper with it.
   ===================================================================== */

// Wait until the HTML has fully loaded before touching elements.
document.addEventListener('DOMContentLoaded', () => {

    /* ---- 1. Navbar shadow when the user scrolls down ---- */
    const nav = document.getElementById('siteNav');
    if (nav) {
        const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 10);
        updateNav();
        window.addEventListener('scroll', updateNav, { passive: true });
    }

    /* ---- 2. Hero search: friendly message if no campus is chosen ----
       The <select> has the "required" attribute, so the browser already
       blocks empty submissions. We just make the message clearer. */
    const campusSelect = document.getElementById('campus');
    if (campusSelect) {
        campusSelect.addEventListener('invalid', () => {
            campusSelect.setCustomValidity('Please choose your campus so we can find hostels near it.');
        });
        campusSelect.addEventListener('change', () => campusSelect.setCustomValidity(''));
    }

    /* ---- 3. Favourite (heart) buttons on DEMO cards ----
       This only changes the icon. It does NOT save anything yet.
       Real saving (to the favourites table) arrives in Phase 6 and
       will require the student to be logged in. */
    document.querySelectorAll('[data-fav-demo]').forEach((button) => {
        button.addEventListener('click', () => {
            const saved = button.classList.toggle('is-saved');
            button.querySelector('i').className = saved ? 'bi bi-heart-fill' : 'bi bi-heart';
            button.setAttribute('aria-label', saved ? 'Remove from saved (demo only)' : 'Save hostel');
            button.title = 'Demo only: saving works after login (coming in a later phase)';
        });
    });
});
