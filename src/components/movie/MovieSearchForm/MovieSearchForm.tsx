import Image from 'next/image'

import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'

import MovieSearchAutoCompleteContainer from '@/components/movie/MovieSearchAutoCompleteContainer'
import MovieSearchAutoCompleteItem from '@/components/movie/MovieSearchAutoCompleteItem'

const MovieSearchForm = ({children}: any) => {
  return (
    <div className="py-4 bg-gray-700 md:py-8">
      <div className="container">
        <div className="relative flex flex-row max-w-lg mx-auto">
          <div className="relative flex-auto">
            {1 != 1 && (
              <AiOutlineClose
                size={16}
                className="absolute right-2 top-[50%] -mt-[8px] cursor-pointer"
              />
            )}
            <input
              type="text"
              className="w-full px-4 py-2 rounded-l outline-none md:text-lg"
              placeholder="Search OMDB"
            />
          </div>
          <button className="px-4 py-2 font-semibold bg-yellow-400 rounded-r md:text-lg">
            <AiOutlineSearch size={24} />
          </button>
          {1 != 1 && (
            <MovieSearchAutoCompleteContainer>
              <MovieSearchAutoCompleteItem />
              <MovieSearchAutoCompleteItem />
            </MovieSearchAutoCompleteContainer>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieSearchForm
