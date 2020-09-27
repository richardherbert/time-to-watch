import React from 'react';
import MovieCard from './MovieCard';
import Movie from '../models/Movie';
import { Container } from 'react-bootstrap';

interface MovieCardListProps {
  movies: Movie[]
}

function MovieCardList(props: MovieCardListProps) {
  return (
    <Container fluid>
      <div className="d-flex flex-row flex-nowrap overflow-auto">
        {props.movies.map(movie => (
          <div key={movie.id}>
            <MovieCard movie={movie}/>
          </div>)
        )}
      </div>
    </Container>
  );
}

export default MovieCardList
