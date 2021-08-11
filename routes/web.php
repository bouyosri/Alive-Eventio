<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

/*
Route::get('/Events', [App\Http\Controllers\EventController::class, 'index'])->name('Events');

Route::get('/Events/create', [App\Http\Controllers\EventController::class, 'create'])->name('create Events');

Route::post('/Event', [App\Http\Controllers\EventController::class, 'store']);

Route::get('/Events/edit', [App\Http\Controllers\EventController::class, 'edit'])->name('edit Events');

Route::post('/Eventt', [App\Http\Controllers\EventController::class, 'update']);
*/


Route::resource('events',EventController::class);

//-----User
Route::resource('user',UserController::class);
Route::get('/{id}',[UserController::class, 'show']);
Route::post('/edit/{id}',[UserController::class, 'edit']);
Route::post('/organize/{id}',[UserController::class, 'organize'])->name('organize');
