import React, { useState, useEffect } from "react";
import "./Trendy.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar, FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { productService } from "../../../Services/productService";

const Trendy = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("tab1");
  const [wishList, setWishList] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products based on active tab
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let response;
        switch (activeTab) {
          case "tab1": // All products
            response = await productService.getProducts({ limit: 8, skip: 0 });
            break;
          case "tab2": // New arrivals
            response = await productService.getNewArrivals();
            break;
          case "tab3": // Best sellers
            response = await productService.getBestSellers();
            break;
          case "tab4": // Top rated
            response = await productService.getTopRated();
            break;
          default:
            response = await productService.getProducts({ limit: 8, skip: 0 });
        }
        
        // Transform the API response to match our product structure
        const transformedProducts = response.products.map(product => ({
          id: product.id,
          productID: product.id,
          productName: product.title,
          productPrice: product.price,
          frontImg: product.thumbnail,
          backImg: product.images[0],
          category: product.category,
          rating: Math.floor(product.rating),
          reviews: `${product.stock} reviews`,
          stock: product.stock
        }));
        
        setProducts(transformedProducts);
        setError(null);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => {
    const productInCart = cartItems.find(
      (item) => item.productID === product.productID
    );

    if (productInCart && productInCart.quantity >= 20) {
      toast.error("Product limit reached", {
        duration: 2000,
        style: {
          backgroundColor: "#ff4b4b",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ff4b4b",
        },
      });
    } else {
      dispatch(addToCart(product));
      toast.success(`Added to cart!`, {
        duration: 2000,
        style: {
          backgroundColor: "#07bc0c",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#07bc0c",
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="trendyProducts">
        <h2>Loading products...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="trendyProducts">
        <h2>Error loading products</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="trendyProducts">
        <h2>
          Our Trendy <span>Products</span>
        </h2>
        <div className="trendyTabs">
          <div className="tabs">
            <p
              onClick={() => handleTabClick("tab1")}
              className={activeTab === "tab1" ? "active" : ""}
            >
              All
            </p>
            <p
              onClick={() => handleTabClick("tab2")}
              className={activeTab === "tab2" ? "active" : ""}
            >
              New Arrivals
            </p>
            <p
              onClick={() => handleTabClick("tab3")}
              className={activeTab === "tab3" ? "active" : ""}
            >
              Best Seller
            </p>
            <p
              onClick={() => handleTabClick("tab4")}
              className={activeTab === "tab4" ? "active" : ""}
            >
              Top Rated
            </p>
          </div>
          <div className="trendyTabContent">
            <div className="trendyMainContainer">
              {products.map((product) => (
                <div className="trendyProductContainer" key={product.id}>
                  <div className="trendyProductImages">
                    <Link to={`/product/${product.id}`} onClick={scrollToTop}>
                      <img
                        src={product.frontImg}
                        alt={product.productName}
                        className="trendyProduct_front"
                      />
                      <img
                        src={product.backImg}
                        alt={product.productName}
                        className="trendyProduct_back"
                      />
                    </Link>
                    <h4 onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </h4>
                  </div>
                  <div
                    className="trendyProductImagesCart"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaCartPlus />
                  </div>
                  <div className="trendyProductInfo">
                    <div className="trendyProductCategoryWishlist">
                      <p>{product.category || "Jewelry"}</p>
                      <FiHeart
                        onClick={() => handleWishlistClick(product.id)}
                        style={{
                          color: wishList[product.id] ? "red" : "#767676",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div className="trendyProductNameInfo">
                      <Link to={`/product/${product.id}`} onClick={scrollToTop}>
                        <h5>{product.productName}</h5>
                      </Link>
                      <p>${product.productPrice}</p>
                      <div className="trendyProductRatingReviews">
                        <div className="trendyProductRatingStar">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              color={i < product.rating ? "#FEC78A" : "#ddd"}
                              size={10}
                            />
                          ))}
                        </div>
                        <span>{product.reviews}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="discoverMore">
          <Link to="/shop" onClick={scrollToTop}>
            <p>Discover More</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Trendy;
