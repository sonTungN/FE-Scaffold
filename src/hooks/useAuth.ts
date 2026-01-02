import { useAuthStore } from "@/store/authStore";

export function useAuth() {
	const { user, isAuthenticated, login, logout, setUser, setToken } =
		useAuthStore();

	return {
		user,
		isAuthenticated,
		login,
		logout,
		setUser,
		setToken,
	};
}
