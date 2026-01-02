import { useState } from "react";
import type { ProductDto } from "@/types/product";
import { ProductGridItem } from "./ProductGridItem";
import { Button } from "@/components/ui/button";

interface ProductGridProps {
	isLoading: boolean;
	error: string | null;
	data: ProductDto[];
}

const ITEMS_PER_PAGE = 5;

function ProductGrid({ isLoading, error, data }: ProductGridProps) {
	const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

	// Slice data to show only visible items
	const visibleProducts = data.slice(0, visibleCount);
	const hasMore = visibleCount < data.length;

	const handleLoadMore = () => {
		setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
	};

	return (
		<>
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

			{data.length === 0 && !isLoading && (
				<div className="text-center py-12">
					<p className="text-lg text-slate-600">No products found</p>
				</div>
			)}

			{data.length > 0 && (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
						{visibleProducts.map((product) => (
							<ProductGridItem key={product.id} product={product} />
						))}
					</div>

					{/* Load More Button */}
					{hasMore && (
						<div className="flex justify-center mt-8">
							<Button onClick={handleLoadMore} size="lg" variant="outline">
								Load More ({data.length - visibleCount} remaining)
							</Button>
						</div>
					)}

					{/* Showing count */}
					<div className="text-center mt-4 text-sm text-slate-600">
						Showing {visibleProducts.length} of {data.length} products
					</div>
				</>
			)}
		</>
	);
}

export default ProductGrid;
