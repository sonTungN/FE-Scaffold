// Products Page - Admin only, shows products by customer
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useProductTable } from "@/features/products/product-table/ProductTableHook";
import { UpdateProductDialog } from "@/features/products/product-dialog-update/UpdateProductDialog";
import { DeleteProductDialog } from "@/features/products/product-dialog-delete/DeleteProductDialog";
import { useUpdateProductDialogStore } from "@/features/products/product-dialog-update/UpdateProductDialogStore";
import { useDeleteProductDialogStore } from "@/features/products/product-dialog-delete/DeleteProductDialogStore";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { ProductDto } from "@/types/product";
import ProductTable from "@/features/products/product-table/ProductTable";

export default function ProductsPage() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const customerId = searchParams.get("customerId");

	// Dialog states
	const { setEditingProduct } = useUpdateProductDialogStore();
	const { setDeletingProduct } = useDeleteProductDialogStore();

	// Queries
	const { data, isLoading, error } = useProductTable(customerId || "");

	// Redirect if no customerId
	useEffect(() => {
		if (!customerId) {
			navigate("/customers");
		}
	}, [customerId, navigate]);

	if (!customerId) {
		return null;
	}

	return (
		<div className="container mx-auto py-8 px-4">
			<Card>
				<CardHeader>
					<div className="flex items-center gap-4 mb-2">
						<Button variant="outline" onClick={() => navigate("/customers")}>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Customers
						</Button>
					</div>
					<CardTitle>Products by Customer</CardTitle>
					<CardDescription>
						Manage products for this customer (Admin Only)
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ProductTable
						isLoading={isLoading}
						error={error ? error.message : null}
						data={data || { responseProductDtos: [] }}
						setEditingProduct={(product: ProductDto) =>
							setEditingProduct(product)
						}
						setDeletingProduct={(product: ProductDto) =>
							setDeletingProduct(product)
						}
					/>
				</CardContent>
			</Card>

			{/* Update Dialog */}
			<UpdateProductDialog />

			{/* Delete Dialog */}
			<DeleteProductDialog customerId={customerId} />
		</div>
	);
}
