import { RegisterUserRequest, UserListItem } from '@/types/user';
import api from '../api';

export const usersApi = {
  // Register new user (admin only)
  registerUser: async (data: RegisterUserRequest): Promise<UserListItem> => {
    const response = await api.post<UserListItem>('/auth/register', data);
    return response.data;
  },

  // Get all users (any authenticated user)
  getAllUsers: async (): Promise<UserListItem[]> => {
    const response = await api.get<UserListItem[]>('/auth/users');
    return response.data;
  },
};

