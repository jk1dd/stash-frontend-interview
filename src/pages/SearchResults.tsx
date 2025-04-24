import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const city = searchParams.get('city')
  const checkin = searchParams.get('checkin')

  return (
    <div>
      <h1 className="text-2xl font-semibold">Search Results</h1>
      <SearchBar />
      <p>City: {city}</p>
      <p>Check-in Date: {checkin}</p>
      <p>The Search Bar will be here: City or Hotel name | check in date | check out date | travelers (including adults and children). Data should persist when navigating to a different page</p>
      <p>
        A destination search results page for a searched city. This page should show all hotels for a given city with relevant data. You can use our current destination search results page for inspiration. 
      </p>
      <p className='mt-4 text-3xl'>This page will be the focus of the project</p>
    </div>
  )
}
