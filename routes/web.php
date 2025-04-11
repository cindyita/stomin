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

Route::middleware('auth')->group(function () {
    Route::get('/getfoldersuser', [FolderController::class, 'getfoldersUser'])
        ->name('getfoldersuser');

    Route::post('/storefolder', [FolderController::class, 'store'])
        ->name('storefolder');

    Route::post('/storefile', [FileController::class, 'store'])
        ->name('storefile');

    Route::get('/getfilesuser', [FileController::class, 'getfilesuser'])
        ->name('getfilesuser');

    Route::get('/togglefavoritefile', [FileController::class, 'togglefavoritefile'])->name('togglefavoritefile');

    Route::get('/togglefavoritefolder', [FolderController::class, 'togglefavoritefolder'])->name('togglefavoritefolder');

    Route::get('/getInfoFile',[FileController::class, 'getInfoFile'])->name('getInfoFile');

    Route::get('/getInfoFolder',[FolderController::class, 'getInfoFolder'])->name('getInfoFolder');

    Route::delete('/deleteFolder',[FolderController::class, 'deleteFolder'])->name('deleteFolder');

    Route::delete('/deleteFile',[FileController::class, 'deleteFile'])->name('deleteFile');

    Route::post('/editfolder',[FolderController::class, 'editfolder'])->name('editfolder');

    Route::post('/editfile',[FileController::class, 'editfile'])->name('editfile');
});

Route::redirect('/', '/home')->middleware(['auth', 'verified']);

Route::get('/home/{any?}', [DashboardController::class, 'index'])
    ->where('any', '.*')
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

require __DIR__.'/auth.php';
