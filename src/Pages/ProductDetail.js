import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Features/Cart/cartSlice';
import { productService } from '../Services/productService';
import './ProductDetail.css';
import { FaCartPlus, FaShoppingBag } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        if (!data) {
          throw new Error('Product not found');
        }
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.stock || 0)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const productInCart = cartItems.find(
      (item) => item.productID === product.id
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
      dispatch(addToCart({
        productID: product.id,
        productName: product.title,
        productPrice: product.price,
        frontImg: product.thumbnail,
        quantity: quantity
      }));
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

  const handleBuyNow = () => {
    if (!product) return;
    
    dispatch(addToCart({
      productID: product.id,
      productName: product.title,
      productPrice: product.price,
      frontImg: product.thumbnail,
      quantity: quantity
    }));
    navigate('/cart');
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error-message">{error}</div>
    </div>
  );

  if (!product) return null;

  // Ensure we have valid data before rendering
  const {
    title = '',
    description = '',
    price = 0,
    discountPercentage = 0,
    rating = 0,
    stock = 0,
    brand = '',
    category = '',
    images = [],
    reviews = []
  } = product;

  // Format date for reviews
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back to Shop
        </button>

        <div className="product-detail-grid">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img 
                src={images[selectedImage] || images[0]} 
                alt={title} 
                className="product-image"
              />
            </div>
            <div className="thumbnail-images">
              {images.map((image, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${title} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-detail">
            <h1 className="product-title">{title}</h1>
            
            <div className="product-rating-container">
              <div className="product-rating">
                <span className="rating-star">★</span>
                <span className="rating-value">{rating}</span>
              </div>
              <span className="reviews-count">({reviews.length || 0} reviews)</span>
            </div>

            <div className="product-price-container">
              <div className="price-row">
                <span className="product-price">${price}</span>
                {discountPercentage > 0 && (
                  <>
                    <span className="product-original-price">
                      ${(price * (1 + discountPercentage/100)).toFixed(2)}
                    </span>
                    <span className="discount-badge">
                      -{discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="product-description">
              <h2>Description</h2>
              <p>{description}</p>
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Brand:</span>
                <span className="meta-value">{brand}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Stock:</span>
                <span className={`meta-value ${stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max={stock}
                />
                <button 
                  onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                  disabled={quantity >= stock}
                >
                  +
                </button>
              </div>
              <div className="action-buttons">
                <button 
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={stock === 0}
                >
                  <FaCartPlus /> Add to Cart
                </button>
                <button 
                  className="buy-now-btn"
                  onClick={handleBuyNow}
                  disabled={stock === 0}
                >
                  <FaShoppingBag /> Buy Now
                </button>
              </div>
            </div>

            {/* Reviews Section */}
            {reviews && reviews.length > 0 && (
              <div className="product-reviews">
                <h2>Customer Reviews</h2>
                <div className="reviews-list">
                  {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <span className="reviewer-name">{review.reviewerName || 'Anonymous'}</span>
                          <span className="review-date">{formatDate(review.date)}</span>
                        </div>
                        <div className="review-rating">
                          <span className="rating-star">★</span>
                          <span className="rating-value">{review.rating}</span>
                        </div>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 