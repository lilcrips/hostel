<?php
/**
 * includes/header.php
 * ------------------------------------------------------------------
 * The top of EVERY page: <head>, stylesheets, and the navigation bar.
 *
 * How to use it in a page:
 *     $pageTitle = 'Find Hostels';          // optional
 *     require __DIR__ . '/includes/header.php';
 *
 * __DIR__ means "the folder this file is in", so paths work no matter
 * where the page lives.
 */
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/functions.php';

$fullTitle = isset($pageTitle) ? $pageTitle . ' | ' . SITE_NAME : SITE_NAME . ' | ' . SITE_TAGLINE;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Character set + viewport: the viewport line makes the page scale properly on phones -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Find verified student hostels near Ghanaian universities. Compare prices, rooms, distance from campus and contact managers directly.">
    <title><?= e($fullTitle) ?></title>

    <!-- Google Fonts: Plus Jakarta Sans for a clean, modern look -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Bootstrap 5: grid system, navbar, buttons, forms -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <!-- Bootstrap Icons: the small icons (bi-...) used across the site -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <!-- Our own styles load LAST so they can override Bootstrap's defaults -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<!-- ===================== NAVIGATION BAR ===================== -->
<nav class="navbar navbar-expand-lg site-nav sticky-top" id="siteNav">
    <div class="container">
        <a class="navbar-brand brand" href="index.php">
            <span class="brand-mark"><i class="bi bi-house-heart-fill"></i></span>
            <?= e(SITE_NAME) ?>
        </a>

        <!-- Hamburger button: only visible on small screens -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu"
                aria-controls="mainMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mainMenu">
            <ul class="navbar-nav mx-auto gap-lg-2">
                <li class="nav-item"><a class="nav-link <?= nav_active('index.php') ?>" href="index.php">Home</a></li>
                <li class="nav-item"><a class="nav-link <?= nav_active('search.php') ?>" href="search.php">Find Hostels</a></li>
                <li class="nav-item"><a class="nav-link <?= nav_active('map.php') ?>" href="map.php">Map</a></li>
                <li class="nav-item"><a class="nav-link <?= nav_active('about.php') ?>" href="about.php">About</a></li>
                <li class="nav-item"><a class="nav-link <?= nav_active('contact.php') ?>" href="contact.php">Contact</a></li>
            </ul>
            <div class="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
                <a href="login.php" class="btn btn-outline-brand">Log in</a>
                <a href="register.php" class="btn btn-brand">Sign up</a>
            </div>
        </div>
    </div>
</nav>

<main>
