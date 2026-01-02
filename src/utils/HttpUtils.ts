// HttpUtils.ts - HTTP utility functions using Axios with TanStack Query integration
import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosResponse,
} from "axios";
import { API_BASE_URL } from "./UrlConfig";

// Create axios instance
const httpClient: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor - add auth token
httpClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("auth_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor - handle common errors
httpClient.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error) => {
		if (error.response?.status === 401) {
			// Unauthorized - redirect to login
			localStorage.removeItem("auth_token");
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

// Generic HTTP methods
export const HttpUtils = {
	// GET request
	get: async <T = unknown>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<T> => {
		const response = await httpClient.get<T>(url, config);
		return response.data;
	},

	// POST request
	post: async <T = unknown, D = unknown>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig
	): Promise<T> => {
		const response = await httpClient.post<T>(url, data, config);
		return response.data;
	},

	// PUT request
	put: async <T = unknown, D = unknown>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig
	): Promise<T> => {
		const response = await httpClient.put<T>(url, data, config);
		return response.data;
	},

	// PATCH request (for partial updates)
	patch: async <T = unknown, D = unknown>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig
	): Promise<T> => {
		const response = await httpClient.patch<T>(url, data, config);
		return response.data;
	},

	// DELETE request
	delete: async <T = unknown>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<T> => {
		const response = await httpClient.delete<T>(url, config);
		return response.data;
	},
};

// Paginated response type for Spring Boot
export interface PageResponse<T> {
	content: T[];
	pageable: {
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
	};
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

// Query parameters for paginated requests
export interface PaginationParams {
	page?: number;
	size?: number;
	sort?: string; // e.g., "name,asc" or "createdAt,desc"
	search?: string;
}

// Build query string from pagination params
export const buildQueryString = (params: PaginationParams): string => {
	const queryParams = new URLSearchParams();

	if (params.page !== undefined)
		queryParams.append("page", params.page.toString());
	if (params.size !== undefined)
		queryParams.append("size", params.size.toString());
	if (params.sort) queryParams.append("sort", params.sort);
	if (params.search) queryParams.append("search", params.search);

	const queryString = queryParams.toString();
	return queryString ? `?${queryString}` : "";
};

export default httpClient;
