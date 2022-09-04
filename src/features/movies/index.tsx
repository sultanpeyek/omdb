import {TOKEN_PROGRAM_ID} from '@solana/spl-token'
import * as SPLToken from '@solana/spl-token'
import {useConnection, useWallet} from '@solana/wallet-adapter-react'
import type {
  AccountInfo,
  Connection,
  RpcResponseAndContext,
} from '@solana/web3.js'
import {PublicKey} from '@solana/web3.js'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

import type {Movie} from '@/api/movies'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import ModalPreview from '@/components/common/ModalPreview'
import WalletConnect from '@/components/common/WalletConnect'
import type {WalletConnectProps} from '@/components/common/WalletConnect/WalletConnect'
import CardContainer from '@/components/movies/CardContainer'
import CardItem from '@/components/movies/CardItem'
import SearchForm from '@/components/movies/SearchForm'
import {ELIGIBLE_NFT_MINTS} from '@/constants'
import {
  fetchMoreMovies,
  fetchMovies,
  loadLocalStorage,
  selectByPassWalletConnect,
  selectFetchMoreMoviesStatus,
  selectFetchMoviesStatus,
  selectModalPreviewIsOpen,
  selectMovies,
  selectMoviesStorage,
  selectPageNumber,
  selectSearchInputIsFocus,
  selectSearchValue,
  selectSelectedMovie,
  selectTotalResults,
  setByPassWalletConnect,
  setModalPreviewIsOpen,
  setSearchInputIsFocus,
  setSelectedMovie,
} from '@/features/movies/moviesSlice'
import {useAppDispatch} from '@/hooks/useAppDispatch'
import {useAppSelector} from '@/hooks/useAppSelector'

const Movies = () => {
  const wallet = useWallet()
  const {connection} = useConnection()
  const [mints, setMints] = useState<string[]>([])
  const [checkWalletStatus, setCheckWalletStatus] =
    useState<WalletConnectProps['checkWalletStatus']>('idle')

  const getAllTokensFromWallet = async (
    publicKey: PublicKey,
    connection: Connection,
  ) => {
    setCheckWalletStatus('loading')
    const response: RpcResponseAndContext<
      Array<{
        pubkey: PublicKey
        account: AccountInfo<Buffer>
      }>
    > = await connection.getTokenAccountsByOwner(publicKey, {
      programId: TOKEN_PROGRAM_ID,
    })

    const mints = response.value
      .filter(e => {
        const accountInfo = SPLToken.AccountLayout.decode(e.account.data)
        return parseInt(accountInfo.amount.toString()) > 0
      })
      .map(e => {
        const accountInfo = SPLToken.AccountLayout.decode(e.account.data)
        return new PublicKey(accountInfo.mint).toString()
      })

    const filteredMints = mints.filter(mint =>
      ELIGIBLE_NFT_MINTS.includes(mint),
    )
    setMints(filteredMints)
    setCheckWalletStatus('succeeded')
  }

  useEffect(() => {
    if (wallet.publicKey) {
      getAllTokensFromWallet(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection])

  const byPassWalletConnect = useAppSelector(selectByPassWalletConnect)
  const fetchMoreMoviesStatus = useAppSelector(selectFetchMoreMoviesStatus)
  const fetchMoviesStatus = useAppSelector(selectFetchMoviesStatus)
  const initialSearchValue = useAppSelector(selectSearchValue)
  const modalPreviewIsOpen = useAppSelector(selectModalPreviewIsOpen)
  const movies = useAppSelector(selectMovies)
  const moviesStorage = useAppSelector(selectMoviesStorage)
  const pageNumber = useAppSelector(selectPageNumber)
  const searchInputIsFocus = useAppSelector(selectSearchInputIsFocus)
  const selectedMovie = useAppSelector(selectSelectedMovie)
  const totalResults = useAppSelector(selectTotalResults)

  const [searchValue, setSearchValue] = useState(initialSearchValue)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (fetchMoviesStatus === 'idle') {
      dispatch(fetchMovies(''))
    }
    dispatch(loadLocalStorage(null))
  }, [fetchMoviesStatus, dispatch])

  const router = useRouter()

  return (wallet.connected &&
    wallet.publicKey &&
    checkWalletStatus === 'succeeded' &&
    mints?.length > 0) ||
    byPassWalletConnect ? (
    <>
      <SearchForm
        searchValue={searchValue}
        onSearchValueChange={e => setSearchValue(e.target.value)}
        onSearchKeyDown={e => {
          if (e.keyCode === 13) {
            dispatch(setSearchInputIsFocus(false))
            dispatch(fetchMovies(searchValue))
          }
        }}
        onSearchButtonClick={() => dispatch(fetchMovies(searchValue))}
        onSearchResetClick={() => {
          setSearchValue('')
          dispatch(fetchMovies(''))
        }}
        searchSuggestions={moviesStorage
          .filter((movie: Movie) =>
            movie.Title.toLowerCase().includes(searchValue.toLowerCase()),
          )
          .slice(0, 5)}
        onSearchInputFocus={() => {
          dispatch(loadLocalStorage(null))
        }}
        onAutoCompleteItemClick={(imdbID: string) => {
          dispatch(setSearchInputIsFocus(false))
          dispatch(
            setSelectedMovie(
              moviesStorage.find((movie: Movie) => movie.imdbID === imdbID),
            ),
          )
          router.push(`/movie/${imdbID}`)
        }}
        searchInputIsFocus={searchInputIsFocus}
        isInputOnFocus={false}
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
            {movies.map((movie: Movie, index: number) => (
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
      onByPassWalletConnectClick={() => dispatch(setByPassWalletConnect(true))}
    />
  )
}

export default Movies
