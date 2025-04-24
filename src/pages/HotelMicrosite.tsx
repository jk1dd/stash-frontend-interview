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
    <div className="p-4 max-w-3xl mx-auto">
      <SearchBar />
      <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>
      <img src={hotel.image} alt={hotel.name} className="w-full h-64 object-cover mb-4 rounded" />
      <p className="text-gray-700 mb-2"><strong>City:</strong> {hotel.city}</p>
      <p className="text-gray-700 mb-2"><strong>Rate:</strong> ${hotel.daily_rate.toFixed(2)}</p>
      {hotel.has_member_rate && <p className="text-green-600 font-semibold">Member rate applied!</p>}
    </div>
  );

}

export default HotelMicrosite;