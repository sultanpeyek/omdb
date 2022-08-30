const MovieCardContainer = ({children}: any) => {
  return (
    <div className="container grid grid-cols-2 gap-4 py-4 md:py-8 md:gap-8 md:grid-cols-3">
      {children}
    </div>
  )
}

export default MovieCardContainer
