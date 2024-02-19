// productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService'; // Adjust the path based on your project structure

// Async Thunk Action
export const add = createAsyncThunk('product/add', async (formData) => {
  console.log('formData in productSlice.js', formData);
  try {
    const response = await productService.add(formData);
    console.log('res in productSlice.js', response);
    return response.data;
    //   user: response.data.user, // Adjust this based on your API response structure
    //   token: response.data.token, // Adjust this based on your API response structure
     // Adjust this based on your API response structure
  } catch (error) {
    console.log('error in authSlice.js', error);
    throw error.response.data.message; // Adjust this based on your API response structure
  }
});

export const update = createAsyncThunk('product/update', async ({ id, formData }) => {
  console.log('formData in productSlice.js', formData);
  try {
    const response = await productService.update(id, formData);
    console.log('update in productSlice.js', response);
    return response.data;
  } catch (error) {
    console.log('error in authSlice.js', error);
    throw error.response.data.message; // Adjust this based on your API response structure
  }
});

export const getProductsByUser = createAsyncThunk('product/getProductsByUser', async (userId) => {
  console.log('getProductsByUser in slice', userId);
  try {
    const response = await productService.getProductsByUser(userId);
    return response.data.product;
  } catch (error) {
    throw error;
  }
});
export const getAllProducts = createAsyncThunk('product/getAllProducts', async () => {
  try {
    const response = await productService.getAllProducts();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id) => {
  console.log('deleteProduct in slice', id);
  try {
    const response = await productService.deleteProduct(id);
    console.log('deleteProduct res in slice', response);
    return response;
  } catch (error) {
    throw error;
  }
});

// export const registerUser = createAsyncThunk('auth/register', async (credentials) => {
//   console.log('credentials in authSlice.js', credentials);
//   try {
//     const response = await authService.register(credentials);
//     console.log('res in authSlice.js', response);
//     return {
//       user: response.data.user, // Adjust this based on your API response structure
//       token: response.data.token, // Adjust this based on your API response structure
//     }; // Adjust this based on your API response structure
//   } catch (error) {
//     console.log('error in authSlice.js', error);
//     throw error.response.data.message; // Adjust this based on your API response structure
//   }
// });

// Slice
const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: null,
    allProducts: null,
    productsByUser: null,
    isLoading: false,
    error: null,
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
        state.product = action.payload.data;
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload.products;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getProductsByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsByUser = action.payload;
      })
      .addCase(getProductsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
