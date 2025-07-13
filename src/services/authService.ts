import api from './api';

// Define interfaces for request and response data
interface RegisterRequest {
  username?: string;
  email?: string;
  password?: string;
}

interface LoginRequest {
  email?: string;
  password?: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

interface UserProfile {
  id: string;
  username: string;
  email: string;
}

const authService = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    // Runtime validation
    if (!data.username || !data.email || !data.password) {
      throw new Error('Registration data is incomplete.');
    }
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    // Runtime validation
    if (!data.email || !data.password) {
      throw new Error('Login data is incomplete.');
    }
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>('/user-profile');
    return response.data;
  },
};

export default authService;