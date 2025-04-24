import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {

  const navigate = useNavigate();

  const [city, setCity] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [adults, setAdultCount] = useState('');
  const [children, setChildrenCount] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams({
      city,
      checkin,
      checkout,
      adults: adults.toString(),
      children: children.toString(),
    })

    navigate(`/search?${params.toString()}`);
  }

  return (
    <form className="grid grid-cols-2 gap-4 md:grid-cols-6 p-4 bg-white rounded-lg shadow" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city or hotel"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-2 rounded col-span-2 md:col-span-2"
      />
      <input
        type="date"
        value={checkin}
        onChange={(e) => setCheckin(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="date"
        value={checkout}
        onChange={(e) => setCheckout(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Number of adults"
        value={adults}
        onChange={(e) => setAdultCount(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Number of children"
        value={children}
        onChange={(e) => setChildrenCount(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded col-span-2 md:col-span-1"
      >
        Search
      </button>
    </form>
  );
}