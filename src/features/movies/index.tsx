import {useWallet} from '@solana/wallet-adapter-react'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux'

import LoadingSpinner from '@/components/common/LoadingSpinner'
import ModalPreview from '@/components/common/ModalPreview'
import WalletConnect from '@/components/common/WalletConnect'
import CardContainer from '@/components/movies/CardContainer'
import CardItem from '@/components/movies/CardItem'
import SearchForm from '@/components/movies/SearchForm'
import {
  fetchMoreMovies,
  fetchMovies,
  setModalPreviewIsOpen,
  setSelectedMovie,
} from '@/features/movies/moviesSlice'

const Movies = () => {
  const wallet = useWallet()

  const movies = useSelector((state: any) => state.movies.movies)
  const pageNumber = useSelector((state: any) => state.movies.pageNumber)
  const totalResults = useSelector((state: any) => state.movies.totalResults)
  const fetchMoviesStatus = useSelector(
    (state: any) => state.movies.fetchMoviesStatus,
  )
  const fetchMoreMoviesStatus = useSelector(
    (state: any) => state.movies.fetchMoreMoviesStatus,
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
      dispatch(fetchMovies('Batman'))
    }
  }, [fetchMoviesStatus, dispatch])

  const router = useRouter()

  return (wallet.connected && wallet.publicKey) || 1 === 1 ? (
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
          dispatch(fetchMovies(searchValue))
        }}
      />
      {fetchMoviesStatus === 'loading' ? (
        <LoadingSpinner />
      ) : movies && movies?.length > 0 ? (
        <>
          <div className="container max-w-[960px] pt-4 md:pt-8 flex flex-row flex-wrap justify-between">
            <div>
              Results for <strong>&ldquo;{initialSearchValue}&rdquo;</strong>
            </div>
            {totalResults && (
              <div>
                Total Resuts: <strong>{totalResults}</strong>
              </div>
            )}
          </div>
          <CardContainer>
            {movies.map((movie: any, index: number) => (
              <CardItem
                key={movie?.imdbID || index}
                onClick={() => {
                  router.push(`/movie/${movie.imdbID}`)
                  dispatch(setSelectedMovie(movie))
                }}
                onPreviewImageClick={() => {
                  dispatch(setSelectedMovie(movie))
                  dispatch(setModalPreviewIsOpen(true))
                }}
                {...movie}
              />
            ))}
            {totalResults > 10 && pageNumber < totalResults / 10 && (
              <button
                className="col-span-2 p-4 text-center text-white bg-gray-800 rounded shadow-sm cursor-pointer md:col-span-3 shadow-black flex flex-row items-center justify-center [&:disabled]:opacity-50 [&:disabled]:cursor-not-allowed"
                onClick={() =>
                  dispatch(
                    fetchMoreMovies({
                      searchValue: searchValue,
                      pageNumber: pageNumber + 1,
                    }),
                  )
                }
                disabled={fetchMoreMoviesStatus === 'loading'}
              >
                {fetchMoreMoviesStatus === 'loading'
                  ? `Loading More`
                  : `Load More`}
                {fetchMoreMoviesStatus === 'loading' && (
                  <span className="ml-4 rotate-360 animate-spin">
                    <AiOutlineLoading3Quarters size={24} />
                  </span>
                )}
              </button>
            )}
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
