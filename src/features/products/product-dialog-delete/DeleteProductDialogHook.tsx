// Delete Product Dialog Hook - TanStack Query hook for deleting product
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductDialogService } from "./DeleteProductDialogService";
import { productKeys } from "../common";

// Delete product mutation
export function useDeleteProductDialog() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteProductDialogService.deleteProduct(id),
		onSuccess: () => {
			// Invalidate products list
			queryClient.invalidateQueries({ queryKey: productKeys.lists() });
			// Invalidate all byCustomer queries
			queryClient.invalidateQueries({ queryKey: productKeys.all });
		},
	});
}
