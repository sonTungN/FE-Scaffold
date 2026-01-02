import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "@/types/auth";

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isAdmin: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	setUser: (user: User) => void;
	checkRole: () => UserRole | null;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			isAuthenticated: false,
			isAdmin: false,
			login: async (email: string) => {
				try {
					const role: UserRole = email.toLowerCase().includes("admin")
						? "ADMIN"
						: "USER";
					const currentUser: User = {
						id: "1",
						email,
						name: email.toLowerCase().includes("admin")
							? "Admin User"
							: "Demo User",
						role,
					};
					set({
						user: currentUser,
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
					set({
						user: null,
						isAuthenticated: false,
						isAdmin: false,
					});
				}
			},
			setUser: (user: User) => {
				set({ user, isAdmin: user.role === "ADMIN" });
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
				isAuthenticated: state.isAuthenticated,
				isAdmin: state.isAdmin,
			}),
		}
	)
);
