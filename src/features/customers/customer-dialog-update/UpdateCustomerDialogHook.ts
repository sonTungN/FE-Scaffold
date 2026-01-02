// Update Customer Dialog Hook - TanStack Query hook for updating customer
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCustomerDialogService } from "./UpdateCustomerDialogService";
import type { CustomerUpdateRequest } from "@/types/customer";
import { customerKeys } from "../common";

// Update customer mutation
export function useUpdateCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: CustomerUpdateRequest }) =>
			updateCustomerDialogService.updateCustomer(id, data),
		onSuccess: (_, variables) => {
			// Invalidate customers list and specific customer detail
			queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
			queryClient.invalidateQueries({
				queryKey: customerKeys.detail(variables.id),
			});
		},
	});
}
