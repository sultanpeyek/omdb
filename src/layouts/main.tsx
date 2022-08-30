import Footer from '@/components/Footer'

const Main = ({children}: any) => {
  return (
    <div className="flex flex-col w-full min-h-screen p-4 md:p-8 max-w-[1440px] mx-auto">
      <main className="flex-auto min-h-[calc(100vh-144px)]">{children}</main>
      <Footer />
    </div>
  )
}

export default Main
