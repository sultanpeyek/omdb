import {render, screen} from '@testing-library/react'

import ModalPreview from '@/components/common/ModalPreview'

describe('<ModalPreview />', () => {
  it('renders the component', () => {
    render(<ModalPreview />)

    expect(screen.getByTestId('modal-preview')).toBeInTheDocument()
  })
})
