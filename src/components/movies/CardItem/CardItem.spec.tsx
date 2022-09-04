import {render, screen} from '@testing-library/react'

import CardItem from '@/components/movies/CardItem'

describe('<CardItem />', () => {
  it('renders the component', () => {
    render(
      <CardItem
        Title="Testing CardItem"
        Year="1993"
        imdbID="XXXXX"
        Type="movie"
        Poster="/assets/placeholder.png"
        onClick={() => true}
        onPreviewImageClick={() => true}
      />,
    )

    expect(screen.getByText(/Testing CardItem/i)).toBeInTheDocument()
  })
})
