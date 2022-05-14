export interface Game {
	name: string;
	slug: string;
	tags: string[];
	description: string;
	addedAt: string | Date;
	updatedAt: string | Date;
	imageUrl: string;
	rating: number;
	ratingsCount: number;
}
