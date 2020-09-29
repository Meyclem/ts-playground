import { ObjectId } from "mongodb";

type ReleaseDateInput = {
  id: number;
  category: number;
  created_at: number;
  date: number;
  game: number;
  human: string;
  m: number;
  platform: number;
  region: number;
  updated_at: number;
  y: number;
  checksum: string;
};

export interface GameInput {
  _id?: ObjectId;
  id: number;
  collection: Record<string, unknown>;
  cover: Record<string, unknown>;
  first_release_date: number;
  genres: Record<string, unknown>;
  name: string;
  platforms: number[];
  release_dates: ReleaseDateInput[];
  slug: string;
  summary: string;
  url: string;
}

export interface PlatformInput {
  games?: GameInput[];
  _id?: ObjectId;
  id: number;
  abbreviation: string;
  alternative_name: string;
  category: number;
  created_at: number;
  generation: 3;
  name: string;
  platform_logo: Record<string, unknown>;
  product_family: number;
  slug: string;
  updated_at: number;
  url: string;
  versions: Record<string, unknown>;
  checksum: string;
}

export type Paginated<T> = {
  totalCount: number;
  resultsPerPage: number;
  currentPage: number;
  pageCount: number;
  results: T[];
};
