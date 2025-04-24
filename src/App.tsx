import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HotelIndex from './pages/HotelIndex';
import HotelMicrosite from './pages/HotelMicrosite';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="p-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<HotelIndex />} />
        <Route path="/hotel/:hotelId" element={<HotelMicrosite />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;