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
Route::get('annonces/last6', [AnnonceController::class, 'last6']);
Route::post('addAnnonce/{id}', [AnnonceController::class, 'addAnnonce']);
Route::get('annonce/{id}', [AnnonceController::class, 'show']);
Route::get('annonce/{id}/professor', [AnnonceController::class, 'show_professor']);
Route::get('annonce/{id}/student', [AnnonceController::class, 'show_student']);
Route::put('updateAnnonce/{id}', [AnnonceController::class, 'update']);
Route::delete('deleteAnnonce/{id}', [AnnonceController::class, 'destroy']);
Route::get('/annonce/{annonce_id}/inscription/{user_id}', [AnnonceController::class, 'inscription']);


Route::get('users', [UserController::class, 'index']);
Route::get("professors", [UserController::class, 'list_professors']);
Route::post('addUser', [UserController::class, 'store']);
Route::get('user/{id}', [UserController::class, 'show']);
Route::put('updateUser/{id}', [UserController::class, 'update']);
Route::delete('deleteUser/{id}', [UserController::class, 'destroy']);