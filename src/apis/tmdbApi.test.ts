import { discoverMovies } from './tmdbApi';
import { DiscoverMovieRequest } from 'moviedb-promise/dist/request-types';

const movieA = {
  id: 123456,
  title: 'This is Movie A\'s Title',
  runtime: 99
}
const movieB = {
  id: 987654,
  title: 'Movie B: The Title',
  runtime: 100
}
const movieC = {
  id: 456456,
  title: 'Incredible Movie C!',
  runtime: 101
}
const movies = [movieA, movieB, movieC]

const stubDiscoverMovie = () => {
  return Promise.resolve({ results: movies })
} 

const stubMovieInfo = (id: number) => {
  return Promise.resolve(movies.filter(movie => movie.id === id).pop())
}

const mockDiscoverMovie = jest.fn()
const mockMovieInfo = jest.fn()

jest.mock('moviedb-promise', () => {
  return {
    MovieDb: jest.fn().mockImplementation(() => {
      return {
        discoverMovie: mockDiscoverMovie,
        movieInfo: mockMovieInfo
      }
    })
  }
})

beforeEach(() => {
  mockDiscoverMovie.mockReset()
  mockMovieInfo.mockReset()
})

test('rejects if discoverMovies is given page parameter of 0', () => {  
  expect.assertions(1)
  return expect(discoverMovies(0, 1))
    .rejects.toEqual(new TypeError('Cannot search TMDb for page less than or equal to 0'))
})

test('rejects if discoverMovies is given runtimeLessThanOrEqual parameter of 0', () => {  
  expect.assertions(1)
  return expect(discoverMovies(1, 0))
    .rejects.toEqual(new TypeError('Cannot search TMDb for runtime less than or equal to 0'))
})

test('returns movies with runtime less than or equal to 100 minutes', () => {  
  mockDiscoverMovie.mockImplementation(stubDiscoverMovie)
  mockMovieInfo.mockImplementation(stubMovieInfo)

  expect.assertions(1)
  return expect(discoverMovies(1, 100))
    .resolves.toEqual([movieA, movieB])
})

test('returns movies with runtime less than or equal to 101 minutes', () => {  
  mockDiscoverMovie.mockImplementation(stubDiscoverMovie)
  mockMovieInfo.mockImplementation(stubMovieInfo)

  expect.assertions(1)
  return expect(discoverMovies(1, 101))
    .resolves.toEqual([movieA, movieB, movieC])
})

test('returns no movies if none with runtime less than or equal to 98 minutes', () => {  
  mockDiscoverMovie.mockImplementation(stubDiscoverMovie)
  mockMovieInfo.mockImplementation(stubMovieInfo)

  expect.assertions(1)
  return expect(discoverMovies(1, 98))
    .resolves.toEqual([])
})

test('returns no movies if TMDb discoverMovie returns no movies', () => {  
  mockDiscoverMovie.mockResolvedValue({ results: [] })

  expect.assertions(1)
  return expect(discoverMovies(1, 999))
    .resolves.toEqual([])
})

test('throws error if TMDb discoverMovie returns unknown data', () => {  
  mockDiscoverMovie.mockResolvedValue({})

  expect.assertions(1)
  return expect(discoverMovies(1, 999))
    .rejects.toEqual(new Error('Failed to discover movies from TMDb'))
})

test('throws error if TMDb discoverMovie promise rejects', () => {
  const error = new Error('Request failed with status code 401')
  mockDiscoverMovie.mockRejectedValue(error)

  expect.assertions(1)
  return expect(discoverMovies(1, 98))
    .rejects.toEqual(error)
})

test('returns no movies if TMDb movieInfo returns movie with runtime greater than allowed', () => {
  const runtimeLimit = 101

  mockDiscoverMovie.mockImplementation(stubDiscoverMovie)
  mockMovieInfo.mockResolvedValue({
    id: 1,
    title: 'The title can be anything',
    runtime:  runtimeLimit + 1
  })

  expect.assertions(1)
  return expect(discoverMovies(1, runtimeLimit))
    .resolves.toEqual([])
})

test('returns no movies if TMDb movieInfo returns unknown data', () => {  
  mockDiscoverMovie.mockImplementation(stubDiscoverMovie)
  mockMovieInfo.mockResolvedValue({})

  expect.assertions(1)
  return expect(discoverMovies(1, 999))
    .resolves.toEqual([])
})

test('returns no movies if TMDb movieInfo promise rejects', () => {
  mockDiscoverMovie.mockImplementation(stubDiscoverMovie)
  mockMovieInfo.mockRejectedValue(new Error('Request failed with status code 404'))

  expect.assertions(1)
  return expect(discoverMovies(1, 999))
    .resolves.toEqual([])
})
