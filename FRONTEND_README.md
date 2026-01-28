# Gestor de Gastos Personales - Frontend

Aplicación web para gestión de finanzas personales construida con React, TypeScript y Vite.

## 🚀 Características

- ✅ **Autenticación**: Login y registro de usuarios con JWT
- 💰 **Transacciones**: CRUD completo de ingresos y gastos
- 📊 **Categorías**: Gestión de categorías personalizadas
- 💳 **Presupuestos**: Control de presupuestos mensuales con alertas
- 📈 **Dashboard**: Gráficos interactivos mensuales y anuales
- 📥 **Exportación**: Descarga de transacciones en formato CSV

## 🛠️ Tecnologías

- **React 19** - Librería de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **React Query** - Gestión de estado y cache
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de schemas
- **Chart.js** - Gráficos interactivos
- **Tailwind CSS** - Framework de estilos
- **React Toastify** - Notificaciones
- **PapaParse** - Exportación CSV

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   cd gastos-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```

   Edita el archivo `.env` con la URL de tu backend:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Compilar para producción**
   ```bash
   npm run build
   ```

## 📁 Estructura del Proyecto

```
src/
├── config/           # Configuraciones (axios)
├── pages/            # Páginas de la aplicación
├── services/         # Servicios para API calls
├── schemas/          # Schemas de validación Zod
├── types/            # Tipos e interfaces TypeScript
├── hooks/            # Hooks personalizados
├── components/       # Componentes reutilizables
├── utils/            # Utilidades y helpers
├── App.tsx           # Componente principal
└── main.tsx          # Punto de entrada
```

## 🔐 Autenticación

### Login

La página de login incluye:
- Validación de email y contraseña
- Manejo de errores con toasts
- Almacenamiento seguro del token JWT
- Redirección automática al dashboard

```typescript
// Credenciales de prueba
Email: usuario@test.com
Password: 123456
```

### Rutas Protegidas

Las rutas privadas están protegidas con el componente `PrivateRoute`:
- Verifica la existencia del token en localStorage
- Redirige al login si no hay token válido
- Permite acceso al contenido si está autenticado

## 🎨 Personalización

### Tailwind CSS

Los estilos se pueden personalizar en `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
      },
    },
  },
}
```

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Compilar para producción
npm run preview      # Preview del build
npm run lint         # Ejecutar ESLint
```

## 🔗 Endpoints del Backend

Asegúrate de que tu backend esté corriendo en la URL especificada en `.env` con los siguientes endpoints:

```
POST   /api/auth/login       # Login de usuario
POST   /api/auth/register    # Registro de usuario
GET    /api/transactions     # Listar transacciones
POST   /api/transactions     # Crear transacción
PUT    /api/transactions/:id # Actualizar transacción
DELETE /api/transactions/:id # Eliminar transacción
GET    /api/categories       # Listar categorías
POST   /api/categories       # Crear categoría
GET    /api/budgets          # Listar presupuestos
POST   /api/budgets          # Crear presupuesto
```

## 🐛 Troubleshooting

### Error de conexión con el backend

Verifica que:
1. El backend esté corriendo
2. La URL en `.env` sea correcta
3. El backend permita CORS desde tu frontend

### Tokens no válidos

Si recibes errores 401:
1. Limpia el localStorage
2. Vuelve a hacer login
3. Verifica que el token no haya expirado

## 👨‍💻 Desarrollo

### Crear nuevas páginas

1. Crear archivo en `src/pages/MiPagina.tsx`
2. Agregar ruta en `src/App.tsx`
3. Proteger si es necesario con `PrivateRoute`

### Agregar servicios

1. Crear archivo en `src/services/miServicio.service.ts`
2. Usar la instancia configurada de axios
3. Tipar las respuestas con interfaces

### Validaciones de formularios

1. Crear schema en `src/schemas/miSchema.schema.ts`
2. Usar con react-hook-form y zodResolver
3. Tipar el formulario con `z.infer<typeof schema>`

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

---

Desarrollado con ❤️ para Ironhack 2025
