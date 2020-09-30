import { Db } from "mongodb";
import { GameInput, PlatformInput } from "./types";
import Game from "./game";
import { PlatformNotFoundError } from "../../utils/errors";

export default class Platform implements PlatformInput {
  static db: Db;

  _id?: PlatformInput["_id"];
  id: PlatformInput["id"];
  abbreviation: PlatformInput["abbreviation"];
  alternative_name: PlatformInput["alternative_name"];
  category: PlatformInput["category"];
  created_at: PlatformInput["created_at"];
  generation: PlatformInput["generation"];
  name: PlatformInput["name"];
  platform_logo: PlatformInput["platform_logo"];
  product_family: PlatformInput["product_family"];
  slug: PlatformInput["slug"];
  updated_at: PlatformInput["updated_at"];
  url: PlatformInput["url"];
  versions: PlatformInput["versions"];
  checksum: PlatformInput["checksum"];

  constructor(data: PlatformInput) {
    this.id = data.id;
    this.abbreviation = data.abbreviation;
    this.alternative_name = data.alternative_name;
    this.category = data.category;
    this.created_at = data.created_at;
    this.generation = data.generation;
    this.name = data.name;
    this.platform_logo = data.platform_logo;
    this.product_family = data.product_family;
    this.slug = data.slug;
    this.updated_at = data.updated_at;
    this.url = data.url;
    this.versions = data.versions;
    this.checksum = data.checksum;
  }

  static init(db: Db): void {
    this.db = db;
  }

  static findById(id: number): Promise<Platform> {
    return this.db
      .collection("platforms")
      .findOne({ id })
      .then((platformData: Platform) => {
        if (platformData) {
          return new Platform(platformData);
        } else {
          throw new PlatformNotFoundError("Platform not found");
        }
      });
  }

  public getGames(): Promise<Game[]> {
    return Platform.db
      .collection<GameInput>("games")
      .find({ platforms: { $in: [this.id] } })
      .toArray()
      .then((results) => results.map((result) => new Game(result)));
  }
}
