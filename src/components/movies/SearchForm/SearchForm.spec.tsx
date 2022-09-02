import {render, screen} from '@testing-library/react'

import SearchForm from '@/components/movies/SearchForm'

describe('<SearchForm />', () => {
  it('renders the component', () => {
    render(<SearchForm />)

    expect(screen.getByText(/Search by Title/i)).toBeInTheDocument()
  })
})
