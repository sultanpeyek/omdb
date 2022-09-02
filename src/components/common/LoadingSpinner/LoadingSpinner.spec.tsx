import {render, screen} from '@testing-library/react'

import LoadingSpinner from '@/components/common/LoadingSpinner'

describe('<LoadingSpinner />', () => {
  it('renders the component', () => {
    render(<LoadingSpinner />)

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
})
