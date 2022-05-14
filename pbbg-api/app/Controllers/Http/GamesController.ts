import { Attachment } from '@adonisjs/attachment-lite/build/src/Attachment';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import Game from 'App/Models/Game';
import GameCreateValidator from 'App/Validators/GameCreateValidator';
import GameUpdateValidator from 'App/Validators/GameUpdateValidator';
import slugify from 'slugify';

export default class GamesController {

	public async index() {
		return Game.all();
	}

	public async show({ request }: HttpContextContract) {
		let slug = request.param('slug').toLowerCase();

		return Game.query()
			.where({ slug })
			.preload('reviews', r => r.preload('user'))
			.firstOrFail();
	}

	public async create({ auth, bouncer, request }: HttpContextContract) {
		let body = await request.validate(GameCreateValidator);

		await bouncer.authorize('createGame');

		let slug = slugify(body.name.toLowerCase());
		let i = 1;
		while (true) {
			let attempt = i === 1 ? slug : `${ slug }-${ i }`;
			let conflict = await Game.findBy('slug', attempt);

			if (conflict == undefined) {
				slug = attempt;
				break;
			} else {
				i++;
			}
		}

		let game = new Game();
		game.merge({
			...body,
			slug,
			tags: body.tags.split(' ').map(t => t.toLowerCase()),
			userId: auth.user!.id,
			image: Attachment.fromFile(body.image),
		});
		await game.save();

		return game;
	}

	public async update({ auth, request }: HttpContextContract) {
		let slug = request.param('slug');
		let body = await request.validate(GameUpdateValidator);

		return Database.transaction(async (trx) => {
			let game = await Game.query()
				.useTransaction(trx)
				.forUpdate()
				.where({
					slug,
					userId: auth.user!.id,
				})
				.firstOrFail();

			if (body.image != undefined) {
				game.image = Attachment.fromFile(body.image);
				delete body.image;
			}

			if (body.tags != undefined) {
				game.tags = body.tags.split(' ').map(t => t.toLowerCase());
				delete body.tags;
			}

			game.merge(body as Omit<typeof body, 'image' | 'tags'>);
			await game.useTransaction(trx).save();

			return game;
		});
	}
}
