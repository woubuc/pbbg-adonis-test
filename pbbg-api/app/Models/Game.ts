import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite';
import { afterDelete, afterSave, BaseModel, belongsTo, BelongsTo, column, computed, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import Review from 'App/Models/Review';
import User, { UserId } from 'App/Models/User';
import { DateTime } from 'luxon';
import { Opaque } from 'type-fest';
import AlgoliaService from '../Services/AlgoliaService';

export type GameId = Opaque<number, 'GameId'>;

export default class Game extends BaseModel {
	@column({ isPrimary: true, serializeAs: null })
	public id: GameId;

	public get objectID(): string {
		return `game:${ this.id }`;
	}

	@column({ serializeAs: null })
	public userId: UserId;

	@belongsTo(() => User)
	public user: BelongsTo<typeof User>;

	@column()
	public name: string;

	@column()
	public slug: string;

	@column()
	public url: string;

	@column()
	public description: string;

	@column({
		prepare: t => JSON.stringify(t), // Adonis doesn't automatically convert plain arrays to JSON
	})
	public tags: string[] = [];

	@attachment({ preComputeUrl: true, serializeAs: null })
	public image: AttachmentContract | null = null;

	@computed()
	public get imageUrl(): string | null {
		return this.image?.url ?? null;
	}

	@column()
	public rating: number = 0;

	@column()
	public ratingsCount: number = 0;

	@column({ serializeAs: null })
	public isApproved: boolean = false;

	@column.dateTime({ autoCreate: true })
	public addedAt: DateTime;

	@column.dateTime({ autoCreate: true })
	public updatedAt: DateTime;

	@hasMany(() => Review)
	public reviews: HasMany<typeof Review>;

	@afterSave()
	public static async updateAlgolia(game: Game) {
		await AlgoliaService.saveGame(game);
	}

	@afterDelete()
	public static async removeFromAlgolia(game: Game) {
		await AlgoliaService.deleteGame(game);
	}
}
