import React from 'react';
import { Card } from 'react-bootstrap';
import { QuestionCircle } from 'react-bootstrap-icons';
import Movie from '../models/Movie';
import './MovieCard.css'

interface MovieCardProps {
  movie: Movie
}

function MovieCard(props: MovieCardProps) {
  return (
    <>
      <Card className="movie-card bg-dark text-white">
        {renderMoviePoster(props.movie)}
        <Card.Body>
          <Card.Title>{props.movie.title}</Card.Title>
          <Card.Text>
            Runtime: {props.movie.runtime}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

function renderMoviePoster(movie: Movie) {
  const poster = (
    <Card.Img src={movie.posterUrl}/>
  )
  const posterMissing = (
    <QuestionCircle size={64}/>
  )
  return (
    <div className="poster">
      {movie.posterUrl ? poster : posterMissing}
    </div>
  )
}

export default MovieCard
