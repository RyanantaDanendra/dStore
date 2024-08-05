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

// DASHBOARD -> SNEAKERS
Route::get('/dashboard/addsneaker', [App\Http\Controllers\dashboardController::class, 'addSneakerPage'])->name('addSneakerPage')->middleware('auth');
Route::post('/dashboard/addsneaker', [App\Http\Controllers\dashboardController::class, 'addSneaker'])->name('addSneaker')->middleware('auth');
Route::get('/dashboard/addsize/{id}', [App\Http\COntrollers\dashboardController::class, 'addSizePage'])->name('addSizePage')->middleware('auth');
Route::post('/dashboard/addSize/{id}', [App\Http\Controllers\dashboardController::class, 'addSize'])->name('addSize')->middleware('auth');
Route::get('/dashboard/addimages/{id}', [App\Http\Controllers\dashboardController::class, 'addimagesPage'])->name('addImagesPage')->middleware('auth');
Route::post('/dashboard/addimages/{id}', [App\Http\Controllers\dashboardController::class, 'addImages'])->name('addImages')->middleware('auth');

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
