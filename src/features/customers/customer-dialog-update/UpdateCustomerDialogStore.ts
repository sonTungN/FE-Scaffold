// Update Customer Dialog Store - Global state for update dialog
import { create } from "zustand";
import type { Customer } from "@/types/customer";

interface UpdateCustomerDialogState {
	editingCustomer: Customer | null;
	setEditingCustomer: (customer: Customer | null) => void;
	isUpdateOpen: boolean;
	closeUpdateDialog: () => void;
}

export const useUpdateCustomerDialogStore = create<UpdateCustomerDialogState>(
	(set) => ({
		editingCustomer: null,
		setEditingCustomer: (customer) =>
			set({ editingCustomer: customer, isUpdateOpen: !!customer }),
		isUpdateOpen: false,
		closeUpdateDialog: () =>
			set({ editingCustomer: null, isUpdateOpen: false }),
	})
);
