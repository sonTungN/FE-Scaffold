// Customer Hooks - Basic hooks for fetching customers (READ operations only)
// CREATE, UPDATE, DELETE operations are in their respective dialog hooks
import { useQuery } from "@tanstack/react-query";
import { customerTableService } from "./CustomerTableService";
import { customerKeys } from "../common";

// Get all customers
export function useCustomerTable() {
	return useQuery({
		queryKey: customerKeys.lists(),
		queryFn: () => customerTableService.getAllCustomers(),
	});
}

// Get customer by ID
export function useCustomer(id: string) {
	return useQuery({
		queryKey: customerKeys.detail(id),
		queryFn: () => customerTableService.getCustomerById(id),
		enabled: !!id,
	});
}
