// Types para transacciones y categorías

export const TransactionType = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
} as const;

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

export interface Category {
  id: string;
  name: string;
  color: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  type: TransactionType;
  date: string;
  categoryId: string;
  category?: Category;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionFilters {
  month?: number;
  year?: number;
  type?: TransactionType;
  categoryId?: string;
}

export interface DashboardStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactionCount: number;
}

export interface CategoryStats {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  totalIncome: number;
  totalExpenses: number;
  transactionCount: number;
}

export interface CreateTransactionDto {
  amount: number;
  description: string;
  type: TransactionType;
  date: string;
  categoryId: string;
}

export interface UpdateTransactionDto extends Partial<CreateTransactionDto> {}
