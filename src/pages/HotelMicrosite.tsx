import { useParams } from 'react-router-dom'

export default function HotelMicrosite() {
  const { hotelId } = useParams()
  return (
      <div>
        <h1 className="text-2xl">Hotel Details for: {hotelId}</h1>
        <p>The Search Bar will be here: City or Hotel name | check in date | check out date | travelers (including adults and children). Data should persist when navigating to a different page</p>
        <p>A hotel "microsite" page that displays information specific to an individual hotel. You can use our current microsite page for inspiration. This page can be lightly scaffolded, as it is not the main focus of the project. You should not spend significant time here.</p>
      </div>
    )
    
}