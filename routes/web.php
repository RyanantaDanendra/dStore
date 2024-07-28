<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Home', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [App\Http\Controllers\homeController::class, 'index'])->name('home');

Route::get('/sneakers', function() {
    return Inertia::render('Sneakers');
});

// DASHBOARD
Route::get('/dashboard', [App\http\Controllers\dashboardController::class, 'index'])->middleware(['auth'])->name('dashboard');
Route::get('/dashboard/sneakers', [App\Http\Controllers\dashboardController::class, 'sneakers'])->name('dashboard.sneakers')->middleware('auth');

Route::get('/register', function() {
    return Inertia::render('Register');
})->name('register');

Route::get('/login', function() {
    return Inertia::render('Login');
})->name('loginPage');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
