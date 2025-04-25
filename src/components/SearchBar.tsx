import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSearchStore } from '../stores/useSearchStore'

export default function SearchBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const { searchParams, updateSearchParams } = useSearchStore()

  // local form state, from global store
  const [query, setQuery] = useState(searchParams.query)
  const [checkin, setCheckin] = useState(searchParams.checkin)
  const [checkout, setCheckout] = useState(searchParams.checkout)
  const [adults, setAdults] = useState(searchParams.adults)
  const [children, setChildren] = useState(searchParams.children)

  // sync back to store on search
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
    navigate(`/search?${params}`, { replace: pathname === '/search' })
  }

  const inputBase =
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
          placeholder="e.g. Seattle or Cedarbrook"
          className={`${inputBase} w-full`}
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
          className={`${inputBase} w-full`}
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
          className={`${inputBase} w-full`}
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
          className={`${inputBase} w-full text-center`}
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
          className={`${inputBase} w-full text-center`}
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
