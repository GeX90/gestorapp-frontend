import { unparse } from 'papaparse';
import type { Transaction } from '../types/transaction.types';

/**
 * Formatea una transacción para la exportación CSV
 */
const formatTransactionForCSV = (transaction: Transaction) => {
  return {
    Fecha: new Date(transaction.date).toLocaleDateString('es-ES'),
    Descripción: transaction.description,
    Tipo: transaction.type === 'INCOME' ? 'Ingreso' : 'Gasto',
    Categoría: transaction.category?.name || 'Sin categoría',
    Monto: transaction.amount.toFixed(2),
  };
};

/**
 * Exporta un array de transacciones a un archivo CSV
 * @param transactions Array de transacciones a exportar
 * @param fileName Nombre del archivo (opcional)
 */
export const exportTransactionsToCSV = (
  transactions: Transaction[],
  fileName?: string
): void => {
  if (transactions.length === 0) {
    throw new Error('No hay transacciones para exportar');
  }

  // Formatear datos
  const formattedData = transactions.map(formatTransactionForCSV);

  // Convertir a CSV usando papaparse
  const csv = unparse(formattedData, {
    delimiter: ',',
    header: true,
  });

  // Crear blob y descargar
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  const defaultFileName = `transacciones_${new Date().toISOString().split('T')[0]}.csv`;
  
  link.setAttribute('href', url);
  link.setAttribute('download', fileName || defaultFileName);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Formatea un número como moneda
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

/**
 * Formatea una fecha
 */
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Obtiene el nombre del mes
 */
export const getMonthName = (month: number): string => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[month - 1] || '';
};
