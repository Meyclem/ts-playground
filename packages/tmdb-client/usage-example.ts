import { MovieRepository } from "./src/repositories/movieRepository"

const movieRepository = new MovieRepository()

movieRepository
  .getReviews(8077)
  .then((res: object) => console.log(res))
  .catch((error: Error) => console.error(error))

movieRepository
  .searchByName({ query: "Alien 3" })
  .then((res) => {
    if (res.results && Array.isArray(res.results) && res.results.length > 0) {
      return res.results.map(({ id, title }) => {
        return {
          id,
          title,
        }
      })
    }
    return []
  })
  .then((movies) => {
    movies.forEach((movie) => {
      movieRepository.getReviews(movie.id).then((response) => {
        if (response["results"] && Array.isArray(response.results)) {
          console.log(response["results"].length)
        }
      })
    })
  })
  .catch((e) => console.error(e))
