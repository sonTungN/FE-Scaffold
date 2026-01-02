import apiClient from "@/services/api";
import type { AuthResponse } from "@/types";
import { UrlConfig } from "@/utils/UrlConfig";

export const authService = {
	async login(email: string, password: string): Promise<AuthResponse> {
		const response = await apiClient.post<AuthResponse>(
			UrlConfig.AUTH.LOGIN,
			{
				email,
				password,
			}
		);
		return response.data;
	},

	async logout(): Promise<void> {
		await apiClient.post(UrlConfig.AUTH.LOGOUT);
	},

	async register(
		email: string,
		password: string,
		name: string
	): Promise<AuthResponse> {
		const response = await apiClient.post<AuthResponse>(
			UrlConfig.AUTH.REGISTER,
			{
				email,
				password,
				name,
			}
		);
		return response.data;
	},
};
