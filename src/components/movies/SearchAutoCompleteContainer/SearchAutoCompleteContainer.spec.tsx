import {render, screen} from '@testing-library/react'

import SearchAutoCompleteContainer from '@/components/movies/SearchAutoCompleteContainer'

describe('<SearchAutoCompleteContainer />', () => {
  it('renders the component', () => {
    const ref = {current: {}}
    render(
      <div>
        <SearchAutoCompleteContainer containerRef={ref}>
          Testing SearchAutoCompleteContainer
        </SearchAutoCompleteContainer>
      </div>,
    )

    expect(
      screen.getByText(/Testing SearchAutoCompleteContainer/i),
    ).toBeInTheDocument()
  })
})
