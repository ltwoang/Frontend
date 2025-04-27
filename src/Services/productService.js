// API endpoints
const API_BASE_URL = 'https://dummyjson.com';

/**
 * Product Service
 * Handles all API calls related to products using DummyJSON API
 * Provides methods for fetching, searching, and filtering products
 */
export const productService = {
  /**
   * Lấy danh sách sản phẩm có phân trang
   * @param {number} limit - Number of items per page (default: 10)
   * @param {number} skip - Number of items to skip for pagination (default: 0)
   * @returns {Promise<Object>} Object containing:
   *  - products: Array of product objects
   *  - total: Total number of products
   *  - skip: Number of items skipped
   *  - limit: Number of items per page
   * @throws {Error} If API call fails
   */
  getAllProducts: async (limit = 10, skip = 0) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Lấy thông tin chi tiết một sản phẩm theo ID
   * @param {number} id - Product ID to fetch
   * @returns {Promise<Object>} Product object containing:
   *  - id: Product ID
   *  - title: Product name
   *  - description: Product description
   *  - price: Product price
   *  - images: Array of product images
   *  - category: Product category
   *  - rating: Product rating
   *  - stock: Available stock
   * @throws {Error} If product not found or API call fails
   */
  getProductById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  /**
   * Lấy danh sách tất cả các danh mục sản phẩm
   * @returns {Promise<Array>} Array of category names
   * @throws {Error} If API call fails
   */
  getCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/categories`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Categories API Error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format: expected JSON');
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        console.error('Unexpected categories response:', data);
        throw new Error('Invalid categories data format');
      }

      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  /**
   * Lấy danh sách sản phẩm theo danh mục
   * @param {string} category - Category name to filter by
   * @returns {Promise<Object>} Object containing:
   *  - products: Array of products in the category
   *  - total: Total number of products in category
   * @throws {Error} If category not found or API call fails
   */
  getProductsByCategory: async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} products`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${category} products:`, error);
      throw error;
    }
  },

  /**
   * Tìm kiếm sản phẩm theo từ khóa
   * @param {string} query - Search query string
   * @returns {Promise<Object>} Object containing:
   *  - products: Array of matching products
   *  - total: Total number of matches
   * @throws {Error} If search fails
   */
  searchProducts: async (query) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/search?q=${query}`);
      if (!response.ok) {
        throw new Error('Failed to search products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  /**
   * Lấy danh sách sản phẩm có phân trang và sắp xếp
   * @param {Object} options - Query options
   * @param {number} options.limit - Number of items per page (default: 10)
   * @param {number} options.skip - Number of items to skip (default: 0)
   * @param {string} options.sort - Field to sort by (price, rating, etc.)
   * @param {string} options.order - Sort order (asc, desc) (default: desc)
   * @returns {Promise<Object>} Object containing:
   *  - products: Array of sorted products
   *  - total: Total number of products
   * @throws {Error} If API call fails
   */
  getProducts: async ({ limit = 10, skip = 0, sort, order = 'desc' } = {}) => {
    try {
      let url = `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`;
      if (sort) {
        url += `&sort=${sort}&order=${order}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Lấy danh sách sản phẩm mới nhất
   * @returns {Promise<Object>} Object containing:
   *  - products: Array of latest products
   *  - total: Total number of products
   * @throws {Error} If API call fails
   */
  getNewArrivals: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products?limit=8&sort=desc`);
      if (!response.ok) {
        throw new Error('Failed to fetch new arrivals');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      throw error;
    }
  },

  /**
   * Lấy danh sách sản phẩm bán chạy nhất
   * @returns {Promise<Object>} Object containing:
   *  - products: Array of best selling products
   *  - total: Total number of products
   * @throws {Error} If API call fails
   */
  getBestSellers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products?limit=8&sort=rating`);
      if (!response.ok) {
        throw new Error('Failed to fetch best sellers');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching best sellers:', error);
      throw error;
    }
  },

  /**
   * Lấy danh sách sản phẩm đánh giá cao nhất
   * @returns {Promise<Object>} Object containing:
   *  - products: Array of top rated products
   *  - total: Total number of products
   * @throws {Error} If API call fails
   */
  getTopRated: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products?limit=8&sort=rating`);
      if (!response.ok) {
        throw new Error('Failed to fetch top rated products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching top rated products:', error);
      throw error;
    }
  },

  /**
   * Lấy danh sách sản phẩm nổi bật
   * @returns {Promise<Object>} Object containing trending products
   */
  getFeaturedProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products?limit=100`);
      if (!response.ok) {
        throw new Error('Failed to fetch featured products');
      }
      const data = await response.json();
      
      const featuredProducts = data.products
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);

      return {
        products: featuredProducts,
        total: featuredProducts.length
      };
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  }
};