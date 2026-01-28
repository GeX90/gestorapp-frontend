import type { BudgetWithProgress } from '../types/budget.types';
import { formatCurrency } from '../utils/export.utils';

interface BudgetCardProps {
  budget: BudgetWithProgress;
  onEdit?: (budget: BudgetWithProgress) => void;
  onDelete?: (id: string) => void;
}

const BudgetCard = ({ budget, onEdit, onDelete }: BudgetCardProps) => {
  const { category, amount, spent, remaining, percentageUsed, isOverBudget, isWarning } = budget;

  // Determinar color de la barra de progreso
  const getProgressColor = () => {
    if (isOverBudget) return 'bg-red-500';
    if (isWarning) return 'bg-orange-500';
    return 'bg-green-500';
  };

  // Determinar color del texto del porcentaje
  const getPercentageColor = () => {
    if (isOverBudget) return 'text-red-600';
    if (isWarning) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      {/* Header con categoría y acciones */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: category?.color || '#6B7280' }}
          ></div>
          <h3 className="text-lg font-semibold text-gray-900">
            {category?.name || 'Sin categoría'}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(budget)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
              title="Editar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(budget.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Eliminar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Alerta si está en 80% o más */}
      {isWarning && (
        <div className={`mb-4 p-3 rounded-lg flex items-start space-x-2 ${
          isOverBudget ? 'bg-red-50 text-red-800' : 'bg-orange-50 text-orange-800'
        }`}>
          <svg
            className="w-5 h-5 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-sm">
            <p className="font-semibold">
              {isOverBudget ? '¡Presupuesto superado!' : '¡Alerta de presupuesto!'}
            </p>
            <p>
              {isOverBudget
                ? 'Has excedido tu presupuesto mensual'
                : 'Has gastado más del 80% de tu presupuesto'}
            </p>
          </div>
        </div>
      )}

      {/* Montos */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Presupuesto:</span>
          <span className="font-semibold text-gray-900">{formatCurrency(amount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Gastado:</span>
          <span className="font-semibold text-red-600">{formatCurrency(spent)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Disponible:</span>
          <span className={`font-semibold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(Math.abs(remaining))}
          </span>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Progreso</span>
          <span className={`text-sm font-bold ${getPercentageColor()}`}>
            {percentageUsed.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full ${getProgressColor()} transition-all duration-500 rounded-full`}
            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
