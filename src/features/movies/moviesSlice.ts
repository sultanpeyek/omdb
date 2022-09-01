import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'

import {getMovieByImdbID, getMoviesBySearchValue} from '@/api/movies'

export const fetchMovies: any = createAsyncThunk(
  'movies/fetchMovies',
  async (searchValue: string) => {
    if (!searchValue) {
      searchValue = 'Batman'
    }
    const response: any = await getMoviesBySearchValue(searchValue)
    return {searchValue, data: response.data}
  },
)

export const fetchMovie: any = createAsyncThunk(
  'movies/fetchMovie',
  async (imdbID: string) => {
    const response: any = await getMovieByImdbID(imdbID)
    return response.data
  },
)

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    fetchMoviesStatus: 'idle',
    error: null,
    searchValue: '',
    modalPreviewIsOpen: false,
    selectedMovie: null,
    fetchMovieStatus: 'idle',
  },
  reducers: {
    setSelectedMovie: (state: any, action: any) => {
      state.selectedMovie = action.payload
    },
    setModalPreviewIsOpen: (state: any, action: any) => {
      state.modalPreviewIsOpen = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, state => {
        state.fetchMoviesStatus = 'loading'
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.fetchMoviesStatus = 'succeeded'
        state.searchValue = action.payload.searchValue
        state.movies = action.payload.data
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.fetchMoviesStatus = 'failed'
        state.error = action.error.message
        toast.error(action.error.message, {
          toastId: 'fetchMoviesError',
          updateId: 'fetchMoviesError',
        })
      })
      .addCase(fetchMovie.pending, state => {
        state.fetchMovieStatus = 'loading'
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.fetchMovieStatus = 'succeeded'
        state.selectedMovie = action.payload
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.fetchMovieStatus = 'failed'
        state.error = action.error.message
        toast.error(action.error.message, {
          toastId: 'fetchMovieError',
          updateId: 'fetchMovieError',
        })
      })
  },
})

// Action creators are generated for each case reducer function
export const {setSelectedMovie, setModalPreviewIsOpen} = moviesSlice.actions

export default moviesSlice.reducer
