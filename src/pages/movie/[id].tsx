import type {NextPage} from 'next'

import MovieDetail from '@/components/movies/Detail'
import Main from '@/layouts/main'

const Home: NextPage = () => {
  return (
    <Main>
      <MovieDetail />
    </Main>
  )
}

export default Home
