import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'

import {getMoviesBySearchValue} from '@/api/movies'

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

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    searchValue: '',
    modalPreviewIsOpen: false,
    selectedMovie: null,
  },
  reducers: {
    setSelectedMovie: (state: any, action: any) => {
      state.selectedMovie = action.payload
    },
    setModalPreviewIsOpen: (state: any, _action: any) => {
      state.modalPreviewIsOpen = _action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.searchValue = action.payload.searchValue
        state.data = action.payload.data.Search
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        toast(action.error.message, {
          type: 'error',
          toastId: 'fetchMoviesError',
        })
      })
  },
})

// Action creators are generated for each case reducer function
export const {setSelectedMovie, setModalPreviewIsOpen} = moviesSlice.actions

export default moviesSlice.reducer
