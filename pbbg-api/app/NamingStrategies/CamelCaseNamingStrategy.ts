import { string } from '@ioc:Adonis/Core/Helpers';
import { BaseModel, SnakeCaseNamingStrategy } from '@ioc:Adonis/Lucid/Orm';

export default class CamelCaseNamingStrategy extends SnakeCaseNamingStrategy {
	public override serializedName(_: typeof BaseModel, propertyName: string): string {
		return string.camelCase(propertyName);
	}
}
