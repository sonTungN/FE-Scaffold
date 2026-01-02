// User and Auth types
export type UserRole = "ADMIN" | "USER";

export interface User {
	id: string;
	email: string;
	name: string;
	role: UserRole;
	phone?: string;
	address?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface AuthResponse {
	user: User;
	token: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	email: string;
	password: string;
	name: string;
	role?: UserRole;
	phone?: string;
	address?: string;
}

// Customer types
export interface Customer {
	id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface CustomerCreateRequest {
	name: string;
	email: string;
	phone: string;
	address: string;
}

export interface CustomerUpdateRequest {
	name?: string;
	email?: string;
	phone?: string;
	address?: string;
}

// Product types
export interface ProductDto {
  id: string;
	name: string;
	description: string;
	price: number;
}

export interface ProductCreateRequest {
	name: string;
	description: string;
	price: number;
	imageUrl?: string;
	customerId?: string;
	stock?: number;
}

export interface ProductUpdateRequest {
	name?: string;
	description?: string;
	price?: number;
	imageUrl?: string;
	customerId?: string;
	stock?: number;
}

// Cart types
export interface CartItem {
	id: string;
	product: ProductDto;
	quantity: number;
}

export interface Cart {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;
}

// API Error types
export interface ApiError {
	message: string;
	status?: number;
	errors?: Record<string, string[]>;
}

// Pagination types (Spring Boot style)
export interface Pageable {
	pageNumber: number;
	pageSize: number;
	sort: {
		sorted: boolean;
		unsorted: boolean;
		empty: boolean;
	};
	offset: number;
	paged: boolean;
	unpaged: boolean;
}

export interface PageResponse<T> {
	content: T[];
	pageable: Pageable;
	totalPages: number;
	totalElements: number;
	last: boolean;
	size: number;
	number: number;
	sort: {
		sorted: boolean;
		unsorted: boolean;
		empty: boolean;
	};
	numberOfElements: number;
	first: boolean;
	empty: boolean;
}

// Sort and Filter types
export type SortDirection = "asc" | "desc";

export interface SortOption {
	field: string;
	direction: SortDirection;
}

export interface PaginationParams {
	page?: number;
	size?: number;
	sort?: string;
	search?: string;
}

// Country types (from existing code)
export interface Country {
	name: {
		common: string;
		official: string;
	};
	flags: {
		png: string;
		svg: string;
		alt?: string;
	};
	population: number;
}
