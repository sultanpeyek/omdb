import type {NextPage} from 'next'

import Movies from '@/features/movies'
import Main from '@/layouts/main'

const Home: NextPage = () => {
  return (
    <Main>
      <Movies />
    </Main>
  )
}

export default Home
