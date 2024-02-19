// authService.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/product'; // Replace with your actual API base URL

const productService = {
  add: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('res in productService.js', response.data);
      return response; // Adjust this based on your API response structure
    } catch (error) {
      throw error;
    }
  },

  getAllProducts: async () => {
    console.log('getAllProduct');
    try {
      const response = await axios.get(`${API_URL}/`);
      console.log('res in productService.js', response.data);
      return response; // Adjust this based on your API response structure
    } catch (error) {
      throw error;
    }
  },

  getProductsByUser: async (userId) => {
    console.log('getProductsByUser', userId);
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      console.log('res in productService.js', response.data);
      return response; // Adjust this based on your API response structure
    } catch (error) {
      throw error;
    }
  },

  getProductsById: async (id) => {
    console.log('getProductsById', id);
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      console.log('res in productService.js', response.data);
      return response; // Adjust this based on your API response structure
    } catch (error) {
      throw error;
    }
  },

  update: async (id, data) => {
    console.log('data productService.js',data);
    try {
      const response = await axios.put(`${API_URL}/${id}`, data,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },});
      console.log('res in productService.js', response.data);
      return response; // Adjust this based on your API response structure
    } catch (error) {
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log('delete in productService.js', response);
      return response; // Adjust this based on your API response structure
    } catch (error) {
      throw error;
    }
  },
  // Add other product-related methods here
};

export default productService;
