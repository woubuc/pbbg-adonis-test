# pbbg-api
API backend server for the pbbg.com site

## Requirements
- [Node.js](https://nodejs.org/en/) v16+
- [pnpm](https://pnpm.io/) v7+
- [Docker](https://docs.docker.com/get-docker/) v20+

## Development
1. Start the database container with Docker: `docker-compose up`
2. Install the project dependencies: `pnpm install`
3. Copy `.env.example` and rename it `.env`
4. Run `node ace generate:key` and copy the generated key to `APP_KEY=` in `.env`
5. Enter Algolia (development) credentials in `.env`
6. Run the migrations to set up the database: `node ace migration:run`
7. Start the development server: `pnpm dev`


## API

#### Auth
```
POST /auth/login  -> User
  {
    email: string,
    password: string,
    rememberMe?: boolean,
  }

POST /auth/register  -> User
  {
    name: string,
    email: string,
    password: string,
  }
  
[authenticated]
GET /auth/me  -> User
```

#### Games
```
GET /games  -> Game[]

GET /games/:slug  -> Game

[authenticated]
POST /games  -> Game
  {
    name: string,
    description: string,
    url: string,
    image: file,
    tags: string (space-separated tags),
  }

[authenticated]
PATCH /games/:slug  -> Game
  {
    name?: string,
    description?: string,
    url?: string,
    image?: string,
    tags?: string (space-separated tags),
  }
```

When a game is created or updated, the data is pushed to the Algolia index 
as configured in the `.env` file.

#### Reviews
```
[authenticated]
GET /reviews  -> Review[]
  
[authenticated]
POST /reviews  -> Review
  {
    gameSlug: string,
    rating: number (0-5),
    text?: string,
  }
```
