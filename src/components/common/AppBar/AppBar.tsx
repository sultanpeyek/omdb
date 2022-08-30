import Link from 'next/link'

const AppBar = () => {
  return (
    <header className="flex text-white bg-gray-900 h-14">
      <div className="container flex items-stretch">
        <Link href="/" passHref>
          <a className="flex items-center">
            <span className="p-2 font-bold leading-none tracking-tighter text-center text-black align-middle bg-yellow-400">
              OMDB
            </span>
            <span className="ml-4 leading-none align-middle">
              The Open Movie Database
            </span>
          </a>
        </Link>
      </div>
    </header>
  )
}

export default AppBar
