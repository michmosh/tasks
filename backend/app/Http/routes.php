<?php
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/tasks', 'TasksController@getTasks')->middleware('cors');
Route::post('/api/tasks', 'TasksController@addTask')->middleware('cors');
Route::delete('/api/tasks/{id}', 'TasksController@deleteTask')->middleware('cors');
Route::put('/api/tasks/{id}', 'TasksController@editTask')->middleware('cors');