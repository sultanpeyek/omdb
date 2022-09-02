import {TOKEN_PROGRAM_ID} from '@solana/spl-token'
import * as SPLToken from '@solana/spl-token'
import {useConnection, useWallet} from '@solana/wallet-adapter-react'
import type {Connection} from '@solana/web3.js'
import {PublicKey} from '@solana/web3.js'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux'

import LoadingSpinner from '@/components/common/LoadingSpinner'
import ModalPreview from '@/components/common/ModalPreview'
import WalletConnect from '@/components/common/WalletConnect'
import CardContainer from '@/components/movies/CardContainer'
import CardItem from '@/components/movies/CardItem'
import SearchForm from '@/components/movies/SearchForm'
import {ELIGIBLE_NFT_MINTS} from '@/constants'
import {
  fetchMoreMovies,
  fetchMovies,
  loadLocalStorage,
  setByPassWalletConnect,
  setModalPreviewIsOpen,
  setSearchInputIsFocus,
  setSelectedMovie,
} from '@/features/movies/moviesSlice'

const Movies = () => {
  const wallet = useWallet()
  const {connection} = useConnection()
  const [mints, setMints] = useState([])
  const [checkWalletStatus, setCheckWalletStatus] = useState('idle')

  const getAllTokensFromWallet = async (
    publicKey: PublicKey,
    connection: Connection,
  ) => {
    setCheckWalletStatus('loading')
    const response = await connection.getTokenAccountsByOwner(publicKey, {
      programId: TOKEN_PROGRAM_ID,
    })
    const mints: any = response.value.map(e => {
      const accountInfo = SPLToken.AccountLayout.decode(e.account.data)
      return new PublicKey(accountInfo.mint).toString()
    })
    const filteredMints = mints.filter((mint: string) =>
      ELIGIBLE_NFT_MINTS.includes(mint),
    )
    setMints(filteredMints)
    setCheckWalletStatus('done')
  }

  useEffect(() => {
    if (wallet.publicKey) {
      getAllTokensFromWallet(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection])

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
  const moviesStorage = useSelector((state: any) => state.movies.moviesStorage)
  const byPassWalletConnect = useSelector(
    (state: any) => state.movies.byPassWalletConnect,
  )
  const searchInputIsFocus = useSelector(
    (state: any) => state.movies.searchInputIsFocus,
  )

  const [searchValue, setSearchValue] = useState(initialSearchValue)
  const dispatch = useDispatch()

  useEffect(() => {
    if (fetchMoviesStatus === 'idle') {
      dispatch(fetchMovies())
    }
    dispatch(loadLocalStorage())
  }, [fetchMoviesStatus, dispatch])

  const router = useRouter()

  return (wallet.connected &&
    wallet.publicKey &&
    checkWalletStatus === 'done' &&
    mints?.length > 0) ||
    byPassWalletConnect ? (
    <>
      <SearchForm
        searchValue={searchValue}
        onSearchValueChange={(e: any) => setSearchValue(e.target.value)}
        onSearchKeyDown={(e: any) => {
          if (e.keyCode === 13) {
            dispatch(setSearchInputIsFocus(false))
            dispatch(fetchMovies(searchValue))
          }
        }}
        onSearchButtonClick={() => dispatch(fetchMovies(searchValue))}
        onSearchResetClick={() => {
          setSearchValue('')
          dispatch(fetchMovies())
        }}
        searchSuggestions={moviesStorage
          .filter((movie: any) =>
            movie.Title.toLowerCase().includes(searchValue.toLowerCase()),
          )
          .slice(0, 5)}
        onSearchInputFocus={() => {
          dispatch(loadLocalStorage())
        }}
        onAutoCompleteItemClick={(imdbID: string) => {
          dispatch(setSearchInputIsFocus(false))
          dispatch(
            setSelectedMovie(
              moviesStorage.find((m: any) => m.imdbID === imdbID),
            ),
          )
          router.push(`/movie/${imdbID}`)
        }}
        searchInputIsFocus={searchInputIsFocus}
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
                  dispatch(setSelectedMovie(movie))
                  router.push(`/movie/${movie.imdbID}`)
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
            onClickOutside={() => {
              modalPreviewIsOpen === true &&
                dispatch(setModalPreviewIsOpen(false))
            }}
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
    </>
  ) : (
    <WalletConnect
      mints={mints}
      checkWalletStatus={checkWalletStatus}
      onByPassWalletConnectClick={() => dispatch(setByPassWalletConnect())}
    />
  )
}

export default Movies
