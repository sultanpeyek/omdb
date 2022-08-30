/* eslint-disable react-hooks/exhaustive-deps */
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'

const EXCEPTIONS: any = []

/**
 * Saves the current URL before changing the route.
 */
const useRouteUrlHistory = () => {
  const [previousRoute, setPreviousRouter] = useState('')
  const router = useRouter()

  const handleBeforeHistoryChange = (url: any) => {
    const [nextUrl] = url?.split('?') || []
    if (
      !(EXCEPTIONS.includes(nextUrl) || EXCEPTIONS.includes(router.asPath)) &&
      nextUrl !== router.asPath
    ) {
      setPreviousRouter(router.asPath)
    }
  }

  useEffect(() => {
    router.events.on('beforeHistoryChange', handleBeforeHistoryChange)

    return () => {
      router.events.off('beforeHistoryChange', handleBeforeHistoryChange)
    }
  }, [])

  return {previousRoute}
}

export default useRouteUrlHistory
