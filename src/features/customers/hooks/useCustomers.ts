// Customer Hooks - TanStack Query hooks for customer operations
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customerService } from "../services/customerService";
import type {
	CustomerCreateRequest,
	CustomerUpdateRequest,
} from "@/types/customer";

// Query keys
export const customerKeys = {
	all: ["customers"],
	lists: () => [...customerKeys.all, "list"],
	details: () => [...customerKeys.all, "detail"],
	detail: (id: string) => [...customerKeys.details(), id],
};

// Get customers with pagination
export function useCustomers() {
	return useQuery({
		queryKey: customerKeys.all,
		queryFn: () => customerService.getAllCustomers(),
	});
}

// Get customer by ID
export function useCustomer(id: string) {
	return useQuery({
		queryKey: customerKeys.detail(id),
		queryFn: () => customerService.getCustomerById(id),
		enabled: !!id,
	});
}

// Create customer mutation
export function useCreateCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CustomerCreateRequest) =>
			customerService.createCustomer(data),
		onSuccess: () => {
			// Invalidate and refetch customers list
			queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
		},
	});
}

// Update customer mutation
export function useUpdateCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: CustomerUpdateRequest }) =>
			customerService.updateCustomer(id, data),
		onSuccess: (_, variables) => {
			// Invalidate customers list and specific customer detail
			queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
			queryClient.invalidateQueries({
				queryKey: customerKeys.detail(variables.id),
			});
		},
	});
}

// Delete customer mutation
export function useDeleteCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => customerService.deleteCustomer(id),
		onSuccess: () => {
			// Invalidate customers list
			queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
		},
	});
}
