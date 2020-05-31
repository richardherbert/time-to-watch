import React from 'react';
import MovieCard from './MovieCard';
import Movie from '../models/Movie';

interface MovieCardListProps {
  movies: Movie[],
  selectedMovieIds: number[]
  onClickSelect: (movie: Movie, select: boolean) => void
}

function MovieCardList(props: MovieCardListProps) {
  return (
    <>
      {props.movies.map(movie => (
        <div key={movie.id}>
          <MovieCard 
            movie={movie}
            selected={props.selectedMovieIds.includes(movie.id)}
            onClickSelect={props.onClickSelect}/>
        </div>)
      )}
    </>
  );
}

export default MovieCardList
