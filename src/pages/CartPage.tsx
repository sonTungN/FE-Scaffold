// Cart Page - Grid display of all products with cart functionality
import { useState } from "react";
import { Search } from "lucide-react";
import { useAllProducts } from "@/features/products/hooks/useProducts";
import { ProductCard } from "@/features/products/ui/card/ProductCard";
import { CartIcon } from "@/features/cart/ui/CartIcon";
import { CartSidebar } from "@/features/cart/ui/CartSidebar";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function CartPage() {
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("name-asc");
	const [isCartOpen, setIsCartOpen] = useState(false);

	const { data: products, isLoading, error } = useAllProducts();

	// Filter and sort products
	const filteredAndSortedProducts = products
		? products
				.filter(
					(product) =>
						product.name.toLowerCase().includes(search.toLowerCase()) ||
						product.description.toLowerCase().includes(search.toLowerCase())
				)
				.sort((a, b) => {
					switch (sortBy) {
						case "name-asc":
							return a.name.localeCompare(b.name);
						case "name-desc":
							return b.name.localeCompare(a.name);
						case "price-asc":
							return a.price - b.price;
						case "price-desc":
							return b.price - a.price;
						default:
							return 0;
					}
				})
		: [];

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

			{/* Filters */}
			<div className="bg-white border-b">
				<div className="container mx-auto px-4 py-4">
					<div className="flex gap-4">
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
							<Input
								placeholder="Search products..."
								value={search}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setSearch(e.target.value)
								}
								className="pl-10"
							/>
						</div>
						<Select value={sortBy} onValueChange={setSortBy}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="name-asc">Name (A-Z)</SelectItem>
								<SelectItem value="name-desc">Name (Z-A)</SelectItem>
								<SelectItem value="price-asc">Price (Low-High)</SelectItem>
								<SelectItem value="price-desc">Price (High-Low)</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			{/* Products Grid */}
			<div className="container mx-auto px-4 py-8">
				{isLoading && (
					<div className="text-center py-12">
						<p className="text-lg text-slate-600">Loading products...</p>
					</div>
				)}

				{error && (
					<div className="text-center py-12">
						<p className="text-lg text-red-500">Error loading products</p>
					</div>
				)}

				{filteredAndSortedProducts.length === 0 && !isLoading && (
					<div className="text-center py-12">
						<p className="text-lg text-slate-600">No products found</p>
					</div>
				)}

				{filteredAndSortedProducts.length > 0 && (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
						{filteredAndSortedProducts.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				)}
			</div>

			{/* Cart Sidebar */}
			<CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
		</div>
	);
}
