import { useParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { useHotelStore } from '../stores/useHotelStore';
import { useEffect } from 'react';


const HotelMicrosite = () => {
  const { hotelId } = useParams();
  const { hotels, fetchHotels } = useHotelStore();

  useEffect(() => {
    if (!hotels.length) {
      fetchHotels();
    }
  }, [fetchHotels, hotels.length]);

  const hotel = hotels.find((hotel) => hotel.id.toString() === hotelId);

  if (!hotel) { return <div>Loading...</div>; }

  return (
    <div>
      <SearchBar />
      <h1 className="text-2xl font-semibold">{hotel.name}</h1>
      <img src={hotel.image} alt={hotel.name} className="w-full h-auto mb-4" />
      <p className="text-lg">Location: {hotel.city}</p>
      <p className="text-lg">Daily Rate: ${hotel.daily_rate}</p>
      <p className="text-lg">Has Member Rate: {hotel.has_member_rate.toString()}</p>
      </div>
  )

}

export default HotelMicrosite;