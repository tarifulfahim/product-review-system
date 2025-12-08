import api from "./api";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = {
  // Login user
  login: async (credentials: LoginRequest): Promise<User> => {
    const response = await api.post<User>("/auth/login", credentials);
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  // Get current user (optional - for checking auth status)
  getCurrentUser: async (): Promise<User | null> => {
    try {
      // You can create a backend endpoint like /auth/me to verify the token
      // For now, we'll handle this through the cookie presence
      return null;
    } catch (error) {
      return null;
    }
  },
};

