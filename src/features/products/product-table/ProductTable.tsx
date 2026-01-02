import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableCell,
	TableHead,
} from "@/components/ui/table";
import type { ProductDto, ProductListDto } from "@/types/product";
import ProductTableRow from "./ProductTableRow";

interface ProductTableProps {
	isLoading: boolean;
	error: string | null;
	data: ProductListDto;
	setEditingProduct: (product: ProductDto) => void;
	setDeletingProduct: (product: ProductDto) => void;
}

function ProductTable({
	isLoading,
	error,
	data,
	setEditingProduct,
	setDeletingProduct,
}: ProductTableProps) {
	return (
		<>
			{isLoading && <p className="text-center py-4">Loading products...</p>}
			{error && (
				<p className="text-center py-4 text-red-500">Error loading products</p>
			)}

			{data && (
				<>
					<div className="border rounded-lg">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Description</TableHead>
									<TableHead>Price</TableHead>
									<TableHead className="text-center">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data.responseProductDtos.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={4}
											className="text-center py-8 text-slate-500"
										>
											No products found for this customer
										</TableCell>
									</TableRow>
								) : (
									data.responseProductDtos.map((product) => (
										<ProductTableRow
											key={product.id}
											product={product}
											setEditingProduct={setEditingProduct}
											setDeletingProduct={setDeletingProduct}
										/>
									))
								)}
							</TableBody>
						</Table>
					</div>
				</>
			)}
		</>
	);
}

export default ProductTable;
