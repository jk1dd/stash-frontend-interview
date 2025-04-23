// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom';
import HotelIndex from './pages/HotelIndex';
import HotelMicrosite from './pages/HotelMicrosite';
import NotFound from './pages/NotFound';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <div className="p-4">
      <nav className="mb-4 space-x-4">
        <Link to="/" className="text-blue-500 hover:underline">Home</Link>
        <Link to="/search?city=Denver&checkin=2025-05-01" className="text-blue-500 hover:underline">Sample Search</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HotelIndex />} />
        <Route path="/hotel/:hotelId" element={<HotelMicrosite />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}


export default App
