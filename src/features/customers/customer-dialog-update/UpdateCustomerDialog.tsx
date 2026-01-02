// Update Customer Dialog Component
import type { CustomerUpdateRequest } from "@/types/customer";
import { useUpdateCustomer } from "./UpdateCustomerDialogHook";
import { useUpdateCustomerDialogStore } from "./UpdateCustomerDialogStore";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { CustomerForm } from "../customer-form/CustomerForm";

export function UpdateCustomerDialog() {
	const { editingCustomer, isUpdateOpen, closeUpdateDialog } =
		useUpdateCustomerDialogStore();
	const updateMutation = useUpdateCustomer();

	const handleOnUpdateSubmit = async (formData: CustomerUpdateRequest) => {
		if (editingCustomer) {
			try {
				await updateMutation.mutateAsync({
					id: editingCustomer.id,
					data: formData,
				});
				closeUpdateDialog();
			} catch (error) {
				// Error handling is done by React Query
				console.error("Failed to update customer:", error);
			}
		}
	};

	const handleOnCancel = () => {
		closeUpdateDialog();
	};

	if (!editingCustomer) return null;

	return (
		<Dialog
			open={isUpdateOpen}
			onOpenChange={(open) => !open && closeUpdateDialog()}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Customer</DialogTitle>
					<DialogDescription>
						Please fill in the form below to update the customer.
					</DialogDescription>
				</DialogHeader>
				<CustomerForm
					formType="update"
					customer={editingCustomer}
					onSubmit={handleOnUpdateSubmit}
					onCancel={handleOnCancel}
					isSubmitting={updateMutation.isPending}
				/>
			</DialogContent>
		</Dialog>
	);
}
