import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function MainLayout() {
	const { isAuthenticated, logout } = useAuthStore();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-14">
						<Link
							to="/"
							className="text-lg font-semibold text-black no-underline"
						>
							React App
						</Link>
						<nav className="flex items-center space-x-6">
							<Link
								to="/"
								className="text-sm text-black hover:underline no-underline"
							>
								Landing
							</Link>
							<Link
								to="/cart"
								className="text-sm text-black hover:underline no-underline"
							>
								Cart (USER)
							</Link>
							<Link
								to="/customers"
								className="text-sm text-black hover:underline no-underline"
							>
								Customers (ADMIN)
							</Link>
							<Link
								to="/products"
								className="text-sm text-black hover:underline no-underline"
							>
								Products (ADMIN)
							</Link>
							{isAuthenticated ? (
								<button
									onClick={handleLogout}
									className="text-sm text-black hover:underline bg-transparent border-0 p-0 cursor-pointer"
								>
									Logout
								</button>
							) : (
								<Link
									to="/login"
									className="text-sm text-black hover:underline no-underline"
								>
									Login
								</Link>
							)}
						</nav>
					</div>
				</div>
			</header>
			<main className="min-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<Outlet />
			</main>
		</div>
	);
}
