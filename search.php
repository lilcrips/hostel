<?php
/**
 * search.php: SEARCH RESULTS (placeholder until Phase 4)
 * ------------------------------------------------------------------
 * For now this page only shows the filters it RECEIVED from the
 * homepage form, so you can see how GET parameters travel in the URL.
 * It does not search anything yet. Real results need the database
 * (Phase 2) and the search query (Phase 4).
 */
$pageTitle = 'Find Hostels';
require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/demo_data.php';

// $_GET holds the values from the URL, e.g. ?campus=1&budget=3000-5000
// We never trust them: (int) forces a number, and e() escapes text when printing.
$campusId = isset($_GET['campus']) ? (int) $_GET['campus'] : 0;
$budget   = $_GET['budget']    ?? '';
$roomType = $_GET['room_type'] ?? '';
$keyword  = trim($_GET['q'] ?? '');

// Look up readable labels (only accept values we know about).
$campusName = 'Any campus';
foreach ($demoCampuses as $c) {
    if ($c['id'] === $campusId) { $campusName = $c['short_name']; }
}
$budgetLabel = $budgetRanges[$budget] ?? 'Any budget';
$roomLabel   = $roomTypes[$roomType] ?? 'Any room type';
?>

<section class="section">
    <div class="container" style="max-width: 760px">
        <span class="section-eyebrow">Phase 4 preview</span>
        <h1 class="section-title mb-3">Search results are coming soon</h1>

        <div class="demo-notice" role="note">
            <i class="bi bi-cone-striped"></i>
            <span>This page doesn't search yet. Below are the filters it received from the homepage,
            which shows the form is working. We'll connect it to the database in Phase 4.</span>
        </div>

        <ul class="list-group mb-4">
            <li class="list-group-item d-flex justify-content-between"><span>Campus</span><strong><?= e($campusName) ?></strong></li>
            <li class="list-group-item d-flex justify-content-between"><span>Budget</span><strong><?= e($budgetLabel) ?></strong></li>
            <li class="list-group-item d-flex justify-content-between"><span>Room type</span><strong><?= e($roomLabel) ?></strong></li>
            <li class="list-group-item d-flex justify-content-between"><span>Keyword</span><strong><?= e($keyword !== '' ? $keyword : '—') ?></strong></li>
        </ul>

        <a href="index.php" class="btn btn-outline-brand"><i class="bi bi-arrow-left"></i> Back to homepage</a>
    </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>
