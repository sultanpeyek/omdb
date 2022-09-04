import Image from 'next/image'
import {useEffect, useState} from 'react'
import {AiOutlineLoading3Quarters, AiOutlineZoomIn} from 'react-icons/ai'

import type {Movie} from '@/api/movies'
import {isValidUrl, shimmer} from '@/utils'

const Detail = (
  props: Movie & {
    onHandleImageClick: React.MouseEventHandler<HTMLElement>
    isLoading: boolean
  },
) => {
  const fallbackSrc = '/assets/placeholder.png'
  const [posterSrc, setPosterSrc] = useState(
    isValidUrl(props.Poster) ? props.Poster : fallbackSrc,
  )

  useEffect(() => {
    if (isValidUrl(props.Poster)) {
      setPosterSrc(props.Poster)
    }
  }, [props.Poster])

  return (
    <>
      <div
        className="py-4 text-white bg-gray-700 md:py-8"
        key={`detail-${props.imdbID}`}
      >
        <div className="container">
          <div className="flex-row justify-between block w-full md:flex">
            {posterSrc && (
              <div
                className="basis-[300px] max-w-[300px] group relative cursor-pointer mx-auto md:order-2"
                onClick={
                  posterSrc !== fallbackSrc
                    ? props.onHandleImageClick
                    : undefined
                }
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
                  priority={true}
                />
                {posterSrc !== fallbackSrc && (
                  <>
                    <div className="absolute top-0 bottom-0 w-full h-full transition-opacity duration-200 opacity-0 bg-black/20 group-hover:opacity-100"></div>
                    <AiOutlineZoomIn
                      className="absolute transition-opacity duration-200 opacity-0 right-4 bottom-4 group-hover:opacity-100"
                      size={32}
                    />
                  </>
                )}
              </div>
            )}
            <div className="flex-auto py-2 mb-2 md:order-1 md:min-h-[431px]">
              {props.Title && <h2 className="mb-4 text-3xl">{props.Title}</h2>}
              {props.imdbID && <p className="mb-2">imdb ID: {props.imdbID}</p>}
              {props.Year && <p className="mb-2">Released in {props.Year}</p>}
              {props.Type && (
                <p className="mb-2 capitalize">Type: {props.Type}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="container flex flex-col items-start flex-auto py-8"
        key={`table-${props.imdbID}`}
      >
        {props.isLoading ? (
          <div className="flex flex-row items-center justify-center flex-auto w-full">
            <span className="ml-4 rotate-360 animate-spin">
              <AiOutlineLoading3Quarters size={24} />
            </span>
          </div>
        ) : (
          <table className="table">
            <tbody>
              {props.Rated && (
                <tr>
                  <td className="pr-4">Rated:</td>
                  <td>{props.Rated}</td>
                </tr>
              )}
              {props.Released && (
                <tr>
                  <td className="pr-4">Released:</td>
                  <td>{props.Released}</td>
                </tr>
              )}
              {props.Runtime && (
                <tr>
                  <td className="pr-4">Runtime:</td>
                  <td>{props.Runtime}</td>
                </tr>
              )}
              {props.Genre && (
                <tr>
                  <td className="pr-4">Genre:</td>
                  <td>{props.Genre}</td>
                </tr>
              )}
              {props.Director && (
                <tr>
                  <td className="pr-4">Director:</td>
                  <td>{props.Director}</td>
                </tr>
              )}
              {props.Writer && (
                <tr>
                  <td className="pr-4">Writer:</td>
                  <td>{props.Writer}</td>
                </tr>
              )}
              {props.Actors && (
                <tr>
                  <td className="pr-4">Actors:</td>
                  <td>{props.Actors}</td>
                </tr>
              )}
              {props.Plot && (
                <tr>
                  <td className="pr-4">Plot:</td>
                  <td>{props.Plot}</td>
                </tr>
              )}
              {props.Language && (
                <tr>
                  <td className="pr-4">Language:</td>
                  <td>{props.Language}</td>
                </tr>
              )}
              {props.Country && (
                <tr>
                  <td className="pr-4">Country:</td>
                  <td>{props.Country}</td>
                </tr>
              )}
              {props.Awards && (
                <tr>
                  <td className="pr-4">Awards:</td>
                  <td>{props.Awards}</td>
                </tr>
              )}
              {props.Metascore && (
                <tr>
                  <td className="pr-4">Metascore:</td>
                  <td>{props.Metascore}</td>
                </tr>
              )}
              {props.imdbRating && (
                <tr>
                  <td className="pr-4">imdb Rating:</td>
                  <td>{props.imdbRating}</td>
                </tr>
              )}
              {props.imdbVotes && (
                <tr>
                  <td className="pr-4">imdb Votes:</td>
                  <td>{props.imdbVotes}</td>
                </tr>
              )}
              {props.totalSeasons && (
                <tr>
                  <td className="pr-4">Total Seasons:</td>
                  <td>{props.totalSeasons}</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Detail
