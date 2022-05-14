import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';

export default class ReviewCreateValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		gameSlug: schema.string({ trim: true }, [
			rules.exists({ table: 'games', column: 'slug' }),
		]),
		rating: schema.number([
			rules.range(0, 5),
		]),
		text: schema.string.optional({ trim: true }, [
			rules.minLength(3),
		]),
	});

	public messages = {};
}
