// authService.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth'; // Replace with your actual API base URL

const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      console.log('res in authService.js', response.data);
      return response; // Adjust this based on your API response structure
    } catch (error) {
      throw error;
    }
  },
  register: async (data) => {
    console.log('data in authService.js', `${API_URL}/register`);
    try {
      const response = await axios.post(`${API_URL}/register`, data);
      console.log('res in authService.js', response.data);
      return response; // Adjust this based on your API response structure
    } catch (error) {
      console.log('error in authService.js', error);
      throw error;
    }
  },
  update: async ( updateData) => {
    console.log('updateData in authService.js', updateData);
    try {
      const response = await axios.put(`${API_URL}/update`, updateData);
      console.log('update in authService.js', response);
      return response; // Adjust this based on your API response structure
    } catch (error) {
      console.log('error in authService.js', error);
      throw error;
    }
  },
  // Add other authentication-related methods here
};

export default authService;
