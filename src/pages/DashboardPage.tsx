import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  useTransactions,
  useDashboardStats,
  useCategoryStats,
} from '../hooks/useTransactions';
import { authService } from '../services/auth.service';
import { exportTransactionsToCSV } from '../utils/export.utils';
import StatsCards from '../components/StatsCards';
import DashboardFilters from '../components/DashboardFilters';
import TransactionsTable from '../components/TransactionsTable';
import CategoryChart from '../components/CategoryChart';
import IncomeVsExpensesChart from '../components/IncomeVsExpensesChart';

const DashboardPage = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  
  // Estados para los filtros
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());

  // Construir filtros
  const filters = {
    month: selectedMonth === 0 ? undefined : selectedMonth,
    year: selectedYear,
  };

  // React Query hooks
  const {
    data: transactions = [],
    isLoading: isLoadingTransactions,
    error: transactionsError,
  } = useTransactions(filters);

  const {
    data: stats,
    isLoading: isLoadingStats,
    error: statsError,
  } = useDashboardStats(filters);

  const {
    data: categoryStats = [],
    isLoading: isLoadingCategoryStats,
    error: categoryStatsError,
  } = useCategoryStats(filters);

  // Manejo de errores con toasts
  useEffect(() => {
    if (transactionsError) {
      toast.error('Error al cargar las transacciones');
    }
    if (statsError) {
      toast.error('Error al cargar las estadísticas');
    }
    if (categoryStatsError) {
      toast.error('Error al cargar estadísticas de categorías');
    }
  }, [transactionsError, statsError, categoryStatsError]);

  // Función para cerrar sesión
  const handleLogout = () => {
    authService.logout();
    toast.info('Sesión cerrada correctamente');
    navigate('/login');
  };

  // Función para exportar a CSV
  const handleExportCSV = () => {
    try {
      if (transactions.length === 0) {
        toast.warning('No hay transacciones para exportar');
        return;
      }

      const monthName = selectedMonth === 0 ? 'todas' : `mes_${selectedMonth}`;
      const fileName = `transacciones_${monthName}_${selectedYear}.csv`;
      
      exportTransactionsToCSV(transactions, fileName);
      toast.success('Transacciones exportadas correctamente');
    } catch (error) {
      toast.error('Error al exportar las transacciones');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">
                Gestión de Gastos Personales
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Filtros */}
          <DashboardFilters
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
          />

          {/* Estadísticas */}
          <StatsCards
            stats={stats || { totalIncome: 0, totalExpenses: 0, balance: 0, transactionCount: 0 }}
            isLoading={isLoadingStats}
          />

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IncomeVsExpensesChart
              categoryStats={categoryStats}
              isLoading={isLoadingCategoryStats}
            />
            <CategoryChart
              categoryStats={categoryStats}
              isLoading={isLoadingCategoryStats}
            />
          </div>

          {/* Botón de exportación */}
          <div className="flex justify-end">
            <button
              onClick={handleExportCSV}
              disabled={transactions.length === 0}
              className={`px-6 py-3 rounded-lg font-semibold text-white transition flex items-center space-x-2 ${
                transactions.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 active:scale-95'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Exportar a CSV</span>
            </button>
          </div>

          {/* Tabla de transacciones */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Transacciones
            </h2>
            <TransactionsTable
              transactions={transactions}
              isLoading={isLoadingTransactions}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
