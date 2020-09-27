import React from 'react';
import { render } from '@testing-library/react';
import MovieCard from './MovieCard';
import Movie from '../models/Movie';

const movie: Movie = {
  id: 1,
  title: 'Test Title!',
  runtime: 234,
  posterUrl: 'https://example.com/'
}

test('renders movie title', () => {
  const { queryByText } = render(<MovieCard movie={movie}/>)
  expect(queryByText(movie.title)).toBeInTheDocument()
})

test('renders movie runtime', () => {
  const { queryByText } = render(<MovieCard movie={movie}/>)
  expect(queryByText(`Runtime: ${movie.runtime}`)).toBeInTheDocument()
})
