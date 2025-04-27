import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { productService } from "../../Services/productService";
import { toast } from "react-hot-toast";
import ProductCard from "../../Components/Shop/ProductCard";
import Filter from "../../Components/Shop/Filters/Filter";
import Pagination from "../../Components/Shop/Pagination";
import { BiSearch } from "react-icons/bi";
import "./Shop.css";

/**
 * Component chính hiển thị trang Shop
 * Features:
 * - Product listing with pagination
 * - Search functionality
 * - Category filtering
 * - Product sorting
 * - Responsive grid layout
 */
const Shop = () => {
  // Khai báo các state
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Thông báo lỗi
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [filters, setFilters] = useState({}); // Bộ lọc
  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
  const location = useLocation(); // Thông tin URL hiện tại
  const navigate = useNavigate(); // Hàm điều hướng

  /**
   * Hàm lấy danh sách sản phẩm từ API
   * @param {number} page - Page number to fetch
   * @param {Object} filterParams - Additional filter parameters
   */
  const fetchProducts = async (page = 1, filterParams = {}) => {
    try {
      setLoading(true);
      const searchParams = new URLSearchParams(location.search);
      const category = searchParams.get("category");
      const type = searchParams.get("type");
      const query = searchParams.get("q");

      let response;
      if (query) {
        // Tìm kiếm sản phẩm nếu có từ khóa
        response = await productService.searchProducts(query);
      } else if (category) {
        // Lọc theo danh mục nếu có
        response = await productService.getProductsByCategory(category);
      } else {
        // Lấy tất cả sản phẩm có phân trang
        response = await productService.getAllProducts(9, (page - 1) * 9);
      }

      if (!response || !response.products) {
        throw new Error("Invalid response format");
      }

      // Chuyển đổi dữ liệu API thành định dạng cần thiết
      const transformedProducts = response.products.map(product => ({
        id: product.id,
        productID: product.id,
        productName: product.title,
        productPrice: product.price,
        frontImg: product.thumbnail,
        backImg: product.images?.[0] || product.thumbnail,
        category: product.category,
        rating: Math.floor(product.rating),
        reviews: `${product.stock} reviews`,
        stock: product.stock
      }));

      setProducts(transformedProducts);
      setTotalPages(Math.ceil((response.total || response.products.length) / 9));
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || "Failed to load products");
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Effect để lấy sản phẩm khi component mount hoặc có thay đổi
   * Dependencies: currentPage, filters, location.search
   */
  useEffect(() => {
    fetchProducts(currentPage, filters);
  }, [currentPage, filters, location.search]);

  /**
   * Hàm xử lý khi chuyển trang
   * @param {number} page - New page number
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Hàm xử lý khi thay đổi bộ lọc
   * @param {Object} newFilters - New filter parameters
   */
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset về trang đầu
  };

  /**
   * Hàm xử lý khi tìm kiếm
   * @param {Event} e - Form submit event
   */
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setCurrentPage(1);
    }
  };

  // Hiển thị loading
  if (loading) {
    return (
      <div className="shopContainer">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Hiển thị lỗi
  if (error) {
    return (
      <div className="shopContainer">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => fetchProducts(currentPage, filters)}>Thử lại</button>
        </div>
      </div>
    );
  }

  // Render giao diện chính
  return (
    <div className="shopContainer">
      <div className="shopContent">
        {/* Phần tìm kiếm */}
        <div className="shopHeader">
          <form className="searchForm" onSubmit={handleSearch}>
            <div className="searchBar">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <BiSearch size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* Nội dung chính */}
        <div className="shopMain">
          {/* Bộ lọc */}
          <Filter onFilterChange={handleFilterChange} />
          
          {/* Danh sách sản phẩm */}
          <div className="productList">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="noProducts">Không tìm thấy sản phẩm</div>
            )}
          </div>
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Shop; 