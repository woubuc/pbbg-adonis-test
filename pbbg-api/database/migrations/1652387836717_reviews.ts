import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Reviews extends BaseSchema {
	protected tableName = 'reviews';

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id');

			table.integer('game_id').unsigned().notNullable()
				.references('games.id').onDelete('cascade');
			table.integer('user_id').unsigned().nullable()
				.references('users.id').onDelete('set null');

			table.smallint('rating').unsigned().notNullable();
			table.text('text').nullable();

			table.timestamp('posted_at', { useTz: true });

			table.unique(['game_id', 'user_id']);
		});
	}

	public async down() {
		this.schema.dropTable(this.tableName);
	}
}
