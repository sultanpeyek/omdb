import {useWallet} from '@solana/wallet-adapter-react'
import type {NextPage} from 'next'
import React from 'react'

import LoadingSpinner from '@/components/common/LoadingSpinner'
import WalletConnect from '@/components/common/WalletConnect'
import MovieCardContainer from '@/components/movie/MovieCardContainer'
import MovieCardItem from '@/components/movie/MovieCardItem'
import MovieSearchForm from '@/components/movie/MovieSearchForm'
import Main from '@/layouts/main'

const Home: NextPage = () => {
  const wallet = useWallet()

  return (
    <Main>
      {!wallet.connected ? (
        <React.Fragment>
          <MovieSearchForm />
          {1 == 1 ? (
            <LoadingSpinner />
          ) : (
            <MovieCardContainer>
              <MovieCardItem />
              <MovieCardItem />
              <MovieCardItem />
              <MovieCardItem />
              <MovieCardItem />
            </MovieCardContainer>
          )}
        </React.Fragment>
      ) : (
        <WalletConnect />
      )}
    </Main>
  )
}

export default Home
