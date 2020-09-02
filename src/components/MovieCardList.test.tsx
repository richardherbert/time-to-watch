import React from 'react';
import { render } from '@testing-library/react';
import MovieCardList from './MovieCardList';
import Movie from '../models/Movie';

const movieA: Movie = {
  id: 123,
  title: 'This is the First Movie',
  runtime: 90
}

const movieB: Movie = {
  id: 321,
  title: 'Another Movie Title',
  runtime: 145
}

test('renders no movie card', () => {
  const { queryByText } = render(<MovieCardList movies={[]}/>)
  expect(queryByText(movieA.title)).not.toBeInTheDocument()
  expect(queryByText(movieB.title)).not.toBeInTheDocument()
})

test('renders single movie card', () => {
  const { queryByText } = render(<MovieCardList movies={[movieA]}/>)
  expect(queryByText(movieA.title)).toBeInTheDocument()
  expect(queryByText(movieB.title)).not.toBeInTheDocument()
})

test('renders multiple movie cards', () => {
  const { queryByText } = render(<MovieCardList movies={[movieA, movieB]}/>)
  expect(queryByText(movieA.title)).toBeInTheDocument()
  expect(queryByText(movieB.title)).toBeInTheDocument()
})