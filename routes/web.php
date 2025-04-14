<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TripController;
use App\Http\Controllers\MapController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::resource('trips', TripController::class)->middleware(['auth']);
Route::get('map', [MapController::class, 'index'])->name('map');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
