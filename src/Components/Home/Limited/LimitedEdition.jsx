import React, { useState, useEffect } from "react";
import "./LimitedEdition.css";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";

import { Link } from "react-router-dom";

import { FiHeart } from "react-icons/fi";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import toast from "react-hot-toast";
import { productService } from "../../../Services/productService";

const LimitedEdition = () => {
  const dispatch = useDispatch();

  const [wishList, setWishList] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExclusiveProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getProducts({ limit: 5, skip: 0 });
        
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
        toast.error("Failed to load exclusive products");
      } finally {
        setLoading(false);
      }
    };

    fetchExclusiveProducts();
  }, []);

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
      <div className="limitedProductSection">
        <h2>Loading exclusive products...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="limitedProductSection">
        <h2>Error loading exclusive products</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="limitedProductSection">
        <h2>
          Exclusive <span>Collection</span>
        </h2>
        <div className="limitedProductSlider">
          <div className="swiper-button image-swiper-button-next">
            <IoIosArrowForward />
          </div>
          <div className="swiper-button image-swiper-button-prev">
            <IoIosArrowBack />
          </div>
          <Swiper
            slidesPerView={4}
            slidesPerGroup={4}
            spaceBetween={30}
            loop={true}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              320: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 30,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.productID}>
                <div className="lpContainer">
                  <div className="lpImageContainer">
                    <Link to={`/product/${product.id}`} onClick={scrollToTop}>
                      <img
                        src={product.frontImg}
                        alt={product.productName}
                        className="lpImage"
                      />
                    </Link>
                    <h4 onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </h4>
                  </div>
                  <div
                    className="lpProductImagesCart"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaCartPlus />
                  </div>
                  <div className="limitedProductInfo">
                    <div className="lpCategoryWishlist">
                      <p>{product.category}</p>
                      <FiHeart
                        onClick={() => handleWishlistClick(product.productID)}
                        style={{
                          color: wishList[product.productID]
                            ? "red"
                            : "#767676",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div className="productNameInfo">
                      <Link to={`/product/${product.id}`} onClick={scrollToTop}>
                        <h5>{product.productName}</h5>
                      </Link>
                      <p>${product.productPrice}</p>
                      <div className="productRatingReviews">
                        <div className="productRatingStar">
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default LimitedEdition;
