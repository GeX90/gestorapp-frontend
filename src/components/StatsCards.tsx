import type { DashboardStats } from '../types/transaction.types';
import { formatCurrency } from '../utils/export.utils';

interface StatsCardsProps {
  stats: DashboardStats;
  isLoading?: boolean;
}

const StatsCards = ({ stats, isLoading }: StatsCardsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Ingresos',
      value: stats.totalIncome,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 11l5-5m0 0l5 5m-5-5v12"
          />
        </svg>
      ),
    },
    {
      title: 'Gastos',
      value: stats.totalExpenses,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 13l-5 5m0 0l-5-5m5 5V6"
          />
        </svg>
      ),
    },
    {
      title: 'Balance',
      value: stats.balance,
      color: stats.balance >= 0 ? 'text-blue-600' : 'text-orange-600',
      bgColor: stats.balance >= 0 ? 'bg-blue-100' : 'bg-orange-100',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div key={card.title} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
            <div className={`${card.bgColor} ${card.color} p-2 rounded-lg`}>
              {card.icon}
            </div>
          </div>
          <p className={`text-3xl font-bold ${card.color}`}>
            {formatCurrency(card.value)}
          </p>
          {card.title === 'Balance' && (
            <p className="mt-2 text-xs text-gray-500">
              {stats.transactionCount} transacciones
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
