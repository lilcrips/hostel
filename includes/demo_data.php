<?php
/**
 * includes/demo_data.php
 * ------------------------------------------------------------------
 * ⚠️ TEMPORARY DEMO DATA FOR PHASE 1 ONLY ⚠️
 *
 * We don't have a database yet, so the homepage reads these PHP arrays
 * to show what real listings will look like. Every hostel here is
 * FICTIONAL and marked as a demo on screen.
 *
 * In Phase 2 these arrays become rows in MySQL tables, and in Phase 4
 * we delete this file and query the database instead. The array keys
 * deliberately match the column names we'll use in the database.
 */

// Campuses: in Phase 2 these get verified latitude/longitude columns.
$demoCampuses = [
    ['id' => 1, 'name' => 'University of Ghana', 'short_name' => 'UG Legon', 'city' => 'Accra'],
    ['id' => 2, 'name' => 'Kwame Nkrumah University of Science and Technology', 'short_name' => 'KNUST', 'city' => 'Kumasi'],
    ['id' => 3, 'name' => 'University of Cape Coast', 'short_name' => 'UCC', 'city' => 'Cape Coast'],
    ['id' => 4, 'name' => 'University of Education, Winneba', 'short_name' => 'UEW', 'city' => 'Winneba'],
];

// Room types: these become the allowed values of rooms.room_type.
$roomTypes = [
    'single'         => 'Single room (1 person)',
    'two_in_room'    => '2 in a room',
    'three_in_room'  => '3 in a room',
    'four_in_room'   => '4 in a room',
    'self_contained' => 'Self-contained',
];

// Budget ranges for the homepage search (per academic year).
$budgetRanges = [
    '0-3000'     => 'Under GH₵3,000',
    '3000-5000'  => 'GH₵3,000 – GH₵5,000',
    '5000-8000'  => 'GH₵5,000 – GH₵8,000',
    '8000-'      => 'Above GH₵8,000',
];

// Real neighbourhoods near each campus, used for "Popular locations".
// Real place names, but we show NO hostel counts until the database
// can count genuine listings.
$popularLocations = [
    ['name' => 'East Legon',  'campus' => 'UG Legon', 'campus_id' => 1, 'icon' => 'bi-buildings'],
    ['name' => 'Madina',      'campus' => 'UG Legon', 'campus_id' => 1, 'icon' => 'bi-shop'],
    ['name' => 'Ayeduase',    'campus' => 'KNUST',    'campus_id' => 2, 'icon' => 'bi-house-door'],
    ['name' => 'Kotei',       'campus' => 'KNUST',    'campus_id' => 2, 'icon' => 'bi-tree'],
    ['name' => 'Amamoma',     'campus' => 'UCC',      'campus_id' => 3, 'icon' => 'bi-water'],
    ['name' => 'Kwaprow',     'campus' => 'UCC',      'campus_id' => 3, 'icon' => 'bi-signpost-split'],
];

// FICTIONAL hostels. distance_km is null on purpose: we have no
// verified coordinates yet, so the card honestly says "Distance unavailable".
$demoHostels = [
    [
        'id' => 1, 'name' => 'Sunrise Court Hostel (Demo)', 'neighbourhood' => 'East Legon', 'campus' => 'UG Legon',
        'min_price' => 4200, 'price_period' => 'academic_year',
        'room_types' => ['2 in a room', '4 in a room'],
        'facilities' => ['Wi-Fi', 'Water', 'Security', 'Study room'],
        'available_rooms' => 6, 'availability_updated_at' => date('Y-m-d H:i:s', strtotime('-2 days')),
        'is_verified' => true, 'distance_km' => null, 'image_hue' => 170,
    ],
    [
        'id' => 2, 'name' => 'Gold Coast Residence (Demo)', 'neighbourhood' => 'Ayeduase', 'campus' => 'KNUST',
        'min_price' => 6500, 'price_period' => 'academic_year',
        'room_types' => ['Single room', 'Self-contained'],
        'facilities' => ['Wi-Fi', 'Air conditioning', 'Backup power', 'Parking'],
        'available_rooms' => 0, 'availability_updated_at' => date('Y-m-d H:i:s', strtotime('-5 days')),
        'is_verified' => true, 'distance_km' => null, 'image_hue' => 35,
    ],
    [
        'id' => 3, 'name' => 'Coastline Lodge (Demo)', 'neighbourhood' => 'Amamoma', 'campus' => 'UCC',
        'min_price' => 1800, 'price_period' => 'semester',
        'room_types' => ['3 in a room', '4 in a room'],
        'facilities' => ['Water', 'Kitchen', 'Laundry'],
        'available_rooms' => 3, 'availability_updated_at' => date('Y-m-d H:i:s', strtotime('-45 days')),
        'is_verified' => false, 'distance_km' => null, 'image_hue' => 205,
    ],
];
