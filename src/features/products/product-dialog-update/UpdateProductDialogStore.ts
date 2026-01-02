// Update Product Dialog Store - Global state for update dialog
import { create } from "zustand";
import type { ProductDto } from "@/types/product";

interface UpdateProductDialogState {
	editingProduct: ProductDto | null;
	setEditingProduct: (product: ProductDto | null) => void;
	isUpdateOpen: boolean;
	closeUpdateDialog: () => void;
}

export const useUpdateProductDialogStore = create<UpdateProductDialogState>(
	(set) => ({
		editingProduct: null,
		setEditingProduct: (product) =>
			set({ editingProduct: product, isUpdateOpen: !!product }),
		isUpdateOpen: false,
		closeUpdateDialog: () => set({ editingProduct: null, isUpdateOpen: false }),
	})
);
