import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import LandingPage from "@/pages/LandingPage";
import CustomerPage from "@/pages/CustomerPage";
import ProductsPage from "@/pages/ProductsPage";
import CartPage from "@/pages/CartPage";

function AppRoutes() {
	// const { user } = useAuthStore();

	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<LandingPage />} />
				{/* <Route
					path="admin"
					element={
						<AdminRoute>
							<AdminPage />
						</AdminRoute>
					}
				/> */}
				<Route
					path="customers"
					element={
						// <AdminRoute>
							<CustomerPage />
						// </AdminRoute>
					}
				/>
				<Route
					path="products"
					element={
						// <AdminRoute>
							<ProductsPage />
						// </AdminRoute>
					}
				/>
				<Route
					path="cart"
					element={
						// <ProtectedRoute user={user}>
							<CartPage />
						// </ProtectedRoute>
					}
				/>
				{/* <Route path="login" element={<LoginPage />} /> */}
				<Route path="*" element={<p>There's nothing here: 404!</p>} />
			</Route>
		</Routes>
	);
}

export function AppRouter() {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
}
