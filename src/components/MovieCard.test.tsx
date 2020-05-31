import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MovieCard from './MovieCard';
import Movie from '../models/Movie';

const movie: Movie = {
  id: 1,
  title: 'Test Title!',
  runtime: 234
}

const selectText = 'Select'
const deselectText = 'Deselect'

test('renders movie title', () => {
  const { queryByText } = render(<MovieCard movie={movie} selected={false} onClickSelect={jest.fn}/>)
  expect(queryByText(movie.title)).toBeInTheDocument()
})

test('renders movie runtime', () => {
  const { queryByText } = render(<MovieCard movie={movie} selected={false} onClickSelect={jest.fn}/>)
  expect(queryByText(movie.runtime.toString())).toBeInTheDocument()
})

test('renders Select when delselected', () => {
  const { queryByText } = render(<MovieCard movie={movie} selected={false} onClickSelect={jest.fn}/>)
  expect(queryByText(selectText)).toBeInTheDocument()
  expect(queryByText(deselectText)).not.toBeInTheDocument()
})

test('renders Deselect when selected', () => {
  const { queryByText } = render(<MovieCard movie={movie} selected={true} onClickSelect={jest.fn}/>)
  expect(queryByText(deselectText)).toBeInTheDocument()
  expect(queryByText(selectText)).not.toBeInTheDocument()
})

test('button click triggers onClickSelect function', () => {
  const onClickSelect = jest.fn()
  const selected = false
  const { getByText } = render(<MovieCard movie={movie} selected={selected} onClickSelect={onClickSelect}/>)
  fireEvent.click(getByText(selectText))
  expect(onClickSelect).toHaveBeenCalledTimes(1)
  expect(onClickSelect).toHaveBeenCalledWith(movie, !selected)
})