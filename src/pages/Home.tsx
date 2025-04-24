import SearchBar from '../components/SearchBar'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-5xl font-extrabold text-indigo-600 mb-8 flex items-center">
        <img src={logo} alt="Logo" className="h-12 w-12 mr-3" />
        Lodging Lookabout
      </h1>

      <div className="w-full max-w-4xl mb-10">
        <SearchBar />
      </div>

      <Link
        to="/hotels"
        className="text-indigo-600 font-medium hover:underline mt-4"
      >
        View All Hotels →
      </Link>
    </main>
  )
}