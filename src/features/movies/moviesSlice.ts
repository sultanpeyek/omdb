import type {PayloadAction, Slice} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {AxiosResponse} from 'axios'
import {toast} from 'react-toastify'

import type {Movie} from '@/api/movies'
import {getMovieByImdbID, getMoviesBySearchValue} from '@/api/movies'
import type {AppState} from '@/app/store'
import {DEFAULT_SEARCH_QUERY} from '@/constants'
import {addToLocalStorage} from '@/utils'

export interface MoviesState {
  movies: Movie[] | []
  totalResults: number
  fetchMoviesStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  fetchMoreMoviesStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  pageNumber: number
  error: string | undefined
  searchValue: string
  modalPreviewIsOpen: boolean
  selectedMovie: Movie | null
  fetchMovieStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  moviesStorage: Movie[] | []
  byPassWalletConnect: boolean
  searchInputIsFocus: boolean
}

const initialState: MoviesState = {
  movies: [],
  totalResults: 0,
  fetchMoviesStatus: 'idle',
  fetchMoreMoviesStatus: 'idle',
  pageNumber: 1,
  error: '',
  searchValue: '',
  modalPreviewIsOpen: false,
  selectedMovie: null,
  fetchMovieStatus: 'idle',
  moviesStorage: [],
  byPassWalletConnect: false,
  searchInputIsFocus: false,
}

type FetchOptions = {
  searchValue: string
  pageNumber: number
}

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (searchValue: string) => {
    if (!searchValue || searchValue === '') {
      searchValue = DEFAULT_SEARCH_QUERY
    }
    const response: AxiosResponse = await getMoviesBySearchValue(searchValue, 1)
    return {searchValue, data: response.data}
  },
)

export const fetchMoreMovies = createAsyncThunk(
  'movies/fetchMoreMovies',
  async (options: FetchOptions) => {
    const {pageNumber} = options
    let {searchValue} = options
    if (!searchValue || searchValue === '') {
      searchValue = DEFAULT_SEARCH_QUERY
    }
    const response: AxiosResponse = await getMoviesBySearchValue(
      searchValue,
      pageNumber,
    )
    return {searchValue, data: response.data}
  },
)

export const fetchMovie = createAsyncThunk(
  'movies/fetchMovie',
  async (imdbID: string) => {
    const response: AxiosResponse = await getMovieByImdbID(imdbID)
    return response.data
  },
)

export const moviesSlice: Slice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction) => {
      state.selectedMovie = action.payload
    },
    setModalPreviewIsOpen: (state, action: PayloadAction<boolean>) => {
      state.modalPreviewIsOpen = action.payload
    },
    setByPassWalletConnect: state => {
      state.byPassWalletConnect = !state.byPassWalletConnect
    },
    setSearchInputIsFocus: (state, action: PayloadAction<boolean>) => {
      state.searchInputIsFocus = action.payload
    },
    loadLocalStorage: state => {
      state.moviesStorage = (JSON.parse(
        localStorage.getItem('movies') as string,
      ) || []) as Movie[] | []
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, state => {
        state.fetchMoviesStatus = 'loading'
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.fetchMoviesStatus = 'succeeded'
        state.movies = action.payload.data.Search
        state.totalResults = action.payload.data.totalResults
        state.pageNumber = 1
        state.searchValue = action.payload.searchValue

        state.moviesStorage = addToLocalStorage(state.movies)
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.fetchMoviesStatus = 'failed'
        state.error = action.error?.message as string
        toast.error(action.error.message, {
          toastId: 'fetchMoviesError',
          updateId: 'fetchMoviesError',
        })
      })
      .addCase(fetchMoreMovies.pending, state => {
        state.fetchMoreMoviesStatus = 'loading'
      })
      .addCase(fetchMoreMovies.fulfilled, (state, action) => {
        state.fetchMoreMoviesStatus = 'succeeded'
        if (action.payload.data.Search?.length > 0) {
          state.movies = state.movies.concat(action.payload.data.Search)
        }
        state.movies = [...Array.from(new Set(state.movies))]
        state.pageNumber += 1

        state.moviesStorage = addToLocalStorage(state.movies)
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
export const {
  loadLocalStorage,
  setByPassWalletConnect,
  setModalPreviewIsOpen,
  setSearchInputIsFocus,
  setSelectedMovie,
} = moviesSlice.actions

export const selectByPassWalletConnect = (state: AppState) =>
  state.movies.byPassWalletConnect
export const selectFetchMoreMoviesStatus = (state: AppState) =>
  state.movies.fetchMoreMoviesStatus
export const selectFetchMoviesStatus = (state: AppState) =>
  state.movies.fetchMoviesStatus
export const selectFetchMovieStatus = (state: AppState) =>
  state.movies.fetchMovieStatus
export const selectModalPreviewIsOpen = (state: AppState) =>
  state.movies.modalPreviewIsOpen
export const selectMovies = (state: AppState) => state.movies.movies
export const selectMoviesStorage = (state: AppState) =>
  state.movies.moviesStorage
export const selectPageNumber = (state: AppState) => state.movies.pageNumber
export const selectSearchInputIsFocus = (state: AppState) =>
  state.movies.searchInputIsFocus
export const selectSearchValue = (state: AppState) => state.movies.searchValue
export const selectSelectedMovie = (state: AppState) =>
  state.movies.selectedMovie
export const selectTotalResults = (state: AppState) => state.movies.totalResults

export default moviesSlice.reducer
