import fetch from "node-fetch"
import { TMDBResponse } from "../types"

export class MovieRepository {
  private _queryBuilder(params: object): string {
    return new URLSearchParams({ ...params }).toString()
  }

  getDetails(movieId: number): Promise<TMDBResponse> {
    const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}`)
    const params = this._queryBuilder({
      api_key: process.env.TMDB_API_KEY || "",
      language: "en-US",
    })
    url.search = params

    return fetch(url).then((response) => response.json())
  }

  getReviews(movieId: number): Promise<TMDBResponse> {
    const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/reviews`)
    const params = this._queryBuilder({
      api_key: process.env.TMDB_API_KEY || "",
      language: "en-US",
    })
    url.search = params

    return fetch(url).then((response) => response.json())
  }

  searchByName(userParams: object): Promise<TMDBResponse> {
    const url = new URL("https://api.themoviedb.org/3/search/movie")
    const baseParams = {
      page: "1",
      api_key: process.env.TMDB_API_KEY || "",
      language: "en-US",
    }
    const params = this._queryBuilder({
      ...baseParams,
      ...userParams,
    })
    url.search = params

    return fetch(url).then((response) => response.json())
  }
}
