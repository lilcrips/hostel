<?php
/**
 * index.php: HOMEPAGE
 * ------------------------------------------------------------------
 * Structure of this file:
 *   1. Load shared header (navbar) and temporary demo data
 *   2. Hero section with the search form
 *   3. Featured hostels (demo cards for now)
 *   4. Popular locations
 *   5. How it works
 *   6. Benefits
 *   7. Call-to-action for hostel managers
 *   8. Load shared footer
 */
require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/demo_data.php';   // ⚠️ Phase 1 only, replaced by the database later
?>

<!-- ===================== 2. HERO + SEARCH ===================== -->
<section class="hero">
    <div class="container position-relative">
        <div class="row justify-content-center text-center">
            <div class="col-lg-9">
                <span class="hero-eyebrow"><i class="bi bi-patch-check-fill"></i> Direct contact with managers. No agent fees.</span>
                <h1 class="hero-title">Find your next home, <span class="text-accent">closer to campus.</span></h1>
                <p class="hero-subtitle">
                    Compare hostels around your university by price, room type, facilities and distance,
                    then call or WhatsApp the manager yourself.
                </p>
            </div>
        </div>

        <!--
            The search form uses method="get", so the choices appear in the URL:
            search.php?campus=1&budget=3000-5000&room_type=two_in_room
            That makes searches easy to bookmark and share. search.php will read
            these values in Phase 4.
        -->
        <form class="search-panel" action="search.php" method="get" id="heroSearch">
            <div class="row g-3 align-items-end">
                <div class="col-12 col-md-6 col-lg-3">
                    <label for="campus" class="form-label"><i class="bi bi-mortarboard"></i> Campus</label>
                    <select class="form-select" id="campus" name="campus" required>
                        <option value="" selected disabled>Select your campus</option>
                        <?php foreach ($demoCampuses as $campus): ?>
                            <option value="<?= (int) $campus['id'] ?>"><?= e($campus['short_name']) ?> (<?= e($campus['city']) ?>)</option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-12 col-md-6 col-lg-3">
                    <label for="budget" class="form-label"><i class="bi bi-wallet2"></i> Budget <small class="text-muted">(per year)</small></label>
                    <select class="form-select" id="budget" name="budget">
                        <option value="">Any budget</option>
                        <?php foreach ($budgetRanges as $value => $label): ?>
                            <option value="<?= e($value) ?>"><?= e($label) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-12 col-md-6 col-lg-3">
                    <label for="room_type" class="form-label"><i class="bi bi-door-open"></i> Room type</label>
                    <select class="form-select" id="room_type" name="room_type">
                        <option value="">Any room type</option>
                        <?php foreach ($roomTypes as $value => $label): ?>
                            <option value="<?= e($value) ?>"><?= e($label) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-12 col-md-6 col-lg-3">
                    <button type="submit" class="btn btn-brand btn-lg w-100">
                        <i class="bi bi-search me-1"></i> Search hostels
                    </button>
                </div>

                <div class="col-12">
                    <label for="q" class="visually-hidden">Hostel name or area</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-geo-alt"></i></span>
                        <input type="text" class="form-control" id="q" name="q" maxlength="100"
                               placeholder="Optional: hostel name or area, e.g. Ayeduase, East Legon">
                    </div>
                </div>
            </div>
        </form>

        <ul class="hero-trust">
            <li><i class="bi bi-shield-check"></i> Listings reviewed before publishing</li>
            <li><i class="bi bi-rulers"></i> Distances calculated from real coordinates</li>
            <li><i class="bi bi-whatsapp"></i> Call or WhatsApp managers directly</li>
        </ul>
    </div>
</section>

<!-- ===================== 3. FEATURED HOSTELS ===================== -->
<section class="section">
    <div class="container">
        <div class="section-head">
            <div>
                <span class="section-eyebrow">Featured hostels</span>
                <h2 class="section-title">Popular with students this semester</h2>
            </div>
            <a href="search.php" class="btn btn-outline-brand">View all hostels <i class="bi bi-arrow-right"></i></a>
        </div>

        <div class="demo-notice" role="note">
            <i class="bi bi-info-circle-fill"></i>
            <span><strong>Demo listings.</strong> These hostels are fictional examples that show how real listings will look.
            Real hostels will appear here once managers submit them and an admin approves them.</span>
        </div>

        <div class="row g-4">
            <?php foreach ($demoHostels as $hostel):
                $status = availability_status($hostel['available_rooms'], $hostel['availability_updated_at']);
            ?>
            <div class="col-12 col-md-6 col-lg-4">
                <!-- ========== HOSTEL CARD (this design is reused on the search page) ========== -->
                <article class="hostel-card">
                    <div class="hostel-card-media" style="--hue: <?= (int) $hostel['image_hue'] ?>">
                        <!-- Placeholder "photo" until managers upload real pictures -->
                        <i class="bi bi-building"></i>
                        <span class="badge-demo">Demo</span>
                        <?php if ($hostel['is_verified']): ?>
                            <span class="badge-verified" title="Passed CampusStay verification"><i class="bi bi-patch-check-fill"></i> Verified</span>
                        <?php endif; ?>
                        <button type="button" class="btn-fav" aria-label="Save hostel" data-fav-demo>
                            <i class="bi bi-heart"></i>
                        </button>
                    </div>

                    <div class="hostel-card-body">
                        <h3 class="hostel-card-title"><?= e($hostel['name']) ?></h3>
                        <p class="hostel-card-location">
                            <i class="bi bi-geo-alt-fill"></i> <?= e($hostel['neighbourhood']) ?> · near <?= e($hostel['campus']) ?>
                        </p>
                        <p class="hostel-card-distance">
                            <i class="bi bi-signpost"></i> <?= e(format_distance($hostel['distance_km'])) ?>
                        </p>

                        <div class="hostel-card-tags">
                            <?php foreach ($hostel['room_types'] as $type): ?>
                                <span class="tag tag-room"><?= e($type) ?></span>
                            <?php endforeach; ?>
                        </div>
                        <div class="hostel-card-tags">
                            <?php foreach ($hostel['facilities'] as $facility): ?>
                                <span class="tag"><?= e($facility) ?></span>
                            <?php endforeach; ?>
                        </div>

                        <div class="hostel-card-footer">
                            <div>
                                <span class="price-from">From</span>
                                <span class="price"><?= e(SITE_CURRENCY . number_format($hostel['min_price'])) ?></span>
                                <span class="price-period"><?= e(price_period_label($hostel['price_period'])) ?></span>
                            </div>
                            <div class="text-end">
                                <span class="status-pill <?= e($status['class']) ?>"><?= e($status['label']) ?></span>
                                <small class="d-block text-muted mt-1"><?= e(time_ago($hostel['availability_updated_at'])) ?></small>
                            </div>
                        </div>

                        <a href="hostel.php?id=<?= (int) $hostel['id'] ?>" class="btn btn-brand w-100 mt-3">View details</a>
                    </div>
                </article>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ===================== 4. POPULAR LOCATIONS ===================== -->
<section class="section section-tinted">
    <div class="container">
        <div class="section-head">
            <div>
                <span class="section-eyebrow">Popular locations</span>
                <h2 class="section-title">Where students live</h2>
            </div>
        </div>
        <div class="row g-3">
            <?php foreach ($popularLocations as $loc): ?>
            <div class="col-6 col-md-4 col-lg-2">
                <a class="location-tile" href="search.php?campus=<?= (int) $loc['campus_id'] ?>&amp;q=<?= urlencode($loc['name']) ?>">
                    <span class="location-icon"><i class="bi <?= e($loc['icon']) ?>"></i></span>
                    <span class="location-name"><?= e($loc['name']) ?></span>
                    <span class="location-campus">near <?= e($loc['campus']) ?></span>
                </a>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ===================== 5. HOW IT WORKS ===================== -->
<section class="section">
    <div class="container">
        <div class="text-center mb-5">
            <span class="section-eyebrow">How it works</span>
            <h2 class="section-title">Find a hostel in three steps</h2>
        </div>
        <div class="row g-4">
            <div class="col-md-4">
                <div class="step-card">
                    <span class="step-number">1</span>
                    <i class="bi bi-search step-icon"></i>
                    <h3>Search &amp; filter</h3>
                    <p>Pick your campus, budget and room type. Narrow results by distance, facilities and availability.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="step-card">
                    <span class="step-number">2</span>
                    <i class="bi bi-images step-icon"></i>
                    <h3>Compare hostels</h3>
                    <p>See photos, every room type with its price, facilities, reviews and exactly where the hostel is on the map.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="step-card">
                    <span class="step-number">3</span>
                    <i class="bi bi-telephone step-icon"></i>
                    <h3>Contact the manager</h3>
                    <p>Call or WhatsApp the hostel manager directly to ask questions and arrange a visit. No agent in the middle.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ===================== 6. BENEFITS ===================== -->
<section class="section section-tinted">
    <div class="container">
        <div class="row align-items-center g-4 g-lg-5">
            <div class="col-lg-5">
                <span class="section-eyebrow">Why <?= e(SITE_NAME) ?></span>
                <h2 class="section-title">Hostel hunting without the stress</h2>
                <p class="text-muted">
                    No more walking from hostel to hostel in the sun or paying agents just to see a room.
                    Everything you need to decide is in one place.
                </p>
                <a href="search.php" class="btn btn-brand btn-lg mt-2">Start searching</a>
            </div>
            <div class="col-lg-7">
                <div class="row g-3">
                    <?php
                    // Each benefit is [icon, title, text]. Kept in an array to avoid repeating HTML.
                    $benefits = [
                        ['bi-cash-coin',      'Clear prices',        'Every room shows its price and whether it\'s per semester, year or month.'],
                        ['bi-geo',            'Honest distances',    'Calculated from real coordinates and clearly labelled as straight-line or walking.'],
                        ['bi-patch-check',    'Reviewed listings',   'Hostels are checked before publishing. Verified badges are earned, not bought.'],
                        ['bi-clock-history',  'Fresh availability',  'Each listing shows when it was last updated, so you know if the info is current.'],
                    ];
                    foreach ($benefits as [$icon, $title, $text]): ?>
                    <div class="col-sm-6">
                        <div class="benefit-card">
                            <i class="bi <?= e($icon) ?>"></i>
                            <h3><?= e($title) ?></h3>
                            <p><?= e($text) ?></p>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ===================== 7. CALL TO ACTION (MANAGERS) ===================== -->
<section class="section">
    <div class="container">
        <div class="cta-banner">
            <div>
                <h2>Do you manage a hostel?</h2>
                <p>List your hostel for free, show every room type and price, and get calls from students directly.</p>
            </div>
            <div class="d-flex flex-wrap gap-2">
                <a href="register.php?role=manager" class="btn btn-light btn-lg">List your hostel</a>
                <a href="about.php" class="btn btn-outline-light btn-lg">Learn more</a>
            </div>
        </div>
    </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>
