const SearchAutoCompleteItem = (props: any) => {
  return (
    <div className="px-4 py-2 cursor-pointer" onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export default SearchAutoCompleteItem
