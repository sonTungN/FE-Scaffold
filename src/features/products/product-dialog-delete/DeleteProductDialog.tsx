import { useDeleteProductDialog } from "./DeleteProductDialogHook";
import { useDeleteProductDialogStore } from "./DeleteProductDialogStore";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useProductTable } from "../product-table/ProductTableHook";

interface DeleteProductDialogProps {
	customerId: string;
}

export function DeleteProductDialog({ customerId }: DeleteProductDialogProps) {
	const { refetch } = useProductTable(customerId);

	const { deletingProduct, isDeleteOpen, closeDeleteDialog } =
		useDeleteProductDialogStore();
	const deleteMutation = useDeleteProductDialog();

	const handleOnDelete = async () => {
		if (deletingProduct) {
			await deleteMutation.mutateAsync(deletingProduct.id);
			closeDeleteDialog();
			refetch();
		}
	};

	const handleOnCancel = () => {
		closeDeleteDialog();
	};

	if (!deletingProduct) return null;

	return (
		<Dialog
			open={isDeleteOpen}
			onOpenChange={(open) => !open && closeDeleteDialog()}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Product</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete{" "}
						<strong>{deletingProduct.name}</strong>? This action cannot be
						undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={handleOnCancel}>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={handleOnDelete}
						disabled={deleteMutation.isPending}
					>
						{deleteMutation.isPending ? "Deleting..." : "Delete"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
