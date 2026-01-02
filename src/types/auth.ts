// User and Auth types
export type UserRole = "ADMIN" | "USER";

export interface User {
	id: string,
  name: string,
  email: string,
  role: UserRole
}

export interface AuthResponse {
	id: string
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	name: string;
	email: string;
	password: string;
	phone?: string;
	address?: string;
}
