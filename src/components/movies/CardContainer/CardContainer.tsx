import {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {fetchMoreMovies} from '@/features/movies/moviesSlice'

const CardContainer = ({children}: any) => {
  const dispatch = useDispatch()

  const fetchMoreMoviesStatus = useSelector(
    (state: any) => state.movies.fetchMoreMoviesStatus,
  )
  const initialSearchValue = useSelector(
    (state: any) => state.movies.searchValue,
  )
  const pageNumber = useSelector((state: any) => state.movies.pageNumber)
  const totalResults = useSelector((state: any) => state.movies.totalResults)

  const isBottom = (el: any) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight
  }

  const trackScrolling = useCallback(() => {
    const el = document.getElementById('card-container')
    if (isBottom(el) && fetchMoreMoviesStatus !== 'loading') {
      dispatch(
        fetchMoreMovies({
          searchValue: initialSearchValue,
          pageNumber: pageNumber + 1,
        }),
      )
    }
  }, [fetchMoreMoviesStatus, dispatch, pageNumber, initialSearchValue])

  useEffect(() => {
    pageNumber < totalResults / 10 &&
      document.addEventListener('scroll', trackScrolling)
    return () => {
      document.removeEventListener('scroll', trackScrolling)
    }
  }, [trackScrolling, dispatch, pageNumber, totalResults])

  return (
    <div
      id="card-container"
      className="container grid grid-cols-2 gap-4 py-4 md:py-8 md:gap-8 md:grid-cols-3 max-w-[960px]"
    >
      {children}
    </div>
  )
}

export default CardContainer
