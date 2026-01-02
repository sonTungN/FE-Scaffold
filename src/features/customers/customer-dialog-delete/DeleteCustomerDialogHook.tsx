// Delete Customer Dialog Hook - TanStack Query hook for deleting customer
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCustomerDialogService } from "./DeleteCustomerDialogService";
import { customerKeys } from "../common";

// Delete customer mutation
export function useDeleteCustomerDialog() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteCustomerDialogService.deleteCustomer(id),
		onSuccess: () => {
			// Invalidate customers list
			queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
		},
	});
}
