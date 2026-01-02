import { useState, type FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ROUTES } from "@/utils/RoutesConstant";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuthStore();
	const navigate = useNavigate();
	const location = useLocation();

	const originPage =
		(location.state as { from?: { pathname: string } })?.from?.pathname ||
		ROUTES.LANDING;

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await login(email, password);
			navigate(originPage, { replace: true });
		} catch (error) {
			console.error("Login failed:", error);
			alert("Login failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-[60vh]">
			<LoginForm
				handleSubmit={handleSubmit}
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
				isLoading={isLoading}
			/>
		</div>
	);
}
