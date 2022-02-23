<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AnnonceController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::get('annonces', [AnnonceController::class, 'index']);
Route::post('addAnnonce', [AnnonceController::class, 'addAnnonce']);
Route::get('annonce/{id}', [AnnonceController::class, 'show']);
Route::put('updateAnnonce/{id}', [AnnonceController::class, 'update']);
Route::delete('deleteAnnonce/{id}', [AnnonceController::class, 'destroy']);


Route::get('users', [UserController::class, 'index']);
Route::post('addUser', [UserController::class, 'store']);
Route::get('user/{id}', [UserController::class, 'show']);
Route::put('updateUser/{id}', [UserController::class, 'update']);
Route::delete('deleteUser/{id}', [UserController::class, 'destroy']);