// API endpoints
const API_BASE_URL = '/api/v1';

/**
 * Category Service
 * Handles all API calls related to categories
 */
export const categoryService = {
  /**
   * Get all categories
   * @returns {Promise<Array>} List of categories
   */
  getAllCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  /**
   * Get category by ID
   * @param {string} categoryId - Category ID
   * @returns {Promise<Object>} Category details
   */
  getCategoryById: async (categoryId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch category ${categoryId}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching category ${categoryId}:`, error);
      throw error;
    }
  },

  /**
   * Get products by category
   * @param {string} categoryId - Category ID
   * @param {number} page - Page number
   * @param {number} limit - Number of items per page
   * @returns {Promise<Object>} Object containing products and pagination info
   */
  getProductsByCategory: async (categoryId, page = 1, limit = 6) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/categories/${categoryId}/products?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch products for category ${categoryId}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      throw error;
    }
  }
}; 