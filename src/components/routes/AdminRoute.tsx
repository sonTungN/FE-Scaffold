// Admin Route - Protects routes that require admin access
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import type { ReactNode } from "react";

interface AdminRouteProps {
	children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
	const { isAuthenticated, isAdmin } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	if (!isAdmin) {
		// Redirect to home if authenticated but not admin
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
}
