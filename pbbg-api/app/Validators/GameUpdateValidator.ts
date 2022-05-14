import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';

export default class GameUpdateValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		name: schema.string.optional({ trim: true }, [
			rules.minLength(3),
		]),
		description: schema.string.optional({ trim: true }),
		url: schema.string.optional({ trim: true }, [
			rules.url({ requireProtocol: true }),
		]),
		image: schema.file.optional({
			size: '512kb',
			extnames: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
		}),
		tags: schema.string.optional({ trim: true }),
	});

	public messages = {};
}
