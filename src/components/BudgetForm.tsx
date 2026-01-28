import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { budgetSchema } from '../schemas/budget.schema';
import type { BudgetFormData } from '../schemas/budget.schema';
import type { Category } from '../types/transaction.types';
import type { BudgetWithProgress } from '../types/budget.types';
import { getMonthName } from '../utils/export.utils';

interface BudgetFormProps {
  categories: Category[];
  onSubmit: (data: BudgetFormData) => void;
  onCancel: () => void;
  initialData?: BudgetWithProgress;
  isLoading?: boolean;
}

const BudgetForm = ({
  categories,
  onSubmit,
  onCancel,
  initialData,
  isLoading,
}: BudgetFormProps) => {
  const currentDate = new Date();
  const defaultMonth = initialData?.month || currentDate.getMonth() + 1;
  const defaultYear = initialData?.year || currentDate.getFullYear();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || '',
      amount: initialData?.amount || 0,
      month: defaultMonth,
      year: defaultYear,
    },
  });

  const years = Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Categoría */}
      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
          Categoría
        </label>
        <select
          id="categoryId"
          {...register('categoryId')}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.categoryId ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={isLoading}
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
        )}
      </div>

      {/* Monto */}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
          Monto del Presupuesto
        </label>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <input
              id="amount"
              type="number"
              step="0.01"
              {...field}
              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
              disabled={isLoading}
            />
          )}
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      {/* Mes y Año */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
            Mes
          </label>
          <Controller
            name="month"
            control={control}
            render={({ field }) => (
              <select
                id="month"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.month ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {getMonthName(month)}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.month && (
            <p className="mt-1 text-sm text-red-600">{errors.month.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
            Año
          </label>
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <select
                id="year"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.year ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.year && (
            <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
          )}
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-2 rounded-lg font-semibold text-white transition ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
          }`}
        >
          {isLoading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;
