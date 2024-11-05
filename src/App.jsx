// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Home from './Pages/Home';
import Product from './Pages/Product';
import ProductDetail from './Pages/ProductDetail';
import Sub_ProductDetails from './Pages/Sub_ProductDetails';
import EventsPage from './Pages/Events';
import SearchResult from './Pages/SearchResult';
import TawkTo from './Layouts/ChatBot';
import AccessoriesDetail from './Pages/AccessoriesDetail';
import SignUp from './Pages/Signup';
import Career from './Pages/Career';
import SignIn from './Pages/Login';
import SubmitOTP from './Pages/SubmitOTP';
import Header from './Layouts/Header'; // Import Header
import Footer from './Layouts/Footer'; // Import Footer
import { Box, Grid } from '@mui/system';
import Navbar from './Layouts/Navbar';
import ErrorPage from './Pages/ErrorPage';
import EventsPopup from './Layouts/EventsPopup';

function App() {
  return (
    <Router>
      <EventsPopup />
      <TawkTo />
      <Box sx={{ position: 'fixed', top: 0, width: '100%', zIndex: 10 }}>
        <Grid sx={{ bgcolor: '#0462B6' }}>
          <Header />
        </Grid>
        <Navbar />
      </Box>
      {/* Render Header */}
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
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer /> {/* Render Footer */}
    </Router>
  );
}

export default App;
