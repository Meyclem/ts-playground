import { Db, Collection } from "mongodb";
import { Game, JsonGame, Platform, JsonPlatform, Paginated } from "../models/types";
import { GameNotFoundError } from "../../utils/errors";
import { platform } from "os";

const getGameForm = (jsonGame: JsonGame, platforms: Game["platforms"]): Game => {
  /**
   * Error here with the type assertion. It asks to get the
   * 'toJson' property which is a function.
   */

  return {
    code: jsonGame.id,
    collection: jsonGame.collection,
    cover: jsonGame.cover,
    first_release_date: jsonGame.first_release_date,
    genres: jsonGame.genres,
    name: jsonGame.name,
    platforms,
    release_dates: jsonGame.release_dates,
    slug: jsonGame.slug,
    summary: jsonGame.summary,
    url: jsonGame.url,
  };
};

const getPlatformForm = (jsonPlatform: JsonPlatform): Platform => {};

export class GameDomainRepository {
  private db: Db;
  private games: Collection<Game>;
  private platforms: Collection<Platform>;

  constructor(db: Db) {
    this.db = db;
    this.games = db.collection<Game>("games");
    this.platforms = db.collection<Platform>("platforms");
  }

  searchWithPagination({ query = {}, page = 1, resultsPerPage = 20 } = {}): Promise<Paginated<Game>> {
    const cursor = this.db.collection("games").find(query);

    return cursor.count().then((count) => {
      return cursor
        .skip(resultsPerPage * (page - 1))
        .limit(resultsPerPage)
        .toArray()
        .then((results) => {
          return {
            totalCount: count,
            resultsPerPage,
            currentPage: page,
            pageCount: Math.ceil(count / resultsPerPage),
            results: results.map((result) => new Game(result)),
          };
        });
    });
  }

  find(query: Record<string, unknown>): Promise<Game[]> {
    return this.db
      .collection<JsonGame>("games")
      .find(query)
      .toArray()
      .then((docs) => docs.map((doc: JsonGame) => new Game(doc)));
  }

  findById(id: number): Promise<Game> {
    return this.db
      .collection("games")
      .findOne({ id })
      .then((data: JsonGame) => {
        if (data) {
          return new Game(data);
        } else {
          throw new GameNotFoundError("Game not found");
        }
      });
  }

  createGame(jsonGame: JsonGame, platforms: Game["platforms"]): Promise<Game> {
    const game = getGameForm(jsonGame, platforms);
    return this.games.insertOne(game).then((inserted) => inserted.ops[0]);
  }

  createGames(jsonGames: JsonGame[], platforms: Game["platforms"]): Promise<Game[]> {
    const gamesForms = jsonGames.map((jsonGame) => {
      const gamePlatforms = platforms.filter((platform) => jsonGame.platforms.includes(platform.code));
      return getGameForm(jsonGame, gamePlatforms);
    });

    return this.games.insertMany(gamesForms).then((inserted) => inserted.ops);
  }

  createPlatform(jsonPlatform: JsonPlatform): Promise<Platform> {}
}
