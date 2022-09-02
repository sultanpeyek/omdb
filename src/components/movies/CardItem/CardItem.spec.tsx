import {render, screen} from '@testing-library/react'

import CardItem from '@/components/movies/CardItem'

describe('<CardItem />', () => {
  it('renders the component', () => {
    render(<CardItem Title="Testing CardItem" />)

    expect(screen.getByText(/Testing CardItem/i)).toBeInTheDocument()
  })
})
