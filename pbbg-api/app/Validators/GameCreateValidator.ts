import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';

export default class GameCreateValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		name: schema.string({ trim: true }, [
			rules.minLength(3),
		]),
		description: schema.string({ trim: true }),
		url: schema.string({ trim: true }, [
			rules.url({ requireProtocol: true }),
		]),
		image: schema.file({
			size: '512kb',
			extnames: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
		}),
		tags: schema.string({ trim: true }),
	});

	public messages = {};
}
