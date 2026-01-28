import axiosInstance from '../config/axios.config';
import type { Category } from '../types/transaction.types';

export interface CreateCategoryDto {
  name: string;
  color: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}

export const categoryService = {
  // Obtener todas las categorías del usuario
  getCategories: async (): Promise<Category[]> => {
    const response = await axiosInstance.get<Category[]>('/categories');
    return response.data;
  },

  // Obtener una categoría por ID
  getCategoryById: async (id: string): Promise<Category> => {
    const response = await axiosInstance.get<Category>(`/categories/${id}`);
    return response.data;
  },

  // Crear nueva categoría
  createCategory: async (data: CreateCategoryDto): Promise<Category> => {
    const response = await axiosInstance.post<Category>('/categories', data);
    return response.data;
  },

  // Actualizar categoría
  updateCategory: async (id: string, data: UpdateCategoryDto): Promise<Category> => {
    const response = await axiosInstance.put<Category>(`/categories/${id}`, data);
    return response.data;
  },

  // Eliminar categoría
  deleteCategory: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/categories/${id}`);
  },
};
