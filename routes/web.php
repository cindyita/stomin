<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ViewFileController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\FileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/viewfile', [ViewFileController::class, 'index'])
    ->name('viewfile');

Route::get('/getfoldersuser', [FolderController::class, 'getfoldersUser'])
    ->name('getfolersuser');

Route::post('/storefolder', [FolderController::class, 'store'])
    ->name('storefolder');

Route::post('/storefile', [FileController::class, 'store'])
    ->name('storefile');

Route::redirect('/', '/home')->middleware(['auth', 'verified']);

Route::get('/home/{any?}', [DashboardController::class, 'index'])
    ->where('any', '.*')
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

require __DIR__.'/auth.php';
