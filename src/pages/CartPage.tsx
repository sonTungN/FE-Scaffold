// Cart Page - Grid display of all products with cart functionality
import { useState } from "react";
import { useProductGrid } from "@/features/cart/grid/ProductGridHook";
import { CartIcon } from "@/features/cart/sidebar/CartIcon";
import { CartSidebar } from "@/features/cart/sidebar/CartSidebar";
import ProductGrid from "@/features/cart/grid/ProductGrid";

export default function CartPage() {
	const [isCartOpen, setIsCartOpen] = useState(false);

	const { data: products, isLoading, error } = useProductGrid();

	return (
		<div className="min-h-screen bg-slate-50">
			{/* Header */}
			<div className="bg-white border-b sticky top-0 z-30">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between gap-4">
						<h1 className="text-2xl font-bold">Products</h1>
						<CartIcon onClick={() => setIsCartOpen(true)} />
					</div>
				</div>
			</div>

			{/* Products Grid */}
			<div className="container mx-auto px-4 py-8">
				<ProductGrid
					isLoading={isLoading}
					error={error ? error.message : null}
					data={products || []}
				/>
			</div>

			{/* Cart Sidebar */}
			<CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
		</div>
	);
}
