import React, { useEffect, useState } from 'react';
import Movie from '../models/Movie';
import MovieCardList from '../components/MovieCardList';
import { discoverMovies } from '../apis/tmdbApi';

interface TmdbMovieCardListProps {
  runtimeLimit: number
}

function TmdbMovieCardList(props: TmdbMovieCardListProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    setLoading(true)
    setError(undefined)
    discoverMovies(1, props.runtimeLimit)
    .then(movies => {
      if (movies.length > 0) {
        setMovies(movies)
      } else {
        setError(`No movies found with runtime less than or equal to ${props.runtimeLimit} minutes`)
      }
    })
    .catch(e => {
      setError(`Failed to get movies from TMDb`)
    })
    .finally(() => {
      setLoading(false)
    })

  }, [props.runtimeLimit])

  if (loading) {
    return (
      <div>Loading...</div>
    )
  } else if (error) {
    return (
      <div>{error}</div>
    )
  } else {
    return (
      <MovieCardList movies={movies}/>
    )
  }
}

export default TmdbMovieCardList
