import Image from 'next/image'
import {useEffect, useState} from 'react'
import {AiOutlineZoomIn} from 'react-icons/ai'

import {isValidUrl, shimmer} from '@/utils'

const Detail = (props: any) => {
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
      <div className="py-4 text-white bg-gray-700 md:py-8">
        <div className="container">
          <div className="flex-row justify-between block w-full md:flex">
            {posterSrc && (
              <div
                className="basis-[300px] max-w-[300px] group relative cursor-pointer mx-auto md:order-2"
                onClick={
                  posterSrc !== fallbackSrc ? props.onHandleImageClick : null
                }
              >
                <Image
                  key={props.imdbID}
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
      <div className="container py-8">
        <table className="table">
          <tbody>
            {props.Rated && (
              <tr>
                <td className="pr-4">Rated:</td>
                <td>TV-PG</td>
              </tr>
            )}
            {props.Released && (
              <tr>
                <td className="pr-4">Released:</td>
                <td>05 Sep 1992</td>
              </tr>
            )}
            {props.Runtime && (
              <tr>
                <td className="pr-4">Runtime:</td>
                <td>23 min</td>
              </tr>
            )}
            {props.Genre && (
              <tr>
                <td className="pr-4">Genre:</td>
                <td>Animation, Action, Adventure</td>
              </tr>
            )}
            {props.Director && (
              <tr>
                <td className="pr-4">Director:</td>
                <td>N/A</td>
              </tr>
            )}
            {props.Writer && (
              <tr>
                <td className="pr-4">Writer:</td>
                <td>Bob Kane, Eric Radomski, Bruce Timm</td>
              </tr>
            )}
            {props.Actors && (
              <tr>
                <td className="pr-4">Actors:</td>
                <td>Kevin Conroy, Loren Lester, Efrem Zimbalist Jr.</td>
              </tr>
            )}
            {props.Plot && (
              <tr>
                <td className="pr-4">Plot:</td>
                <td>
                  The Dark Knight battles crime in Gotham City with occasional
                  help from Robin and Batgirl.
                </td>
              </tr>
            )}
            {props.Language && (
              <tr>
                <td className="pr-4">Language:</td>
                <td>English</td>
              </tr>
            )}
            {props.Country && (
              <tr>
                <td className="pr-4">Country:</td>
                <td>United States</td>
              </tr>
            )}
            {props.Awards && (
              <tr>
                <td className="pr-4">Awards:</td>
                <td>Won 1 Primetime Emmy. 5 wins & 19 nominations total</td>
              </tr>
            )}
            {props.Metascore && (
              <tr>
                <td className="pr-4">Metascore:</td>
                <td>N/A</td>
              </tr>
            )}
            {props.imdbRating && (
              <tr>
                <td className="pr-4">imdb Rating:</td>
                <td>9.0</td>
              </tr>
            )}
            {props.imdbVotes && (
              <tr>
                <td className="pr-4">imdb Votes:</td>
                <td>102,051</td>
              </tr>
            )}
            {props.totalSeasons && (
              <tr>
                <td className="pr-4">Total Seasons:</td>
                <td>4</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Detail
