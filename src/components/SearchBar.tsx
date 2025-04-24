import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSearchStore } from '../stores/useSearchStore'

export default function SearchBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { searchParams, updateSearchParams } = useSearchStore()

  // local state kept in sync with global
  const [query, setQuery] = useState(searchParams.query)
  const [checkin, setCheckin] = useState(searchParams.checkin)
  const [checkout, setCheckout] = useState(searchParams.checkout)
  const [adults, setAdults] = useState(searchParams.adults)
  const [children, setChildren] = useState(searchParams.children)

  useEffect(() => {
    updateSearchParams({ query, checkin, checkout, adults, children })
  }, [query, checkin, checkout, adults, children, updateSearchParams])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams({
      query,
      checkin,
      checkout,
      adults: adults.toString(),
      children: children.toString(),
    })
    navigate(`/search?${params}`, {
      replace: location.pathname === '/search',
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end bg-white p-6 rounded-xl shadow-lg gap-4 max-w-4xl mx-auto"
    >
      <div className="flex flex-col flex-1 min-w-[200px]">
        <label className="text-sm font-medium text-gray-700 mb-1">
          City or Hotel
        </label>
        <input
          type="text"
          placeholder="e.g. Seattle or Cedarbrook"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Check-in
        </label>
        <input
          type="date"
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
          className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Check-out
        </label>
        <input
          type="date"
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
          className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Adults</label>
        <input
          type="number"
          min={1}
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Children</label>
        <input
          type="number"
          min={0}
          value={children}
          onChange={(e) => setChildren(Number(e.target.value))}
          className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-1 justify-center md:justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
        >
          Search
        </button>
      </div>
    </form>
  )
}
