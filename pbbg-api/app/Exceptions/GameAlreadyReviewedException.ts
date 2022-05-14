import { Exception } from '@adonisjs/core/build/standalone'
import Game from '../Models/Game';

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new AlreadyReviewedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class GameAlreadyReviewedException extends Exception {
	public constructor(game: Game) {
		super(`You have already posted a review of the game ${ game.name }.`, 422, 'E_GAME_ALREADY_REVIEWED');
	}
}
