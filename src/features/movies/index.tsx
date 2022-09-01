import {useWallet} from '@solana/wallet-adapter-react'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import LoadingSpinner from '@/components/common/LoadingSpinner'
import ModalPreview from '@/components/common/ModalPreview'
import WalletConnect from '@/components/common/WalletConnect'
import CardContainer from '@/components/movies/CardContainer'
import CardItem from '@/components/movies/CardItem'
import SearchForm from '@/components/movies/SearchForm'
import {
  fetchMovie,
  fetchMovies,
  setModalPreviewIsOpen,
  setSelectedMovie,
} from '@/features/movies/moviesSlice'

const Movies = () => {
  const wallet = useWallet()

  const movies = useSelector((state: any) => state.movies.data)
  const fetchMoviesStatus = useSelector(
    (state: any) => state.movies.fetchMoviesStatus,
  )
  const modalPreviewIsOpen = useSelector(
    (state: any) => state.movies.modalPreviewIsOpen,
  )
  const selectedMovie = useSelector((state: any) => state.movies.selectedMovie)
  const initialSearchValue = useSelector(
    (state: any) => state.movies.searchValue,
  )

  const [searchValue, setSearchValue] = React.useState(initialSearchValue)
  const dispatch = useDispatch()

  useEffect(() => {
    if (fetchMoviesStatus === 'idle') {
      dispatch(fetchMovies())
    }
  }, [fetchMoviesStatus, dispatch])

  const router = useRouter()

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
        onSearchResetClick={() => {
          setSearchValue('')
          dispatch(fetchMovies())
        }}
      />
      {fetchMoviesStatus === 'loading' ? (
        <LoadingSpinner />
      ) : movies && movies.length > 0 ? (
        <>
          <div className="container pt-4 text-center md:pt-8">
            Results for <strong>&ldquo;{initialSearchValue}&rdquo;</strong>
          </div>
          <CardContainer>
            {movies.map((movie: any) => (
              <CardItem
                key={movie.imdbID}
                title={movie.Title}
                imdbID={movie.imdbID}
                year={movie.Year}
                type={movie.Type}
                poster={movie.Poster}
                onClick={() => {
                  dispatch(fetchMovie(movie.imdbID))
                  router.push(`/movie/${movie.imdbID}`)
                  dispatch(setSelectedMovie(movie))
                }}
                onPreviewImageClick={() => {
                  dispatch(setSelectedMovie(movie))
                  dispatch(setModalPreviewIsOpen(true))
                }}
              />
            ))}
          </CardContainer>
          <ModalPreview
            poster={selectedMovie?.Poster}
            open={modalPreviewIsOpen}
            onCloseButtonClick={() => dispatch(setModalPreviewIsOpen(false))}
            onClickOutside={() => dispatch(setModalPreviewIsOpen(false))}
          />
        </>
      ) : initialSearchValue ? (
        <div className="container pt-4 text-center md:pt-8">
          No results found for{' '}
          <strong>&ldquo;{initialSearchValue}&rdquo;</strong>
        </div>
      ) : (
        <></>
      )}
    </React.Fragment>
  ) : (
    <WalletConnect />
  )
}

export default Movies
