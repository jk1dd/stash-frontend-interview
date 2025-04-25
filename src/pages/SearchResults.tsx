import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { parseISO, differenceInCalendarDays } from 'date-fns'
import SearchBar from '../components/SearchBar'
import { useSearchStore } from '../stores/useSearchStore'
import { useHotelStore } from '../stores/useHotelStore'

export default function SearchResults() {
  const { hotels, fetchHotels } = useHotelStore()
  const { searchParams } = useSearchStore()
  const { query, checkin, checkout } = searchParams

  // Fetch on mount if needed
  useEffect(() => {
    if (!hotels.length) {
      fetchHotels()
    }
  }, [hotels.length, fetchHotels])

  const term = query.trim().toLowerCase()

  // city OR name
  const filteredProperties = hotels.filter((h) =>
    h.city.toLowerCase().includes(term) ||
    h.name.toLowerCase().includes(term)
  )

  // Compute nights
  const nights =
    checkin && checkout
      ? Math.max(
          0,
          differenceInCalendarDays(parseISO(checkout), parseISO(checkin))
        )
      : 0

  return (
    <div className="px-6 py-8">
      <SearchBar />

      <h1 className="text-3xl font-bold mt-8 mb-4">
        {query
          ? `Search Results for “${query}”`
          : 'All Hotels'}
      </h1>

      {filteredProperties.length === 0 ? (
        <p className="text-gray-600">
          No hotels found. Try broadening your search.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((hotel) => {
            const total = (hotel.daily_rate * nights).toFixed(2)
            return (
              <li key={hotel.id}>
                <Link
                  to={`/hotel/${hotel.id}`}
                  className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition"
                >
                  <div className="relative h-48">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    {hotel.has_member_rate && (
                      <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        Member Rate
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-1">
                      {hotel.name}
                    </h2>
                    <p className="text-gray-500 mb-2">{hotel.city}</p>
                    <p className="text-indigo-600 font-bold">
                      ${hotel.daily_rate.toFixed(2)} <span className="font-normal">/ night</span>
                    </p>

                    {nights > 0 && (
                      <p className="mt-2 text-sm text-gray-600">
                        {nights} night{nights > 1 ? 's' : ''} — Total: <span className="font-semibold">${total}</span>
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
