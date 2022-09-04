import type {PropsWithChildren} from 'react'

const SearchAutoCompleteItem = (
  props: PropsWithChildren & {onClick: React.MouseEventHandler<HTMLElement>},
) => {
  return (
    <div className="px-4 py-2 cursor-pointer" onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export default SearchAutoCompleteItem
