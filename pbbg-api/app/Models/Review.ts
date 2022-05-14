import { BaseModel, belongsTo, BelongsTo, column, ModelObject } from '@ioc:Adonis/Lucid/Orm';
import Game, { GameId } from 'App/Models/Game';
import User, { UserId } from 'App/Models/User';
import { DateTime } from 'luxon';
import { Opaque } from 'type-fest';

export type ReviewId = Opaque<number, 'ReviewId'>;

export default class Review extends BaseModel {
	@column({ isPrimary: true })
	public id: ReviewId;

	@column({ serializeAs: null })
	public gameId: GameId;

	@belongsTo(() => Game)
	public game: BelongsTo<typeof Game>;

	@column({ serializeAs: null })
	public userId: UserId | null = null;

	@belongsTo(() => User)
	public user: BelongsTo<typeof User>;

	@column()
	public rating: number;

	@column()
	public text: string | null = null;

	@column.dateTime({ autoCreate: true })
	public postedAt: DateTime;

	public override serialize(): ModelObject {
		return super.serialize({
			relations: {
				user: {
					fields: ['id', 'name', 'avatarUrl'],
				},
			},
		});
	}
}
