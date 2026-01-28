import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useBudgets, useCreateBudget, useUpdateBudget, useDeleteBudget } from '../hooks/useBudgets';
import { useCategories } from '../hooks/useTransactions';
import { authService } from '../services/auth.service';
import BudgetCard from '../components/BudgetCard';
import BudgetForm from '../components/BudgetForm';
import type { BudgetFormData } from '../schemas/budget.schema';
import type { BudgetWithProgress } from '../types/budget.types';
import { getMonthName } from '../utils/export.utils';

const BudgetsPage = () => {
  const navigate = useNavigate();
  const currentDate = new Date();

  // Estados
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState<BudgetWithProgress | null>(null);

  // React Query hooks
  const { data: categories = [] } = useCategories();
  const {
    data: budgets = [],
    isLoading: isLoadingBudgets,
    error: budgetsError,
  } = useBudgets({ month: selectedMonth, year: selectedYear });

  const createMutation = useCreateBudget();
  const updateMutation = useUpdateBudget();
  const deleteMutation = useDeleteBudget();

  // Manejo de errores con toasts
  useEffect(() => {
    if (budgetsError) {
      toast.error('Error al cargar los presupuestos');
    }
  }, [budgetsError]);

  // Detectar alertas de presupuestos
  useEffect(() => {
    budgets.forEach((budget) => {
      // Solo mostrar alertas para el mes actual
      const isCurrentMonth =
        budget.month === currentDate.getMonth() + 1 &&
        budget.year === currentDate.getFullYear();

      if (isCurrentMonth && budget.isOverBudget) {
        toast.error(
          `¡Has superado el presupuesto de ${budget.category?.name}!`,
          { toastId: `budget-over-${budget.id}` }
        );
      } else if (isCurrentMonth && budget.isWarning && !budget.isOverBudget) {
        toast.warning(
          `Alerta: Has gastado más del 80% en ${budget.category?.name}`,
          { toastId: `budget-warning-${budget.id}` }
        );
      }
    });
  }, [budgets]);

  const handleLogout = () => {
    authService.logout();
    toast.info('Sesión cerrada correctamente');
    navigate('/login');
  };

  const handleCreateBudget = (data: BudgetFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Presupuesto creado exitosamente');
        setShowForm(false);
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || 'Error al crear el presupuesto';
        toast.error(message);
      },
    });
  };

  const handleUpdateBudget = (data: BudgetFormData) => {
    if (!editingBudget) return;

    updateMutation.mutate(
      { id: editingBudget.id, data },
      {
        onSuccess: () => {
          toast.success('Presupuesto actualizado exitosamente');
          setShowForm(false);
          setEditingBudget(null);
        },
        onError: (error: any) => {
          const message = error.response?.data?.message || 'Error al actualizar el presupuesto';
          toast.error(message);
        },
      }
    );
  };

  const handleDeleteBudget = (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este presupuesto?')) return;

    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Presupuesto eliminado exitosamente');
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || 'Error al eliminar el presupuesto';
        toast.error(message);
      },
    });
  };

  const handleEditBudget = (budget: BudgetWithProgress) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingBudget(null);
  };

  const years = Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const isLoading = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Presupuestos</h1>
              <p className="mt-1 text-sm text-gray-600">
                Gestiona tus presupuestos mensuales por categoría
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Dashboard</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Filtros y botón de crear */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="month-filter" className="block text-sm font-medium text-gray-700 mb-2">
                  Mes
                </label>
                <select
                  id="month-filter"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {getMonthName(month)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 mb-2">
                  Año
                </label>
                <select
                  id="year-filter"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Nuevo Presupuesto</span>
              </button>
            </div>
          </div>

          {/* Formulario modal */}
          {showForm && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {editingBudget ? 'Editar Presupuesto' : 'Crear Presupuesto'}
              </h2>
              <BudgetForm
                categories={categories}
                onSubmit={editingBudget ? handleUpdateBudget : handleCreateBudget}
                onCancel={handleCancelForm}
                initialData={editingBudget || undefined}
                isLoading={isLoading}
              />
            </div>
          )}

          {/* Lista de presupuestos */}
          {isLoadingBudgets ? (
            <div className="flex items-center justify-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : budgets.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No hay presupuestos para este período
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Comienza creando tu primer presupuesto mensual
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {budgets.map((budget) => (
                <BudgetCard
                  key={budget.id}
                  budget={budget}
                  onEdit={handleEditBudget}
                  onDelete={handleDeleteBudget}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BudgetsPage;
