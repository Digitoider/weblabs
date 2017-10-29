<?php

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
use Illuminate\Http\Request;


Route::get('/', function () {
    return view('welcome');
});

Route::post('/api/loginExists', function(Request $req){
	$login = $req->input('email');;
	$count = App\User::where('email', '=', $login)
										->count();

	$resText = 'Login is ' . (($count == 0)? 'not taken':'taken');
	return response($resText, 200);
});

Route::post('/admin/create/post', 'AdminController@createPost');
Route::post('/admin/delete/post/{id}', 'AdminController@deletePost');
Route::post('/admin/update/post/{id}', 'AdminController@updatePost');

Route::post('/admin/upload/photo/{postId}', 'AdminController@uploadPhoto');

Route::get('/post/{postId}/add/comment', 'HomeController@addComment');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


// Static pages HAML
Route::get('/profile', function(){ return view('static.profile'); });
Route::get('/about', function(){ return view('static.about'); });
Route::get('/contacts', function(){ return view('static.contacts'); });
Route::get('/education', function(){ return view('static.education'); });
Route::get('/photoalbum', function(){ return view('static.photoalbum'); });
Route::get('/calendar', function(){ return view('static.calendar'); });