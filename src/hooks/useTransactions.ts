import { useQuery } from '@tanstack/react-query';
import { transactionService } from '../services/transaction.service';
import { categoryService } from '../services/category.service';
import type { TransactionFilters } from '../types/transaction.types';

/**
 * Hook para obtener transacciones con React Query
 */
export const useTransactions = (filters?: TransactionFilters) => {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => transactionService.getTransactions(filters),
    staleTime: 1000 * 60, // 1 minuto
  });
};

/**
 * Hook para obtener estadísticas del dashboard
 */
export const useDashboardStats = (filters?: TransactionFilters) => {
  return useQuery({
    queryKey: ['dashboard-stats', filters],
    queryFn: () => transactionService.getDashboardStats(filters),
    staleTime: 1000 * 60, // 1 minuto
  });
};

/**
 * Hook para obtener estadísticas por categoría
 */
export const useCategoryStats = (filters?: TransactionFilters) => {
  return useQuery({
    queryKey: ['category-stats', filters],
    queryFn: () => transactionService.getCategoryStats(filters),
    staleTime: 1000 * 60, // 1 minuto
  });
};

/**
 * Hook para obtener todas las categorías
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getCategories(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
