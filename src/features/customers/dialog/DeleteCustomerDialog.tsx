// Customer Delete Dialog Component
import { useDeleteCustomerDialog } from "./DeleteCustomerDialogHook";
import { useDeleteCustomerDialogStore } from "./DeleteCustomerDialogStore";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCustomerTable } from "../table/CustomerTableHook";

export function DeleteCustomerDialog() {
	const { refetch } = useCustomerTable();
	
	const { deletingCustomer, isDeleteOpen, closeDeleteDialog } =
		useDeleteCustomerDialogStore();
	const deleteMutation = useDeleteCustomerDialog();

	const handleOnDelete = async () => {
		if (deletingCustomer) {
			await deleteMutation.mutateAsync(deletingCustomer.id);
			closeDeleteDialog();
			refetch();
		}
	};

	const handleOnCancel = () => {
		closeDeleteDialog();
	};

	if (!deletingCustomer) return null;

	return (
		<Dialog
			open={isDeleteOpen}
			onOpenChange={(open) => !open && closeDeleteDialog()}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Customer</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete{" "}
						<strong>{deletingCustomer.name}</strong>? This action cannot be
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
