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

export default httpClient;
