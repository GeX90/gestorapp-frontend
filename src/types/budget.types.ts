// Types para presupuestos (budgets)

export interface Budget {
  id: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    color: string;
  };
  amount: number; // Monto del presupuesto
  month: number; // 1-12
  year: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetWithProgress extends Budget {
  spent: number; // Cantidad gastada
  remaining: number; // Cantidad restante
  percentageUsed: number; // Porcentaje usado (0-100)
  isOverBudget: boolean; // Si se superó el presupuesto
  isWarning: boolean; // Si está en el 80% o más
}

export interface CreateBudgetDto {
  categoryId: string;
  amount: number;
  month: number;
  year: number;
}

export interface UpdateBudgetDto extends Partial<CreateBudgetDto> {}

export interface BudgetFilters {
  month?: number;
  year?: number;
  categoryId?: string;
}
