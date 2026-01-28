import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { budgetService } from '../services/budget.service';
import type { BudgetFilters, CreateBudgetDto, UpdateBudgetDto } from '../types/budget.types';

/**
 * Hook para obtener presupuestos con React Query
 */
export const useBudgets = (filters?: BudgetFilters) => {
  return useQuery({
    queryKey: ['budgets', filters],
    queryFn: () => budgetService.getBudgets(filters),
    staleTime: 1000 * 60, // 1 minuto
  });
};

/**
 * Hook para obtener un presupuesto por ID
 */
export const useBudget = (id: string) => {
  return useQuery({
    queryKey: ['budget', id],
    queryFn: () => budgetService.getBudgetById(id),
    enabled: !!id,
  });
};

/**
 * Hook para crear un presupuesto
 */
export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBudgetDto) => budgetService.createBudget(data),
    onSuccess: () => {
      // Invalidar cache de presupuestos para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};

/**
 * Hook para actualizar un presupuesto
 */
export const useUpdateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBudgetDto }) =>
      budgetService.updateBudget(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['budget'] });
    },
  });
};

/**
 * Hook para eliminar un presupuesto
 */
export const useDeleteBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => budgetService.deleteBudget(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};

/**
 * Hook para obtener resumen del mes actual
 */
export const useCurrentMonthBudgets = () => {
  return useQuery({
    queryKey: ['budgets', 'current-month'],
    queryFn: () => budgetService.getCurrentMonthSummary(),
    staleTime: 1000 * 60, // 1 minuto
  });
};
