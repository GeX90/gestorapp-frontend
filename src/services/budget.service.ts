import axiosInstance from '../config/axios.config';
import type {
  Budget,
  BudgetWithProgress,
  CreateBudgetDto,
  UpdateBudgetDto,
  BudgetFilters,
} from '../types/budget.types';

export const budgetService = {
  // Obtener todos los presupuestos con progreso
  getBudgets: async (filters?: BudgetFilters): Promise<BudgetWithProgress[]> => {
    const params = new URLSearchParams();
    
    if (filters?.month) params.append('month', filters.month.toString());
    if (filters?.year) params.append('year', filters.year.toString());
    if (filters?.categoryId) params.append('categoryId', filters.categoryId);

    const response = await axiosInstance.get<BudgetWithProgress[]>(
      `/budgets?${params.toString()}`
    );
    return response.data;
  },

  // Obtener un presupuesto por ID
  getBudgetById: async (id: string): Promise<BudgetWithProgress> => {
    const response = await axiosInstance.get<BudgetWithProgress>(`/budgets/${id}`);
    return response.data;
  },

  // Crear nuevo presupuesto
  createBudget: async (data: CreateBudgetDto): Promise<Budget> => {
    const response = await axiosInstance.post<Budget>('/budgets', data);
    return response.data;
  },

  // Actualizar presupuesto
  updateBudget: async (id: string, data: UpdateBudgetDto): Promise<Budget> => {
    const response = await axiosInstance.put<Budget>(`/budgets/${id}`, data);
    return response.data;
  },

  // Eliminar presupuesto
  deleteBudget: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/budgets/${id}`);
  },

  // Obtener resumen de presupuestos del mes actual
  getCurrentMonthSummary: async (): Promise<BudgetWithProgress[]> => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    
    return budgetService.getBudgets({ month, year });
  },
};
