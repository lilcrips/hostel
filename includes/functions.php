<?php
/**
 * includes/functions.php
 * ------------------------------------------------------------------
 * Small reusable helper functions. Writing them once here means
 * every page formats prices, escapes text, and decides availability
 * in exactly the same way.
 */

/**
 * e(): "escape" text before printing it into HTML.
 *
 * If a user types <script>alert('hacked')</script> as a hostel name and
 * we print it raw, the browser would RUN it. That attack is called XSS
 * (cross-site scripting). htmlspecialchars() turns < > " ' & into
 * harmless codes like &lt; so the browser just shows the text.
 *
 * RULE: anything that came from a user or the database goes through e().
 */
function e(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Human-readable label for a pricing period stored in the database. */
function price_period_label(string $period): string
{
    $labels = [
        'semester'      => 'per semester',
        'academic_year' => 'per academic year',
        'month'         => 'per month',
    ];
    return $labels[$period] ?? '';
}

/** format_price(4500, 'academic_year') → "GH₵4,500 per academic year" */
function format_price(float $amount, string $period): string
{
    return SITE_CURRENCY . number_format($amount) . ' ' . price_period_label($period);
}

/**
 * Decide what availability message to show for a room/hostel.
 *
 * We never claim "Available" if the manager hasn't confirmed it recently.
 * Returns an array: ['label' => text, 'class' => CSS class name].
 */
function availability_status(int $availableRooms, ?string $updatedAt): array
{
    if ($updatedAt === null) {
        return ['label' => 'Availability unknown', 'class' => 'status-unknown'];
    }

    $daysOld = (time() - strtotime($updatedAt)) / 86400;   // 86400 seconds = 1 day

    if ($daysOld > AVAILABILITY_STALE_DAYS) {
        return ['label' => 'Not recently confirmed', 'class' => 'status-unknown'];
    }
    if ($availableRooms > 0) {
        return ['label' => 'Rooms available', 'class' => 'status-available'];
    }
    return ['label' => 'Fully occupied', 'class' => 'status-full'];
}

/** "Updated 3 days ago": shown next to prices and availability. */
function time_ago(string $datetime): string
{
    $seconds = time() - strtotime($datetime);
    if ($seconds < 3600)   return 'Updated just now';
    if ($seconds < 86400)  return 'Updated ' . floor($seconds / 3600) . ' h ago';
    $days = floor($seconds / 86400);
    return 'Updated ' . $days . ' day' . ($days == 1 ? '' : 's') . ' ago';
}

/**
 * Straight-line ("as the crow flies") distance between two points on
 * Earth, in kilometres, using the Haversine formula.
 *
 * This is NOT the walking distance. Roads bend, so walking is always
 * longer. We label it "straight-line" wherever we show it.
 * Used from Phase 5 onwards.
 */
function haversine_km(float $lat1, float $lng1, float $lat2, float $lng2): float
{
    $earthRadiusKm = 6371;
    $dLat = deg2rad($lat2 - $lat1);
    $dLng = deg2rad($lng2 - $lng1);
    $a = sin($dLat / 2) ** 2
       + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLng / 2) ** 2;
    return $earthRadiusKm * 2 * atan2(sqrt($a), sqrt(1 - $a));
}

/** Text to show for a distance, honest when we don't have one. */
function format_distance(?float $km): string
{
    if ($km === null) {
        return 'Distance unavailable';
    }
    return '≈ ' . number_format($km, 1) . ' km straight-line';
}

/** Mark the current page's nav link as active. */
function nav_active(string $page): string
{
    return basename($_SERVER['PHP_SELF']) === $page ? 'active' : '';
}
