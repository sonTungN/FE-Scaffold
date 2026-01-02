// Update Product Dialog Hook - TanStack Query hook for updating product
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductDialogService } from "./UpdateProductDialogService";
import type { ProductUpdateRequest } from "@/types/product";
import { productKeys } from "../common";

// Update product mutation
export function useUpdateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: ProductUpdateRequest }) =>
			updateProductDialogService.updateProduct(id, data),
		onSuccess: (_, variables) => {
			// Invalidate products list and specific product detail
			queryClient.invalidateQueries({ queryKey: productKeys.lists() });
			queryClient.invalidateQueries({
				queryKey: productKeys.detail(variables.id),
			});
			// Invalidate all byCustomer queries
			queryClient.invalidateQueries({ queryKey: productKeys.all });
		},
	});
}
