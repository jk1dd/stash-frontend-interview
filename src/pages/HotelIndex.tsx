import SearchBar from "../components/SearchBar"
import { useEffect } from "react"
import { useHotelStore } from "../stores/useHotelStore"


const HotelIndex = () => {
  const { hotels, fetchHotels } = useHotelStore()

  useEffect(() => {
    fetchHotels()
  }, [fetchHotels])

  return (
    <div>
      <h1 className="text-2xl">Welcome to Lodging Lookabout.</h1>
      <SearchBar />
      <ul className="mt-4">
        {hotels.map((hotel) => (
          <li key={hotel.id} className="border p-4 mb-2">
            <img src={hotel.image} alt={hotel.name} width="150" />
            <p>{hotel.name}</p>
            <p>{hotel.city}</p>
            <p>${hotel.daily_rate}</p>
          </li>
        ))}
      </ul>  
    </div>
  )
}

export default HotelIndex;