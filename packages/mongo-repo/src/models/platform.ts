import { Db } from "mongodb";
import { GameInput, PlatformInput } from "./types";
import Game from "./game";

export default class Platform implements PlatformInput {
  static db: Db;

  _id?: PlatformInput["_id"];
  id: PlatformInput["id"];
  collection: PlatformInput["collection"];
  cover: PlatformInput["cover"];
  first_release_date: PlatformInput["first_release_date"];
  genres: PlatformInput["genres"];
  name: PlatformInput["name"];
  platforms: PlatformInput["platforms"];
  release_dates: PlatformInput["release_dates"];
  slug: PlatformInput["slug"];
  summary: PlatformInput["summary"];
  url: PlatformInput["url"];

  constructor(data: PlatformInput) {
    this.id = data.id;
    this._id = data._id;
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

  static init(db: Db): void {
    this.db = db;
  }

  static findById(id: number): Promise<any> {
    return this.db.collection("games").findOne({ id });
  }

  public getGames(): Promise<Game[]> {
    return Platform.db
      .collection<GameInput>("games")
      .find({ platforms: { $in: [this.id] } })
      .toArray()
      .then((results) => results.map((result) => new Game(result)));
  }
}
