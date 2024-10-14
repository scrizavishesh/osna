import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Home from './Pages/Home';
import Product from './Pages/Product';
import ProductDetail from './Pages/ProductDetail';
import Sub_ProductDetails from './Pages/Sub_ProductDetails';
import EventsPage from './Pages/Events';
import { Search } from '@mui/icons-material';
import SearchResult from './Pages/SearchResult';
import TawkTo from './Layouts/ChatBot';
import AccessoriesDetail from './Pages/AccessoriesDetail';
import SignUp from './Pages/Signup';
import Career from './Pages/Career';
import SignIn from './Pages/Login';
import SubmitOTP from './Pages/SubmitOTP';

function App() {
  return (
    <Router>
      <TawkTo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<SubmitOTP />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products_Detail/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<Sub_ProductDetails />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/search_result" element={<SearchResult />} />
        <Route path="/accessories-detail/:id" element={<AccessoriesDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

