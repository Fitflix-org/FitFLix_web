// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './userSlice'; // Import the auth reducer
import { RootState } from './types'; // Import RootState type from types.ts

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // Assign the auth reducer to the 'auth' slice of the state
  },
  // DevTools are automatically enabled in development mode
  // You can add middleware here if needed (e.g., redux-thunk, redux-logger)
});

export default store;

// Define AppDispatch type for dispatching actions
export type AppDispatch = typeof store.dispatch;

// Export RootState type directly from store.ts for easier consumption
export type { RootState };
