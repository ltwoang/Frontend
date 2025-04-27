import React, { useState, useEffect } from 'react';
import { productService } from '../Services/productService';
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const skip = (currentPage - 1) * productsPerPage;
        const data = await productService.getAllProducts(productsPerPage, skip);
        setProducts(data.products);
        setTotalProducts(data.total);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
    <div className="shop-container">
      <div className="shop-content">
        <h1 className="shop-title">Our Products</h1>
        
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image-container">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                  />
                  {product.discountPercentage > 0 && (
                    <div className="discount-badge">
                      -{product.discountPercentage}%
                    </div>
                  )}
                </div>
                <div className="product-details">
                  <h2 className="product-title">{product.title}</h2>
                  <div className="product-info">
                    <div className="product-price-container">
                      <span className="product-price">${product.price}</span>
                      {product.discountPercentage > 0 && (
                        <span className="product-original-price">
                          ${(product.price * (1 + product.discountPercentage/100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="product-rating">
                      <span className="rating-star">★</span>
                      <span className="rating-value">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop; 