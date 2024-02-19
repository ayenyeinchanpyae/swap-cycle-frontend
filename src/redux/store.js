import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './auth/authSlice';
import productReducer from './product/productSlice'
import cartReducer from './product/cartSlice'
import orderReducer from './order/orderSlice'

// Define your persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart','auth'], // You can choose which reducers to persist
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
  order: orderReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // ...other store settings
});

export const persistor = persistStore(store);
