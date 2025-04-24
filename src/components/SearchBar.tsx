import React from 'react'
import { useSearchStore } from '../stores/useSearchStore'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const navigate = useNavigate()
  const { searchParams, updateSearchParams } = useSearchStore()
  const { query, checkin, checkout, adults, children } = searchParams

  const handleChange = (key: keyof typeof searchParams) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value
    updateSearchParams({ [key]: value } as any)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      query,
      checkin,
      checkout,
      adults: adults.toString(),
      children: children.toString(),
    })
    navigate(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md grid grid-cols-1 gap-4 sm:grid-cols-4 lg:grid-cols-6 items-end">
      <div>
        <label className="block text-sm font-medium text-gray-700">City or Hotel</label>
        <input
          type="text"
          value={query}
          onChange={handleChange('query')}
          placeholder="e.g. Seattle or Cedarbrook"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Check-in</label>
        <input
          type="date"
          value={checkin}
          onChange={handleChange('checkin')}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Check-out</label>
        <input
          type="date"
          value={checkout}
          onChange={handleChange('checkout')}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Adults</label>
        <input
          type="number"
          min={1}
          value={adults}
          onChange={handleChange('adults')}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Children</label>
        <input
          type="number"
          min={0}
          value={children}
          onChange={handleChange('children')}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="sm:col-span-4 lg:col-span-1 text-right">
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </div>
    </form>
  )
}