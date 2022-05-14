import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import AuthLoginValidator from 'App/Validators/AuthLoginValidator';
import AuthRegisterValidator from 'App/Validators/AuthRegisterValidator';

export default class AuthController {

	public async me({ auth }: HttpContextContract) {
		return auth.user;
	}

	public async login({ auth, request }: HttpContextContract) {
		let { email, password, rememberMe } = await request.validate(AuthLoginValidator);

		let user = await auth.attempt(email, password, rememberMe);

		return user;
	}

	public async register({ auth, request }: HttpContextContract) {
		let body = await request.validate(AuthRegisterValidator);

		let user = new User();
		user.merge(body);
		await user.save();

		await auth.login(user);

		return user;
	}

	public async logout({ auth, response }: HttpContextContract) {
		await auth.logout();
		return response.noContent();
	}
}
