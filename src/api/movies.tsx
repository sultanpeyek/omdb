import axios from 'axios'

export type Movie = {
  id: string
  firstName: string
  lastName: string
  email: string
}

export const getMoviesBySearchValue = (searchValue: string) => {
  return axios.get(
    `https://www.omdbapi.com?s=${searchValue}&apikey=${process.env.OMDB_API_KEY}`,
  )
}
