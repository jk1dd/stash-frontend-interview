import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6 text-gray-600">Sorry, we couldn't find what you were after.</p>
      <Link to="/" className="text-blue-600 underline hover:text-blue-800">Return to Home</Link>
    </div>
  )
}