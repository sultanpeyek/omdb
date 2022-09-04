import type {PropsWithChildren} from 'react'
import {createContext, useContext} from 'react'

import useRouteUrlHistory from '@/hooks/useRouteUrlHistory'

interface ApplicationContextInterface {
  previousRoute: string
}
const ApplicationContext = createContext<
  ApplicationContextInterface | undefined
>(undefined)

export function ApplicationProvider({children}: PropsWithChildren) {
  const {previousRoute} = useRouteUrlHistory()

  return (
    <ApplicationContext.Provider value={{previousRoute}}>
      {children}
    </ApplicationContext.Provider>
  )
}

export function useApplication() {
  const context = useContext(ApplicationContext)
  if (context === undefined) {
    throw new Error('useApplication must be used within a ApplicationProvider')
  }
  return context
}
