import type {PropsWithChildren} from 'react'
import React from 'react'

import AppBar from '@/components/common/AppBar'
import Footer from '@/components/common/Footer'

const Main = (props: PropsWithChildren) => {
  return (
    <React.Fragment>
      <div className="flex flex-col min-h-screen">
        <AppBar />
        <main className="flex flex-col flex-auto min-h-[calc(100vh-144px)]">
          {props.children}
        </main>
        <Footer />
      </div>
    </React.Fragment>
  )
}

export default Main
