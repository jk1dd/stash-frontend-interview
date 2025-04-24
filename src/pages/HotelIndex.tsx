import SearchBar from "../components/SearchBar"
import { useEffect } from "react"
import { useHotelStore } from "../stores/useHotelStore"
import { Link } from "react-router-dom"


const HotelIndex = () => {
  const { hotels, fetchHotels } = useHotelStore()

  useEffect(() => {
    fetchHotels()
  }, [fetchHotels])

  return (
    <div className="p-4">
      <SearchBar />
      <h1 className="text-2xl font-semibold mb-4">Hotel List</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <li key={hotel.id} className="border rounded-lg overflow-hidden shadow">
            <Link to={`/hotel/${hotel.id}`}>
              <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-1">{hotel.name}</h2>
                <p className="text-gray-600 mb-1">{hotel.city}</p>
                {hotel.has_member_rate ? (
                  <p className="text-green-600 font-semibold">${hotel.daily_rate.toFixed(2)} - member rate applied!</p>
                ) : (
                  <p className="text-indigo-600 font-semibold">${hotel.daily_rate.toFixed(2)}</p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HotelIndex;