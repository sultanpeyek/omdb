import Image from 'next/image'

import {AiOutlineZoomIn} from 'react-icons/ai'

const MovieDetail = ({children}: any) => {
  return (
    <div className="py-4 text-white bg-gray-700 md:py-8">
      <div className="container">
        <div className="flex-row justify-between block w-full md:flex">
          <div className="w-[300px] group relative cursor-pointer mx-auto md:order-2">
            <Image
              src="https://m.media-amazon.com/images/M/MV5BNmY4ZDZjY2UtOWFiYy00MjhjLThmMjctOTQ2NjYxZGRjYmNlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
              // src="https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https%3A%2F%2Fwww.arweave.net%2FG8ViuACmyGDwnXXGPYikfukSBVjDoWNq3dLWxswtU6g%3Fext%3Djpeg"
              alt=""
              layout="responsive"
              width={300}
              height={423}
              draggable={false}
            />
            <div className="absolute top-0 bottom-0 w-full h-full transition-opacity duration-200 opacity-0 bg-black/20 group-hover:opacity-100"></div>
            <AiOutlineZoomIn
              className="absolute transition-opacity duration-200 opacity-0 right-4 bottom-4 group-hover:opacity-100"
              size={32}
            />
          </div>
          <div className="flex-auto py-2 mb-2 md:order-1">
            <h2 className="mb-4 text-3xl">The Dark Knight</h2>
            <p>Released in 2010</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
