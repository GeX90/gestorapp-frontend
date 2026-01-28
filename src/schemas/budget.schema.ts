import { z } from 'zod';

// Schema de validación para crear/editar presupuesto
export const budgetSchema = z.object({
  categoryId: z
    .string()
    .min(1, 'Debes seleccionar una categoría'),
  amount: z
    .number({
      required_error: 'El monto es requerido',
      invalid_type_error: 'El monto debe ser un número',
    })
    .positive('El monto debe ser mayor a 0')
    .max(1000000, 'El monto es demasiado alto'),
  month: z
    .number({
      required_error: 'El mes es requerido',
    })
    .min(1, 'El mes debe ser entre 1 y 12')
    .max(12, 'El mes debe ser entre 1 y 12'),
  year: z
    .number({
      required_error: 'El año es requerido',
    })
    .min(2020, 'El año debe ser 2020 o posterior')
    .max(2100, 'El año debe ser menor a 2100'),
});

// Tipo inferido del schema
export type BudgetFormData = z.infer<typeof budgetSchema>;
