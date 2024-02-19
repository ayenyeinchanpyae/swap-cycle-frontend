// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService'; // Adjust the path based on your project structure
import Cookies from 'js-cookie';

// Async Thunk Action
export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
    console.log('credentials in authSlice.js', credentials);
  try {
    const response = await authService.login(credentials);
    console.log('res in authSlice.js', response)
    return {
      user: response.data.user, // Adjust this based on your API response structure
      token: response.data.token, // Adjust this based on your API response structure
    }; // Adjust this based on your API response structure
  } catch (error) {
     console.log('error in authSlice.js', error);
    throw error.response.data.message; // Adjust this based on your API response structure
  }
});

export const updateUser = createAsyncThunk('auth/update', async (data) => {
  console.log('updateUser in authSlice.js', data);
  try {
    const response = await authService.update(data);
    console.log('res in authSlice.js', response);
    return {
      user: response.data.user, // Assuming your API response structure has a 'data' property
    };
  } catch (error) {
    console.log('error in authSlice.js', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw error.response.data.message; // Adjust this based on your API response structure
    } else if (error.request) {
      // The request was made but no response was received
      throw 'No response from the server';
    } else {
      // Something happened in setting up the request that triggered an Error
      throw 'Error setting up the request';
    }
  }
});


export const registerUser = createAsyncThunk('auth/register', async (credentials) => {
  console.log('credentials in authSlice.js', credentials);
  try {
    const response = await authService.register(credentials);
    console.log('userId in authSlice.js', response.data);
    Cookies.set('userId', response.data.user._id, { expires: 7 });
    return {
      user: response.data.user, // Adjust this based on your API response structure
      token: response.data.token, // Adjust this based on your API response structure
      userId: response.data.user._id
    }; // Adjust this based on your API response structure
  } catch (error) {
    console.log('error in authSlice.js', error);
    throw error.response.data.message; // Adjust this based on your API response structure
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  // You can perform any additional logout logic here
  return null;
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // Reset the entire auth state to its initial state
        state.user = null;
        state.token = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
