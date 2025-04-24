import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { useSearchStore } from '../stores/useSearchStore';
import { useHotelStore } from '../stores/useHotelStore';
import { useEffect } from 'react';

export default function SearchResults() {
  // const [searchParams] = useSearchParams()
  // const city = searchParams.get('city')
  // const checkin = searchParams.get('checkin')

  const { hotels, fetchHotels } = useHotelStore();
  const { searchParams } = useSearchStore();

  useEffect(() => {
    if (!hotels.length) {
      fetchHotels();
    }
  }, [fetchHotels, hotels.length]);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.city.toLowerCase().includes(searchParams.city.toLowerCase())
  );


  return (
    <div className="p-4">
      <SearchBar />
      <h1 className="text-2xl font-semibold mb-4">Search Results for “{searchParams.city}”</h1>
      {filteredHotels.length === 0 ? (
        <p>No hotels found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <li key={hotel.id} className="border rounded-lg overflow-hidden shadow">
              <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-1">{hotel.name}</h2>
                <p className="text-gray-600 mb-1">{hotel.city}</p>
                <p className="text-indigo-600 font-semibold">${hotel.daily_rate.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
