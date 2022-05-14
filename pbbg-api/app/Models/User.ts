import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite';
import Hash from '@ioc:Adonis/Core/Hash';
import { BaseModel, beforeSave, column, computed, hasManyThrough, HasManyThrough } from '@ioc:Adonis/Lucid/Orm';
import { Opaque } from 'type-fest';
import Game from './Game';
import Review from './Review';

export type UserId = Opaque<number, 'UserId'>;

export default class User extends BaseModel {
	@column({ isPrimary: true })
	public id: UserId;

	@column()
	public email: string;

	@column({ serializeAs: null })
	public password: string;

	@column({ serializeAs: null })
	public rememberMeToken: string | null = null;

	@column()
	public emailVerified: boolean = false;

	@column()
	public name: string;

	@attachment({ preComputeUrl: true, serializeAs: null })
	public avatar: AttachmentContract | null = null;

	@computed()
	public get avatarUrl(): string | null {
		return this.avatar?.url ?? null;
	}

	@hasManyThrough([() => Review, () => Game])
	public reviews: HasManyThrough<typeof Review>;

	@beforeSave()
	public static async hashPassword(user: User) {
		if (user.$dirty.password) {
			user.password = await Hash.make(user.password);
		}
	}
}
