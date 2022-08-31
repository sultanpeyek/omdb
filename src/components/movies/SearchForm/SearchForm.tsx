import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'

import SearchAutoCompleteContainer from '@/components/movies/SearchAutoCompleteContainer'
import SearchAutoCompleteItem from '@/components/movies/SearchAutoCompleteItem'

const SearchForm = (props: any) => {
  return (
    <div className="py-4 bg-gray-700 md:py-8">
      <div className="container">
        <div className="max-w-lg mx-auto mb-2 text-white">
          <label htmlFor="search">Search by Title, ID, or Year.</label>
        </div>
        <div className="relative flex flex-row max-w-lg mx-auto">
          <div className="relative flex-auto">
            {1 != 1 && (
              <AiOutlineClose
                size={16}
                className="absolute right-2 top-[50%] -mt-[8px] cursor-pointer"
              />
            )}
            <input
              id="search"
              type="text"
              className="w-full px-4 py-2 rounded-none rounded-l outline-none md:text-lg"
              placeholder="e.g. Batman"
              value={props.searchValue}
              onChange={props.onSearchValueChange}
              onKeyDown={props.onSearchKeyDown}
            />
          </div>
          <button
            className="px-4 py-2 font-semibold bg-yellow-400 rounded-r md:text-lg"
            onClick={props.onSearchButtonClick}
          >
            <AiOutlineSearch size={24} />
          </button>
          {1 != 1 && (
            <SearchAutoCompleteContainer>
              <SearchAutoCompleteItem />
              <SearchAutoCompleteItem />
            </SearchAutoCompleteContainer>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchForm
