<?php
/**
 * includes/footer.php
 * ------------------------------------------------------------------
 * The bottom of EVERY page: footer links + JavaScript files.
 * Scripts go at the end so the page content shows first (faster).
 */
?>
</main>

<!-- ===================== FOOTER ===================== -->
<footer class="site-footer">
    <div class="container">
        <div class="row g-4">
            <div class="col-lg-4">
                <a class="brand brand-light mb-3 d-inline-flex" href="index.php">
                    <span class="brand-mark"><i class="bi bi-house-heart-fill"></i></span>
                    <?= e(SITE_NAME) ?>
                </a>
                <p class="footer-text">
                    Helping university students in Ghana find accommodation close to campus,
                    with clear prices and direct contact with hostel managers. No middlemen.
                </p>
            </div>

            <div class="col-6 col-lg-2">
                <h6 class="footer-heading">Students</h6>
                <ul class="footer-links">
                    <li><a href="search.php">Find hostels</a></li>
                    <li><a href="map.php">Hostel map</a></li>
                    <li><a href="register.php">Create account</a></li>
                </ul>
            </div>

            <div class="col-6 col-lg-2">
                <h6 class="footer-heading">Managers</h6>
                <ul class="footer-links">
                    <li><a href="register.php?role=manager">List your hostel</a></li>
                    <li><a href="login.php">Manager login</a></li>
                </ul>
            </div>

            <div class="col-6 col-lg-2">
                <h6 class="footer-heading">Company</h6>
                <ul class="footer-links">
                    <li><a href="about.php">About us</a></li>
                    <li><a href="contact.php">Contact</a></li>
                </ul>
            </div>

            <div class="col-6 col-lg-2">
                <h6 class="footer-heading">Get in touch</h6>
                <ul class="footer-links">
                    <li><i class="bi bi-envelope me-1"></i> <a href="mailto:<?= e(SITE_EMAIL) ?>"><?= e(SITE_EMAIL) ?></a></li>
                    <li><i class="bi bi-geo-alt me-1"></i> Ghana</li>
                </ul>
            </div>
        </div>

        <hr class="footer-divider">
        <div class="d-flex flex-column flex-md-row justify-content-between gap-2 small footer-text">
            <span>&copy; <?= date('Y') ?> <?= e(SITE_NAME) ?>. All rights reserved.</span>
            <span><?= e(SITE_NAME) ?> does not collect payments or reserve rooms. Always inspect a hostel before paying.</span>
        </div>
    </div>
</footer>

<!-- Bootstrap's JavaScript: makes the mobile menu open and close -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<!-- Our own JavaScript -->
<script src="assets/js/main.js"></script>
</body>
</html>
