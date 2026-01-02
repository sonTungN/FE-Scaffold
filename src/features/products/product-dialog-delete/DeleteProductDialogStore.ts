// Delete Product Dialog Store - Global state for delete dialog
import { create } from "zustand";
import type { ProductDto } from "@/types/product";

interface DeleteProductDialogState {
	deletingProduct: ProductDto | null;
	setDeletingProduct: (product: ProductDto | null) => void;
	isDeleteOpen: boolean;
	closeDeleteDialog: () => void;
}

export const useDeleteProductDialogStore = create<DeleteProductDialogState>(
	(set) => ({
		deletingProduct: null,
		setDeletingProduct: (product) =>
			set({ deletingProduct: product, isDeleteOpen: !!product }),
		isDeleteOpen: false,
		closeDeleteDialog: () =>
			set({ deletingProduct: null, isDeleteOpen: false }),
	})
);
