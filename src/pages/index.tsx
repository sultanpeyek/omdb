import type {NextPage} from 'next'
import Link from 'next/link'
import Image from 'next/image'

import Main from '@/layouts/main'

import {AiOutlineArrowDown} from 'react-icons/ai'

import MovieSearchForm from '@/components/movie/MovieSearchForm'
import MovieCardContainer from '@/components/movie/MovieCardContainer'
import MovieCardItem from '@/components/movie/MovieCardItem'

import ImageAvatar from '@/assets/pfp.png'

const Home: NextPage = () => {
  return (
    <Main>
      <MovieSearchForm />
      <MovieCardContainer>
        <MovieCardItem />
        <MovieCardItem />
        <MovieCardItem />
        <MovieCardItem />
        <MovieCardItem />
      </MovieCardContainer>
    </Main>
  )
}

export default Home
