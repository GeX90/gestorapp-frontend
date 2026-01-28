import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginSchema } from '../schemas/auth.schema';
import type { LoginFormData } from '../schemas/auth.schema';
import { authService } from '../services/auth.service';

const LoginPage = () => {
  const navigate = useNavigate();

  // Configurar react-hook-form con validación Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Configurar React Query mutation para el login
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Guardar token en localStorage
      authService.setToken(data.access_token);
      
      // Mostrar mensaje de éxito
      toast.success(`¡Bienvenido, ${data.user.name}!`);
      
      // Redirigir al dashboard
      navigate('/dashboard');
    },
    onError: (error: any) => {
      // Manejar errores y mostrar mensaje
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      toast.error(message);
    },
  });

  // Manejar el submit del formulario
  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Gestor de Gastos
          </h1>
          <p className="text-gray-600">Inicia sesión para continuar</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Campo Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Botón Submit */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-200 ${
              loginMutation.isPending
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            {loginMutation.isPending ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        {/* Link a registro */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
