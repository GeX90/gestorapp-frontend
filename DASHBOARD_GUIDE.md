# 🚀 Guía de Uso del Dashboard

## Iniciar el Proyecto

```bash
# Instalar dependencias (si aún no lo has hecho)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## Configuración del Backend

Asegúrate de que tu backend esté corriendo y configura la URL en el archivo `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

## Estructura de Datos del Backend

### Modelo de Transaction
```typescript
{
  id: string;
  amount: number;
  description: string;
  type: 'INCOME' | 'EXPENSE';
  date: string; // ISO 8601
  categoryId: string;
  userId: string;
  category?: {
    id: string;
    name: string;
    color: string; // Hex color code
  };
}
```

### Endpoints Requeridos

#### Transacciones
- `GET /api/transactions?month=1&year=2026` - Lista con filtros
- `POST /api/transactions` - Crear
- `PUT /api/transactions/:id` - Actualizar
- `DELETE /api/transactions/:id` - Eliminar

#### Estadísticas
- `GET /api/transactions/stats/dashboard?month=1&year=2026`
  ```json
  {
    "totalIncome": 5000,
    "totalExpenses": 3500,
    "balance": 1500,
    "transactionCount": 45
  }
  ```

- `GET /api/transactions/stats/categories?month=1&year=2026`
  ```json
  [
    {
      "categoryId": "1",
      "categoryName": "Alimentación",
      "categoryColor": "#10B981",
      "totalIncome": 0,
      "totalExpenses": 800,
      "transactionCount": 15
    }
  ]
  ```

#### Categorías
- `GET /api/categories` - Lista de categorías del usuario
- `POST /api/categories` - Crear categoría
- `PUT /api/categories/:id` - Actualizar
- `DELETE /api/categories/:id` - Eliminar

## Funcionalidades del Dashboard

### 1. Filtros
- **Mes**: Selecciona un mes específico o "Todos los meses"
- **Año**: Selecciona entre los últimos 10 años
- Los filtros se aplican automáticamente a todos los componentes

### 2. Tarjetas de Estadísticas
- **Ingresos**: Total de ingresos del período filtrado
- **Gastos**: Total de gastos del período filtrado
- **Balance**: Diferencia entre ingresos y gastos
  - Verde/Azul si es positivo
  - Rojo/Naranja si es negativo

### 3. Gráficos

#### Gráfico de Barras (Ingresos vs Gastos)
- Compara ingresos y gastos por categoría
- Barras verdes: Ingresos
- Barras rojas: Gastos
- Hover para ver detalles

#### Gráfico de Dona (Gastos por Categoría)
- Muestra distribución de gastos
- Colores por categoría
- Lista detallada debajo del gráfico

### 4. Tabla de Transacciones
- Muestra todas las transacciones del período filtrado
- Columnas: Fecha, Descripción, Categoría, Tipo, Monto
- Formato de moneda con símbolo + o -

### 5. Exportación a CSV
- Botón verde "Exportar a CSV"
- Descarga archivo con formato: `transacciones_mes_X_2026.csv`
- Incluye todas las transacciones filtradas
- Formato en español

### 6. Cerrar Sesión
- Botón rojo en el header
- Limpia el token y redirige a login

## Colores de Categorías Sugeridos

```typescript
const categoryColors = {
  'Alimentación': '#10B981',    // Verde
  'Transporte': '#3B82F6',      // Azul
  'Vivienda': '#8B5CF6',        // Púrpura
  'Salud': '#EF4444',           // Rojo
  'Entretenimiento': '#F59E0B', // Ámbar
  'Educación': '#06B6D4',       // Cian
  'Ropa': '#EC4899',            // Rosa
  'Servicios': '#6366F1',       // Índigo
  'Otros': '#64748B',           // Gris
};
```

## Datos de Prueba

Para probar el dashboard, crea algunas transacciones de prueba en tu backend:

```json
[
  {
    "amount": 3000,
    "description": "Salario mensual",
    "type": "INCOME",
    "date": "2026-01-01",
    "categoryId": "salario"
  },
  {
    "amount": 500,
    "description": "Supermercado",
    "type": "EXPENSE",
    "date": "2026-01-15",
    "categoryId": "alimentacion"
  },
  {
    "amount": 800,
    "description": "Alquiler",
    "type": "EXPENSE",
    "date": "2026-01-01",
    "categoryId": "vivienda"
  },
  {
    "amount": 100,
    "description": "Gasolina",
    "type": "EXPENSE",
    "date": "2026-01-20",
    "categoryId": "transporte"
  }
]
```

## Solución de Problemas

### Error: No hay datos en el dashboard
**Causa**: Backend no está corriendo o URL incorrecta
**Solución**: 
1. Verifica que el backend esté en `http://localhost:3000`
2. Revisa el archivo `.env`
3. Mira la consola del navegador para errores

### Error: Token inválido o 401
**Causa**: Token JWT expirado
**Solución**:
1. Cierra sesión
2. Vuelve a iniciar sesión
3. El sistema redirige automáticamente si hay error 401

### No se descarga el CSV
**Causa**: No hay transacciones para exportar
**Solución**: Asegúrate de tener transacciones en el período filtrado

### Gráficos no se muestran
**Causa**: No hay datos de categorías
**Solución**:
1. Crea categorías en el backend
2. Asigna categorías a las transacciones
3. Verifica que el endpoint `/stats/categories` funcione

## Próximos Pasos

Para extender el dashboard:

1. **Crear Transacción**: Modal o página para agregar transacciones
2. **Editar Transacción**: Botones de acción en la tabla
3. **Eliminar Transacción**: Confirmación antes de eliminar
4. **Gestión de Categorías**: CRUD completo de categorías
5. **Presupuestos**: Crear y monitorear presupuestos mensuales
6. **Alertas**: Notificaciones al superar presupuestos
7. **Gráficos Adicionales**: Tendencias mensuales, comparativas anuales
8. **Filtros Avanzados**: Por categoría, rango de fechas, búsqueda

## Scripts Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# Fix de linting
npm run lint -- --fix
```

## Estructura de Archivos

```
src/
├── components/          # Componentes reutilizables
├── config/             # Configuración (axios)
├── hooks/              # Hooks personalizados
├── pages/              # Páginas de la app
├── services/           # Servicios de API
├── schemas/            # Validaciones Zod
├── types/              # Tipos TypeScript
└── utils/              # Utilidades
```

## Tecnologías Utilizadas

- **React 19**: UI Library
- **TypeScript**: Tipado estático
- **Vite**: Build tool
- **React Query**: State management
- **Chart.js**: Gráficos
- **Tailwind CSS**: Estilos
- **Axios**: HTTP client
- **React Hook Form**: Formularios
- **Zod**: Validación
- **PapaParse**: CSV export
- **React Toastify**: Notificaciones

---

**¡Disfruta tu Dashboard de Gestión de Gastos!** 💰📊
