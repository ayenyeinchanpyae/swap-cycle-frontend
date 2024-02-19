// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { loginUser, registerUser } from './redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const user = useSelector(state => state.auth.user); 
  const dispatch = useDispatch();

  const signIn = async (loginData) => {
    console.log('signin in authContext', loginData)
    dispatch(loginUser(loginData))
      .unwrap() // This will return the actual action payload, and throw errors if any.
      .then(async (user) => {})
      .catch((error) => {})
      .finally(() => {}); 
  };

  const signUp = async (data) => {
    console.log('signUp in authContext', data);
    dispatch(registerUser(data))
      .unwrap() 
      .then(async (user) => {})
      .catch((error) => {})
      .finally(() => {});
  };

  const signOut = async () => {
   // setUser(null); // This is a placeholder.
  };

  return <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>{children}</AuthContext.Provider>;
};
