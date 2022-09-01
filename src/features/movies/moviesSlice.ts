import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'

import {getMovieByImdbID, getMoviesBySearchValue} from '@/api/movies'
import {DEFAULT_SEARCH_QUERY} from '@/constants'

export const fetchMovies: any = createAsyncThunk(
  'movies/fetchMovies',
  async (searchValue: string) => {
    if (!searchValue || searchValue === '') {
      searchValue = DEFAULT_SEARCH_QUERY
    }
    const response: any = await getMoviesBySearchValue(searchValue, 1)
    return {searchValue, data: response.data}
  },
)

export const fetchMoreMovies: any = createAsyncThunk(
  'movies/fetchMoreMovies',
  async (options: any) => {
    const {pageNumber} = options
    let {searchValue} = options
    if (!searchValue || searchValue === '') {
      searchValue = DEFAULT_SEARCH_QUERY
    }
    const response: any = await getMoviesBySearchValue(searchValue, pageNumber)
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
    totalResults: 0,
    fetchMoviesStatus: 'idle',
    fetchMoreMoviesStatus: 'idle',
    pageNumber: 1,
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
      .addCase(fetchMovies.fulfilled, (state: any, action: any) => {
        state.fetchMoviesStatus = 'succeeded'
        state.movies = action.payload.data.Search
        state.totalResults = action.payload.data.totalResults
        state.pageNumber = 1
        state.searchValue = action.payload.searchValue
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.fetchMoviesStatus = 'failed'
        state.error = action.error.message
        toast.error(action.error.message, {
          toastId: 'fetchMoviesError',
          updateId: 'fetchMoviesError',
        })
      })
      .addCase(fetchMoreMovies.pending, state => {
        state.fetchMoreMoviesStatus = 'loading'
      })
      .addCase(fetchMoreMovies.fulfilled, (state: any, action: any) => {
        state.fetchMoreMoviesStatus = 'succeeded'
        if (action.payload.data.Search?.length > 0) {
          state.movies = state.movies.concat(action.payload.data.Search)
        }
        state.movies = [...Array.from(new Set(state.movies))]
        state.pageNumber += 1
      })
      .addCase(fetchMoreMovies.rejected, (state, action) => {
        state.fetchMoreMoviesStatus = 'failed'
        state.error = action.error.message
        toast.error(action.error.message, {
          toastId: 'fetchMoreMoviesError',
          updateId: 'fetchMoreMoviesError',
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
