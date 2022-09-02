import {render, screen} from '@testing-library/react'

import Footer from '@/components/common/Footer'
import {AUTHOR} from '@/constants'

describe('<Footer />', () => {
  it('renders the component', () => {
    render(<Footer />)

    expect(screen.getByText(AUTHOR)).toBeInTheDocument()
  })
})
