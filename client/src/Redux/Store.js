import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userslice';

export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});