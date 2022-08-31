import {useWallet} from '@solana/wallet-adapter-react'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import LoadingSpinner from '@/components/common/LoadingSpinner'
import WalletConnect from '@/components/common/WalletConnect'
import CardContainer from '@/components/movies/CardContainer'
import CardItem from '@/components/movies/CardItem'
import SearchForm from '@/components/movies/SearchForm'
import {fetchMovies} from '@/features/movies/moviesSlice'

const Movies = () => {
  const wallet = useWallet()

  const movies = useSelector((state: any) => state.movies.data)
  const moviesStatus = useSelector((state: any) => state.movies.status)
  const initialSearchValue = useSelector(
    (state: any) => state.movies.searchValue,
  )

  const [searchValue, setSearchValue] = React.useState(initialSearchValue)
  const dispatch = useDispatch()

  useEffect(() => {
    if (moviesStatus === 'idle') {
      dispatch(fetchMovies(''))
    }
  }, [moviesStatus, dispatch])

  return wallet.connected && wallet.publicKey ? (
    <React.Fragment>
      <SearchForm
        searchValue={searchValue}
        onSearchValueChange={(e: any) => setSearchValue(e.target.value)}
        onSearchKeyDown={(e: any) => {
          if (e.keyCode === 13) {
            dispatch(fetchMovies(searchValue))
          }
        }}
        onSearchButtonClick={() => dispatch(fetchMovies(searchValue))}
      />
      {moviesStatus === 'loading' ? (
        <LoadingSpinner />
      ) : (
        <CardContainer>
          {movies &&
            movies.map((movie: any) => (
              <CardItem
                key={movie.imdbID}
                title={movie.Title}
                imdbID={movie.imdbID}
                year={movie.Year}
                type={movie.Type}
                poster={movie.Poster}
              />
            ))}
        </CardContainer>
      )}
    </React.Fragment>
  ) : (
    <WalletConnect />
  )
}

export default Movies
