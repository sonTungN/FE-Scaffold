// Create Customer Dialog Store - Global state for create dialog
import { create } from "zustand";

interface CreateCustomerDialogState {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	openCreateDialog: () => void;
	closeCreateDialog: () => void;
	toggleCreateDialog: () => void;
}

export const useCreateCustomerDialogStore = create<CreateCustomerDialogState>(
	(set) => ({
		isOpen: false,
		setIsOpen: (isOpen) => set({ isOpen }),
		openCreateDialog: () => set({ isOpen: true }),
		closeCreateDialog: () => set({ isOpen: false }),
		toggleCreateDialog: () => set((state) => ({ isOpen: !state.isOpen })),
	})
);
