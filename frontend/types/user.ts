export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserListItem {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

