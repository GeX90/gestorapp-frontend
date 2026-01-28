import axiosInstance from '../config/axios.config';
import type {
  Transaction,
  TransactionFilters,
  CreateTransactionDto,
  UpdateTransactionDto,
  DashboardStats,
  CategoryStats,
} from '../types/transaction.types';

export const transactionService = {
  // Obtener todas las transacciones con filtros opcionales
  getTransactions: async (filters?: TransactionFilters): Promise<Transaction[]> => {
    const params = new URLSearchParams();
    
    if (filters?.month) params.append('month', filters.month.toString());
    if (filters?.year) params.append('year', filters.year.toString());
    if (filters?.type) params.append('type', filters.type);
    if (filters?.categoryId) params.append('categoryId', filters.categoryId);

    const response = await axiosInstance.get<Transaction[]>(
      `/transactions?${params.toString()}`
    );
    return response.data;
  },

  // Obtener una transacción por ID
  getTransactionById: async (id: string): Promise<Transaction> => {
    const response = await axiosInstance.get<Transaction>(`/transactions/${id}`);
    return response.data;
  },

  // Crear nueva transacción
  createTransaction: async (data: CreateTransactionDto): Promise<Transaction> => {
    const response = await axiosInstance.post<Transaction>('/transactions', data);
    return response.data;
  },

  // Actualizar transacción
  updateTransaction: async (
    id: string,
    data: UpdateTransactionDto
  ): Promise<Transaction> => {
    const response = await axiosInstance.put<Transaction>(`/transactions/${id}`, data);
    return response.data;
  },

  // Eliminar transacción
  deleteTransaction: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/transactions/${id}`);
  },

  // Obtener estadísticas del dashboard
  getDashboardStats: async (filters?: TransactionFilters): Promise<DashboardStats> => {
    const params = new URLSearchParams();
    
    if (filters?.month) params.append('month', filters.month.toString());
    if (filters?.year) params.append('year', filters.year.toString());

    const response = await axiosInstance.get<DashboardStats>(
      `/transactions/stats/dashboard?${params.toString()}`
    );
    return response.data;
  },

  // Obtener estadísticas por categoría
  getCategoryStats: async (filters?: TransactionFilters): Promise<CategoryStats[]> => {
    const params = new URLSearchParams();
    
    if (filters?.month) params.append('month', filters.month.toString());
    if (filters?.year) params.append('year', filters.year.toString());

    const response = await axiosInstance.get<CategoryStats[]>(
      `/transactions/stats/categories?${params.toString()}`
    );
    return response.data;
  },
};
