import { Db, ObjectId } from "mongodb";
import { JsonGame, JsonPlatform, Game } from "./types";
import { PlatformNotFoundError } from "../../utils/errors";

export class Platform {
  static db: Db;

  _id?: ObjectId;
  id: JsonPlatform["id"];
  abbreviation: JsonPlatform["abbreviation"];
  alternative_name: JsonPlatform["alternative_name"];
  category: JsonPlatform["category"];
  created_at: JsonPlatform["created_at"];
  generation: JsonPlatform["generation"];
  name: JsonPlatform["name"];
  platform_logo: JsonPlatform["platform_logo"];
  product_family: JsonPlatform["product_family"];
  slug: JsonPlatform["slug"];
  updated_at: JsonPlatform["updated_at"];
  url: JsonPlatform["url"];
  versions: JsonPlatform["versions"];
  checksum: JsonPlatform["checksum"];

  constructor(jsonData: JsonPlatform) {
    this.id = jsonData.id;
    this.abbreviation = jsonData.abbreviation;
    this.alternative_name = jsonData.alternative_name;
    this.category = jsonData.category;
    this.created_at = jsonData.created_at;
    this.generation = jsonData.generation;
    this.name = jsonData.name;
    this.platform_logo = jsonData.platform_logo;
    this.product_family = jsonData.product_family;
    this.slug = jsonData.slug;
    this.updated_at = jsonData.updated_at;
    this.url = jsonData.url;
    this.versions = jsonData.versions;
    this.checksum = jsonData.checksum;
  }

  static init(db: Db): void {
    this.db = db;
  }

  static findById(id: number): Promise<Platform> {
    return this.db
      .collection("platforms")
      .findOne({ id })
      .then((platformData: JsonPlatform) => {
        if (platformData) {
          return new Platform(platformData);
        } else {
          throw new PlatformNotFoundError("Platform not found");
        }
      });
  }

  public getGames(): Promise<Game[]> {
    return Platform.db
      .collection<Game>("games")
      .find({ "platforms._id": { $in: [this.id] } })
      .toArray()
      .then((results) => results.map((result) => new Game(result)));
  }
}
