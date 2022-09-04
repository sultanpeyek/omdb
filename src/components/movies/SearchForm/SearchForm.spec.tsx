import {render, screen} from '@testing-library/react'

import SearchForm from '@/components/movies/SearchForm'

describe('<SearchForm />', () => {
  it('renders the component', () => {
    render(
      <SearchForm
        searchValue=""
        onSearchValueChange={() => true}
        onSearchKeyDown={() => true}
        onSearchButtonClick={() => true}
        onSearchResetClick={() => true}
        searchSuggestions={[]}
        onSearchInputFocus={() => true}
        onAutoCompleteItemClick={() => true}
        searchInputIsFocus
        isInputOnFocus={false}
      />,
    )

    expect(screen.getByText(/Search by Title/i)).toBeInTheDocument()
  })
})
