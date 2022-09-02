import {render, screen} from '@testing-library/react'

import CardContainer from '@/components/movies/CardContainer'

describe('<CardContainer />', () => {
  it('renders the component', () => {
    render(<CardContainer>Testing CardContainer</CardContainer>)

    expect(screen.getByText(/Testing CardContainer/i)).toBeInTheDocument()
  })
})
