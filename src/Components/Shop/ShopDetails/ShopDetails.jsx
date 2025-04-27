import React, { useState, useEffect } from "react";
import "./ShopDetails.css";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";
import { useNavigate } from "react-router-dom";

import Filter from "../Filters/Filter";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FaCartPlus, FaShoppingBag } from "react-icons/fa";
import toast from "react-hot-toast";
import { productService } from "../../../Services/productService";

/**
 * ShopDetails Component
 * Displays detailed information about a product and handles cart operations
 * Features:
 * - Product image gallery
 * - Product information display
 * - Add to cart functionality
 * - Buy now functionality
 * - Wishlist toggle
 * - Quantity selection
 */
const ShopDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State management
  const [wishList, setWishList] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [filters, setFilters] = useState({
    category: [],
    priceRange: { min: 0, max: 10000 },
    rating: 0
  });

  // Fetch products with filters and sorting
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const skip = (currentPage - 1) * 6;
        const response = await productService.getProducts({
          limit: 6,
          skip: skip,
          sort: sortOption === 'default' ? undefined : sortOption
        });
        
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
        setTotalPages(Math.ceil(response.total / 6));
        setError(null);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, sortOption, filters]);

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    scrollToTop();
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset to first page when changing sort
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when changing filters
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

  const handleBuyNow = (product) => {
    dispatch(addToCart(product));
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="shopDetails">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shopDetails">
        <h2>Error loading products</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="shopDetails">
        <div className="shopDetailMain">
          <div className="shopDetails__left">
            <Filter onFilterChange={handleFilterChange} />
          </div>
          <div className="shopDetails__right">
            <div className="shopDetailsSorting">
              <div className="shopDetailsBreadcrumbLink">
                <Link to="/" onClick={scrollToTop}>
                  Home
                </Link>
                &nbsp;/&nbsp;
                <Link to="/shop">The Shop</Link>
              </div>
              <div className="filterLeft" onClick={toggleDrawer}>
                <IoFilterSharp />
                <p>Filter</p>
              </div>
              <div className="shopDetailsSort">
                <select 
                  name="sort" 
                  id="sort"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="default">Default Sorting</option>
                  <option value="featured">Featured</option>
                  <option value="bestSelling">Best Selling</option>
                  <option value="a-z">Alphabetically, A-Z</option>
                  <option value="z-a">Alphabetically, Z-A</option>
                  <option value="lowToHigh">Price, Low to high</option>
                  <option value="highToLow">Price, high to low</option>
                  <option value="oldToNew">Date, old to new</option>
                  <option value="newToOld">Date, new to old</option>
                </select>
                <div className="filterRight" onClick={toggleDrawer}>
                  <div className="filterSeprator"></div>
                  <IoFilterSharp />
                  <p>Filter</p>
                </div>
              </div>
            </div>
            <div className="shopDetailsProducts">
              <div className="shopDetailsProductsContainer">
                {products.map((product) => (
                  <div className="sdProductContainer" key={product.id}>
                    <div className="sdProductImages">
                      <Link to={`/product/${product.id}`} onClick={scrollToTop}>
                        <img
                          src={product.frontImg}
                          alt={product.productName}
                          className="sdProduct_front"
                        />
                        <img
                          src={product.backImg}
                          alt={product.productName}
                          className="sdProduct_back"
                        />
                      </Link>
                      <div className="sdProductActions">
                        <button 
                          className="addToCartBtn"
                          onClick={() => handleAddToCart(product)}
                        >
                          <FaCartPlus /> Add to Cart
                        </button>
                        <button 
                          className="buyNowBtn"
                          onClick={() => handleBuyNow(product)}
                        >
                          <FaShoppingBag /> Buy Now
                        </button>
                      </div>
                    </div>
                    <div className="sdProductInfo">
                      <div className="sdProductCategoryWishlist">
                        <p>{product.category || "Jewelry"}</p>
                        <FiHeart
                          onClick={() => handleWishlistClick(product.id)}
                          style={{
                            color: wishList[product.id] ? "red" : "#767676",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div className="sdProductNameInfo">
                        <Link to={`/product/${product.id}`} onClick={scrollToTop}>
                          <h5>{product.productName}</h5>
                        </Link>
                        <p>${product.productPrice}</p>
                        <div className="sdProductRatingReviews">
                          <div className="sdProductRatingStar">
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
            <div className="shopDetailsPagination">
              <div className="sdPaginationPrev">
                <p 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "disabled" : ""}
                >
                  <FaAngleLeft />
                  Prev
                </p>
              </div>
              <div className="sdPaginationNumber">
                <div className="paginationNum">
                  {[...Array(totalPages)].map((_, index) => (
                    <p
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={currentPage === index + 1 ? "active" : ""}
                    >
                      {index + 1}
                    </p>
                  ))}
                </div>
              </div>
              <div className="sdPaginationNext">
                <p 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "disabled" : ""}
                >
                  Next
                  <FaAngleRight />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Drawer */}
      <div className={`filterDrawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawerHeader">
          <p>Filter By</p>
          <IoClose onClick={closeDrawer} className="closeButton" size={26} />
        </div>
        <div className="drawerContent">
          <Filter onFilterChange={handleFilterChange} />
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
