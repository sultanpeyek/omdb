import Image from 'next/image'
import Link from 'next/link'
import {useEffect, useState} from 'react'

import {capitalizeText, isValidUrl} from '@/utils'

const CardItem = (props: any) => {
  const [posterSrc, setPosterSrc] = useState('')
  const fallbackSrc = '/assets/pfp.png'

  useEffect(() => {
    if (isValidUrl(props.poster)) {
      setPosterSrc(props.poster)
    } else {
      setPosterSrc(fallbackSrc)
    }
  }, [props.poster])

  return (
    <Link href={`/movie/${props.imdbID}`} passHref>
      <a className="relative flex flex-col overflow-hidden text-white bg-gray-800 rounded-md shadow-lg shadow-gray-500 group">
        <div className="relative mb-4 aspect-[200/311]">
          <Image
            src={posterSrc}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            draggable={false}
            onLoadingComplete={result => {
              if (result.naturalWidth === 0) {
                // Broken image
                setPosterSrc(fallbackSrc)
              }
            }}
            onError={() => {
              setPosterSrc(fallbackSrc)
            }}
          />
          <div className="absolute top-0 bottom-0 w-full h-full transition-opacity duration-200 opacity-0 bg-black/10 group-hover:opacity-100"></div>
          <div
            className={`absolute px-3 py-1 text-xs font-semibold text-black top-4 right-4 rounded-2xl ${
              props.type == 'movie'
                ? 'bg-yellow-400'
                : props.type == 'series'
                ? 'bg-green-400'
                : ''
            }`}
          >
            {capitalizeText(props.type)}
          </div>
        </div>
        <div className="flex flex-col items-stretch flex-auto w-full">
          <h2 className="flex-auto px-4 text-md">{props.title}</h2>
          <div className="px-4 pt-4 mt-4 mb-4 text-sm border-t shrink-0 border-t-gray-500/25">
            Released in {props.year}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default CardItem
