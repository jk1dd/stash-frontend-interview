import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { parseISO, differenceInCalendarDays } from 'date-fns'
import SearchBar from '../components/SearchBar'
import { useSearchStore } from '../stores/useSearchStore'
import { useHotelStore } from '../stores/useHotelStore'
import { fetchWeather } from '../utils/fetchWeather'

type WeatherData = { temp_F: string; feelslike_F: string }

export default function SearchResults() {
  const { hotels, fetchHotels } = useHotelStore()
  const { searchParams } = useSearchStore()
  const { query, checkin, checkout } = searchParams

  useEffect(() => {
    if (!hotels.length) fetchHotels()
  }, [hotels.length, fetchHotels])

  const searchTerm = query.trim().toLowerCase()
  const filteredHotels = useMemo(
    () =>
      hotels.filter(
        (hotel) =>
          hotel.city.toLowerCase().includes(searchTerm) ||
          hotel.name.toLowerCase().includes(searchTerm)
      ),
    [hotels, searchTerm]
  )

  // Calculate the number of nights based on checkin and checkout dates
  let nights = 0

  if (checkin && checkout) {
    const checkinDate  = parseISO(checkin)
    const checkoutDate = parseISO(checkout)
  
    // ensure nights is not negative
    const daysDifference = differenceInCalendarDays(checkoutDate, checkinDate)
    nights = daysDifference > 0 ? daysDifference : 0
  }

  // weatherMap = per-city weather cache
  const [weatherMap, setWeatherMap] = useState<Record<string, WeatherData>>({})

  return (
    <div className="px-6 py-8">
      <SearchBar />

      <h1 className="text-3xl font-bold mt-8 mb-4">
        {query ? `Search Results for “${query}”` : 'All Hotels'}
      </h1>

      {filteredHotels.length === 0 ? (
        <p className="text-gray-600">
          No hotels found. Try broadening your search.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => {
            const total = (hotel.daily_rate * nights).toFixed(2)
            const weather = weatherMap[hotel.city]

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
                      onLoad={() => {
                        // only fetch weather once per city, after the image loads
                        if (!weatherMap[hotel.city]) {
                          fetchWeather(hotel.city)
                            .then((data) =>
                              setWeatherMap((prev) => ({
                                ...prev,
                                [hotel.city]: data,
                              }))
                            )
                            .catch((err) =>
                              console.error(
                                `Weather fetch failed for ${hotel.city}:`,
                                err
                              )
                            )
                        }
                      }}
                    />

                    {hotel.has_member_rate && (
                      <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        Member Rate
                      </span>
                    )}

                    {weather && (
                      <span className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs font-semibold px-2 py-1 rounded text-right leading-tight">
                        Currently {weather.temp_F}°F
                        <br />
                        feels like {weather.feelslike_F}°F
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-1">
                      {hotel.name}
                    </h2>
                    <p className="text-gray-500 mb-2">{hotel.city}</p>
                    <p className="text-indigo-600 font-bold">
                      ${hotel.daily_rate.toFixed(2)}{' '}
                      <span className="font-normal">/ night</span>
                    </p>
                    {nights > 0 && (
                      <p className="mt-2 text-sm text-gray-600">
                        {nights} night{nights > 1 ? 's' : ''} — Total:{' '}
                        <span className="font-semibold">${total}</span>
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
