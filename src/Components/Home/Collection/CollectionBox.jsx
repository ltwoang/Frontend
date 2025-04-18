import React from "react";
import "./CollectionBox.css";
import { Link } from "react-router-dom";
import womenJewelry from "../../../Assets/images/women-jewelry.jpg";
import menJewelry from "../../../Assets/images/men-jewelry.jpg";

const CollectionBox = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="collectionBox">
      <div className="collectionBox1">
        <div className="collectionBox1Img">
          <img src={womenJewelry} alt="Women's Jewelry Collection" />
        </div>
        <div className="collectionBox1Content">
          <h3>Women's Collection</h3>
          <p>Discover our elegant collection of necklaces, bracelets, and earrings</p>
          <Link to="/shop" onClick={scrollToTop}>
            <h5>Shop Now</h5>
          </Link>
        </div>
      </div>
      <div className="collectionBox2">
        <div className="collectionBox2Img">
          <img src={menJewelry} alt="Men's Jewelry Collection" />
        </div>
        <div className="collectionBox2Content">
          <h3>Men's Collection</h3>
          <p>Explore our sophisticated selection of rings, cufflinks, and chains</p>
          <Link to="/shop" onClick={scrollToTop}>
            <h5>Shop Now</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollectionBox;
