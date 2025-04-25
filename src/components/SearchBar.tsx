import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSearchStore } from '../stores/useSearchStore'

export default function SearchBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const { searchParams, updateSearchParams } = useSearchStore()

  // date helpers
  const today = new Date()
  const toIso = (d: Date) => d.toISOString().split('T')[0]

  // Default: a 1-night stay starting two days out
  const d1 = new Date(today)
  d1.setDate(d1.getDate() + 2)
  const d2 = new Date(d1)
  d2.setDate(d2.getDate() + 1)

  // Local form state (from store or defaults)
  const [query, setQuery] = useState(searchParams.query)
  const [checkin, setCheckin] = useState(
    searchParams.checkin || toIso(d1)
  )
  const [checkout, setCheckout] = useState(
    searchParams.checkout || toIso(d2)
  )
  const [adults, setAdults] = useState(searchParams.adults)
  const [children, setChildren] = useState(searchParams.children)

  // min checkin and checkout
  const minCheckin = toIso(today)
  const minCheckout = (() => {
    const m = new Date(checkin)
    m.setDate(m.getDate() + 1)
    return toIso(m)
  })()

  // checkout ≥ checkin + 1
  useEffect(() => {
    if (checkout < minCheckout) {
      setCheckout(minCheckout)
    }
  }, [checkout, minCheckout])

  // Sync back to global store
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
      replace: pathname === '/search',
    })
  }

  const inputBaseStyle =
    'h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        bg-white p-6 rounded-xl shadow-lg
        ${isHome
          ? 'flex flex-col space-y-4 max-w-md mx-auto'
          : 'flex flex-col lg:flex-row lg:items-end gap-4 max-w-4xl mx-auto mb-10'
        }
      `}
    >
      <div className={isHome ? '' : 'flex-1'}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City or Hotel
        </label>
        <input
          type="text"
          placeholder="e.g. Denver or Bay"
          className={`${inputBaseStyle} w-full`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className={isHome ? '' : 'w-full md:w-36'}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Check-in
        </label>
        <input
          type="date"
          className={`${inputBaseStyle} w-full`}
          min={minCheckin}
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
        />
      </div>

      <div className={isHome ? '' : 'w-full md:w-36'}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Check-out
        </label>
        <input
          type="date"
          className={`${inputBaseStyle} w-full`}
          min={minCheckout}
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
        />
      </div>

      <div className={isHome ? '' : 'w-full sm:w-20'}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Adults
        </label>
        <input
          type="number"
          min={1}
          className={`${inputBaseStyle} w-full text-center`}
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
        />
      </div>

      <div className={isHome ? '' : 'w-full sm:w-20'}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Children
        </label>
        <input
          type="number"
          min={0}
          className={`${inputBaseStyle} w-full text-center`}
          value={children}
          onChange={(e) => setChildren(Number(e.target.value))}
        />
      </div>

      <div className={isHome ? '' : 'flex justify-end lg:w-auto w-full'}>
        <button
          type="submit"
          className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition w-full lg:w-auto"
        >
          Search
        </button>
      </div>
    </form>
  )
}
