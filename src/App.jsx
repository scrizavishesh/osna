import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Home from './Pages/Home';
import Product from './Pages/Product';
import ProductDetail from './Pages/ProductDetail';
import Sub_ProductDetails from './Pages/Sub_ProductDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products_Detail" element={<ProductDetail />} />
        <Route path="/sub_products" element={<Sub_ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

