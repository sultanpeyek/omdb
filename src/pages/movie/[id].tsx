import type {NextPage} from 'next'
import {useDispatch, useSelector} from 'react-redux'

import ModalPreview from '@/components/common/ModalPreview'
import Detail from '@/components/movies/Detail'
import {setModalPreviewIsOpen} from '@/features/movies/moviesSlice'
import Main from '@/layouts/main'

const Home: NextPage = () => {
  const selectedMovie = useSelector((state: any) => state.movies.selectedMovie)
  const modalPreviewIsOpen = useSelector(
    (state: any) => state.movies.modalPreviewIsOpen,
  )
  const dispatch = useDispatch()

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
