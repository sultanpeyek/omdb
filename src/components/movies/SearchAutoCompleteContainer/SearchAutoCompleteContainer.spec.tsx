import {render, screen} from '@testing-library/react'

import SearchAutoCompleteContainer from '@/components/movies/SearchAutoCompleteContainer'

describe('<SearchAutoCompleteContainer />', () => {
  it('renders the component', () => {
    render(
      <SearchAutoCompleteContainer>
        Testing SearchAutoCompleteContainer
      </SearchAutoCompleteContainer>,
    )

    expect(
      screen.getByText(/Testing SearchAutoCompleteContainer/i),
    ).toBeInTheDocument()
  })
})
