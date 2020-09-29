import { Db } from "mongodb";

export default class Game {
  static db: Db;

  id: number;
  collection: Record<string, unknown>;
  cover: Record<string, unknown>;
  first_release_date: number;
  genres: Record<string, unknown>;
  name: string;
  platforms: number[];
  release_dates: Record<string, unknown>[];
  slug: string;
  summary: string;
  url: string;

  constructor(data: any) {
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

  static init(db: Db): void {
    this.db = db;
  }

  static findById(id: number): Promise<any> {
    return this.db.collection("games").findOne({ id });
  }

  getPlatforms(): Promise<any> {
    return Game.db
      .collection("platforms")
      .find({ id: { $in: this.platforms } })
      .toArray();
  }
}
