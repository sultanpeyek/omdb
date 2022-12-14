import type {PropsWithChildren} from 'react'

const SearchAutoCompleteContainer = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: PropsWithChildren & {containerRef: any},
) => {
  return (
    <div
      className="absolute z-10 w-full bg-white rounded shadow-lg top-[calc(100%+1rem)] shadow-black/25"
      ref={props.containerRef}
    >
      {props.children}
    </div>
  )
}

export default SearchAutoCompleteContainer
