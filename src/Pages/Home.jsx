// Import React
import React from "react";

// Import components for the home page
import HeroSection from "../Components/Home/Hero/HeroSection";
import Services from "../Components/Home/Services/Services";
import Trendy from "../Components/Home/Trendy/Trendy";
import LimitedEdition from "../Components/Home/Limited/LimitedEdition";

/**
 * Home page component
 * Renders the main sections of the home page in order:
 * 1. Hero section - Main banner/header
 * 2. Trendy section - Featured products
 * 3. Limited Edition section - Special products
 * 4. Services section - Company services
 */
const Home = () => {
  return (
    <>
      <HeroSection />
      <Trendy />
      <LimitedEdition />
      <Services />
    </>
  );
};

export default Home;
