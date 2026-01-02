import { Outlet } from "react-router-dom";
import Navbar from "@/components/common/Navbar";

export default function MainLayout() {
	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white border-b border-gray-200">
				<Navbar />
			</header>
			<main className="min-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<Outlet />
			</main>
		</div>
	);
}
