import axiosInstance from '../config/axios.config';
import type { LoginRequest, LoginResponse } from '../types/auth.types';

export const authService = {
  // Login de usuario
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem('token');
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // Obtener token
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // Guardar token
  setToken: (token: string): void => {
    localStorage.setItem('token', token);
  },
};
