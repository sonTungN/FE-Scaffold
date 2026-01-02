import { Link } from "react-router-dom";

function Navbar() {
  // const { isAuthenticated, logout } = useAuthStore();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   logout();
  //   navigate("/login");
  // };

  return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8">
			<div className="flex justify-between items-center h-14">
				<Link to="/" className="text-lg font-semibold text-black no-underline">
					FE-Scaffold
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
						Cart
					</Link>
					<Link
						to="/customers"
						className="text-sm text-black hover:underline no-underline"
					>
						Customers
					</Link>
					<Link
						to="/products"
						className="text-sm text-black hover:underline no-underline"
					>
						Products
					</Link>
					{/* {isAuthenticated ? (
						<button
							onClick={handleLogout}
							className="text-sm text-black hover:bg-red-100 bg-red-300 border-0 px-4 py-1.5 rounded-md cursor-pointer"
						>
							Logout
						</button>
					) : (
						<Link
							to="/login"
							className="text-sm text-black hover:bg-gray-100 bg-gray-300 border-0 px-4 py-1.5 rounded-md cursor-pointer"
						>
							Login
						</Link>
					)} */}
				</nav>
			</div>
		</div>
	);
}

export default Navbar;
