import { MovieDb } from "moviedb-promise"
import Movie from "../models/Movie"
import { MovieResponse } from "moviedb-promise/dist/request-types"

export async function discoverMovies(page: number, runtimeLessThanOrEqual: number) {
  const movieDb = getMovieDb()
  const params = validateArguments(page, runtimeLessThanOrEqual)

  const discoverMovie = await movieDb.discoverMovie(params)
  if (discoverMovie?.results === undefined) {
    throw new Error('Failed to discover movies from TMDb')
  }

  const movies: Movie[] = []
  for (const movieResult of discoverMovie.results) {
    if (movieResult.id === undefined) {
      continue
    }

    try {
      const movieInfo = await movieDb.movieInfo(movieResult.id)
      const movie = mapToMovie(movieInfo, runtimeLessThanOrEqual)
      if (movie !== undefined) {
        movies.push(movie)
      }
    } catch (e) {
      // console.error(`Failed to get TMDb movie info for ID ${movieResult.id}`, e)
    }
  }
  return movies
}

function getMovieDb() {
  const apiKey = process.env.REACT_APP_TMDB_V3_API_KEY
  if (!apiKey) {
    throw new Error('TMDb API key not found')
  }

  return new MovieDb(apiKey)
}

function validateArguments(page: number, runtimeLessThanOrEqual: number) {
  if (page <= 0) {
    throw new TypeError('Cannot search TMDb for page less than or equal to 0')
  }
  if (runtimeLessThanOrEqual <= 0) {
    throw new TypeError('Cannot search TMDb for runtime less than or equal to 0')
  }

  return {
    'page': page,
    'with_runtime.lte': runtimeLessThanOrEqual
  }
}

function mapToMovie(movieResponse: MovieResponse, runtimeLimit: number) : Movie | undefined {  
  if (movieResponse.id && movieResponse.title && movieResponse.runtime && movieResponse.runtime <= runtimeLimit) {
    return { 
      id: movieResponse.id,
      title: movieResponse.title,
      runtime: movieResponse.runtime,
      posterUrl: buildImageUrl(movieResponse.poster_path, 185)
    }
  }
  return undefined
}

function buildImageUrl(imagePath: string | undefined, size: number): string | undefined {
  if (imagePath) {
    return `https://image.tmdb.org/t/p/w${size}/${imagePath}`
  }
  return undefined
}