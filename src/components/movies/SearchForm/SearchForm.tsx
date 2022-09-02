import {useEffect, useRef, useState} from 'react'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'

import SearchAutoCompleteContainer from '@/components/movies/SearchAutoCompleteContainer'
import SearchAutoCompleteItem from '@/components/movies/SearchAutoCompleteItem'
import useOnClickOutside from '@/hooks/useOnClickOutside'

const SearchForm = (props: any) => {
  const [isInputOnFocus, setIsInputOnFocus] = useState(props.isInputOnFocus)

  const ref: any = useRef()
  useOnClickOutside(ref, () => {
    setIsInputOnFocus(false)
  })

  useEffect(() => {
    setIsInputOnFocus(props.isInputOnFocus)
  }, [props.isInputOnFocus])

  return (
    <div className="py-4 bg-gray-700 md:py-8">
      <div className="container">
        <div className="max-w-lg mx-auto mb-2 text-white">
          <label htmlFor="search">Search by Title</label>
        </div>
        <div className="relative flex flex-row max-w-lg mx-auto">
          <div className="relative flex-auto">
            {props.searchValue?.length > 2 && (
              <AiOutlineClose
                size={16}
                className="absolute right-2 top-[50%] -mt-2 cursor-pointer"
                onClick={props.onSearchResetClick}
                onMouseDown={e => e.preventDefault()}
              />
            )}
            <input
              id="search"
              type="text"
              className="w-full px-4 py-2 rounded-none rounded-l outline-none md:text-lg"
              placeholder="e.g. Batman"
              inputMode="search"
              minLength={3}
              value={props.searchValue}
              onChange={props.onSearchValueChange}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  setIsInputOnFocus(false)
                } else {
                  setIsInputOnFocus(true)
                }
                props.searchValue === '' || props.searchValue?.length > 2
                  ? props.onSearchKeyDown(e)
                  : null
              }}
              onFocus={() => {
                setIsInputOnFocus(true)
                props.onSearchInputFocus && props.onSearchInputFocus()
              }}
            />
          </div>
          <button
            className="px-4 py-2 font-semibold bg-yellow-400 rounded-r md:text-lg [&:disabled]:cursor-not-allowed [&:disabled]:bg-gray-400 [&:disabled]:text-gray-600"
            disabled={props.searchValue !== '' && props.searchValue?.length < 3}
            onClick={props.onSearchButtonClick}
          >
            <AiOutlineSearch size={24} />
          </button>
          {isInputOnFocus && (
            <SearchAutoCompleteContainer containerRef={ref}>
              {props.searchSuggestions.map((result: any, index: number) => (
                <SearchAutoCompleteItem
                  key={`autocomplete-${result.imdbID || index}`}
                  onClick={() => props.onAutoCompleteItemClick(result.imdbID)}
                >
                  {result.Title}
                </SearchAutoCompleteItem>
              ))}
            </SearchAutoCompleteContainer>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchForm
