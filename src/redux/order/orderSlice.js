// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService'; // Adjust the path based on your project structure

// Async Thunk Action
export const add = createAsyncThunk('auth/add', async (data) => {
  console.log('add in orderSlice.js', data);
  try {
    const response = await orderService.add(data);
    console.log('res in orderSlice.js', response);
    return {
      order: response.data, // Adjust this based on your API response structure
    }; // Adjust this based on your API response structure
  } catch (error) {
    console.log('error in authSlice.js', error);
    throw error.response.data.message; // Adjust this based on your API response structure
  }
});

export const getByBuyer = createAsyncThunk('auth/getByBuyer', async (id) => {
  console.log('getByBuyer in orderSlice.js', id);
  try {
    const response = await orderService.getByBuyer(id);
    console.log('res in orderSlice.js', response);
    return response.data.product; // Adjust this based on your API response structure
   // Adjust this based on your API response structure
  } catch (error) {
    console.log('error in authSlice.js', error);
    throw error.response.data.message; // Adjust this based on your API response structure
  }
});

export const getBySeller = createAsyncThunk('auth/getBySeller', async (id) => {
  console.log('getBySeller in orderSlice.js', id);
  try {
    const response = await orderService.getBySeller(id);
    console.log('res in orderSlice.js', response);
    return response.data.product; // Adjust this based on your API response structure
    // Adjust this based on your API response structure
  } catch (error) {
    console.log('error in authSlice.js', error);
    throw error.response.data.message; // Adjust this based on your API response structure
  }
});


// Slice
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    buyerOrder: null,
    sellerOrder: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(add.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(add.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getByBuyer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getByBuyer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.buyerOrder = action.payload;
      })
      .addCase(getByBuyer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getBySeller.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBySeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sellerOrder = action.payload;
      })
      .addCase(getBySeller.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
