import {render, screen} from '@testing-library/react'

import AppBar from '@/components/common/AppBar'
import {DESCRIPTION, TITLE} from '@/constants'

describe('<AppBar />', () => {
  it('renders the component', () => {
    render(<AppBar />)

    expect(screen.getByText(TITLE)).toBeInTheDocument()
    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument()
  })
})
