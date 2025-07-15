import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './components/screens/HomeScreen';
import SignUpScreen from './components/screens/SignUpScreen';
import LoginScreen from './components/screens/LoginScreen';
import CartScreen from './components/screens/CartScreen';
import ProductScreen from './components/screens/ProductScreen';
import { CartProvider } from './components/CartContext';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Blog from './components/Blog';
import './App.css'; // Import the CSS file

export default function App() {
  return (
    <Router>
      <CartProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <Container>
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/signup" element={<SignUpScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/blog/*" element={<Blog />} />
                <Route path="/contact" element={<ContactUs />} />
              </Routes>
            </Container>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}
