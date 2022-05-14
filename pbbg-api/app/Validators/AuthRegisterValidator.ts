import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';

export default class AuthRegisterValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		email: schema.string({ trim: true }, [
			rules.email(),
			rules.unique({ table: 'users', column: 'email' }),
		]),
		password: schema.string({ trim: true }, [
			rules.minLength(12),
		]),
		name: schema.string({ trim: true }, [
			rules.minLength(3),
		]),
	});

	public messages = {};
}
