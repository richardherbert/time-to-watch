import React from 'react';
import { render } from '@testing-library/react'
import TmdbMovieCardList from './TmdbMovieCardList'
import { discoverMovies } from '../apis/tmdbApi';

const movieA = {
  id: 989898,
  title: "Wonderful Title",
  runtime: 91
}
const movieB = {
  id: 345345,
  title: "Movie Title II",
  runtime: 90
}

const loadingText = 'Loading...'

jest.mock('../apis/tmdbApi')

const mockDiscoverMovies = (discoverMovies as jest.MockedFunction<typeof discoverMovies>)

beforeEach(() => {
  mockDiscoverMovies.mockReset()
})

test('render multiple movies when multiple movies are returned by TMDb API', async () => {
  mockDiscoverMovies.mockResolvedValue([movieA, movieB])

  const { findByText, queryByText } = render(<TmdbMovieCardList runtimeLimit={91}/>)
  expect(await findByText(movieA.title)).toBeInTheDocument()
  expect(await findByText(movieB.title)).toBeInTheDocument()
  expect(queryByText(loadingText)).not.toBeInTheDocument()
})

test('render only one movie if one movies is returned by TMDb API', async () => {
  mockDiscoverMovies.mockResolvedValue([movieB])

  const { findByText, queryByText } = render(<TmdbMovieCardList runtimeLimit={90}/>)
  expect(await findByText(movieB.title)).toBeInTheDocument()
  expect(queryByText(movieA.title)).not.toBeInTheDocument()
  expect(queryByText(loadingText)).not.toBeInTheDocument()
})

test('render no movies message if zero movies are returned by TMDb API', async () => {
  mockDiscoverMovies.mockResolvedValue([])

  const runtimeLimit = 89
  const { findByText, queryByText } = render(<TmdbMovieCardList runtimeLimit={runtimeLimit}/>)
  const message = `No movies found with runtime less than or equal to ${runtimeLimit} minutes`
  expect(await findByText(message)).toBeInTheDocument()
  expect(queryByText(movieA.title)).not.toBeInTheDocument()
  expect(queryByText(movieB.title)).not.toBeInTheDocument()
  expect(queryByText(loadingText)).not.toBeInTheDocument()
})

test('render error message if API call fails', async () => {
  mockDiscoverMovies.mockRejectedValue(new Error())

  const { findByText, queryByText } = render(<TmdbMovieCardList runtimeLimit={999}/>)
  const message = `Failed to get movies from TMDb`
  expect(await findByText(message)).toBeInTheDocument()
  expect(queryByText(movieA.title)).not.toBeInTheDocument()
  expect(queryByText(movieB.title)).not.toBeInTheDocument()
  expect(queryByText(loadingText)).not.toBeInTheDocument()
})

test('render loading message before API call returns', async () => {
  mockDiscoverMovies.mockResolvedValue([movieA, movieB])

  const { findByText, getByText, queryByText } = render(<TmdbMovieCardList runtimeLimit={999}/>)
  expect(getByText(loadingText)).toBeInTheDocument()
  expect(queryByText(movieA.title)).not.toBeInTheDocument()
  expect(queryByText(movieB.title)).not.toBeInTheDocument()
  expect(await findByText(loadingText)).not.toBeInTheDocument()
})