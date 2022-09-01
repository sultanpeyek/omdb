import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import ModalPreview from '@/components/common/ModalPreview'
import Detail from '@/components/movies/Detail'
import {fetchMovie, setModalPreviewIsOpen} from '@/features/movies/moviesSlice'
import Main from '@/layouts/main'

const Home: NextPage = () => {
  const selectedMovie = useSelector((state: any) => state.movies.selectedMovie)
  const fetchMovieStatus = useSelector(
    (state: any) => state.movies.fetchMovieStatus,
  )
  const modalPreviewIsOpen = useSelector(
    (state: any) => state.movies.modalPreviewIsOpen,
  )
  const dispatch = useDispatch()

  const router = useRouter()
  const {id} = router.query

  useEffect(() => {
    if (fetchMovieStatus === 'idle' && id && router.isReady) {
      dispatch(fetchMovie(id))
    }
  }, [id, router.isReady, fetchMovieStatus, dispatch])

  return (
    <Main>
      <Detail
        onHandleImageClick={() => {
          dispatch(setModalPreviewIsOpen(true))
        }}
        {...selectedMovie}
      />
      <ModalPreview
        poster={selectedMovie?.Poster}
        open={modalPreviewIsOpen}
        onCloseButtonClick={() => dispatch(setModalPreviewIsOpen(false))}
        onClickOutside={() => dispatch(setModalPreviewIsOpen(false))}
      />
    </Main>
  )
}

export default Home
