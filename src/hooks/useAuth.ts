import { useAuthStore } from "@/store/authStore";

export function useAuth() {
	const { user, isAuthenticated, login, logout, setUser } =
		useAuthStore();

	return {
		user,
		isAuthenticated,
		login,
		logout,
		setUser
	};
}
