import {AUTHOR} from '@/constants'

const Footer = () => {
  return (
    <footer className="flex-none py-4 text-right text-white bg-gray-900">
      <div className="container">
        Copyright &copy; {new Date().getFullYear()}{' '}
        <a href="https://sultanpeyek.xyz/" target="_blank" rel="noreferrer">
          {AUTHOR}
        </a>
      </div>
    </footer>
  )
}

export default Footer
