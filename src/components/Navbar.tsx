import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Navbar() {
  return (
    <header className="mb-4 flex flex-col sm:flex-row items-center justify-between">
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Lodging Lookabout logo" className="h-12 w-12" />
        <span className="text-3xl font-extrabold text-indigo-600 hover:text-indigo-800">
          Lodging Lookabout
        </span>
      </Link>

      <nav className="mt-2 sm:mt-0 space-x-4 text-lg">
        <Link to="/" className="text-blue-500 hover:underline">
          Home
        </Link>
        <Link to="/hotels" className="text-blue-500 hover:underline">
          All Hotels
        </Link>
      </nav>
    </header>
  )
}