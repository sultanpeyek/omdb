import axios from 'axios'

export type Movie = {
  id: string
  firstName: string
  lastName: string
  email: string
}

export const getMoviesBySearchValue = (searchValue: string) => {
  return axios.get(
    `http://www.omdbapi.com?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${searchValue}`,
  )
}