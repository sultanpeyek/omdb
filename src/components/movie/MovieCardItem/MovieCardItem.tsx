import Image from 'next/image'
import Link from 'next/link'

/* eslint-disable @next/next/no-img-element */
const MovieCardItem = () => {
  return (
    <Link href="/movie/tt1569923" passHref>
      <a className="relative flex flex-col overflow-hidden text-white bg-gray-800 rounded-md shadow-lg shadow-gray-500 group">
        <div className="relative mb-4 aspect-[200/311]">
          <Image
            src="https://m.media-amazon.com/images/M/MV5BNmY4ZDZjY2UtOWFiYy00MjhjLThmMjctOTQ2NjYxZGRjYmNlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
            // src="https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https%3A%2F%2Fwww.arweave.net%2FG8ViuACmyGDwnXXGPYikfukSBVjDoWNq3dLWxswtU6g%3Fext%3Djpeg"
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            draggable={false}
          />
          <div className="absolute top-0 bottom-0 w-full h-full transition-opacity duration-200 opacity-0 bg-black/10 group-hover:opacity-100"></div>
          <div className="absolute px-3 py-1 text-xs font-semibold text-black bg-yellow-400 top-4 right-4 rounded-2xl">
            Movie
          </div>
        </div>
        <div className="w-full">
          <h2 className="px-4 text-md">The Dark Knight</h2>
          <hr className="my-4 border-t border-t-gray-500/25" />
          <div className="px-4 mb-4 text-sm">Released in 2010</div>
        </div>
      </a>
    </Link>
  )
}

export default MovieCardItem
