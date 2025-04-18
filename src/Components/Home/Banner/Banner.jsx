import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner">
      <div className="bannerMain">
        <div className="bannerLeft">
          <div className="bannerLeftContent">
            <h1>Exquisite Jewelry Collection</h1>
            <p>
              Discover our handcrafted pieces, where timeless elegance meets modern design. Each piece tells a unique story of craftsmanship and luxury.
            </p>
            <Link to="/shop">
              <button>Explore Collection</button>
            </Link>
          </div>
        </div>
        <div className="bannerRight">
          <div className="bannerRightContent">
            <div className="bannerRightTop">
              <div className="bannerRightTopContent">
                <h2>New Arrivals</h2>
                <p>Latest designs in gold and diamonds</p>
                <Link to="/shop">
                  <button>Shop Now</button>
                </Link>
              </div>
            </div>
            <div className="bannerRightBottom">
              <div className="bannerRightBottomContent">
                <h2>Wedding Collection</h2>
                <p>Perfect rings for your special day</p>
                <Link to="/shop">
                  <button>Shop Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
