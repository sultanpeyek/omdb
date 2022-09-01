import axios from 'axios'

export type Movie = {
  id: string
  firstName: string
  lastName: string
  email: string
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
