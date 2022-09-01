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
  },
  reducers: {
    search: () => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
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
export const {search} = moviesSlice.actions

export default moviesSlice.reducer
