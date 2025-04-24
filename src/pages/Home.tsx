import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

export default function Home() {
  return (
    <div className="p-4 max-w-xl mx-auto text-center">
      <SearchBar />
      <div className="mt-6">
        <Link
          to="/hotels"
          className="inline-block text-indigo-600 hover:underline font-medium"
        >
          View All Hotels
        </Link>
      </div>
    </div>
  )
}