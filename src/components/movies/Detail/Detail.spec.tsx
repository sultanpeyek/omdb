import {render, screen} from '@testing-library/react'

import Detail from '@/components/movies/Detail'

describe('<Detail />', () => {
  it('renders the component', () => {
    render(
      <Detail
        Title="Testing Detail"
        Year="1993"
        imdbID="XXXXX"
        Type="movie"
        Poster="/assets/placeholder.png"
        onHandleImageClick={() => true}
        isLoading={false}
      />,
    )

    expect(screen.getByText(/Testing Detail/i)).toBeInTheDocument()
  })
})
