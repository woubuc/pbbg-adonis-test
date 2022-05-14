/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import Route from '@ioc:Adonis/Core/Route';

Route.get('auth/me', 'AuthController.me').middleware('auth');
Route.post('auth/login', 'AuthController.login');
Route.post('auth/register', 'AuthController.register');
Route.post('auth/logout', 'AuthController.logout');

Route.get('games', 'GamesController.index');
Route.get('games/:slug', 'GamesController.show');
Route.post('games', 'GamesController.create').middleware('auth');
Route.patch('games/:slug', 'GamesController.update').middleware('auth');

Route.get('reviews', 'ReviewsController.index');
Route.post('reviews', 'ReviewsController.create').middleware('auth');
