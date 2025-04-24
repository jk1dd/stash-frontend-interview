import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <Link to="/" className="flex items-center space-x-2">
        {!isHome && <img src={logo} alt="Logo" className="h-10 w-10" />}
        {!isHome && <span className="text-2xl font-extrabold text-indigo-600">
          Lodging Lookabout
        </span>}
      </Link>

      {!isHome && (
        <nav className="space-x-6">
          <Link
            to="/"
            className="text-indigo-600 hover:underline hover:text-indigo-800"
          >
            Home
          </Link>
          <Link
            to="/hotels"
            className="text-indigo-600 hover:underline hover:text-indigo-800"
          >
            All Hotels
          </Link>
        </nav>
      )}
    </header>
)
}
