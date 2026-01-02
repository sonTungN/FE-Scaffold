// Delete Customer Dialog Store - Global state for delete dialog
import { create } from "zustand";
import type { Customer } from "@/types/customer";

interface DeleteCustomerDialogState {
	deletingCustomer: Customer | null;
	setDeletingCustomer: (customer: Customer | null) => void;
	isDeleteOpen: boolean;
	closeDeleteDialog: () => void;
}

export const useDeleteCustomerDialogStore = create<DeleteCustomerDialogState>(
	(set) => ({
		deletingCustomer: null,
		setDeletingCustomer: (customer) =>
			set({ deletingCustomer: customer, isDeleteOpen: !!customer }),
		isDeleteOpen: false,
		closeDeleteDialog: () =>
			set({ deletingCustomer: null, isDeleteOpen: false }),
	})
);
