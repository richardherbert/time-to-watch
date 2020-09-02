import React from 'react';
import Movie from '../models/Movie';

interface MovieCardProps {
  movie: Movie
}

function MovieCard(props: MovieCardProps) {
  return (
    <>
      <p>{props.movie.title}</p>
      <p>{props.movie.runtime}</p>
    </>
  );
}

export default MovieCard
