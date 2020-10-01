import { Db, ObjectId } from "mongodb";
import { JsonGame, JsonPlatform, Paginated } from "./types";
import Platform from "./platform";
import { GameNotFoundError } from "../../utils/errors";

export class Game {
  _id?: ObjectId;
  code: JsonGame["id"];
  collection: JsonGame["collection"];
  cover: JsonGame["cover"];
  first_release_date: JsonGame["first_release_date"];
  genres: JsonGame["genres"];
  name: JsonGame["name"];
  platforms: Pick<Platform, "_id" | "name" | "slug">[];
  release_dates: JsonGame["release_dates"];
  slug: JsonGame["slug"];
  summary: JsonGame["summary"];
  url: JsonGame["url"];

  constructor(data: Game) {
    this.code = data.code;
    this.collection = data.collection;
    this.cover = data.cover;
    this.first_release_date = data.first_release_date;
    this.genres = data.genres;
    this.name = data.name;
    this.platforms = data.platforms;
    this.release_dates = data.release_dates;
    this.slug = data.slug;
    this.summary = data.summary;
    this.url = data.url;
  }

  toJson(): string {
    return "";
  }
}

export class GameRepository {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
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
}
