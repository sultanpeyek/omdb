import type {NextPage} from 'next'
import Link from 'next/link'
import Image from 'next/image'

import Main from '@/layouts/main'

import {AiOutlineArrowDown} from 'react-icons/ai'

import MovieDetail from '@/components/movie/MovieDetail'

import ImageAvatar from '@/assets/pfp.png'

const Home: NextPage = () => {
  return (
    <Main>
      <MovieDetail />
    </Main>
  )
}

export default Home
