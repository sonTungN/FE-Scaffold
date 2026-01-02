import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "@/types";

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isAdmin: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	setUser: (user: User) => void;
	setToken: (token: string) => void;
	checkRole: () => UserRole | null;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			token: null,
			isAuthenticated: false,
			isAdmin: false,
			login: async (email: string) => {
				try {
					// TODO: Replace with actual API call
					// For now, mock user with admin role if email contains "admin"
					const role: UserRole = email.toLowerCase().includes("admin")
						? "ADMIN"
						: "USER";
					const mockUser: User = {
						id: "1",
						email,
						name: email.toLowerCase().includes("admin")
							? "Admin User"
							: "Demo User",
						role,
					};
					const mockToken = "mock-jwt-token-" + Date.now();

					localStorage.setItem("auth_token", mockToken);
					set({
						user: mockUser,
						token: mockToken,
						isAuthenticated: true,
						isAdmin: role === "ADMIN",
					});
				} catch (error) {
					console.error("Login failed:", error);
					throw error;
				}
			},
			logout: async () => {
				try {
					await new Promise((resolve) => setTimeout(resolve, 500));
				} catch (error) {
					console.error("Logout error:", error);
				} finally {
					localStorage.removeItem("auth_token");
					set({
						user: null,
						token: null,
						isAuthenticated: false,
						isAdmin: false,
					});
				}
			},
			setUser: (user: User) => {
				set({ user, isAdmin: user.role === "ADMIN" });
			},
			setToken: (token: string) => {
				localStorage.setItem("auth_token", token);
				set({ token, isAuthenticated: true });
			},
			checkRole: () => {
				const { user } = get();
				return user?.role || null;
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				user: state.user,
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				isAdmin: state.isAdmin,
			}),
		}
	)
);
