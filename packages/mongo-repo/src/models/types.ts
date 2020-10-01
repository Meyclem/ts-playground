export interface JsonGame {
  id: number;
  collection: Record<string, unknown>;
  cover: Record<string, unknown>;
  first_release_date: number;
  genres: Record<string, unknown>;
  name: string;
  platforms: number[];
  release_dates: Record<string, unknown>;
  slug: string;
  summary: string;
  url: string;
}

export interface JsonPlatform {
  games: JsonGame[];
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

export { Game, GameForm } from "./game";
export { Platform } from "./platform";
