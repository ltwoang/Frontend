import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Categories.css";
import { productService } from "../Services/productService";
import { FaRing, FaGem, FaCrown, FaHeart, FaUserTie } from "react-icons/fa";
import { MdWatch } from "react-icons/md";
import { GiNecklace, GiEarrings, GiJewelCrown } from "react-icons/gi";
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from "react-hot-toast";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await productService.getCategories();
        
        // Log the response for debugging
        console.log('Categories API Response:', response);
        
        // Ensure response is an array
        if (!Array.isArray(response)) {
          console.error('Invalid response format:', response);
          throw new Error('Invalid categories data format');
        }

        // Filter and transform categories to match jewelry categories
        const jewelryCategories = [
          {
            id: 'rings',
            name: 'Rings',
            slug: 'rings',
            description: 'Engagement & Wedding Rings',
            category: 'jewelry'
          },
          {
            id: 'necklaces',
            name: 'Necklaces',
            slug: 'necklaces',
            description: 'Pendants & Chains',
            category: 'jewelry'
          },
          {
            id: 'earrings',
            name: 'Earrings',
            slug: 'earrings',
            description: 'Studs & Drops',
            category: 'jewelry'
          },
          {
            id: 'bracelets',
            name: 'Bracelets',
            slug: 'bracelets',
            description: 'Bangles & Charms',
            category: 'jewelry'
          },
          {
            id: 'watches',
            name: 'Watches',
            slug: 'watches',
            description: 'Luxury Timepieces',
            category: 'watches'
          },
          {
            id: 'diamonds',
            name: 'Diamonds',
            slug: 'diamonds',
            description: 'Loose Diamonds',
            category: 'jewelry'
          }
        ];

        setCategories(jewelryCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
        const errorMessage = err.message || 'Failed to load categories';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryIcon = (category) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes("rings")) return <FaRing />;
    if (categoryLower.includes("necklaces")) return <GiNecklace />;
    if (categoryLower.includes("earrings")) return <GiEarrings />;
    if (categoryLower.includes("bracelets")) return <GiJewelCrown />;
    if (categoryLower.includes("watches")) return <MdWatch />;
    if (categoryLower.includes("diamonds")) return <FaGem />;
    return <FaGem />; // Default icon
  };

  const handleCategoryClick = (category) => {
    // Navigate to shop page with category filter
    navigate(`/shop?category=${category.slug}&type=${category.category}`);
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="categories-loading">
        <BiLoaderAlt className="loading-spinner" />
        <h2>Loading categories...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="categories-error">
        <h2>Error loading categories</h2>
        <p>{error}</p>
        <button onClick={handleRetry} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1>Jewelry Categories</h1>
        <p>Explore our collection of fine jewelry</p>
      </div>
      
      <div className="categories-grid">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="category-icon">
              {getCategoryIcon(category.name)}
            </div>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories; 