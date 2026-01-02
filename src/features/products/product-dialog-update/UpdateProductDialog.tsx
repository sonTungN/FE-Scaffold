// Update Product Dialog Component
import type { ProductUpdateRequest } from "@/types/product";
import { useUpdateProduct } from "./UpdateProductDialogHook";
import { useUpdateProductDialogStore } from "./UpdateProductDialogStore";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "../product-form/ProductForm";

export function UpdateProductDialog() {
	const { editingProduct, isUpdateOpen, closeUpdateDialog } =
		useUpdateProductDialogStore();
	const updateMutation = useUpdateProduct();

	const handleOnUpdateSubmit = async (formData: ProductUpdateRequest) => {
		if (editingProduct) {
			try {
				await updateMutation.mutateAsync({
					id: editingProduct.id,
					data: formData,
				});
				closeUpdateDialog();
			} catch (error) {
				// Error handling is done by React Query
				console.error("Failed to update product:", error);
			}
		}
	};

	const handleOnCancel = () => {
		closeUpdateDialog();
	};

	if (!editingProduct) return null;

	return (
		<Dialog
			open={isUpdateOpen}
			onOpenChange={(open) => !open && closeUpdateDialog()}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Product</DialogTitle>
					<DialogDescription>
						Please fill in the form below to update the product.
					</DialogDescription>
				</DialogHeader>
				<ProductForm
					product={editingProduct}
					onSubmit={handleOnUpdateSubmit}
					onCancel={handleOnCancel}
					isSubmitting={updateMutation.isPending}
				/>
			</DialogContent>
		</Dialog>
	);
}
