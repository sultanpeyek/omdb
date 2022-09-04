import type {PropsWithChildren} from 'react'
import {useCallback, useEffect} from 'react'

import {
  fetchMoreMovies,
  selectFetchMoreMoviesStatus,
  selectPageNumber,
  selectSearchValue,
  selectTotalResults,
} from '@/features/movies/moviesSlice'
import {useAppDispatch} from '@/hooks/useAppDispatch'
import {useAppSelector} from '@/hooks/useAppSelector'

const CardContainer = (props: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const fetchMoreMoviesStatus = useAppSelector(selectFetchMoreMoviesStatus)
  const searchValue = useAppSelector(selectSearchValue)
  const pageNumber = useAppSelector(selectPageNumber)
  const totalResults = useAppSelector(selectTotalResults)

  const isBottom = (el: HTMLElement | null) => {
    if (!el) {
      return false
    }
    return el.getBoundingClientRect().bottom <= window.innerHeight
  }

  const trackScrolling = useCallback(() => {
    const el = document.getElementById('card-container')
    if (isBottom(el) && fetchMoreMoviesStatus !== 'loading') {
      dispatch(
        fetchMoreMovies({
          searchValue: searchValue,
          pageNumber: pageNumber + 1,
        }),
      )
    }
  }, [fetchMoreMoviesStatus, dispatch, pageNumber, searchValue])

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
      {props.children}
    </div>
  )
}

export default CardContainer
