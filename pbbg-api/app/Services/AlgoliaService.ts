import Env from '@ioc:Adonis/Core/Env';
import algoliasearch from 'algoliasearch';
import Game from 'App/Models/Game';

class AlgoliaService {

	private readonly client = algoliasearch(Env.get('ALGOLIA_APP_ID'), Env.get('ALGOLIA_KEY'));
	private readonly index = this.client.initIndex(Env.get('ALGOLIA_INDEX_NAME'));

	public async saveGame(game: Game) {
		await this.index.saveObject({
			...game.serialize(),
			objectID: game.objectID,
		});
	}

	public async deleteGame(game: Game) {
		await this.index.deleteObject(game.objectID);
	}
}

export default new AlgoliaService();
