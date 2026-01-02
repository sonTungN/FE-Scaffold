// Create Customer Dialog Hook - TanStack Query hook for creating customer
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomerDialogService } from "./CreateCustomerDialogService";
import { customerKeys } from "../common";

// Create customer mutation
export function useCreateCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createCustomerDialogService.createCustomer,
		onSuccess: () => {
			// Invalidate customers list to trigger refetch
			queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
		},
	});
}
