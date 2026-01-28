import { getMonthName } from '../utils/export.utils';

interface DashboardFiltersProps {
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

const DashboardFilters = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}: DashboardFiltersProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="month-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Mes
          </label>
          <select
            id="month-filter"
            value={selectedMonth}
            onChange={(e) => onMonthChange(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value={0}>Todos los meses</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {getMonthName(month)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="year-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Año
          </label>
          <select
            id="year-filter"
            value={selectedYear}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DashboardFilters;
