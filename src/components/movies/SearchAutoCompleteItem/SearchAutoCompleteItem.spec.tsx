import {render, screen} from '@testing-library/react'

import SearchAutoCompleteItem from '@/components/movies/SearchAutoCompleteItem'

describe('<SearchAutoCompleteItem />', () => {
  it('renders the component', () => {
    render(
      <SearchAutoCompleteItem onClick={() => true}>
        Testing SearchAutoCompleteItem
      </SearchAutoCompleteItem>,
    )

    expect(
      screen.getByText(/Testing SearchAutoCompleteItem/i),
    ).toBeInTheDocument()
  })
})
