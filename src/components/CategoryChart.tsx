import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { CategoryStats } from '../types/transaction.types';
import { formatCurrency } from '../utils/export.utils';

// Registrar elementos de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryChartProps {
  categoryStats: CategoryStats[];
  isLoading?: boolean;
}

const CategoryChart = ({ categoryStats, isLoading }: CategoryChartProps) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Gastos por Categoría
        </h3>
        <div className="flex items-center justify-center h-64">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (categoryStats.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Gastos por Categoría
        </h3>
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <svg
            className="w-16 h-16 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <p>No hay datos para mostrar</p>
        </div>
      </div>
    );
  }

  // Filtrar solo gastos
  const expenseStats = categoryStats.filter((stat) => stat.totalExpenses > 0);

  const data = {
    labels: expenseStats.map((stat) => stat.categoryName),
    datasets: [
      {
        label: 'Gastos',
        data: expenseStats.map((stat) => stat.totalExpenses),
        backgroundColor: expenseStats.map((stat) => stat.categoryColor),
        borderColor: expenseStats.map((stat) => stat.categoryColor),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${formatCurrency(value)}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Gastos por Categoría
      </h3>
      <div className="h-80">
        <Doughnut data={data} options={options} />
      </div>
      
      {/* Lista de categorías */}
      <div className="mt-6 space-y-3">
        {expenseStats.map((stat) => (
          <div
            key={stat.categoryId}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: stat.categoryColor }}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {stat.categoryName}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {formatCurrency(stat.totalExpenses)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryChart;
