// authService.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/order'; // Replace with your actual API base URL

const orderService = {
  add: async (data) => {
    console.log('api', `${API_URL}`, data);
    try {
      const response = await axios.post(`${API_URL}`, data);
      console.log('add in orderService.js', response.data);
      return response; // Adjust this based on your API response structure
    } catch (error) {
      throw error;
    }
  },
  getByBuyer: async (id) => {
    console.log('getByBuyer in orderService.js', `${API_URL}`, id);
    try {
      const response = await axios.get(`${API_URL}/buyer/${id}`);
      console.log('getByBuyer in orderService.js', response.data);
      return response; // Adjust this based on your API response structure
    } catch (error) {
      throw error;
    }
  },
  getBySeller: async (id) => {
    console.log('getBySeller in orderService.js', `${API_URL}`, id);
    try {
      const response = await axios.get(`${API_URL}/seller/${id}`);
      console.log('getBySeller in orderService.js', response.data);
      return response; // Adjust this based on your API response structure
    } catch (error) {
      throw error;
    }
  },
  // Add other authentication-related methods here
};

export default orderService;
