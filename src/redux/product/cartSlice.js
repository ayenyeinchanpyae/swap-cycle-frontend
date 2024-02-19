// cartSlice.js

import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: {
      reducer: (state, action) => {
        const existingIndex = state.items.findIndex((item) => item._id === action.payload._id);
        console.log('existingIndex', existingIndex);
        if (existingIndex >= 0) {
          state.items[existingIndex].quantity++;
          state.items[existingIndex].totalPrice += action.payload.price;
        } else {
          state.items.push({
            ...action.payload,
            quantity: 1,
            totalPrice: action.payload.price,
            cartItemId: nanoid(), // generates unique id for cart item
          });
        }
        state.totalQuantity++;
        state.totalAmount += action.payload.price;
      },
      prepare: (product) => ({ payload: product }), // `prepare` can be used to format the payload if needed
    },
    increaseQuantity: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item._id === action.payload._id);
      console.log('increaseQuantity', itemIndex);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity++;
        state.totalQuantity++;
        state.totalAmount += state.items[itemIndex].price;
      }
      console.log('price', state.totalAmount);
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item._id === action.payload._id);

      if (itemIndex >= 0 && state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity--;
        state.totalQuantity--;
        state.totalAmount -= state.items[itemIndex].price;
      }
    },
    emptyCart: (state) => {
      console.log('empty cart')
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    removeFromCart: (state, action) => {
      console.log('removeFromCart');
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload.cartItemId,
      );
      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        console.log('removeFromCart',item);
        state.totalQuantity -= item.quantity;
        state.totalAmount -= item.totalPrice;
        state.items.splice(itemIndex, 1); // Removes the item from the array
      }
    },
    // You can add other reducers for remove/update, etc.
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, emptyCart, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
