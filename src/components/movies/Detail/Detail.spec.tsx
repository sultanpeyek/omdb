import {render, screen} from '@testing-library/react'

import Detail from '@/components/movies/Detail'

describe('<Detail />', () => {
  it('renders the component', () => {
    render(<Detail Title="Testing Detail" />)

    expect(screen.getByText(/Testing Detail/i)).toBeInTheDocument()
  })
})
