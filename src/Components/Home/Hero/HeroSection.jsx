import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";
import heroImage from "../../../Assets/Products/product_1.jpg";

const HeroSection = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="heroMain">
      <div className="sectionleft">
        <h1>Luxury Jewelry Collection</h1>
        <p>Discover our exquisite pieces crafted with passion and precision</p>
        <Link to="/shop" onClick={scrollToTop} className="shopButton">
          Shop Now
        </Link>
      </div>
      <div className="sectionright">
        <img src={heroImage} alt="Luxury Jewelry Collection" className="heroImage" />
      </div>
    </div>
  );
};

export default HeroSection;
