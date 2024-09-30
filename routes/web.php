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

Route::middleware('auth')->group(function() {

// DASHBOARD
Route::get('/dashboard', [App\http\Controllers\dashboardController::class, 'index'])->name('dashboard');
Route::get('/dashboard/sneakers', [App\Http\Controllers\dashboardController::class, 'sneakers'])->name('dashboard.sneakers');

// DASHBOARD -> SNEAKERS
Route::get('/dashboard/addsneaker', [App\Http\Controllers\dashboardController::class, 'addSneakerPage'])->name('addSneakerPage');
Route::post('/dashboard/addsneaker', [App\Http\Controllers\dashboardController::class, 'addSneaker'])->name('addSneaker');
// DASHBOARD -> SNEAKERS -> ADD SIZE
Route::get('/dashboard/addsize/{id}', [App\Http\COntrollers\dashboardController::class, 'addSizePage'])->name('addSizePage');
Route::post('/dashboard/addSize/{id}', [App\Http\Controllers\dashboardController::class, 'addSize'])->name('addSize');
// DASHBOARD -> SNEAKERS -> ADD IMAGE
Route::get('/dashboard/addimages/{id}', [App\Http\Controllers\dashboardController::class, 'addimagesPage'])->name('addImagesPage');
Route::post('/dashboard/addimages/{id}', [App\Http\Controllers\dashboardController::class, 'addImages'])->name('addImages');
// DASHBOARD -> SNEAKERS -> EDIT SNEAKER DATA ( NAME, BRAND, CONDITION )
Route::get('/dashboard/sneakers/editsneaker/{id}', [App\Http\Controllers\dashboardController::class, 'editSneakerPage'])->name('editSneakerPage');
Route::put('/dashboard/sneakers/editsneaker/{id}', [App\Http\Controllers\dashboardController::class, 'editSneaker'])->name('editSneaker');
// DASHBOARD -> SNEAKERS -> EDIT SNEAKER DATA ( SIZE, STOCK )
Route::get('/dashboard/sneakers/sizestock/{id}', [App\Http\Controllers\dashboardController::class, 'editSizeStockPage'])->name('editSizeStockPage');
Route::put('/dashboard/sneakers/sizestock/{id}', [App\Http\Controllers\dashboardController::class, 'editSizeStock'])->name('editSizeStock');
// DELETE SNEAKER DATA
Route::delete('/dashboard/sneaker/delete/{id}', [App\Http\Controllers\dashboardController::class, 'deleteSneaker'])->name('deleteSneaker');
Route::delete('/dashboard/sneakers/delete/{id}', [App\Http\Controllers\dashboardController::class, 'deleteSizeStock'])->name('deleteSizeStock');
Route::delete('/dashboard/sneakers/{id}', [App\Http\Controllers\dashboardController::class, 'deleteImage'])->name('deleteImage');

// DASHBOARD -> USERS
Route::get('/dashboard/users', [App\Http\Controllers\dashboardController::class, 'usersPage'])->name('usersPage');
// DASHBOARD -> USERS -> STATUS
Route::put('/dashboard/users/changestatus/{id}', [App\Http\Controllers\dashboardController::class, 'changeStatus'])->name('changeStatus');

// DASHBOARD -> APPARELS
Route::get('/dashboard/apparels', [App\Http\Controllers\dashboardController::class, 'apparelsPage'])->name('apparelsPage');

// DASHBOARD -> APPARELS -> ADD APPAREL
Route::get('/dashboard/addapparel', [App\Http\Controllers\dashboardController::class, 'addApparelPage'])->name('addApparelPage');
Route::post('/dashboard/addapparel', [App\Http\Controllers\dashboardController::class, 'addApparel'])->name('addApparel');
// DASHBOARD -> APPARELS -> ADD APPAREL SIZE AND STOCK
Route::get('/dashboard/addapparelsize/{id}', [App\Http\Controllers\dashboardController::class, 'addApparelSizePage'])->name('addApparelSizePage');
Route::post('/dashboard/addapparelsize/{id}', [App\Http\Controllers\dashboardController::class, 'addApparelSize'])->name('addApparelSize');
// DASHBOARD -> APPARELS -> ADD IMAGEs
Route::get('/dashboard/addapparelimages/{id}', [App\Http\Controllers\dashboardController::class, 'addApparelImagespage'])->name('addApparelImagespage');
Route::post('/dashboard/addApparelImages/{id}', [App\Http\Controllers\dashboardController::class, 'addApparelImages'])->name('addApparelImages');
// DASHBOAR -> APPARELS -> EDIT APPARELS ( NAME, BRAND, CONDITION )
Route::get('/dashboard/apparels/editapparel/{id}', [App\Http\Controllers\dashboardController::class, 'editApparelPage'])->name('editApparelPage');
Route::put('/dashboard/apparels/editapparel/{id}', [App\Http\Controllers\dashboardController::class, 'editApparel'])->name('editApparel');
// DASHBOARD -> APPARELS -> EDIT APPAREL SIZE AND STOCK
Route::get('/dashboard/apparel/editapparelsizeandstock/{id}', [App\Http\Controllers\dashboardController::class, 'editApparelSizeAndStockPage'])->name('editSizeAndStockPage');
Route::put('/dashboard/apparel/editapparelsizeandstock/{id}', [App\Http\Controllers\dashboardController::class, 'editApparelSizeStock'])->name('editApparelSizeStock');
// DASHBOARD -> APPAREL -> DELETE SIZE AND STOCK
Route::delete('/dashboard/apparel/delete/sizeandstock/{id}', [App\Http\Controllers\dashboardController::class, 'deleteApparelSizeAndStock'])->name('deleteApparelSizeAndStock');
// DASHBOARD -> APPAREL -> DELETE
Route::delete('/dashboard/apparel/delete/{id}', [App\Http\Controllers\dashboardController::class, 'deleteApparel'])->name('deleteApparel');
// DASHBOARD => APPAREL -> DELETE IMAGE
Route::delete('/dashboard/apparel/delete/image/{id}', [App\Http\Controllers\dashboardController::class, 'deleteApparelImage'])->name('deleteApparelImage');
});

// SNEAKER DETAILS
Route::get('/sneaker/details/{id}', [App\Http\Controllers\sneakersController::class, 'sneakerDetailsPage'])->name('sneakerDetailsPage');
// SNEAKER ORDER
Route::post('/sneaker/details/{id}', [App\Http\Controllers\sneakersController::class, 'orderSneaker'])->name('orderSneaker')->middleware('auth');


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
