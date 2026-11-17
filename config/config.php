<?php
/**
 * config/config.php
 * ------------------------------------------------------------------
 * Site-wide settings, all in one place. Every page loads this file
 * first (through includes/header.php), so changing a value here
 * changes it everywhere, e.g. renaming the project later.
 */

// Show all errors while developing. In production we will turn this off.
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Branding: change these and the whole site updates.
define('SITE_NAME', 'CampusStay');
define('SITE_TAGLINE', 'Find Your Next Home, Closer to Campus.');
define('SITE_EMAIL', 'hello@campusstay.example');   // placeholder until a real address exists

// Currency: Ghanaian cedi.
define('SITE_CURRENCY', 'GH₵');

// If room availability hasn't been confirmed by the manager in this
// many days, we stop calling it "Available" and warn the student.
define('AVAILABILITY_STALE_DAYS', 30);

// Timezone for timestamps (Ghana uses GMT all year).
date_default_timezone_set('Africa/Accra');
