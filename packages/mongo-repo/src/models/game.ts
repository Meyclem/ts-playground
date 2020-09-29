import { Db } from "mongodb";
import { GameInput, PlatformInput, Paginated } from "./types";
import Platform from "./platform";

export default class Game implements GameInput {
  static db: Db;

  _id?: GameInput["_id"];
  id: GameInput["id"];
  collection: GameInput["collection"];
  cover: GameInput["cover"];
  first_release_date: GameInput["first_release_date"];
  genres: GameInput["genres"];
  name: GameInput["name"];
  platforms: GameInput["platforms"];
  release_dates: GameInput["release_dates"];
  slug: GameInput["slug"];
  summary: GameInput["summary"];
  url: GameInput["url"];

  static init(db: Db): void {
    this.db = db;
  }

  static findById(id: number): Promise<Game | null> {
    return this.db
      .collection("games")
      .findOne({ id })
      .then((data: GameInput) => (data ? new Game(data) : null));
  }

  static find(query: Record<string, unknown>): Promise<Game[]> {
    return this.db
      .collection<GameInput>("games")
      .find(query)
      .toArray()
      .then((docs) => docs.map((doc: GameInput) => new Game(doc)));
  }

  constructor(data: GameInput) {
    this._id = data._id;
    this.id = data.id;
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

  getPlatforms(): Promise<Platform[]> {
    return Game.db
      .collection<PlatformInput>("platforms")
      .find({ id: { $in: this.platforms } })
      .toArray()
      .then((results) => results.map((result) => new Platform(result)));
  }

  static searchWithPagination({ query = {}, page = 1, resultsPerPage = 20 } = {}): Promise<Paginated<Game>> {
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
}
