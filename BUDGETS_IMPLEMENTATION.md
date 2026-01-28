# 💰 Página de Presupuestos - Implementación Completa

## ✅ Funcionalidades Implementadas

### 1. **Crear/Editar Presupuesto Mensual**
- Formulario completo con validación Zod
- Selección de categoría
- Monto del presupuesto
- Mes y año específicos
- Formulario modal in-page
- Modo edición con datos pre-cargados

### 2. **Mostrar Porcentaje Gastado**
- Barra de progreso visual
- Porcentaje exacto (0-100%)
- Colores dinámicos según el nivel:
  - Verde: < 80%
  - Naranja: 80-100%
  - Rojo: > 100% (superado)

### 3. **Alertas al Superar 80%**
- Toast de advertencia (warning) al alcanzar 80%
- Toast de error al superar 100%
- Alertas solo para el mes actual
- Deduplicación con `toastId`
- Mensaje personalizado por categoría

### 4. **Integración con Backend**
- CRUD completo de presupuestos
- Cálculo de progreso desde el backend
- React Query para cache y sincronización
- Manejo de errores con toasts

## 📁 Archivos Creados

### Tipos y Servicios
```
src/
├── types/
│   └── budget.types.ts              ✅ Interfaces Budget, BudgetWithProgress
├── services/
│   └── budget.service.ts            ✅ CRUD y obtener progreso
├── schemas/
│   └── budget.schema.ts             ✅ Validación Zod
└── hooks/
    └── useBudgets.ts                ✅ Hooks React Query
```

### Componentes UI
```
src/components/
├── BudgetCard.tsx                   ✅ Tarjeta de presupuesto con alertas
└── BudgetForm.tsx                   ✅ Formulario crear/editar
```

### Página Principal
```
src/pages/
└── BudgetsPage.tsx                  ✅ Página completa de presupuestos
```

## 🎯 Estructura de Datos

### Budget (Backend Response)
```typescript
{
  id: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    color: string;
  };
  amount: number;        // Monto del presupuesto
  month: number;         // 1-12
  year: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
```

### BudgetWithProgress (con cálculo)
```typescript
{
  ...Budget,
  spent: number;           // Cantidad gastada
  remaining: number;       // amount - spent
  percentageUsed: number;  // (spent / amount) * 100
  isOverBudget: boolean;   // spent > amount
  isWarning: boolean;      // percentageUsed >= 80
}
```

## 📡 Endpoints del Backend Requeridos

### CRUD de Presupuestos
```
GET    /api/budgets?month=1&year=2026    // Lista con progreso
GET    /api/budgets/:id                   // Un presupuesto con progreso
POST   /api/budgets                       // Crear presupuesto
PUT    /api/budgets/:id                   // Actualizar
DELETE /api/budgets/:id                   // Eliminar
```

### Request Body - Crear/Actualizar
```json
{
  "categoryId": "cat1",
  "amount": 500,
  "month": 1,
  "year": 2026
}
```

### Response - GET con progreso
```json
{
  "id": "budget1",
  "categoryId": "cat1",
  "category": {
    "id": "cat1",
    "name": "Alimentación",
    "color": "#10B981"
  },
  "amount": 500,
  "month": 1,
  "year": 2026,
  "userId": "user1",
  "spent": 450,
  "remaining": 50,
  "percentageUsed": 90,
  "isOverBudget": false,
  "isWarning": true,
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-01-01T00:00:00Z"
}
```

## 🎨 Componentes de UI

### BudgetCard
Muestra un presupuesto con:
- **Header**: Nombre de categoría con punto de color + botones editar/eliminar
- **Alerta Visual**: Banner naranja (80-100%) o rojo (>100%) si aplica
- **Información de Montos**:
  - Presupuesto total
  - Cantidad gastada
  - Cantidad disponible (verde o rojo según sea positivo/negativo)
- **Barra de Progreso**:
  - Verde: < 80%
  - Naranja: 80-100%
  - Rojo: > 100%
  - Porcentaje mostrado

### BudgetForm
Formulario para crear/editar:
- **Campo Categoría**: Select con todas las categorías del usuario
- **Campo Monto**: Input numérico con validación (> 0, < 1,000,000)
- **Campo Mes**: Select con meses en español
- **Campo Año**: Select con próximos 10 años
- **Validación en tiempo real** con react-hook-form + Zod
- **Botones**: Cancelar y Guardar (con loading state)

### BudgetsPage
Página completa con:
- **Header**: Título, descripción, botones Dashboard y Logout
- **Filtros**: Mes y año + botón "Nuevo Presupuesto"
- **Formulario Modal**: Se muestra al crear/editar
- **Grid de Tarjetas**: Responsive (1-2-3 columnas)
- **Estado Vacío**: Ilustración y mensaje cuando no hay presupuestos
- **Estado de Carga**: Spinner mientras carga datos

## 🚨 Sistema de Alertas

### Lógica de Alertas
```typescript
// Alertas solo para el mes actual
const isCurrentMonth = 
  budget.month === currentMonth && 
  budget.year === currentYear;

// Alerta de superación (>100%)
if (isCurrentMonth && budget.isOverBudget) {
  toast.error(`¡Has superado el presupuesto de ${categoryName}!`);
}

// Alerta de advertencia (≥80%)
if (isCurrentMonth && budget.isWarning && !budget.isOverBudget) {
  toast.warning(`Alerta: Has gastado más del 80% en ${categoryName}`);
}
```

### Tipos de Alertas
1. **Warning (Naranja)**: 80-100% del presupuesto
2. **Error (Rojo)**: > 100% del presupuesto
3. **Solo mes actual**: No se muestran alertas para meses pasados/futuros
4. **Deduplicación**: `toastId` previene alertas duplicadas

## 🎨 Colores y Estados

### Barra de Progreso
```css
< 80%:  bg-green-500   (Verde)
80-99%: bg-orange-500  (Naranja - Advertencia)
≥ 100%: bg-red-500     (Rojo - Superado)
```

### Banner de Alerta
```css
80-99%: bg-orange-50 text-orange-800  (Advertencia)
≥ 100%: bg-red-50 text-red-800        (Error)
```

### Monto Disponible
```css
Positivo: text-green-600
Negativo: text-red-600
```

## 🔄 Flujo de Usuario

### Crear Presupuesto
1. Usuario hace clic en "Nuevo Presupuesto"
2. Se muestra formulario con valores por defecto (mes/año actual)
3. Usuario selecciona categoría y monto
4. Al guardar, se envía POST al backend
5. React Query invalida cache y recarga lista
6. Toast de éxito y formulario se cierra

### Editar Presupuesto
1. Usuario hace clic en botón de editar (lápiz)
2. Formulario se abre con datos pre-cargados
3. Usuario modifica campos
4. Al guardar, se envía PUT al backend
5. Cache se invalida y datos se actualizan
6. Toast de éxito

### Eliminar Presupuesto
1. Usuario hace clic en botón eliminar (basura)
2. Confirmación con `window.confirm()`
3. Si confirma, DELETE al backend
4. Lista se actualiza automáticamente
5. Toast de éxito

### Alertas Automáticas
1. Al cargar presupuestos del mes actual
2. React Query obtiene datos con progreso
3. `useEffect` detecta presupuestos con warning/over
4. Muestra toasts correspondientes
5. Solo una vez por presupuesto (toastId)

## 🔍 Validaciones

### Schema Zod
```typescript
budgetSchema = {
  categoryId: string (min 1 char)
  amount: number (>0, <1,000,000)
  month: number (1-12)
  year: number (2020-2100)
}
```

### Mensajes de Error
- "Debes seleccionar una categoría"
- "El monto es requerido"
- "El monto debe ser mayor a 0"
- "El monto es demasiado alto"
- "El mes debe ser entre 1 y 12"
- "El año debe ser 2020 o posterior"

## 💡 Características Técnicas

### React Query
- **Cache**: 1 minuto
- **Invalidación automática** después de mutaciones
- **Optimistic updates** no implementado (podría agregarse)
- **Retry**: 1 intento por defecto

### TypeScript
- Tipado completo en todos los componentes
- Interfaces para Budget y BudgetWithProgress
- Type inference con Zod

### Accesibilidad
- Labels asociados a inputs
- Botones con títulos descriptivos
- Colores con suficiente contraste
- Teclado navegable

## 📱 Responsive Design

```css
Mobile:  1 columna de tarjetas
Tablet:  2 columnas (md:grid-cols-2)
Desktop: 3 columnas (lg:grid-cols-3)
```

## 🧪 Datos de Prueba

Para probar la funcionalidad de alertas, crea presupuestos con:

```json
// 90% gastado (Alerta naranja)
{
  "categoryId": "alimentacion",
  "amount": 500,
  "month": 1,
  "year": 2026,
  // Backend debe calcular: spent = 450 (90%)
}

// 110% gastado (Alerta roja)
{
  "categoryId": "transporte",
  "amount": 300,
  "month": 1,
  "year": 2026,
  // Backend debe calcular: spent = 330 (110%)
}

// 50% gastado (Sin alerta)
{
  "categoryId": "ocio",
  "amount": 200,
  "month": 1,
  "year": 2026,
  // Backend debe calcular: spent = 100 (50%)
}
```

## 🎯 Backend - Cálculo del Progreso

El backend debe:
1. Recibir el presupuesto (categoryId, amount, month, year)
2. Consultar transacciones del mes que coincidan con la categoría
3. Sumar gastos (type = EXPENSE)
4. Calcular:
   ```typescript
   spent = sum(transactions.amount where type=EXPENSE)
   remaining = amount - spent
   percentageUsed = (spent / amount) * 100
   isOverBudget = spent > amount
   isWarning = percentageUsed >= 80
   ```
5. Retornar BudgetWithProgress

## 🚀 Mejoras Futuras

1. **Notificaciones Push**: Alertas en tiempo real
2. **Comparativa de Meses**: Gráfico de evolución
3. **Predicción**: Estimación de fin de mes
4. **Categorías Múltiples**: Presupuesto total vs por categoría
5. **Ajuste Automático**: Sugerir ajustes basados en patrones
6. **Exportar**: Reporte de presupuestos vs gastos en PDF
7. **Metas**: Establecer metas de ahorro

## 📊 Navegación

- **Dashboard → Presupuestos**: Botón morado en header
- **Presupuestos → Dashboard**: Botón gris en header
- **Logout**: Disponible en ambas páginas

---

**¡Página de Presupuestos completamente funcional con alertas inteligentes!** 💰🎯
