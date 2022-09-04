import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {useEffect} from 'react'

import ModalPreview from '@/components/common/ModalPreview'
import Detail from '@/components/movies/Detail'
import {
  fetchMovie,
  selectFetchMovieStatus,
  selectModalPreviewIsOpen,
  selectSelectedMovie,
  setModalPreviewIsOpen,
} from '@/features/movies/moviesSlice'
import {useAppDispatch} from '@/hooks/useAppDispatch'
import {useAppSelector} from '@/hooks/useAppSelector'
import Main from '@/layouts/main'

const Home: NextPage = () => {
  const dispatch = useAppDispatch()

  const selectedMovie = useAppSelector(selectSelectedMovie)
  const fetchMovieStatus = useAppSelector(selectFetchMovieStatus)
  const modalPreviewIsOpen = useAppSelector(selectModalPreviewIsOpen)

  useAppSelector

  const router = useRouter()
  const {id} = router.query

  useEffect(() => {
    if (id && router.isReady) {
      dispatch(fetchMovie(id as string))
    }
  }, [id, router.isReady, dispatch])

  return (
    <Main>
      <Detail
        onHandleImageClick={() => {
          dispatch(setModalPreviewIsOpen(true))
        }}
        {...selectedMovie}
        isLoading={fetchMovieStatus === 'loading'}
      />
      <ModalPreview
        poster={selectedMovie?.Poster}
        open={modalPreviewIsOpen}
        onCloseButtonClick={() => dispatch(setModalPreviewIsOpen(false))}
        onClickOutside={() => {
          modalPreviewIsOpen === true && dispatch(setModalPreviewIsOpen(false))
        }}
      />
    </Main>
  )
}

export default Home
