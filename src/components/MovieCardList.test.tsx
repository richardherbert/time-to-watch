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

const selectText = 'Select'
const deselectText = 'Deselect'

test('renders no movie card', () => {
  const { queryByText } = render(<MovieCardList movies={[]} selectedMovieIds={[]} onClickSelect={jest.fn}/>)
  expect(queryByText(movieA.title)).not.toBeInTheDocument()
  expect(queryByText(movieB.title)).not.toBeInTheDocument()
})

test('renders single movie card', () => {
  const { queryByText } = render(<MovieCardList movies={[movieA]} selectedMovieIds={[]} onClickSelect={jest.fn}/>)
  expect(queryByText(movieA.title)).toBeInTheDocument()
  expect(queryByText(movieB.title)).not.toBeInTheDocument()
})

test('renders multiple movie cards', () => {
  const { queryByText } = render(<MovieCardList movies={[movieA, movieB]} selectedMovieIds={[]} onClickSelect={jest.fn}/>)
  expect(queryByText(movieA.title)).toBeInTheDocument()
  expect(queryByText(movieB.title)).toBeInTheDocument()
})

test('sets movies as selected if selectedMovieIds contains ID', () => {
  const { queryByText } = render(<MovieCardList movies={[movieA]} selectedMovieIds={[movieA.id]} onClickSelect={jest.fn}/>)
  expect(queryByText(deselectText)).toBeInTheDocument()
  expect(queryByText(selectText)).not.toBeInTheDocument()
})

test('sets movies as unselected if selectedMovieIds does not contain ID', () => {
  const { queryByText } = render(<MovieCardList movies={[movieA]} selectedMovieIds={[movieB.id]} onClickSelect={jest.fn}/>)
  expect(queryByText(selectText)).toBeInTheDocument()
  expect(queryByText(deselectText)).not.toBeInTheDocument()
})

