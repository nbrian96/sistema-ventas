<?php
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:super-admin'])->group(function () {
    Route::resource('users', UserController::class)->except(['show']);
});
