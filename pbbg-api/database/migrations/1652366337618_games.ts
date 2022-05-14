import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Games extends BaseSchema {
	protected tableName = 'games';

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id');

			table.integer('user_id').unsigned().notNullable()
				.references('users.id');

			table.string('name').notNullable();
			table.string('slug').notNullable().unique();

			table.string('url').notNullable();
			table.text('description').notNullable();
			table.smallint('rating').unsigned().notNullable().defaultTo(0);
			table.integer('ratings_count').unsigned().notNullable().defaultTo(0);

			table.json('image').nullable();
			table.json('tags').notNullable().defaultTo('[]');

			table.boolean('is_approved').notNullable().defaultTo(false);

			table.timestamp('added_at', { useTz: true });
			table.timestamp('updated_at', { useTz: true });
		});
	}

	public async down() {
		this.schema.dropTable(this.tableName);
	}
}
