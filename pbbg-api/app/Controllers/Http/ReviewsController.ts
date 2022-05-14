import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import Game from 'App/Models/Game';
import Review from 'App/Models/Review';
import ReviewCreateValidator from 'App/Validators/ReviewCreateValidator';
import GameAlreadyReviewedException from 'App/Exceptions/GameAlreadyReviewedException';

export default class ReviewsController {

	public async index({ auth }: HttpContextContract) {
		if (auth.isAuthenticated) {
			await auth.user!.load('reviews');
			return auth.user!.reviews;
		} else {
			return [];
		}
	}

	public async create({ auth, bouncer, request }: HttpContextContract) {
		let { gameSlug, text, rating } = await request.validate(ReviewCreateValidator);

		await bouncer.authorize('createReview');

		return Database.transaction(async (trx) => {
			let game = await Game.query()
				.useTransaction(trx)
				.forUpdate()
				.where({ slug: gameSlug })
				.firstOrFail();

			let review = await Review.query()
				.useTransaction(trx)
				.forUpdate()
				.where({
					gameId: game.id,
					userId: auth.user!.id,
				})
				.first();

			if (review != null) {
				throw new GameAlreadyReviewedException(game);
			}

			review = new Review();
			review.merge({
				rating,
				text,
				gameId: game.id,
				userId: auth.user!.id,
			});
			await review.useTransaction(trx).save();

			game.rating = Math.round(((game.rating * game.ratingsCount) + rating * 100) / (game.ratingsCount + 1));
			game.ratingsCount++;
			await game.useTransaction(trx).save();

			return review;
		});
	}
}
