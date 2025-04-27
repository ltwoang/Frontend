// Import React and routing components
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import styles
import "./App.css";

// Import pages
import Home from "../src/Pages/Home";
import About from "../src/Pages/About";
import Shop from "../src/Pages/Shop";
import Contact from "../src/Pages/Contact";
import Blog from "../src/Pages/Blog";
import ProductDetail from "./Pages/ProductDetail";
import NotFound from "./Pages/NotFound";
import Authentication from "./Pages/Authentication";
import TermsConditions from "./Pages/TermsConditions";
import Categories from "./Pages/Categories";

// Import components
import Header from "../src/Components/Header/Navbar";
import Footer from "../src/Components/Footer/Footer";
import ScrollToTop from "./Components/ScrollButton/ScrollToTop";
import ResetPass from "./Components/Authentication/Reset/ResetPass";
import BlogDetails from "./Components/Blog/BlogDetails/BlogDetails";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import Popup from "./Components/PopupBanner/Popup";

// Import third-party components
import { Toaster } from "react-hot-toast";

/**
 * Main App component that sets up routing and layout
 * Contains all the routes for the application
 */
const App = () => {
  return (
    <>
      {/* Global components */}
      <Popup />
      <ScrollToTop />
      
      {/* Router setup */}
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/categories" element={<Categories />} />
          
          {/* Product and authentication routes */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/loginSignUp" element={<Authentication />} />
          <Route path="/resetPassword" element={<ResetPass />} />
          
          {/* Additional routes */}
          <Route path="/BlogDetails" element={<BlogDetails />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/cart" element={<ShoppingCart />} />
          
          {/* Catch-all route for 404 pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
