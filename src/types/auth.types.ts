// Types para autenticación

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}
