// src/redux/types.ts

// Define the structure for a User object
export interface User {
  id: string;
  username: string;
  email: string;
  // Add any other user-related properties you want to store
}

// Define the structure for the Auth state in Redux
export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

// Define the root state interface
export interface RootState {
  auth: AuthState;
}