import { ApplicationContract } from '@ioc:Adonis/Core/Application';

export default class AppProvider {
	constructor(protected app: ApplicationContract) {
	}

	public register() {
		// Register your own bindings
	}

	public async boot() {
		const { BaseModel } = await import('@ioc:Adonis/Lucid/Orm');
		const CamelCaseNamingStrategy = await import('App/NamingStrategies/CamelCaseNamingStrategy');
		BaseModel.namingStrategy = new CamelCaseNamingStrategy.default();
	}

	public async ready() {
		// App is ready
	}

	public async shutdown() {
		// Cleanup, since app is going down
	}
}
