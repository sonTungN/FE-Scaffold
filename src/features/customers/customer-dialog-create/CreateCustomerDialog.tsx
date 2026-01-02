import type { CustomerCreateRequest } from "@/types/customer";
import { useCreateCustomer } from "./CreateCustomerDialogHook";
import { useCreateCustomerDialogStore } from "./CreateCustomerDialogStore";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { CustomerForm } from "../customer-form/CustomerForm";
import { DialogDescription } from "@/components/ui/dialog";

export function CreateCustomerDialog() {
	const { isOpen, closeCreateDialog } = useCreateCustomerDialogStore();

	const createMutation = useCreateCustomer();

	const handleOnCreateSubmit = async (formData: CustomerCreateRequest) => {
		try {
			await createMutation.mutateAsync(formData);
			closeCreateDialog();
		} catch (error) {
			// Error handling is done by React Query
			console.error("Failed to create customer:", error);
		}
	};

	const handleOnCancel = () => {
		closeCreateDialog();
	};

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && closeCreateDialog()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Customer</DialogTitle>
					<DialogDescription>
						Please fill in the form below to create a new customer.
					</DialogDescription>
				</DialogHeader>
				<CustomerForm
					formType="create"
					onSubmit={handleOnCreateSubmit}
					onCancel={handleOnCancel}
					isSubmitting={createMutation.isPending}
				/>
			</DialogContent>
		</Dialog>
	);
}
