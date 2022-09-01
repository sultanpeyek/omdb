import Image from 'next/image'
import {useState} from 'react'
import {AiOutlineZoomIn} from 'react-icons/ai'

import {isValidUrl, shimmer} from '@/utils'

const Detail = (props: any) => {
  const fallbackSrc = '/assets/pfp.png'
  const [posterSrc, setPosterSrc] = useState(
    isValidUrl(props.Poster) ? props.Poster : fallbackSrc,
  )

  return (
    <div className="py-4 text-white bg-gray-700 md:py-8">
      <div className="container">
        <div className="flex-row justify-between block w-full md:flex">
          <div
            className="basis-[300px] max-w-[300px] group relative cursor-pointer mx-auto md:order-2"
            onClick={props.onHandleImageClick}
          >
            <Image
              src={posterSrc}
              alt=""
              layout="responsive"
              width={300}
              height={423}
              draggable={false}
              blurDataURL={shimmer(277, 431)}
              onLoadingComplete={result => {
                if (result.naturalWidth === 0) {
                  // Broken image
                  setPosterSrc(fallbackSrc)
                }
              }}
              onError={() => {
                setPosterSrc(fallbackSrc)
              }}
              objectFit="cover"
              objectPosition="center"
            />
            <div className="absolute top-0 bottom-0 w-full h-full transition-opacity duration-200 opacity-0 bg-black/20 group-hover:opacity-100"></div>
            <AiOutlineZoomIn
              className="absolute transition-opacity duration-200 opacity-0 right-4 bottom-4 group-hover:opacity-100"
              size={32}
            />
          </div>
          <div className="flex-auto py-2 mb-2 md:order-1">
            {props.Title && <h2 className="mb-4 text-3xl">{props.Title}</h2>}
            {props.Year && <p>Released in {props.Year}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
