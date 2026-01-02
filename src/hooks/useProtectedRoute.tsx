import { Navigate, useLocation } from "react-router-dom";
import type { User } from "@/types";

interface UseProtectedRouteOptions {
	user: User | null;
	redirectTo?: string;
}

export function useProtectedRoute({
	user,
	redirectTo = "/login",
}: UseProtectedRouteOptions) {
	const location = useLocation();

	if (!user) {
		return <Navigate to={redirectTo} state={{ from: location }} replace />;
	}

	return null;
}
