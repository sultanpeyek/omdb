import {render, screen} from '@testing-library/react'

import ModalPreview from '@/components/common/ModalPreview'

describe('<ModalPreview />', () => {
  it('renders the component', () => {
    render(
      <ModalPreview
        poster=""
        onClickOutside={() => true}
        open={true}
        onCloseButtonClick={() => true}
      />,
    )

    expect(screen.getByTestId('modal-preview')).toBeInTheDocument()
  })
})
