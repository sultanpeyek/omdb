import Image from 'next/image'
import {useState} from 'react'
import {AiOutlineZoomIn} from 'react-icons/ai'

import {capitalizeText, isValidUrl, shimmer} from '@/utils'

const CardItem = (props: any) => {
  const fallbackSrc = '/assets/placeholder.png'
  const [posterSrc, setPosterSrc] = useState(
    isValidUrl(props.Poster) ? props.Poster : fallbackSrc,
  )

  return (
    <div className="relative flex text-white group">
      <div
        className="relative flex flex-col flex-auto overflow-hidden text-white bg-gray-800 rounded-md shadow-lg cursor-pointer shadow-gray-500 group"
        onClick={props.onClick}
      >
        <div className="relative mb-4 aspect-[200/311]">
          <Image
            src={posterSrc}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            draggable={false}
            placeholder="blur"
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
          />
          <div className="absolute top-0 bottom-0 w-full h-full transition-opacity duration-200 opacity-0 bg-black/10 group-hover:opacity-100"></div>
          <div
            className={`absolute px-3 py-1 text-xs font-semibold text-black bottom-4 right-4 rounded-2xl ${
              props.Type === 'movie'
                ? 'bg-yellow-400'
                : props.Type === 'series'
                ? 'bg-green-400'
                : props.Type === 'game'
                ? 'bg-red-400'
                : 'bg-white'
            }`}
          >
            {capitalizeText(props.Type || '')}
          </div>
        </div>
        <div className="flex flex-col items-stretch flex-auto w-full">
          <h2 className="flex-auto px-4 text-md">{props.Title}</h2>
          <div className="px-4 pt-4 mt-4 mb-4 text-sm border-t shrink-0 border-t-gray-500/25">
            Released in {props.Year}
          </div>
        </div>
      </div>
      <button className="absolute transition-opacity duration-200 opacity-0 cursor-pointer top-4 right-4 group-hover:opacity-100">
        <AiOutlineZoomIn size={32} onClick={props.onPreviewImageClick} />
      </button>
    </div>
  )
}

export default CardItem
