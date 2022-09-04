import axios from 'axios'

export type Movie = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  // Below is taken from movie detail endpoint
  Rated?: string
  Released?: string
  Runtime?: string
  Genre?: string
  Director?: string
  Writer?: string
  Actors?: string
  Plot?: string
  Language?: string
  Country?: string
  Awards?: string
  Ratings?: {Source: string; Value: string}[]
  Metascore?: string
  imdbRating?: string
  imdbVotes?: string
  DVD?: string
  BoxOffice?: string
  Production?: string
  Website?: string
  Response?: string
  totalSeasons?: string
}

export type MoviesResponse = {
  Search: Movie[]
  totalResults: number
  Response: string
}

export const getMoviesBySearchValue = (
  searchValue: string,
  pageNumber: number,
) => {
  return axios.get(
    `https://www.omdbapi.com?s=${searchValue}&page=${pageNumber.toString()}&apikey=${
      process.env.OMDB_API_KEY
    }`,
  )
}

export const getMovieByImdbID = (imdbID: string) => {
  return axios.get(
    `https://www.omdbapi.com?i=${imdbID}&apikey=${process.env.OMDB_API_KEY}`,
  )
}
