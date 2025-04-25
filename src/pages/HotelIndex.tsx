import { useEffect } from "react"
import { Link } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import { useHotelStore } from "../stores/useHotelStore"

const HotelIndex = () => {
  const { hotels, fetchHotels } = useHotelStore()

  useEffect(() => {
    fetchHotels()
  }, [fetchHotels])

  return (
    <div className="px-6 py-8 space-y-8">
      <SearchBar />

      <h1 className="text-3xl font-bold">Hotel List</h1>

      <ul className="space-y-6">
        {hotels.map((hotel) => (
          <li
            key={hotel.id}
            className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <Link to={`/hotel/${hotel.id}`} className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-center space-y-2">
                <h2 className="text-xl font-semibold">{hotel.name}</h2>
                <p className="text-gray-600">{hotel.city}</p>

                {hotel.has_member_rate ? (
                  <p className="text-green-600 font-semibold">
                    ${hotel.daily_rate.toFixed(2)} – member rate applied!
                  </p>
                ) : (
                  <p className="text-indigo-600 font-semibold">
                    ${hotel.daily_rate.toFixed(2)}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HotelIndex
