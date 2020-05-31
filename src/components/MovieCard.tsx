import React from 'react';
import Movie from '../models/Movie';

interface MovieCardProps {
  movie: Movie,
  selected: boolean,
  onClickSelect: (movie: Movie, select: boolean) => void
}

function MovieCard(props: MovieCardProps) {
  return (
    <>
      <p>{props.movie.title}</p>
      <p>{props.movie.runtime}</p>
      <button onClick={() => props.onClickSelect(props.movie, !props.selected)}>
        {props.selected ? 'Deselect' : 'Select'}
      </button>
    </>
  );
}

export default MovieCard
